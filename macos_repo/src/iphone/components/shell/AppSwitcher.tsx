import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Smartphone } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { APPS_REGISTRY } from '../../data/appsRegistry';
import { AppId } from '../../types';

export const AppSwitcher: React.FC = () => {
  const {
    isAppSwitcherOpen,
    toggleAppSwitcher,
    runningApps,
    openApp,
    killApp,
    closeApp
  } = useOSStore();

  if (!isAppSwitcherOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 bg-black/65 backdrop-blur-2xl flex flex-col justify-between p-4 pt-14 pb-8 select-none"
        onClick={toggleAppSwitcher}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-3 text-white">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              App Switcher ({runningApps.length} active)
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeApp();
            }}
            className="text-xs text-blue-400 font-medium hover:underline cursor-pointer"
          >
            Home Screen
          </button>
        </div>

        {/* Horizontal Stack of Running App Cards */}
        <div
          className="flex-1 flex items-center gap-5 overflow-x-auto px-4 py-8 no-scrollbar snap-x snap-mandatory"
          onClick={(e) => e.stopPropagation()}
        >
          {runningApps.length === 0 ? (
            <div className="w-full text-center text-zinc-400 text-sm py-12">
              No recent apps in memory
            </div>
          ) : (
            runningApps.map((appId) => {
              const appDef = APPS_REGISTRY.find((a) => a.id === appId);
              if (!appDef) return null;

              return (
                <motion.div
                  key={appId}
                  layout
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ y: -250, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className="snap-center shrink-0 w-[240px] h-[420px] rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl overflow-hidden flex flex-col cursor-pointer hover:border-blue-500/50 transition-all group relative"
                  onClick={() => openApp(appId)}
                >
                  {/* Card Title Bar */}
                  <div className="p-3 bg-zinc-800/90 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${appDef.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                        {appDef.name[0]}
                      </div>
                      <span className="text-xs font-semibold text-white truncate max-w-[130px]">
                        {appDef.name}
                      </span>
                    </div>

                    {/* Kill app button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        killApp(appId);
                      }}
                      className="w-6 h-6 rounded-full bg-zinc-700/80 hover:bg-rose-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                      title="Force Close"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card Content Simulated Thumbnail */}
                  <div className="flex-1 p-4 bg-zinc-950 flex flex-col items-center justify-center text-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${appDef.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                      {appDef.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{appDef.name}</div>
                      <div className="text-xs text-zinc-400 mt-0.5">{appDef.subtitle}</div>
                    </div>
                    <span className="mt-2 text-[10px] text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2.5 py-1 rounded-full">
                      Tap to resume
                    </span>
                  </div>

                  {/* Swipe to close indicator on hover */}
                  <div className="absolute inset-x-0 bottom-3 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-zinc-400 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-md">
                      Swipe up or click (X) to quit
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Bottom indicator hint */}
        <div className="text-center text-xs text-zinc-400">
          Tap card to open • Click X to force-close
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
