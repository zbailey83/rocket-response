import React, { useState } from 'react';
import { Header } from './components/Header';
import { ConfigStep } from './components/ConfigStep';
import { LiveInterface } from './components/LiveInterface';

const App: React.FC = () => {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<string>('');

  const handleStart = (url: string, customInstructions: string) => {
    let validUrl = url;
    if (!url.startsWith('http')) {
      validUrl = `https://${url}`;
    }
    setActiveUrl(validUrl);
    setInstructions(customInstructions);
  };

  const handleClose = () => {
    setActiveUrl(null);
    setInstructions('');
  };

  return (
    <div className="min-h-screen flex flex-col technical-grid relative overflow-hidden text-zinc-100">
      {/* Vignette Effect */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#09090b_100%)]" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 flex items-center justify-center p-4 md:p-8">
          {activeUrl ? (
            <LiveInterface 
              businessUrl={activeUrl} 
              customInstructions={instructions}
              onClose={handleClose} 
            />
          ) : (
            <ConfigStep onStart={handleStart} />
          )}
        </main>

        <footer className="p-6 text-center border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-sm text-zinc-500 text-xs font-mono-tech relative z-10">
          <p>GEMINI_LIVE_API_DEMO // SYSTEM_VERSION_1.0.0</p>
        </footer>
      </div>
    </div>
  );
};

export default App;