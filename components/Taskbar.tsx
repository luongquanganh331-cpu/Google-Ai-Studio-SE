
import React, { useState, useEffect } from 'react';
import { LayoutGrid, Battery, Wifi, Volume2, Monitor } from 'lucide-react';
import { APPS } from '../constants';
import { AppID, User } from '../types';

interface TaskbarProps {
  user: User;
  onLauncherToggle: () => void;
  onControlToggle: () => void;
  onOpenApp: (id: AppID) => void;
  activeApp: AppID | null;
}

const Taskbar: React.FC<TaskbarProps> = ({ user, onLauncherToggle, onControlToggle, onOpenApp, activeApp }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Show normal apps plus School Manager if admin
  const dockApps = APPS.filter(app => !app.adminOnly || user.isAdmin).slice(0, 10);

  return (
    <div className="h-16 w-full glass-dark border-t border-white/5 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-2">
        <button 
          onClick={onLauncherToggle}
          className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
        >
          <LayoutGrid size={22} />
        </button>
      </div>

      <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
        {dockApps.map((app) => (
          <button
            key={app.id}
            onClick={() => onOpenApp(app.id)}
            className={`p-2.5 rounded-xl transition-all duration-300 relative group ${
              activeApp === app.id ? 'bg-white/20 scale-110 shadow-lg' : 'hover:bg-white/10 hover:-translate-y-1'
            }`}
            title={app.name}
          >
            <div className={`${app.color} p-1.5 rounded-lg text-white shadow-sm`}>
              {React.cloneElement(app.icon as React.ReactElement, { size: 18 })}
            </div>
            {activeApp === app.id && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
            )}
          </button>
        ))}
      </div>

      <div 
        onClick={onControlToggle}
        className="flex items-center gap-4 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5 cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-3 text-white/50">
          <Wifi size={16} />
          <Volume2 size={16} />
          <Battery size={16} />
        </div>
        <div className="w-px h-4 bg-white/10"></div>
        <div className="text-sm font-medium tracking-tight">
          {time.getHours().toString().padStart(2, '0')}:{time.getMinutes().toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
