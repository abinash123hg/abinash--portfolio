import React, { useState, useEffect } from 'react';
import { Wifi, Battery, LayoutGrid, AppWindow } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { sound } from '../../utils/audioHaptics';

interface IPadStatusBarProps {
  isStageManager: boolean;
  onToggleStageManager: () => void;
}

export const IPadStatusBar: React.FC<IPadStatusBarProps> = ({
  isStageManager,
  onToggleStageManager
}) => {
  const { toggleControlCenter, theme, batteryLevel, isCharging, isOnline, networkType } = useOSStore();
  const isDark = theme === 'dark';

  const [timeStr, setTimeStr] = useState('9:41 AM');
  const [dateStr, setDateStr] = useState('Tue Sep 18');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative z-30 w-full h-8 px-5 flex items-center justify-between text-xs select-none font-medium ${isDark ? 'text-white/90' : 'text-zinc-900/90'}`}>
      {/* Left: Date & Time */}
      <div className="flex items-center gap-2 text-[12px] tracking-tight font-semibold">
        <span>{dateStr}</span>
        <span className={isDark ? 'text-white/60' : 'text-zinc-500'}>•</span>
        <span>{timeStr}</span>
      </div>

      {/* Center: Center Stage Camera Lens */}
      <div className="flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-black/80 border border-zinc-700/60 flex items-center justify-center shadow-inner">
          <div className="w-1 h-1 rounded-full bg-blue-950/80" />
        </div>
      </div>

      {/* Right: Stage Manager, Connectivity & Battery */}
      <div className="flex items-center gap-3">
        {/* Stage Manager Quick Switcher */}
        <button
          onClick={() => {
            sound.tap();
            onToggleStageManager();
          }}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
            isStageManager
              ? 'bg-blue-500 text-white shadow-xs'
              : isDark ? 'bg-white/10 hover:bg-white/20 text-white/70' : 'bg-black/10 hover:bg-black/15 text-zinc-700'
          }`}
          title={isStageManager ? 'Stage Manager Enabled' : 'Enable Stage Manager'}
        >
          <AppWindow className="w-3 h-3" />
          <span className="hidden sm:inline">Stage Manager</span>
        </button>

        {/* Wi-Fi */}
        {isOnline && <Wifi className={`w-3.5 h-3.5 ${isDark ? 'text-white/90' : 'text-zinc-800/90'}`} aria-label={networkType || 'Online'} />}

        {/* Control Center Trigger */}
        <button
          onClick={() => {
            sound.tap();
            toggleControlCenter();
          }}
          className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
          title="Open Control Center"
        >
          <span className="text-[11px] font-semibold font-mono">{batteryLevel === null ? '94' : batteryLevel}%</span>
          <Battery className={`w-4 h-4 ${isCharging ? 'text-emerald-400 fill-emerald-400/30' : 'text-emerald-400'}`} />
        </button>
      </div>
    </div>
  );
};
