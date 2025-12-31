
import React, { useState, useEffect } from 'react';
import { AppConfig, User } from '../types';
import { 
  X, Minus, Maximize2, Search, ArrowLeft, ShieldAlert, Video, Camera, 
  Wifi, Bluetooth, Info, Monitor, Cpu, HardDrive, GraduationCap,
  Users, Calendar, CheckSquare, BarChart2, Bell, Search as SearchIcon,
  RefreshCw, Lock
} from 'lucide-react';
import { FORBIDDEN_KEYWORDS } from '../constants';
import GeminiChat from './apps/GeminiChat';

interface AppWindowProps {
  app: AppConfig;
  user: User;
  onClose: () => void;
}

const AppWindow: React.FC<AppWindowProps> = ({ app, user, onClose }) => {
  const [url, setUrl] = useState('https://google.com');
  const [browserInput, setBrowserInput] = useState('');
  const [isBanned, setIsBanned] = useState(false);
  const [settingsTab, setSettingsTab] = useState('network');
  const [cameraBooting, setCameraBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);

  useEffect(() => {
    if (app.id === 'camera' && cameraBooting) {
      const interval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setCameraBooting(false), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [app.id, cameraBooting]);

  const handleBrowserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lowInput = browserInput.toLowerCase();
    const forbidden = FORBIDDEN_KEYWORDS.some(k => lowInput.includes(k));
    
    if (forbidden) {
      setIsBanned(true);
      setUrl('about:blank');
    } else {
      setIsBanned(false);
      setUrl(browserInput.startsWith('http') ? browserInput : `https://${browserInput}`);
    }
  };

  const renderAppContent = () => {
    switch (app.id) {
      case 'camera':
        return (
          <div className="flex-1 bg-black flex flex-col items-center justify-center relative">
            {cameraBooting ? (
              <div className="flex flex-col items-center gap-6 animate-fade-in">
                <div className="relative">
                   <div className="w-24 h-24 border-4 border-blue-500/20 rounded-full animate-spin border-t-blue-500"></div>
                   <Camera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500" size={32} />
                </div>
                <div className="text-center">
                  <p className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Camera System Initialization</p>
                  <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${bootProgress}%` }}></div>
                  </div>
                  <p className="text-white/40 text-[9px] mt-4 font-mono">Calibrating Optical Sensors... {bootProgress}%</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative group">
                {/* Simulated Viewfinder */}
                <div className="absolute inset-0 border-[20px] border-black/40 pointer-events-none z-10"></div>
                <div className="absolute top-10 left-10 flex flex-col gap-1 text-white/60 font-mono text-[10px] z-10 uppercase tracking-widest">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> REC 00:00:12</div>
                  <div>1080p | 60FPS</div>
                  <div>SE-CALIB: OK</div>
                </div>
                
                <div className="w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden">
                   <img src="https://picsum.photos/seed/camera/1200/800" className="w-full h-full object-cover opacity-60 scale-105" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 border border-white/20 rounded-full"></div>
                      <div className="absolute w-px h-10 bg-white/20"></div>
                      <div className="absolute w-10 h-px bg-white/20"></div>
                   </div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 z-10">
                   <button className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white backdrop-blur-md"><RefreshCw size={24} /></button>
                   <button className="w-20 h-20 bg-white border-8 border-white/20 rounded-full shadow-2xl active:scale-90 transition-all"></button>
                   <button className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white backdrop-blur-md"><Video size={24} /></button>
                </div>
              </div>
            )}
          </div>
        );

      case 'settings':
        return (
          <div className="flex-1 flex bg-white/2 h-full text-white/90">
             {/* Sidebar */}
             <div className="w-64 border-r border-white/5 p-6 space-y-2">
                <div className="flex items-center gap-2 mb-6 px-4">
                  <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded font-black">SE</span>
                  <h3 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em]">Management</h3>
                </div>
                {[
                  { id: 'network', label: 'Network', icon: <Wifi size={18} /> },
                  { id: 'bluetooth', label: 'Bluetooth', icon: <Bluetooth size={18} /> },
                  { id: 'system', label: 'About System', icon: <Info size={18} /> },
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setSettingsTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${settingsTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white/5 text-white/60'}`}
                  >
                    {tab.icon}
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
                
                <div className="mt-auto pt-10 px-4">
                   <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl">
                      <Lock size={16} className="text-amber-500 mb-2" />
                      <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Limited Features</p>
                      <p className="text-[9px] text-white/40 mt-1">Full OS settings are restricted in the SE version.</p>
                   </div>
                </div>
             </div>
             {/* Main Content */}
             <div className="flex-1 p-10 overflow-y-auto">
                {settingsTab === 'network' && (
                  <div className="max-w-2xl space-y-8 animate-fade-in">
                    <div className="flex items-center justify-between">
                       <h2 className="text-2xl font-bold">Network Connectivity</h2>
                       <div className="flex items-center gap-3 text-emerald-500 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-bold uppercase tracking-widest">Connected</span>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Available Networks</p>
                       {[
                         { name: 'Studio_5G', secure: true, connected: true, signal: 4 },
                         { name: 'University_WIFI', secure: true, signal: 3 },
                       ].map(net => (
                         <div key={net.name} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer group">
                           <div className="flex items-center gap-4">
                             <div className={`p-3 rounded-xl ${net.connected ? 'bg-blue-600' : 'bg-white/10'}`}>
                               <Wifi size={20} />
                             </div>
                             <div>
                               <p className="font-bold">{net.name}</p>
                               <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Encrypted Connection</p>
                             </div>
                           </div>
                           {net.connected && <span className="text-xs font-bold text-blue-400">Primary</span>}
                         </div>
                       ))}
                    </div>
                  </div>
                )}
                {settingsTab === 'system' && (
                  <div className="max-w-2xl space-y-8 animate-fade-in">
                    <h2 className="text-2xl font-bold">System Specification</h2>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-white/5 border border-white/5 p-6 rounded-[32px] flex flex-col gap-4">
                          <Monitor size={24} className="text-blue-400" />
                          <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-white/30">Edition</p>
                            <p className="text-xl font-bold">Google AI Studio SE</p>
                            <p className="text-xs text-blue-400 font-bold uppercase">Special Education v2.5</p>
                          </div>
                       </div>
                       <div className="bg-white/5 border border-white/5 p-6 rounded-[32px] flex flex-col gap-4">
                          <Cpu size={24} className="text-purple-400" />
                          <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-white/30">Managed by</p>
                            <p className="text-xl font-bold">Academic Cloud</p>
                            <p className="text-xs text-white/40">Enterprise MDM Active</p>
                          </div>
                       </div>
                    </div>
                  </div>
                )}
             </div>
          </div>
        );

      case 'browser':
        return (
          <div className="flex-1 flex flex-col bg-white text-black overflow-hidden h-full">
            <div className="h-14 bg-slate-100 border-b flex items-center px-4 gap-4">
              <div className="flex gap-2">
                <button className="p-1.5 hover:bg-slate-200 rounded-full"><ArrowLeft size={16} /></button>
              </div>
              <form onSubmit={handleBrowserSubmit} className="flex-1">
                <div className="relative">
                  <input 
                    className="w-full h-9 bg-white border rounded-full px-10 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Search or enter URL"
                    value={browserInput}
                    onChange={(e) => setBrowserInput(e.target.value)}
                  />
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </form>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-full">
                 <ShieldAlert size={12} />
                 <span className="text-[10px] font-black uppercase tracking-tighter">Safe Search On</span>
              </div>
            </div>
            <div className="flex-1 relative">
              {isBanned ? (
                <div className="absolute inset-0 bg-red-600 text-white flex flex-col items-center justify-center p-10 text-center">
                  <ShieldAlert size={80} className="mb-6 animate-bounce" />
                  <h2 className="text-4xl font-black uppercase mb-4 tracking-tighter">Access Denied!</h2>
                  <p className="text-xl opacity-90 max-w-md">The URL you requested contains content strictly prohibited by Google AI Studio Student Safety Protocols.</p>
                  <button 
                    onClick={() => { setIsBanned(false); setBrowserInput('google.com'); }}
                    className="mt-8 bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors"
                  >
                    Return to Safe Web
                  </button>
                </div>
              ) : (
                <div className="h-full w-full bg-slate-50 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 mb-4">
                     <svg viewBox="0 0 24 24" className="w-full h-full fill-blue-500"><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10,10-4.48,10-10S17.52,2,12,2Zm-1,17.93c-3.95-.49-7-3.85-7-7.93,0-.62,.08-1.21,.21-1.79l4.79,4.79v1c0,1.1,.9,2,2,2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55,0,1-.45,1-1v-2h2c1.1,0,2-.9,2-2v-.41c2.93,1.19,5,4.06,5,7.41,0,2.08-.8,3.97-2.1,5.39Z"/></svg>
                  </div>
                  <h3 className="text-slate-400 font-medium">Viewing: {url}</h3>
                  <p className="text-slate-300 text-sm mt-2 font-bold uppercase tracking-widest text-[10px]">SE Safety Protocols Active</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'gemini':
        return <GeminiChat />;
      case 'meet':
        return (
          <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-10">
            <div className="w-[600px] h-[400px] bg-black rounded-3xl relative overflow-hidden flex items-center justify-center">
               <div className="text-white text-center opacity-40">
                  <Video size={80} className="mx-auto mb-4" />
                  <p className="text-xl">Camera feed starting...</p>
               </div>
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center"><X size={20} /></div>
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center"><Camera size={20} /></div>
               </div>
            </div>
            <h2 className="text-2xl font-bold mt-10">Math Study Group 102</h2>
            <p className="text-slate-400 mt-2">3 participants joined</p>
          </div>
        );
      case 'word':
      case 'excel':
      case 'ppt':
      case 'onenote':
        return (
           <div className="flex-1 bg-white text-black flex flex-col h-full">
              <div className={`h-12 ${app.color} flex items-center px-6 text-white font-bold gap-3`}>
                 {app.icon} {app.name} Student Edition
              </div>
              <div className="flex-1 p-10 bg-slate-50 overflow-y-auto">
                 <div className="max-w-4xl mx-auto bg-white shadow-xl h-[1000px] p-20 border">
                    <h1 className="text-3xl font-bold mb-6">Homework Assignment #1</h1>
                    <div className="space-y-4">
                       {[...Array(20)].map((_,i) => (
                         <div key={i} className="h-4 bg-slate-100 rounded w-full"></div>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="h-10 bg-slate-100 border-t flex items-center px-4 justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                 <span>Page 1 of 1</span>
                 <div className="flex gap-4">
                    <span>English (US)</span>
                    <span className="text-emerald-600">Sync Completed</span>
                 </div>
              </div>
           </div>
        );
      default:
        return (
          <div className="flex-1 flex items-center justify-center p-10 text-center opacity-30">
             <div>
               <div className="mb-4 inline-block p-10 bg-white/5 rounded-full">
                 {React.cloneElement(app.icon as React.ReactElement, { size: 100 })}
               </div>
               <h2 className="text-4xl font-black uppercase tracking-widest">{app.name}</h2>
               <p className="mt-4 text-xl font-medium tracking-tight">Application module in development.</p>
             </div>
          </div>
        );
    }
  };

  return (
    <div 
      className="absolute inset-4 z-10 glass-dark border border-white/10 rounded-[32px] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Window Header */}
      <div className="h-14 flex items-center justify-between px-6 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-4">
           <div className={`${app.color} p-2 rounded-lg text-white shadow-lg`}>
              {React.cloneElement(app.icon as React.ReactElement, { size: 16 })}
           </div>
           <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">{app.name}</span>
              <span className="text-[8px] text-white/30 font-black uppercase tracking-widest">Special Education Edition</span>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50"><Minus size={16} /></button>
           <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50"><Maximize2 size={16} /></button>
           <button 
             onClick={onClose}
             className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all ml-2"
           >
             <X size={16} />
           </button>
        </div>
      </div>

      {/* App Body */}
      <div className="flex-1 flex overflow-hidden">
         {renderAppContent()}
      </div>
    </div>
  );
};

export default AppWindow;
