
import React, { useState } from 'react';
import { 
  Wifi, 
  Bluetooth, 
  Moon, 
  Maximize, 
  Tablet, 
  Accessibility, 
  Cloud, 
  LogOut, 
  Settings,
  Volume2,
  Sun,
  Battery,
  Camera,
  ShieldAlert
} from 'lucide-react';
import { User } from '../types';

interface ControlCenterProps {
  user: User;
  onLogout: () => void;
  onOpenSettings: () => void;
  onClose: () => void;
}

const ControlCenter: React.FC<ControlCenterProps> = ({ user, onLogout, onOpenSettings, onClose }) => {
  const [vol, setVol] = useState(65);
  const [bright, setBright] = useState(80);

  return (
    <div 
      className="absolute right-4 bottom-20 z-50 animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-[380px] glass-dark rounded-[32px] p-6 border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white ring-2 ring-white/10">
               <img src={user.avatar} className="rounded-full w-full h-full object-cover" />
             </div>
             <div>
               <h3 className="font-bold text-sm tracking-tight">{user.username}</h3>
               <div className="flex items-center gap-2">
                 <span className="text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-black">SE</span>
                 <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{user.isAdmin ? 'Full System Admin' : 'Academic Profile'}</p>
               </div>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onLogout}
              className="p-2.5 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-all text-white/70"
            >
              <LogOut size={16} />
            </button>
            <button 
              onClick={onOpenSettings}
              className="p-2.5 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>

        {/* Quick Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div onClick={onOpenSettings} className="bg-blue-600 p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-blue-500 transition-colors">
            <div className="bg-white/20 p-2 rounded-lg"><Wifi size={20} /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-70">Network</p>
              <p className="text-sm font-medium">Studio_5G</p>
            </div>
          </div>
          <div onClick={onOpenSettings} className="bg-blue-600 p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-blue-500 transition-colors">
            <div className="bg-white/20 p-2 rounded-lg"><Bluetooth size={20} /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-70">Bluetooth</p>
              <p className="text-sm font-medium">Enabled</p>
            </div>
          </div>
        </div>

        {/* Camera and Restriction Status */}
        <div className="grid grid-cols-2 gap-3 mb-6">
           <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-4">
              <Camera size={20} className="text-emerald-500" />
              <div>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Camera</p>
                <p className="text-xs font-bold">Standby</p>
              </div>
           </div>
           <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-center gap-4">
              <ShieldAlert size={20} className="text-amber-500" />
              <div>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Filter</p>
                <p className="text-xs font-bold">Strict SE</p>
              </div>
           </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <Volume2 size={18} className="text-white/40" />
            <input 
              type="range" 
              className="flex-1 accent-blue-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer" 
              value={vol}
              onChange={(e) => setVol(parseInt(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <Sun size={18} className="text-white/40" />
            <input 
              type="range" 
              className="flex-1 accent-blue-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer" 
              value={bright}
              onChange={(e) => setBright(parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
          <div className="flex items-center gap-2">
            <Battery size={14} className="text-emerald-500" />
            <span>Battery 99%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>SE Kernel V3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;
