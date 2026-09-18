import React, { useState } from 'react';
import { useOSStore } from '../../store/useOSStore';

export const HomeIndicator: React.FC = () => {
  const { activeApp, closeApp, toggleAppSwitcher, theme } = useOSStore();
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const isLight = theme === 'light' && !activeApp;

  return (
    <div
      className="absolute bottom-0 inset-x-0 h-7 z-50 flex items-center justify-center cursor-pointer pointer-events-auto"
      onClick={() => {
        if (activeApp) {
          closeApp();
        } else {
          toggleAppSwitcher();
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        toggleAppSwitcher();
      }}
      onTouchStart={(e) => setTouchStart(e.touches[0].clientY)}
      onTouchEnd={(e) => {
        if (touchStart !== null) {
          const touchEnd = e.changedTouches[0].clientY;
          const diff = touchStart - touchEnd;
          if (diff > 40) {
            // Swiped up
            if (diff > 90) {
              toggleAppSwitcher();
            } else {
              closeApp();
            }
          }
          setTouchStart(null);
        }
      }}
      title="Tap for Home • Right-click or swipe for App Switcher"
    >
      <div
        className={`w-32 h-1 rounded-full transition-all duration-200 ${
          isLight ? 'bg-zinc-800/80 hover:bg-zinc-900' : 'bg-white/70 hover:bg-white'
        }`}
      />
    </div>
  );
};
