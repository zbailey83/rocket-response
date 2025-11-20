import React, { useEffect } from 'react';
import { PhoneOff, ExternalLink, Radio } from 'lucide-react';
import { OrbVisualizer } from './OrbVisualizer';
import { useLiveAgent } from '../hooks/useLiveAgent';

interface LiveInterfaceProps {
  businessUrl: string;
  customInstructions: string;
  onClose: () => void;
}

export const LiveInterface: React.FC<LiveInterfaceProps> = ({ businessUrl, customInstructions, onClose }) => {
  const { 
    connect, 
    disconnect, 
    isConnected, 
    isSpeaking, 
    audioLevel, 
    error 
  } = useLiveAgent({ 
    businessUrl,
    customInstructions,
    onDisconnect: () => {} 
  });

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[80vh] animate-in fade-in zoom-in-95 duration-500 relative">
      
      {/* Technical Overlays */}
      <div className="absolute top-0 left-0 p-4 font-mono-tech text-[10px] text-zinc-600 hidden md:block">
        <div>LINK_STATUS: {isConnected ? 'ACTIVE' : 'CONNECTING'}</div>
        <div>AUDIO_STREAM: {isSpeaking ? 'TX_ON' : 'RX_ON'}</div>
      </div>

      <div className="absolute top-0 right-0 p-4 font-mono-tech text-[10px] text-zinc-600 hidden md:block text-right">
        <div>SECURE_CONNECTION</div>
        <div>ENCRYPTION: TLS 1.3</div>
      </div>

      {/* Status Badge */}
      <div className={`mb-12 flex items-center gap-3 px-4 py-2 border ${isConnected ? 'border-accent-blue/30 bg-accent-blue/5' : 'border-zinc-700 bg-zinc-900'} backdrop-blur-md`}>
        <div className={`relative w-2 h-2 rounded-full ${isConnected ? 'bg-accent-blue' : 'bg-zinc-500'}`}>
            {isConnected && <div className="absolute inset-0 rounded-full bg-accent-blue animate-ping opacity-75"></div>}
        </div>
        <span className="text-xs font-mono-tech tracking-wider text-zinc-300 uppercase">
          {isConnected ? (isSpeaking ? 'Transmitting Voice Data' : 'Awaiting Audio Input') : 'Handshake in progress...'}
        </span>
      </div>

      {/* Main Visualizer */}
      <div className="relative mb-12 group">
        {/* Scanning lines effect */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 z-10 rounded-full"></div>
        
        {/* Glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[80px] transition-all duration-1000 ${isSpeaking ? 'bg-accent-blue/20' : 'bg-transparent'}`}></div>
        
        <div className="relative z-20 border border-zinc-800 rounded-full p-8 bg-zinc-950/50 backdrop-blur-sm">
          <OrbVisualizer 
            isActive={isConnected} 
            isSpeaking={isSpeaking} 
            audioLevel={audioLevel} 
          />
        </div>
        
        {/* Decorative Orbit Rings */}
        <div className="absolute inset-0 border border-zinc-800 rounded-full scale-110 opacity-50"></div>
        <div className="absolute inset-0 border border-dashed border-zinc-800 rounded-full scale-125 opacity-30 animate-spin-slow"></div>
      </div>

      {/* Context Info */}
      <div className="mb-12 text-center space-y-2 z-20">
        <div className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono-tech text-zinc-500 mb-2">
          AGENT_ID: GEMINI_2.5_FLASH
        </div>
        <h3 className="text-xl font-bold text-white tracking-wide">BUSINESS_REPRESENTATIVE</h3>
        <a 
          href={businessUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 text-accent-blue hover:text-blue-400 transition-colors text-xs font-mono-tech uppercase tracking-wider"
        >
          <ExternalLink className="w-3 h-3" />
          {new URL(businessUrl).hostname}
        </a>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-8 z-20">
        <button 
          onClick={onClose}
          className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all duration-300"
          title="Terminate Connection"
        >
          <PhoneOff className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
          <div className="absolute -bottom-8 text-[10px] font-mono-tech text-red-500/70 opacity-0 group-hover:opacity-100 transition-opacity">DISCONNECT</div>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="absolute bottom-8 p-4 bg-red-900/20 border border-red-500/30 text-red-200 max-w-md text-center backdrop-blur-md">
          <p className="font-mono-tech text-xs uppercase mb-2 text-red-400">[ System Error ]</p>
          <p className="text-sm opacity-80">{error}</p>
          <button 
            onClick={() => { onClose(); }}
            className="mt-4 text-xs bg-red-500/20 hover:bg-red-500/30 px-4 py-2 border border-red-500/30 transition-colors font-mono-tech uppercase"
          >
            Reset System
          </button>
        </div>
      )}

    </div>
  );
};