
import React, { useState, useEffect } from 'react';
import { Camera, ArrowRight, ShieldCheck, User as UserIcon, Lock, AlertTriangle } from 'lucide-react';
import { User } from '../types';

interface LockScreenProps {
  onUnlock: (user: User) => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());
  const [username, setUsername] = useState('anhdayynek');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
    return date.toLocaleDateString('vi-VN', options).toUpperCase();
  };

  const handleLogin = () => {
    if (username.toLowerCase() === 'admin') {
      if (password === 'admin') {
        onUnlock({ username: 'Administrator', avatar: 'https://picsum.photos/seed/admin/100/100', isAdmin: true });
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    } else {
      // For SE version, only anhdayynek is allowed as student account
      if (username === 'anhdayynek' || username === 'admin') {
        onUnlock({ username: username, avatar: `https://picsum.photos/seed/${username}/100/100`, isAdmin: false });
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0f111a] to-[#2a1b3d] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
      
      {/* Clock */}
      <div className="text-center z-10 mb-12 animate-fade-in">
        <h1 className="text-[120px] font-light leading-none tracking-tighter text-white/95 drop-shadow-2xl">
          {time.getHours().toString().padStart(2, '0')}:{time.getMinutes().toString().padStart(2, '0')}
        </h1>
        <p className="text-xl font-medium tracking-[0.3em] text-blue-400 mt-2">
          {formatDate(time)}
        </p>
      </div>

      {/* User Info */}
      <div className="z-10 text-center space-y-6 animate-fade-in w-full max-w-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 rounded-full border-4 border-white/10 p-1 bg-black/40 overflow-hidden shadow-2xl ring-4 ring-blue-500/20">
             <img src={`https://picsum.photos/seed/${username}/120/120`} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-white">{username === 'admin' ? 'System Administrator' : username}</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[9px] text-blue-500 uppercase font-black tracking-[0.2em] bg-blue-500/10 px-2 py-0.5 rounded">SE Edition</span>
              <p className="text-[9px] text-slate-500 uppercase font-bold tracking-[0.2em]">Managed Account</p>
            </div>
          </div>
        </div>

        {/* Input Box */}
        <div className="space-y-3">
          <div className="relative group">
            <UserIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-center outline-none focus:bg-white/10 focus:border-blue-500/50 transition-all placeholder:text-white/20"
            />
          </div>
          
          <div className={`relative group transition-all duration-500 ${error ? 'animate-shake' : ''}`}>
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={username === 'admin' ? "Password (admin)" : "No password needed"}
              disabled={username !== 'admin'}
              className={`w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-center outline-none focus:bg-white/10 focus:border-blue-500/50 transition-all placeholder:text-white/20 ${error ? 'border-red-500/50 text-red-500' : ''}`}
            />
            <button 
              onClick={handleLogin}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg active:scale-95"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 flex flex-col items-center gap-2">
         <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] font-bold text-white/20 uppercase">
           <ShieldCheck size={14} />
           <span>AI Studio SE • Academic Monitoring Active</span>
         </div>
         {error && (
            <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
              <AlertTriangle size={12} />
              <span>Invalid Access Attempt</span>
            </div>
         )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 2; }
      `}</style>
    </div>
  );
};

export default LockScreen;
