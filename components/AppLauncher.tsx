
import React, { useState } from 'react';
import { Search, History, Sparkles, FileText, Presentation } from 'lucide-react';
import { APPS } from '../constants';
import { AppID, User } from '../types';

interface AppLauncherProps {
  isOpen: boolean;
  user: User;
  onOpenApp: (id: AppID) => void;
  onClose: () => void;
}

const AppLauncher: React.FC<AppLauncherProps> = ({ user, onOpenApp, onClose }) => {
  const [query, setQuery] = useState('');

  const filteredApps = APPS.filter(app => {
    const matchesQuery = app.name.toLowerCase().includes(query.toLowerCase());
    const isAllowed = !app.adminOnly || user.isAdmin;
    return matchesQuery && isAllowed;
  });

  return (
    <div 
      className="absolute inset-0 z-40 bg-black/40 backdrop-blur-xl flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-[700px] h-[600px] glass-dark rounded-[40px] shadow-2xl overflow-hidden flex flex-col p-10 border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="relative mb-10">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={22} />
          </div>
          <input 
            autoFocus
            type="text"
            placeholder="Search your apps, files, and more..."
            className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 text-xl outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Continue Section */}
        {!query && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <History size={14} /> Continue where you left off
              </h3>
              <button className="text-xs font-medium text-blue-400 hover:underline">Show all</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Gemini-Setup.dmg', size: '10.2 MB', icon: <Sparkles size={20} className="text-purple-400" /> },
                { name: 'Semester-Project.docx', size: '42 KB', icon: <FileText size={20} className="text-blue-400" /> },
                { name: 'Presentation.pptx', size: '2.4 MB', icon: <Presentation size={20} className="text-orange-400" /> },
              ].map((file, i) => (
                <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="bg-white/5 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    {file.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-[10px] text-slate-500">{file.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grid Section */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-5 gap-y-10">
            {filteredApps.map((app) => (
              <button
                key={app.id}
                onClick={() => onOpenApp(app.id)}
                className="flex flex-col items-center gap-3 group transition-transform hover:scale-105"
              >
                <div className={`${app.color} p-5 rounded-3xl text-white shadow-xl shadow-black/20 group-hover:shadow-2xl transition-all duration-300`}>
                   {React.cloneElement(app.icon as React.ReactElement, { size: 32 })}
                </div>
                <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLauncher;
