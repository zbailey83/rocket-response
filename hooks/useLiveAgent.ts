import { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { createPcmBlob, base64ToBytes, decodeAudioData } from '../utils/audioUtils';

interface UseLiveAgentProps {
  businessUrl: string;
  customInstructions?: string;
  onDisconnect: () => void;
}

export const useLiveAgent = ({ businessUrl, customInstructions, onDisconnect }: UseLiveAgentProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Refs for cleanup and audio management
  const sessionRef = useRef<Promise<any> | null>(null);
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

  const connect = useCallback(async () => {
    if (activeRef.current) return;
    
    try {
      setError(null);
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key not found");

      const ai = new GoogleGenAI({ apiKey });
      activeRef.current = true;

      // Initialize Audio Contexts
      inputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      // Resume contexts immediately
      await Promise.all([
        inputContextRef.current.resume().catch(e => console.warn("Input context resume failed", e)),
        outputContextRef.current.resume().catch(e => console.warn("Output context resume failed", e))
      ]);

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
          sampleRate: 16000
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
        4. You must introduce yourself immediately when the session starts.
        
        ${customInstructions ? `Specific Demo Script / Instructions from the owner:\n${customInstructions}` : ''}
        
        If no specific instructions are provided about the business details, make reasonable assumptions based on standard practices for this type of business.
      `;

      // Connect to Gemini Live
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log('Gemini Live Session Opened');
            setIsConnected(true);

            // Setup Input Stream Processing
            if (!inputContextRef.current || !streamRef.current) return;
            
            const source = inputContextRef.current.createMediaStreamSource(streamRef.current);
            sourceRef.current = source;
            
            // Using ScriptProcessor as per guidance
            const processor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
              if (!activeRef.current) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              }).catch(err => {
                console.error("Error sending audio:", err);
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
              
              // Ensure context is running
              if (ctx.state === 'suspended') {
                await ctx.resume();
              }

              // Sync timing
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
                source.connect(outputNode);
                
                source.addEventListener('ended', () => {
                  sourcesRef.current.delete(source);
                  if (sourcesRef.current.size === 0) {
                     setIsSpeaking(false);
                  }
                });
                
                source.addEventListener('start', () => {
                   setIsSpeaking(true);
                });

                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
                setIsSpeaking(true);
              } catch (e) {
                console.error("Audio decode error:", e);
              }
            }

            // Handle Interruption
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
            setError("Connection error. Please check your microphone permissions and try again.");
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
  }, [businessUrl, customInstructions]);

  const disconnect = useCallback(() => {
    cleanup();
  }, []);

  const cleanup = () => {
    activeRef.current = false;
    setIsConnected(false);
    setIsSpeaking(false);

    // Close Session
    if (sessionRef.current) {
      sessionRef.current.then(s => s.close()).catch(() => {});
      sessionRef.current = null;
    }

    // Stop Audio Sources
    sourcesRef.current.forEach(s => {
        try { s.stop(); } catch(e){}
    });
    sourcesRef.current.clear();

    // Close Audio Contexts
    if (inputContextRef.current?.state !== 'closed') inputContextRef.current?.close();
    if (outputContextRef.current?.state !== 'closed') outputContextRef.current?.close();

    // Stop Stream
    streamRef.current?.getTracks().forEach(track => track.stop());

    // Disconnect Nodes
    sourceRef.current?.disconnect();
    processorRef.current?.disconnect();
    
    onDisconnect();
  };

  // Visualizer Loop
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
  }, [isConnected]);

  return {
    connect,
    disconnect,
    isConnected,
    isSpeaking,
    audioLevel,
    error
  };
};