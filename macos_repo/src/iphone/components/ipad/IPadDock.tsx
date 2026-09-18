import React from 'react';
import { motion } from 'motion/react';
import { LayoutGrid } from 'lucide-react';
import { APPS_REGISTRY } from '../../data/appsRegistry';
import { useOSStore } from '../../store/useOSStore';
import { AppIconGlyph } from '../ui/AppIconGlyph';
import { sound } from '../../utils/audioHaptics';
import { AppId } from '../../types';

interface IPadDockProps {
  onOpenAppLibrary: () => void;
}

export const IPadDock: React.FC<IPadDockProps> = ({ onOpenAppLibrary }) => {
  const { activeApp, openApp } = useOSStore();

  const pinnedAppIds: AppId[] = [
    'about', 'projects', 'cv', 'skills', 'experience',
    'videos', 'photos', 'music', 'notes', 'settings'
  ];
  const pinnedApps = pinnedAppIds
    .map((id) => APPS_REGISTRY.find((a) => a.id === id))
    .filter(Boolean);

  const handleLaunch = (appId: AppId) => {
    sound.tap();
    openApp(appId);
  };

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="flex items-center gap-2 px-3.5 py-2 rounded-[24px] bg-white/20 dark:bg-zinc-900/65 backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.4)]"
      >
        {/* Pinned Apps */}
        <div className="flex items-center gap-2">
          {pinnedApps.map((app) => {
            if (!app) return null;
            const isActive = activeApp === app.id;
            return (
              <motion.button
                key={app.id}
                whileHover={{ scale: 1.14, y: -4 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleLaunch(app.id)}
                className="relative group flex flex-col items-center cursor-pointer"
                title={app.name}
              >
                <div className="w-11 h-11 rounded-[12px] overflow-hidden shadow-md flex items-center justify-center">
                  <AppIconGlyph name={app.iconName} className="w-11 h-11" />
                </div>
                {/* Active Indicator Dot */}
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-white shadow-xs" />
                )}
                {/* Tooltip */}
                <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none px-2 py-0.5 rounded-md bg-zinc-900/90 text-white text-[10px] font-medium shadow-md whitespace-nowrap">
                  {app.name}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-8 bg-white/20 dark:bg-white/15 mx-0.5" />

        {/* App Library Button */}
        <motion.button
          whileHover={{ scale: 1.14, y: -4 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            sound.tap();
            onOpenAppLibrary();
          }}
          className="w-11 h-11 rounded-[12px] bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white cursor-pointer shadow-md transition-colors"
          title="App Library & Spotlight"
        >
          <LayoutGrid className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};
