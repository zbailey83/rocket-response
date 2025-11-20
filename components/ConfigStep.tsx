import React, { useState } from 'react';
import { Globe, Sparkles, ArrowRight, MessageSquare, Cpu } from 'lucide-react';

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

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Decorative Header */}
      <div className="mb-8 text-center space-y-4 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-accent-blue/30 bg-accent-blue/10 text-accent-blue text-xs font-mono-tech mb-4 tracking-wide">
          <Cpu className="w-3 h-3" />
          <span>GEMINI 2.5 NEURAL LINK</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Rocket Responder
          <span className="block text-2xl md:text-3xl mt-1 font-mono-tech text-zinc-500 font-normal">
            // VOICE_INTERFACE_INIT
          </span>
        </h2>
      </div>

      {/* Technical Card */}
      <div className="relative bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm p-1">
        {/* Corner Brackets */}
        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-accent-blue"></div>
        <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t border-r border-accent-blue"></div>
        <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b border-l border-accent-blue"></div>
        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-accent-blue"></div>

        <div className="p-6 md:p-8 space-y-6">
           <p className="text-sm text-zinc-400 font-mono-tech border-l-2 border-zinc-700 pl-4">
            Input target parameters to generate a conversational agent.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-2">
              <label className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider">Target Source (URL)</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded pointer-events-none"></div>
                <div className="relative flex items-center bg-zinc-950 border border-zinc-700 group-focus-within:border-accent-blue transition-colors">
                  <div className="pl-3 pr-2 text-zinc-500 group-focus-within:text-accent-blue">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    placeholder="https://example.com or Google Maps URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-700 py-3 px-2 font-mono-tech text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider">System Instructions (Prompt)</label>
              <div className="relative group">
                 <div className="relative flex items-start bg-zinc-950 border border-zinc-700 group-focus-within:border-accent-blue transition-colors">
                  <div className="pl-3 pr-2 pt-3 text-zinc-500 group-focus-within:text-accent-blue">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="// Enter demo scenario script..."
                    className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-700 py-3 px-2 min-h-[100px] resize-none font-mono-tech text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-blue hover:bg-blue-600 text-white text-sm font-bold tracking-wide uppercase py-4 px-6 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <span className="flex items-center gap-2 font-mono-tech">
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ESTABLISHING_UPLINK...
                </span>
              ) : (
                <>
                  <span className="font-mono-tech">Initialize Agent</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "LATENCY", val: "< 500ms" },
          { label: "MODE", val: "Voice/Native" },
          { label: "PROTOCOL", val: "WebSocket" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center p-3 border border-zinc-800 bg-zinc-900/30">
            <span className="text-[10px] font-mono-tech text-zinc-500 uppercase">{stat.label}</span>
            <span className="text-sm font-mono-tech text-accent-blue">{stat.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};