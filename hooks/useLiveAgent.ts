import { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { createPcmBlob, base64ToBytes, decodeAudioData, downsampleTo16k } from '../utils/audioUtils';

interface UseLiveAgentProps {
  businessUrl: string;
  customInstructions?: string;
  providedInputContext?: AudioContext;
  providedOutputContext?: AudioContext;
  onDisconnect: () => void;
}

export const useLiveAgent = ({ 
  businessUrl, 
  customInstructions, 
  providedInputContext,
  providedOutputContext,
  onDisconnect 
}: UseLiveAgentProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0); // Agent output level
  const [micLevel, setMicLevel] = useState(0); // User input level
  const [error, setError] = useState<string | null>(null);

  // Refs for cleanup and audio management
  const sessionRef = useRef<any>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(async () => {
    if (activeRef.current) return;
    
    try {
      setError(null);
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key not found");

      const ai = new GoogleGenAI({ apiKey });
      activeRef.current = true;

      // Use provided contexts or create new ones
      inputContextRef.current = providedInputContext || new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputContextRef.current = providedOutputContext || new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      // Ensure contexts are running
      if (inputContextRef.current.state === 'suspended') {
        await inputContextRef.current.resume();
      }
      if (outputContextRef.current.state === 'suspended') {
        await outputContextRef.current.resume();
      }

      // Setup Audio Analyzer for visualizer
      const analyzer = outputContextRef.current.createAnalyser();
      analyzer.fftSize = 256;
      analyzerRef.current = analyzer;
      const outputNode = outputContextRef.current.createGain();
      outputNode.connect(analyzer);
      analyzer.connect(outputContextRef.current.destination);

      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1
        } 
      });
      streamRef.current = stream;

      // System Instruction with Business Logic
      const instruction = `
        You are a professional, friendly, and helpful customer support voice agent for the business at "${businessUrl}".
        
        Your goals:
        1. Act as an employee of this business.
        2. Keep responses concise and conversational, suitable for a voice interface.
        3. Do not break character.
        4. IMPORTANT: Always introduce yourself immediately when you receive the system command "Start conversation".
        
        ${customInstructions ? `Specific Demo Script / Instructions from the owner:\n${customInstructions}` : ''}
        
        If no specific instructions are provided about the business details, make reasonable assumptions based on standard practices for this type of business.
      `;

      // Connect to Gemini Live
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: async () => {
            console.log('Gemini Live Session Opened');
            setIsConnected(true);
            
            // Trigger Welcome Message
            sessionPromise.then((session: any) => {
               session.sendRealtimeInput({
                   content: {
                       role: "user",
                       parts: [{ text: "Start conversation. Say hello to the user." }]
                   }
               });
            });

            // Setup Input Stream Processing
            if (!inputContextRef.current || !streamRef.current) return;
            
            const source = inputContextRef.current.createMediaStreamSource(streamRef.current);
            sourceRef.current = source;
            
            // Using ScriptProcessor for raw PCM access (4096 buffer size)
            const processor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
              if (!activeRef.current) return;
              
              const inputData = e.inputBuffer.getChannelData(0);
              
              // Calculate rough Mic Level for UI
              let sum = 0;
              for(let i = 0; i < inputData.length; i++) {
                sum += Math.abs(inputData[i]);
              }
              const avg = sum / inputData.length;
              const amplifiedLevel = Math.min(1, avg * 5); // Amplify for UI
              setMicLevel(prev => prev * 0.7 + amplifiedLevel * 0.3);

              // IMPORTANT: Downsample to 16kHz if necessary
              // Most browsers run AudioContext at 44.1k or 48k.
              // Sending 48k data as 16k pcm results in deep/slow voice and recognition failure.
              const currentSampleRate = inputContextRef.current?.sampleRate || 16000;
              const downsampledData = downsampleTo16k(inputData, currentSampleRate);
              
              const pcmBlob = createPcmBlob(downsampledData);
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              }).catch(err => {
                if (activeRef.current) {
                   console.error("Error sending audio frame:", err);
                }
              });
            };

            source.connect(processor);
            processor.connect(inputContextRef.current.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            if (!outputContextRef.current) return;

            const base64Audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            
            if (base64Audio) {
              const ctx = outputContextRef.current;
              
              if (ctx.state === 'suspended') {
                try { await ctx.resume(); } catch (e) { console.error("Failed to resume audio context", e); }
              }

              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              try {
                const audioBuffer = await decodeAudioData(
                  base64ToBytes(base64Audio),
                  ctx,
                  24000,
                  1
                );

                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                const gainNode = ctx.createGain();
                gainNode.gain.value = 1.0; 
                
                source.connect(gainNode);
                gainNode.connect(analyzerRef.current!); 
                
                source.addEventListener('ended', () => {
                  sourcesRef.current.delete(source);
                  if (sourcesRef.current.size === 0) {
                     setIsSpeaking(false);
                  }
                });
                
                source.addEventListener('start', () => {
                   setIsSpeaking(true);
                   // Reset silence timer when agent speaks
                   if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
                });

                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
                setIsSpeaking(true);
              } catch (e) {
                console.error("Audio decode error:", e);
              }
            }

            if (msg.serverContent?.interrupted) {
              console.log('Interrupted');
              sourcesRef.current.forEach(source => {
                try { source.stop(); } catch (e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onclose: () => {
            console.log('Session closed');
            cleanup();
          },
          onerror: (err) => {
            console.error('Session error', err);
            setError("Connection error. Please check your network and try again.");
            cleanup();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          },
          systemInstruction: instruction,
        }
      });

      sessionRef.current = sessionPromise;

    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to connect");
      cleanup();
    }
  }, [businessUrl, customInstructions, providedInputContext, providedOutputContext]);

  const disconnect = useCallback(() => {
    cleanup();
  }, []);

  const cleanup = () => {
    activeRef.current = false;
    setIsConnected(false);
    setIsSpeaking(false);

    if (silenceTimerRef.current) clearInterval(silenceTimerRef.current);

    if (sessionRef.current) {
      sessionRef.current.then((s: any) => s.close()).catch(() => {});
      sessionRef.current = null;
    }

    sourcesRef.current.forEach(s => {
        try { s.stop(); } catch(e){}
    });
    sourcesRef.current.clear();

    streamRef.current?.getTracks().forEach(track => track.stop());
    sourceRef.current?.disconnect();
    processorRef.current?.disconnect();
    
    onDisconnect();
  };

  // Visualizer & Inactivity Loop
  useEffect(() => {
    const updateVisualizer = () => {
      if (!analyzerRef.current || !isConnected) {
        setAudioLevel(0);
      } else {
        const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
        analyzerRef.current.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setAudioLevel(avg);
      }
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    };
    updateVisualizer();
    
    return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isConnected, isSpeaking]);

  // Specific Silence Detection Logic
  const lastUserActivityRef = useRef<number>(Date.now());
  useEffect(() => {
      if (micLevel > 0.05) { // Threshold for speech
          lastUserActivityRef.current = Date.now();
      }
  }, [micLevel]);

  useEffect(() => {
      if (!isConnected) return;
      
      const checkSilence = setInterval(() => {
          if (isSpeaking) {
              lastUserActivityRef.current = Date.now(); // Reset if agent is talking
              return;
          }

          const timeSinceActivity = Date.now() - lastUserActivityRef.current;
          if (timeSinceActivity > 10000) { // 10 seconds silence
              console.log("Silence detected, nagging user...");
              if (sessionRef.current) {
                  sessionRef.current.then((s: any) => {
                      s.sendRealtimeInput({
                          content: {
                              role: "user",
                              parts: [{ text: "The user has been silent. Politely ask if they are still there or if they need help." }]
                          }
                      });
                  }).catch(() => {});
              }
              // Reset to avoid spamming every second
              lastUserActivityRef.current = Date.now(); 
          }
      }, 1000);

      return () => clearInterval(checkSilence);
  }, [isConnected, isSpeaking]);

  return {
    connect,
    disconnect,
    isConnected,
    isSpeaking,
    audioLevel,
    micLevel,
    error
  };
};
