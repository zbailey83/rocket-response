
import React, { useState } from 'react';
import { ConfigStep } from './ConfigStep';
import { LiveInterface } from './LiveInterface';

interface DemoWidgetProps {
  theme: 'dark' | 'light';
}

export const DemoWidget: React.FC<DemoWidgetProps> = ({ theme }) => {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<string>('');
  const [audioContexts, setAudioContexts] = useState<{ input: AudioContext; output: AudioContext } | undefined>(undefined);

  const handleStart = (url: string, customInstructions: string) => {
    let validUrl = url;
    if (!url.startsWith('http') && !url.startsWith('https')) {
      validUrl = `https://${url}`;
    }
    
    // Create AudioContexts immediately within user gesture
    const input = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const output = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    
    setAudioContexts({ input, output });
    setActiveUrl(validUrl);
    setInstructions(customInstructions);
  };

  const handleClose = () => {
    if (audioContexts) {
      audioContexts.input.close().catch(() => {});
      audioContexts.output.close().catch(() => {});
    }
    setActiveUrl(null);
    setInstructions('');
    setAudioContexts(undefined);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl backdrop-blur-sm overflow-hidden min-h-[600px] flex flex-col relative transition-colors duration-300">
      
      {/* Widget Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
        <div className="text-[10px] font-mono-tech text-zinc-400 uppercase tracking-widest">
          Interactive Live Demo
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
        {/* Grid Background specific to the widget area */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: `radial-gradient(${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`, 
               backgroundSize: '24px 24px' 
             }}>
        </div>

        {activeUrl && audioContexts ? (
          <LiveInterface 
            businessUrl={activeUrl} 
            customInstructions={instructions}
            audioContexts={audioContexts}
            onClose={handleClose} 
            theme={theme}
          />
        ) : (
          <ConfigStep onStart={handleStart} />
        )}
      </div>
    </div>
  );
};
