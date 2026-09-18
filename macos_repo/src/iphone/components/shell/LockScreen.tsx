import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flashlight, Camera, Lock, Unlock, CheckCircle2, ChevronUp, Sun, BatteryCharging, Calendar as CalendarIcon } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { useOSStore } from '../../store/useOSStore';
import { getWallpaperById } from '../../data/wallpapers';
import { AppIconGlyph } from '../ui/AppIconGlyph';

export const LockScreen: React.FC = () => {
  const { toggleLock, openApp, lockWallpaperId, notifications, theme } = useOSStore();
  const [isFaceIdScanning, setIsFaceIdScanning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  const lockWallpaper = getWallpaperById(lockWallpaperId);

  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  const monthDay = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours % 12 || 12}:${minutes}`;

  const handleUnlock = (targetApp?: any) => {
    setIsFaceIdScanning(true);
    setTimeout(() => {
      toggleLock(false);
      setIsFaceIdScanning(false);
      if (targetApp) {
        openApp(targetApp);
      }
    }, 380);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -400, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } }}
      className={`absolute inset-0 z-40 flex flex-col justify-between p-6 pt-14 pb-8 ${lockWallpaper.className} ${theme === 'light' ? 'ios-lock-light text-zinc-900' : 'text-white'} select-none overflow-hidden`}
    >
      {/* Background Ambient Tint */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] pointer-events-none" />

      {/* Top Header: Lock Icon & FaceID Indicator */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-1 h-7 flex items-center justify-center">
          {isFaceIdScanning ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-full shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Face ID Verified</span>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.1 }}
              onClick={() => handleUnlock()}
              className="cursor-pointer text-zinc-300 hover:text-white transition-colors"
            >
              <Lock className="w-4 h-4" />
            </motion.div>
          )}
        </div>

        <div className="text-xs font-semibold tracking-wide text-zinc-200 drop-shadow-md uppercase">
          {dayName}, {monthDay}
        </div>
        <div className="text-7xl font-light tracking-tight text-white drop-shadow-lg font-sans my-0.5">
          {timeString}
        </div>

        {/* iOS 18 Lock Screen Compact Widgets Bar */}
        <div className="flex items-center gap-3 my-2">
          {/* Weather lock pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 text-xs text-white">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">29°</span>
            <span className="text-[10px] text-zinc-300">Bhubaneswar</span>
          </div>

          {/* Battery lock pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 text-xs text-white">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">98%</span>
          </div>

          {/* Calendar lock pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 text-xs text-white">
            <CalendarIcon className="w-3.5 h-3.5 text-rose-400" />
            <span className="font-semibold">AI Review</span>
          </div>
        </div>

        {/* Lock Screen Interactive Notifications Stack */}
        <div className="mt-3 w-full max-w-[340px] space-y-2 max-h-56 overflow-y-auto no-scrollbar">
          {notifications.slice(0, 3).map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={() => handleUnlock(notif.appId)}
              className="p-3 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/15 flex items-center gap-3 cursor-pointer hover:bg-zinc-800/90 transition-all shadow-xl active:scale-98"
            >
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${notif.gradient} flex items-center justify-center shrink-0 text-white shadow-xs`}>
                <AppIconGlyph name={notif.iconName} className="w-4 h-4" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">{notif.appName}</span>
                  <span className="text-[10px] text-zinc-400 font-mono">{notif.time}</span>
                </div>
                <p className="text-[11px] font-semibold text-zinc-200 truncate">{notif.title}</p>
                <p className="text-[10px] text-zinc-400 truncate">{notif.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Area: Flashlight, Unlock Prompt, Camera */}
      <div className="relative z-10 w-full flex flex-col items-center gap-4">
        <motion.button
          onClick={() => handleUnlock()}
          className="flex flex-col items-center gap-1 text-xs font-medium text-zinc-200 hover:text-white transition-colors group cursor-pointer drop-shadow-md"
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          <span>Swipe or Tap to Unlock</span>
        </motion.button>

        <div className="w-full flex items-center justify-between px-2">
          {/* Torch button */}
          <button
            onClick={() => setTorchOn(!torchOn)}
            className={`w-12 h-12 rounded-full backdrop-blur-xl flex items-center justify-center transition-all ${
              torchOn
                ? 'bg-white text-zinc-900 shadow-[0_0_20px_rgba(255,255,255,0.8)]'
                : 'bg-black/50 text-white hover:bg-black/70 border border-white/20 shadow-lg'
            }`}
            title="Toggle Flashlight"
          >
            <Flashlight className="w-5 h-5" />
          </button>

          {/* Home indicator mini touch */}
          <div
            onClick={() => handleUnlock()}
            className="w-32 h-1.5 rounded-full bg-white/60 hover:bg-white transition-colors cursor-pointer shadow-sm"
          />

          {/* Camera button */}
          <button
            onClick={() => handleUnlock('camera')}
            className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-xl border border-white/20 shadow-lg flex items-center justify-center transition-all"
            title="Open Camera"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
