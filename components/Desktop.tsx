
import React, { useState } from 'react';
import { AppID, AppConfig, User } from '../types';
import { APPS } from '../constants';
import Taskbar from './Taskbar';
import AppWindow from './AppWindow';
import AppLauncher from './AppLauncher';
import ControlCenter from './ControlCenter';
import { Search } from 'lucide-react';

interface DesktopProps {
  user: User;
  activeApp: AppID | null;
  onOpenApp: (id: AppID) => void;
  onCloseApp: () => void;
  onLogout: () => void;
}

const Desktop: React.FC<DesktopProps> = ({ user, activeApp, onOpenApp, onCloseApp, onLogout }) => {
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);

  return (
    <div className="h-full w-full bg-[#050505] relative overflow-hidden flex flex-col">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Desktop Content */}
      <div className="flex-1 relative">
        {/* Search Trigger (Top) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-0 opacity-40 hover:opacity-100 transition-opacity">
           <div 
             onClick={() => setLauncherOpen(true)}
             className="w-[600px] h-14 glass rounded-3xl flex items-center px-6 gap-4 cursor-text shadow-2xl border-white/5"
           >
             <Search size={22} className="text-slate-400" />
             <span className="text-slate-500 font-medium text-lg">Quick Access System...</span>
           </div>
        </div>

        {/* Windows */}
        {activeApp && (
          <AppWindow 
            app={APPS.find(a => a.id === activeApp)!} 
            onClose={onCloseApp}
            user={user}
          />
        )}

        {/* Overlays */}
        {launcherOpen && (
          <AppLauncher 
            isOpen={launcherOpen} 
            user={user}
            onOpenApp={(id) => { onOpenApp(id); setLauncherOpen(false); }} 
            onClose={() => setLauncherOpen(false)} 
          />
        )}
        {controlCenterOpen && (
          <ControlCenter 
            user={user}
            onLogout={onLogout}
            onOpenSettings={() => { onOpenApp('settings'); setControlCenterOpen(false); }}
            onClose={() => setControlCenterOpen(false)} 
          />
        )}
      </div>

      {/* Taskbar */}
      <Taskbar 
        user={user}
        onLauncherToggle={() => setLauncherOpen(!launcherOpen)} 
        onControlToggle={() => setControlCenterOpen(!controlCenterOpen)}
        onOpenApp={onOpenApp}
        activeApp={activeApp}
      />
    </div>
  );
};

export default Desktop;
