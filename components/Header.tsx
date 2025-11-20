import React from 'react';
import { Terminal, Sun, Moon } from 'lucide-react';
import { RocketLogo } from './RocketLogo';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-colors duration-300">
          <RocketLogo className="w-6 h-6" />
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-zinc-400 dark:border-zinc-500"></div>
          <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-zinc-400 dark:border-zinc-500"></div>
          <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-zinc-400 dark:border-zinc-500"></div>
          <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-zinc-400 dark:border-zinc-500"></div>
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-sm font-bold tracking-wider font-mono-tech text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
            ROCKET_RESPONDER<span className="text-accent-blue">.AI</span>
          </h1>
          <span className="text-[10px] text-zinc-500 font-mono-tech uppercase tracking-widest">
            System Ready
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 transition-all"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-tech">LIVE_API_CONNECTED</span>
        </div>
        
        <a 
          href="#" 
          className="text-xs font-mono-tech text-zinc-500 hover:text-accent-blue transition-colors flex items-center gap-2"
        >
          <Terminal className="w-3 h-3" />
          <span className="hidden sm:inline">DOCS</span>
        </a>
      </div>
    </header>
  );
};