import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOSStore } from '../../store/useOSStore';
import { getFolderById } from '../../data/foldersRegistry';
import { APPS_REGISTRY } from '../../data/appsRegistry';
import { AppIconGlyph } from '../ui/AppIconGlyph';
import { X } from 'lucide-react';

export const FolderModal: React.FC = () => {
  const { activeFolderId, setActiveFolderId, openApp, theme } = useOSStore();

  if (!activeFolderId) return null;

  const folder = getFolderById(activeFolderId);
  if (!folder) return null;

  const folderApps = folder.appIds
    .map((id) => APPS_REGISTRY.find((app) => app.id === id))
    .filter(Boolean);

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 flex items-center justify-center p-6 select-none">
        {/* Blurred backdrop with tap to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveFolderId(null)}
          className="absolute inset-0 bg-black/50 backdrop-blur-xl"
        />

        {/* Folder Centered Card */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative z-10 w-full max-w-[320px] rounded-[38px] p-6 flex flex-col items-center ios-glass-dark border border-white/20 shadow-2xl"
          style={{
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.2)'
          }}
        >
          {/* Close button in top right */}
          <button
            onClick={() => setActiveFolderId(null)}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 text-white/70 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Folder Title */}
          <h2 className="text-xl font-bold text-white tracking-tight mb-6">
            {folder.name}
          </h2>

          {/* Apps 3x3 Grid inside Folder */}
          <div className="grid grid-cols-3 gap-y-6 gap-x-5 justify-items-center w-full">
            {folderApps.map((app) => {
              if (!app) return null;
              return (
                <motion.div
                  key={app.id}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => {
                    setActiveFolderId(null);
                    openApp(app.id);
                  }}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <div
                    className={`w-[56px] h-[56px] rounded-[16px] bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform border border-white/20`}
                  >
                    <AppIconGlyph name={app.iconName} className="w-7 h-7 text-white drop-shadow-sm" />
                  </div>
                  <span className="text-[11px] font-medium text-white/90 text-center truncate max-w-[64px]">
                    {app.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
