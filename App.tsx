import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ConfigStep } from './components/ConfigStep';
import { LiveInterface } from './components/LiveInterface';
import { RocketLogo } from './components/RocketLogo';

const App: React.FC = () => {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<string>('');
  const [audioContexts, setAudioContexts] = useState<{ input: AudioContext; output: AudioContext } | undefined>(undefined);
  
  // Theme state: 'dark' or 'light', default to 'dark'
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleStart = (url: string, customInstructions: string) => {
    let validUrl = url;
    if (!url.startsWith('http')) {
      validUrl = `https://${url}`;
    }
    
    // Create AudioContexts immediately within the user gesture (click handler)
    // This ensures the browser doesn't suspend them due to autoplay policies
    const input = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const output = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    
    setAudioContexts({ input, output });
    setActiveUrl(validUrl);
    setInstructions(customInstructions);
  };

  const handleClose = () => {
    setActiveUrl(null);
    setInstructions('');
    setAudioContexts(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col technical-grid relative overflow-hidden text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Vignette Effect - Adapts to theme */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#fafafa_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#09090b_100%)] opacity-80" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-1 flex items-center justify-center p-4 md:p-8">
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
        </main>

        <footer className="p-6 text-center border-t border-zinc-200 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm text-zinc-500 text-xs font-mono-tech relative z-10 transition-colors duration-300">
          <div className="flex items-center justify-center gap-2">
             <RocketLogo className="w-4 h-4" />
             <p>GEMINI_LIVE_API_DEMO // SYSTEM_VERSION_1.0.0</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;