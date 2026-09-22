import React, { useState, useEffect } from 'react';
import { Wifi } from 'lucide-react';
import { DynamicIsland } from './DynamicIsland';
import { useOSStore } from '../../store/useOSStore';

export const StatusBar: React.FC = () => {
  const {
    theme,
    toggleControlCenter,
    toggleNotificationCenter,
    lowPowerMode,
    wifi,
    airplaneMode,
    batteryLevel,
    isCharging,
    isOnline
  } = useOSStore();
  const [time, setTime] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours % 12 || 12}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-zinc-950';
  const level = batteryLevel ?? 83;

  return (
    <div
      className={`relative z-40 w-full pt-2 pb-1 px-6 flex items-center justify-between select-none ${textColor} ${
        isDark
          ? 'bg-gradient-to-b from-black/35 to-transparent'
          : 'bg-gradient-to-b from-white/80 via-white/55 to-transparent backdrop-blur-[2px]'
      }`}
      style={{
        textShadow: isDark
          ? '0 1px 2px rgba(0,0,0,0.55)'
          : '0 1px 0 rgba(255,255,255,0.9)'
      }}
    >
      <div
        onClick={() => toggleNotificationCenter()}
        className="w-[4.6rem] flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
        title="Tap to open Notification Center"
      >
        <span className="text-[15px] font-bold tracking-tight tabular-nums">{time}</span>
        <span
          className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-300' : 'bg-cyan-600'}`}
          title="Location active"
        />
      </div>

      <DynamicIsland />

      <div
        onClick={toggleControlCenter}
        className="w-[4.6rem] flex items-center justify-end gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
        title="Tap to open Control Center"
      >
        {!airplaneMode ? (
          <div className="flex items-end gap-[1.5px] h-3" aria-label="Cellular signal">
            <span className="w-[2.5px] h-1 bg-current rounded-[0.5px]" />
            <span className="w-[2.5px] h-1.5 bg-current rounded-[0.5px]" />
            <span className="w-[2.5px] h-2 bg-current rounded-[0.5px]" />
            <span className="w-[2.5px] h-2.5 bg-current rounded-[0.5px]" />
          </div>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-wider">SOS</span>
        )}

        {wifi && isOnline && <Wifi className="w-3.5 h-3.5 stroke-[2.6]" />}

        <div className="flex items-center gap-0.5">
          <span className="text-[11px] font-bold tracking-tight tabular-nums">{level}%</span>
          <div className="relative flex items-center">
            <div
              className={`w-[22px] h-[11px] rounded-[3px] border-[1.5px] border-current p-[1.5px] flex items-center ${
                lowPowerMode ? 'bg-amber-500/15' : ''
              }`}
            >
              <div
                className={`h-full rounded-[1px] ${
                  lowPowerMode ? 'bg-amber-500' : isCharging ? 'bg-emerald-500' : 'bg-current'
                }`}
                style={{ width: `${Math.max(8, Math.min(100, level))}%` }}
              />
            </div>
            <div className="w-[2px] h-[5px] bg-current rounded-r-sm ml-[1px] opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
};
