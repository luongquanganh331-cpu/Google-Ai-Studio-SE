
import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

const BootScreen: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-black animate-fade-in">
      <div className="mb-8 relative">
        <Sparkles className="text-blue-400 w-20 h-20 animate-pulse" />
        <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full"></div>
      </div>
      <h1 className="text-4xl font-light tracking-tight flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-blue-400">Google AI Studio</span>
          <span className="text-slate-400 font-bold">SE</span>
        </div>
        <span className="text-[10px] text-blue-500/50 uppercase tracking-[0.4em] mt-2 font-bold">Special Education Edition</span>
      </h1>
      
      <div className="mt-24 w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>

      <div className="mt-8 flex items-center gap-2 text-white/20">
        <ShieldCheck size={14} />
        <span className="text-[9px] uppercase tracking-widest font-bold">Safety Protocols Loading...</span>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 50%; transform: translateX(50%); }
          100% { width: 0%; transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default BootScreen;
