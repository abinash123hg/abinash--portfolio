import React, { useState, useEffect } from 'react';
import { Wifi } from 'lucide-react';
import { DynamicIsland } from './DynamicIsland';
import { useOSStore } from '../../store/useOSStore';
import { getWallpaperById } from '../../data/wallpapers';

export const StatusBar: React.FC = () => {
  const {
    toggleControlCenter,
    toggleNotificationCenter,
    lowPowerMode,
    wifi,
    airplaneMode,
    batteryLevel,
    isCharging,
    isOnline,
    theme,
    activeApp,
    wallpaperId
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

  // In light theme the status bar text follows the surface behind it:
  // an open app paints its own (light) background up to the top edge,
  // so the clock flips dark there; on Home/Lock the wallpaper shows
  // through and white text (matching the wallpaper's textColor) is kept.
  const isDark = theme === 'dark';
  const wallpaper = getWallpaperById(wallpaperId);
  const darkTextInLightTheme = !isDark && (activeApp ? true : wallpaper.textColor === 'dark');

  return (
    <div
      className={`iphone-status-bar absolute top-0 left-0 right-0 z-[120] w-full pt-[max(0.5rem,env(safe-area-inset-top))] pb-1 px-5 flex items-center justify-between select-none text-white bg-transparent ${
        darkTextInLightTheme ? 'ios-statusbar-on-light' : ''
      }`}
      style={{ pointerEvents: 'none' }}
    >
      {/* Notification Center — time (left) */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleNotificationCenter();
        }}
        className="relative z-[121] min-w-[64px] min-h-[44px] pl-1 pr-1 flex items-center gap-1.5 cursor-pointer active:opacity-70 transition-opacity bg-transparent border-0 p-0 text-inherit touch-manipulation"
        style={{ pointerEvents: 'auto' }}
        title="Tap to open Notification Center"
        aria-label="Open Notification Center"
        data-status-hit="notification"
      >
        <span className="text-[15px] font-semibold tracking-tight tabular-nums">{time}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" title="Location active" />
      </button>

      <div className="relative z-[121] pointer-events-auto">
        <DynamicIsland />
      </div>

      {/* Control Center — signal / wifi / battery (right) */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleControlCenter();
        }}
        className="relative z-[121] min-w-[64px] min-h-[44px] pl-1 pr-1 flex items-center justify-end gap-1.5 cursor-pointer active:opacity-70 transition-opacity bg-transparent border-0 p-0 text-inherit touch-manipulation"
        style={{ pointerEvents: 'auto' }}
        title="Tap to open Control Center"
        aria-label="Open Control Center"
        data-status-hit="control"
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
      </button>
    </div>
  );
};
