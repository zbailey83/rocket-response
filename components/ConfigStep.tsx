import React, { useState } from 'react';
import { Globe, ArrowRight, MessageSquare, Cpu, Zap } from 'lucide-react';
import { RocketLogo } from './RocketLogo';

interface ConfigStepProps {
  onStart: (url: string, instructions: string) => void;
}

export const ConfigStep: React.FC<ConfigStepProps> = ({ onStart }) => {
  const [url, setUrl] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    onStart(url, instructions);
  };

  const handleQuickTest = () => {
    setLoading(true);
    // Use a generic helpful prompt for the test
    onStart(
      "https://test.rocketresponder.ai", 
      "You are a helpful AI assistant performing a system test. Introduce yourself briefly and ask the user how you can help them test their microphone."
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Hero Section */}
      <div className="mb-10 flex flex-col items-center relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-accent-blue/30 bg-accent-blue/10 text-accent-blue text-xs font-mono-tech mb-6 tracking-wide">
          <Cpu className="w-3 h-3" />
          <span>GEMINI 2.5 NEURAL LINK</span>
        </div>
        
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col items-end text-right">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors duration-300 leading-none">
              Rocket Responder
            </h2>
            <span className="text-xl md:text-2xl font-mono-tech text-zinc-500 font-normal leading-tight mt-1">
              // VOICE_INTERFACE_INIT
            </span>
          </div>
          <div className="h-[4.5rem] w-[1px] bg-zinc-300 dark:bg-zinc-700 hidden sm:block"></div>
          <RocketLogo className="h-20 w-20 md:h-24 md:w-24 shrink-0" />
        </div>
      </div>

      {/* Technical Card */}
      <div className="relative bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm p-1 transition-colors duration-300 shadow-sm dark:shadow-none">
        {/* Corner Brackets */}
        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-accent-blue"></div>
        <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t border-r border-accent-blue"></div>
        <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b border-l border-accent-blue"></div>
        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-accent-blue"></div>

        <div className="p-6 md:p-8 space-y-6">
           <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono-tech border-l-2 border-zinc-300 dark:border-zinc-700 pl-4 transition-colors duration-300">
            Input target parameters to generate a conversational agent.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-2">
              <label className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider">Target Source (URL)</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded pointer-events-none"></div>
                <div className="relative flex items-center bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 group-focus-within:border-accent-blue transition-colors duration-300">
                  <div className="pl-3 pr-2 text-zinc-400 group-focus-within:text-accent-blue">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    placeholder="https://example.com or Google Maps URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-700 py-3 px-2 font-mono-tech text-sm transition-colors duration-300"
                    required={!loading} // Only required if actually submitting form
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider">System Instructions (Prompt)</label>
              <div className="relative group">
                 <div className="relative flex items-start bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 group-focus-within:border-accent-blue transition-colors duration-300">
                  <div className="pl-3 pr-2 pt-3 text-zinc-400 group-focus-within:text-accent-blue">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="// Enter demo scenario script..."
                    className="w-full bg-transparent border-none outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-700 py-3 px-2 min-h-[100px] resize-none font-mono-tech text-sm transition-colors duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-accent-blue hover:bg-blue-600 text-white text-sm font-bold tracking-wide uppercase py-4 px-6 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-blue-500/20"
              >
                {loading ? (
                  <span className="flex items-center gap-2 font-mono-tech">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    CONNECTING...
                  </span>
                ) : (
                  <>
                    <span className="font-mono-tech">Initialize Agent</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleQuickTest}
                disabled={loading}
                className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm font-bold tracking-wide uppercase py-4 px-6 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-200 dark:border-zinc-700"
                title="Skip setup and test connection immediately"
              >
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="font-mono-tech">Quick Test</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "LATENCY", val: "< 500ms" },
          { label: "MODE", val: "Voice/Native" },
          { label: "PROTOCOL", val: "WebSocket" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center p-3 border border-zinc-200 dark:border-zinc-800 bg-white/30 dark:bg-zinc-900/30 transition-colors duration-300">
            <span className="text-[10px] font-mono-tech text-zinc-500 uppercase">{stat.label}</span>
            <span className="text-sm font-mono-tech text-accent-blue">{stat.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};