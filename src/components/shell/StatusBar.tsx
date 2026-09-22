import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Sparkles } from 'lucide-react';
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
    isOnline,
    networkType
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
  const textColor = 'text-white';
  const level = batteryLevel ?? 83;

  return (
    <div className={`iphone-status-bar relative z-40 w-full pt-2 px-6 flex items-center justify-between select-none ${textColor} bg-transparent`}>
      <div
        onClick={() => toggleNotificationCenter()}
        className="w-20 flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
        title="Tap to open Notification Center"
      >
        <span className="text-[14px] font-semibold tracking-tight">{time}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-80" title="Location active" />
      </div>

      <DynamicIsland />

      <div
        onClick={toggleControlCenter}
        className="w-20 flex items-center justify-end gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
        title="Tap to open Control Center"
      >
        {!airplaneMode ? (
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-[2.5px] h-1 bg-current rounded-xs" />
            <span className="w-[2.5px] h-1.5 bg-current rounded-xs" />
            <span className="w-[2.5px] h-2 bg-current rounded-xs" />
            <span className="w-[2.5px] h-2.5 bg-current rounded-xs" />
          </div>
        ) : (
          <span className="text-[10px] font-semibold uppercase tracking-wider">SOS</span>
        )}

        {wifi && isOnline && <Wifi className="w-3.5 h-3.5" />}

        <div className="flex items-center gap-0.5">
          <span className="text-[11px] font-medium tracking-tighter">{level}%</span>
          <div className="relative flex items-center">
            <div className={`w-5 h-2.5 rounded-[3px] border border-current p-0.5 flex items-center ${lowPowerMode ? 'bg-amber-500/20' : ''}`}>
              <div
                className={`h-full rounded-[1.5px] ${
                  lowPowerMode ? 'bg-amber-400' : isCharging ? 'bg-emerald-400' : 'bg-current'
                }`}
                style={{ width: `${Math.max(8, Math.min(100, level))}%` }}
              />
            </div>
            <div className="w-0.5 h-1 bg-current rounded-r-xs ml-[0.5px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
