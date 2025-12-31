
import React, { useState, useEffect } from 'react';
import { OSState, AppID, User } from './types';
import BootScreen from './components/BootScreen';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';

const App: React.FC = () => {
  const [state, setState] = useState<OSState>(OSState.BOOTING);
  const [activeApp, setActiveApp] = useState<AppID | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(OSState.LOCK_SCREEN);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setState(OSState.DESKTOP);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white selection:bg-blue-500/30">
      {state === OSState.BOOTING && <BootScreen />}
      {state === OSState.LOCK_SCREEN && <LockScreen onUnlock={handleLogin} />}
      {state === OSState.DESKTOP && currentUser && (
        <Desktop 
          user={currentUser}
          activeApp={activeApp} 
          onOpenApp={setActiveApp} 
          onCloseApp={() => setActiveApp(null)} 
          onLogout={() => {
            setState(OSState.LOCK_SCREEN);
            setCurrentUser(null);
            setActiveApp(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
