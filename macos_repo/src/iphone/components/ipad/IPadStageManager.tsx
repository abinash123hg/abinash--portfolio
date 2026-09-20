import React from 'react';
import { motion } from 'motion/react';
import { Minus, Maximize2, X, MoreHorizontal, RotateCw } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { APPS_REGISTRY } from '../../data/appsRegistry';
import { AppIconGlyph } from '../ui/AppIconGlyph';
import { sound } from '../../utils/audioHaptics';

interface IPadStageManagerProps {
  children: React.ReactNode;
  isStageManager: boolean;
  onToggleStageManager: () => void;
}

export const IPadStageManager: React.FC<IPadStageManagerProps> = ({
  children,
  isStageManager,
  onToggleStageManager
}) => {
  const { activeApp, openApp, closeApp } = useOSStore();

  const activeAppMeta = APPS_REGISTRY.find((a) => a.id === activeApp);
  const appTitle = activeAppMeta?.name || 'App';

  // Recent apps to display in Stage Manager side rail (excluding current active)
  const backgroundApps = ['projects', 'cv', 'skills', 'videos', 'notes']
    .filter((id) => id !== activeApp)
    .slice(0, 4)
    .map((id) => APPS_REGISTRY.find((a) => a.id === id))
    .filter(Boolean);

  if (!isStageManager) {
    // Standard iPad full-screen app container with multitasking header
    return (
      <div className="relative w-full h-full flex flex-col overflow-hidden bg-black">
        {/* Multitasking 3-dots Pill */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center">
          <button
            onClick={() => {
              sound.tap();
              onToggleStageManager();
            }}
            className="px-2.5 py-0.5 rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white backdrop-blur-md border border-white/10 flex items-center gap-1 text-[10px] cursor-pointer transition-all shadow-xs"
            title="Toggle Stage Manager"
          >
            <div className="w-1 h-1 rounded-full bg-white/80" />
            <div className="w-1 h-1 rounded-full bg-white/80" />
            <div className="w-1 h-1 rounded-full bg-white/80" />
          </button>
        </div>

        {/* App Content */}
        <div className="flex-1 min-h-0 w-full overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  // Stage Manager mode
  return (
    <div className="relative w-full h-full flex items-center p-3 sm:p-5 gap-3 sm:gap-4 overflow-hidden select-none">
      {/* Stage Manager Left Side Rail (Recent App Thumbnails) */}
      <div className="hidden sm:flex flex-col gap-3 py-2 z-20 shrink-0">
        {backgroundApps.map((app) => {
          if (!app) return null;
          return (
            <motion.button
              key={app.id}
              whileHover={{ scale: 1.08, x: 4 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                sound.tap();
                openApp(app.id);
              }}
              className="relative w-16 h-20 rounded-[14px] bg-zinc-900/85 backdrop-blur-xl border border-white/15 p-1.5 flex flex-col items-center justify-between shadow-lg cursor-pointer group"
              title={`Switch to ${app.name}`}
            >
              <div className="w-full flex justify-start">
                <div className="w-5 h-5 rounded-[5px] overflow-hidden">
                  <AppIconGlyph name={app.iconName} className="w-5 h-5" />
                </div>
              </div>
              <div className="text-[9px] font-medium text-white/80 truncate w-full text-center group-hover:text-cyan-300">
                {app.name}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Main Active Window in Stage Manager */}
      <motion.div
        layout
        initial={{ scale: 0.92, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 16 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="flex-1 h-full max-h-full rounded-[22px] overflow-hidden bg-black/90 dark:bg-zinc-950/95 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col relative z-10"
      >
        {/* Stage Manager Window Header Bar */}
        <div className="h-9 px-3 bg-zinc-900/80 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between select-none shrink-0">
          {/* Left: Window Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.tap();
                closeApp();
              }}
              className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center text-[7px] text-black/60 font-bold cursor-pointer"
              title="Close App"
            >
              ×
            </button>
            <button
              onClick={() => {
                sound.tap();
                closeApp();
              }}
              className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center text-[7px] text-black/60 font-bold cursor-pointer"
              title="Minimize to Dock"
            >
              −
            </button>
            <button
              onClick={() => {
                sound.tap();
                onToggleStageManager();
              }}
              className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center text-[7px] text-black/60 font-bold cursor-pointer"
              title="Full Screen Mode"
            >
              +
            </button>
          </div>

          {/* Center: Multitasking Pill & App Title */}
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-[4px] overflow-hidden">
              <AppIconGlyph name={activeAppMeta?.iconName ?? 'User'} className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-white truncate max-w-[160px]">
              {appTitle}
            </span>
          </div>

          {/* Right: Fullscreen toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                sound.tap();
                onToggleStageManager();
              }}
              className="p-1 rounded-md hover:bg-white/10 text-white/70 hover:text-white cursor-pointer transition-colors"
              title="Toggle Fullscreen Mode"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 min-h-0 w-full overflow-hidden flex flex-col bg-zinc-950">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
