import React, { useState, useEffect } from 'react';
import { Wifi } from 'lucide-react';
import { DynamicIsland } from './DynamicIsland';
import { useOSStore } from '../../store/useOSStore';

export const StatusBar: React.FC = () => {
  const {
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

  const level = batteryLevel ?? 83;

  return (
    <div className="iphone-status-bar relative z-40 w-full pt-2 px-6 flex items-center justify-between select-none text-white bg-transparent">
      <div
        onClick={() => toggleNotificationCenter()}
        className="w-20 flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
        title="Tap to open Notification Center"
      >
        <span className="text-[15px] font-semibold tracking-tight tabular-nums">{time}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" title="Location active" />
      </div>

      <DynamicIsland />

      <div
        onClick={toggleControlCenter}
        className="w-20 flex items-center justify-end gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
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
          <span className="text-[10px] font-semibold uppercase tracking-wider">SOS</span>
        )}

        {wifi && isOnline && <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />}

        <div className="flex items-center gap-0.5">
          <span className="text-[11px] font-semibold tracking-tight tabular-nums">{level}%</span>
          <div className="relative flex items-center">
            <div className={`w-5 h-2.5 rounded-[3px] border border-current p-[1px] flex items-center ${lowPowerMode ? 'bg-amber-500/20' : ''}`}>
              <div
                className={`h-full rounded-[1px] ${
                  lowPowerMode ? 'bg-amber-400' : isCharging ? 'bg-emerald-400' : 'bg-current'
                }`}
                style={{ width: `${Math.max(8, Math.min(100, level))}%` }}
              />
            </div>
            <div className="w-[2px] h-1 bg-current rounded-r-sm ml-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
