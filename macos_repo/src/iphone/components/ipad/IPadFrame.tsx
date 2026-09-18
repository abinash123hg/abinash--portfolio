import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, PenTool, Sparkles } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { IPadStatusBar } from './IPadStatusBar';
import { IPadHomeScreen } from './IPadHomeScreen';
import { IPadDock } from './IPadDock';
import { IPadStageManager } from './IPadStageManager';
import { LockScreen } from '../shell/LockScreen';
import { ControlCenter } from '../shell/ControlCenter';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { Spotlight } from '../shell/Spotlight';
import { FolderModal } from '../shell/FolderModal';
import { WidgetGallery } from '../widgets/WidgetGallery';
import { HomeIndicator } from '../shell/HomeIndicator';
import { PullToRefresh } from '../ui/PullToRefresh';
import { getWallpaperById } from '../../data/wallpapers';
import { sound } from '../../utils/audioHaptics';

interface IPadFrameProps {
  children: React.ReactNode;
}

export const IPadFrame: React.FC<IPadFrameProps> = ({ children }) => {
  const {
    isLocked,
    toggleLock,
    theme,
    brightness,
    activeApp,
    wallpaperId,
    perspectiveZoom,
    showToast,
    toggleSpotlight
  } = useOSStore();

  const [isLandscape, setIsLandscape] = useState(true);
  const [isStageManager, setIsStageManager] = useState(true);
  const [pencilConnected, setPencilConnected] = useState(true);

  const isDark = theme === 'dark';
  const wallpaper = getWallpaperById(wallpaperId);

  const handleToggleOrientation = () => {
    sound.tap();
    setIsLandscape((prev) => !prev);
    showToast({
      id: `orient-${Date.now()}`,
      title: isLandscape ? 'Portrait Mode' : 'Landscape Mode',
      subtitle: 'iPad orientation adjusted',
      duration: 1800
    });
  };

  const handlePencilTap = () => {
    sound.pullThresholdTick();
    showToast({
      id: `pencil-${Date.now()}`,
      title: 'Apple Pencil Pro',
      subtitle: '100% • Double-tap & Squeeze Ready',
      duration: 2500
    });
  };

  return (
    <div className="relative h-[100dvh] min-h-0 w-full flex items-center justify-center p-0 sm:p-4 md:p-6 bg-neutral-950 font-sans antialiased overflow-hidden select-none">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-neutral-900 via-black to-black opacity-90 pointer-events-none" />

      {/* Floating Orientation Switcher & Pencil Dock Tool for iPad Pro */}
      <div className="hidden sm:flex absolute top-3 z-40 items-center gap-2">
        {/* Apple Pencil Magnetic Strip */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePencilTap}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/90 text-white border border-white/20 text-xs font-medium backdrop-blur-xl shadow-lg cursor-pointer"
          title="Apple Pencil Magnetically Attached"
        >
          <PenTool className="w-3.5 h-3.5 text-cyan-400" />
          <span>Apple Pencil Pro</span>
          <span className="text-[10px] text-emerald-400 font-mono ml-1">100%</span>
        </motion.button>

        {/* Orientation Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleOrientation}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/90 text-white border border-white/20 text-xs font-medium backdrop-blur-xl shadow-lg cursor-pointer"
          title="Toggle Portrait / Landscape"
        >
          <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
          <span>{isLandscape ? 'Switch to Portrait' : 'Switch to Landscape'}</span>
        </motion.button>
      </div>

      {/* iPad Pro Hardware Chassis */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          width: '100%',
          maxWidth: isLandscape ? '1024px' : '680px'
        }}
        className={`relative h-[100dvh] min-h-0 max-h-[100dvh] ${isLandscape ? 'sm:h-[690px]' : 'sm:h-[880px]'} sm:max-h-[96dvh] rounded-[36px] sm:rounded-[42px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 p-[4px] sm:p-[6px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.18)] flex flex-col overflow-hidden`}
      >
        {/* Physical Sleep Button */}
        <div
          onClick={() => toggleLock()}
          className="hidden sm:block absolute -top-[5px] right-24 w-12 h-[3px] bg-zinc-600 rounded-t-sm cursor-pointer hover:bg-zinc-500"
          title="Top Button (Sleep/Wake)"
        />

        {/* Physical Volume Buttons */}
        <div className="hidden sm:block absolute -right-[5px] top-20 w-[3px] h-10 bg-zinc-600 rounded-r-sm" title="Volume Up" />
        <div className="hidden sm:block absolute -right-[5px] top-34 w-[3px] h-10 bg-zinc-600 rounded-r-sm" title="Volume Down" />

        {/* Liquid Retina Display Container */}
        <div
          className={`relative flex-1 w-full h-full rounded-[30px] sm:rounded-[36px] overflow-hidden flex flex-col transition-colors duration-300 ${
            isDark ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-900'
          }`}
          style={{
            filter: `brightness(${brightness}%)`
          }}
        >
          {/* Dynamic iPad Wallpaper */}
          <div
            className={`absolute inset-0 pointer-events-none transition-all duration-700 ${wallpaper.className} ${
              perspectiveZoom ? 'scale-105' : 'scale-100'
            }`}
          />

          {/* iPadOS Status Bar */}
          <IPadStatusBar
            isStageManager={isStageManager}
            onToggleStageManager={() => setIsStageManager((prev) => !prev)}
          />

          {/* Main iPad View Area */}
          <div className="relative z-10 flex-1 w-full h-full overflow-hidden flex flex-col">
            {activeApp ? (
              <IPadStageManager
                isStageManager={isStageManager}
                onToggleStageManager={() => setIsStageManager((prev) => !prev)}
              >
                <PullToRefresh appName={activeApp}>
                  {children}
                </PullToRefresh>
              </IPadStageManager>
            ) : (
              <IPadHomeScreen />
            )}
          </div>

          {/* Persistent Floating iPad Dock */}
          <IPadDock onOpenAppLibrary={() => toggleSpotlight()} />

          {/* System Overlays */}
          {isLocked && <LockScreen />}
          <NotificationCenter />
          <ControlCenter />
          <Spotlight />
          <FolderModal />
          <WidgetGallery />

          {/* Home Bar Indicator */}
          <HomeIndicator />
        </div>
      </motion.div>
    </div>
  );
};
