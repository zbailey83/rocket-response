import React from 'react';
import { AudioWaveform, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded border border-zinc-700 bg-zinc-900 text-accent-blue shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <AudioWaveform className="w-5 h-5" />
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-zinc-500"></div>
          <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-zinc-500"></div>
          <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-zinc-500"></div>
          <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-zinc-500"></div>
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-sm font-bold tracking-wider font-mono-tech text-zinc-100">
            VOICE_AGENT<span className="text-accent-blue">.AI</span>
          </h1>
          <span className="text-[10px] text-zinc-500 font-mono-tech uppercase tracking-widest">
            System Ready
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-zinc-400 font-mono-tech">LIVE_API_CONNECTED</span>
        </div>
        <a 
          href="#" 
          className="text-xs font-mono-tech text-zinc-500 hover:text-accent-blue transition-colors flex items-center gap-2"
        >
          <Terminal className="w-3 h-3" />
          <span>DOCS</span>
        </a>
      </div>
    </header>
  );
};