import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Check,
  Sparkles,
  Wifi,
  Music,
  LayoutGrid
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { FavoritesPage } from '../control-center/FavoritesPage';
import { MediaPage } from '../control-center/MediaPage';
import { ConnectivityPage } from '../control-center/ConnectivityPage';
import { ExpandedConnectivitySheet } from '../control-center/ExpandedConnectivitySheet';
import { ExpandedBrightnessSheet } from '../control-center/ExpandedBrightnessSheet';
import { ExpandedVolumeSheet } from '../control-center/ExpandedVolumeSheet';
import { ExpandedFlashlightSheet } from '../control-center/ExpandedFlashlightSheet';
import { ExpandedFocusSheet } from '../control-center/ExpandedFocusSheet';
import { ExpandedTimerSheet } from '../control-center/ExpandedTimerSheet';
import { ExpandedCalculatorSheet } from '../control-center/ExpandedCalculatorSheet';
import { ControlsGallerySheet } from '../control-center/ControlsGallerySheet';
import { StatusBar } from './StatusBar';

export const ControlCenter: React.FC = () => {
  const {
    isControlCenterOpen,
    toggleControlCenter,
    controlCenterPage,
    theme,
    setControlCenterPage,
    isControlCenterEditing,
    toggleControlCenterEdit,
    activeToast
  } = useOSStore();

  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const isDark = theme === 'dark';

  const PAGES = [
    { id: 0, label: 'Favorites', icon: LayoutGrid },
    { id: 1, label: 'Media', icon: Music },
    { id: 2, label: 'Network', icon: Wifi }
  ];

  if (!isControlCenterOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '-100%', opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 320 }}
        className={`ios-control-center ios-control-center--ios18 absolute inset-0 z-[60] flex flex-col justify-start select-none overflow-hidden ${isDark ? 'ios-control-center--dark' : 'ios-control-center--light'}`}
        onClick={() => {
          if (activeSheet) {
            setActiveSheet(null);
          } else if (isGalleryOpen) {
            setIsGalleryOpen(false);
          } else if (isControlCenterEditing) {
            toggleControlCenterEdit(false);
          } else {
            toggleControlCenter();
          }
        }}
      >
        {/* Keep the live iPhone status row visible above the Control Center surface. */}
        <StatusBar />

        {/* Top Header Bar */}
        <div
          className="w-full pt-[4.25rem] px-5 pb-3 flex items-center justify-between shrink-0 z-30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Edit Button */}
          <button
            onClick={() => toggleControlCenterEdit()}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
              isControlCenterEditing
                ? 'bg-blue-600 text-white shadow-lg'
                : isDark ? 'bg-white/10 hover:bg-white/20 text-zinc-300' : 'bg-black/10 hover:bg-black/15 text-zinc-700'
            }`}
          >
            {isControlCenterEditing ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Done</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-blue-400" />
                <span>Edit</span>
              </>
            )}
          </button>

          {/* Center Page Switcher Pills */}
          <div className={`flex items-center border rounded-full p-0.5 shadow-md ${isDark ? 'bg-zinc-900/80 border-white/15' : 'bg-white/80 border-black/10'}`}>
            {PAGES.map((page) => {
              const isSelected = controlCenterPage === page.id;
              const Icon = page.icon;
              return (
                <button
                  key={page.id}
                  onClick={() => setControlCenterPage(page.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-white text-zinc-950 shadow-md font-bold'
                      : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden xs:inline">{page.label}</span>
                </button>
              );
            })}
          </div>

          {/* Close Button */}
          <button
            onClick={toggleControlCenter}
            className={`w-8 h-8 rounded-full flex items-center justify-center border active:scale-90 transition-all ${isDark ? 'bg-white/10 hover:bg-white/20 text-white border-white/10' : 'bg-black/10 hover:bg-black/15 text-zinc-800 border-black/10'}`}
            title="Close Control Center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Page Container */}
        <div
          className="flex-1 w-full overflow-y-auto no-scrollbar pt-2 px-4 flex flex-col items-center z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {controlCenterPage === 0 && (
            <FavoritesPage
              onOpenSheet={(sheet) => setActiveSheet(sheet)}
              onNavigateToMedia={() => setControlCenterPage(1)}
              onOpenGallery={() => setIsGalleryOpen(true)}
            />
          )}

          {controlCenterPage === 1 && (
            <MediaPage
              onOpenVolumeSheet={() => setActiveSheet('volume')}
            />
          )}

          {controlCenterPage === 2 && (
            <ConnectivityPage />
          )}
        </div>

        {/* Active Toast Notification */}
        <AnimatePresence>
          {activeToast && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className={`absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl border shadow-2xl backdrop-blur-2xl flex items-center gap-3 ${isDark ? 'bg-zinc-900/95 border-white/20 text-white' : 'bg-white/95 border-black/10 text-zinc-900'}`}
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="leading-tight truncate">
                <p className="text-xs font-bold">{activeToast.title}</p>
                {activeToast.subtitle && (
                  <p className="text-[10px] text-zinc-400 truncate">{activeToast.subtitle}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded Sheet Modal Backdrop */}
        <AnimatePresence>
          {activeSheet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setActiveSheet(null)}
            >
              {activeSheet === 'connectivity' && (
                <ExpandedConnectivitySheet onClose={() => setActiveSheet(null)} />
              )}
              {activeSheet === 'brightness' && (
                <ExpandedBrightnessSheet onClose={() => setActiveSheet(null)} />
              )}
              {activeSheet === 'volume' && (
                <ExpandedVolumeSheet onClose={() => setActiveSheet(null)} />
              )}
              {activeSheet === 'flashlight' && (
                <ExpandedFlashlightSheet onClose={() => setActiveSheet(null)} />
              )}
              {activeSheet === 'focus' && (
                <ExpandedFocusSheet onClose={() => setActiveSheet(null)} />
              )}
              {activeSheet === 'timer' && (
                <ExpandedTimerSheet onClose={() => setActiveSheet(null)} />
              )}
              {activeSheet === 'calculator' && (
                <ExpandedCalculatorSheet onClose={() => setActiveSheet(null)} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls Gallery Sheet Modal */}
        <AnimatePresence>
          {isGalleryOpen && (
            <ControlsGallerySheet onClose={() => setIsGalleryOpen(false)} />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
