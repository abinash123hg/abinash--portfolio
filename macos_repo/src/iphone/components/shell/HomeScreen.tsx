import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { APPS_REGISTRY } from '../../data/appsRegistry';
import { FOLDERS_REGISTRY } from '../../data/foldersRegistry';
import { useOSStore } from '../../store/useOSStore';
import { AppIconGlyph } from '../ui/AppIconGlyph';
import { WidgetTile } from '../widgets/WidgetTile';
import { AppDefinition, AppId } from '../../types';

export const HomeScreen: React.FC = () => {
  const {
    openApp,
    toggleSpotlight,
    theme,
    homePageIndex,
    setHomePageIndex,
    isHomeEditing,
    toggleHomeEditing,
    toggleWidgetGallery,
    placedWidgets,
    setActiveFolderId
  } = useOSStore();

  const isDark = theme === 'dark';
  const longPressTimerRef = useRef<any>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const dockApps = APPS_REGISTRY.filter((app) => app.dock);

  // Keep the portfolio catalog distributed across three swipeable iOS pages.
  // Ten icons per page matches the compact 4-column portrait home-screen grid.
  const page0AppIds: AppId[] = [
    'recruiter', 'projects', 'resume', 'chatbot', 'about',
    'skills', 'experience', 'certifications', 'education', 'contact'
  ];
  const page1AppIds: AppId[] = [
    'safari', 'mail', 'notes', 'calendar', 'analytics',
    'finder', 'camera', 'utility', 'systeminfo', 'settings'
  ];
  const page2AppIds: AppId[] = [
    'photos', 'gallery', 'music', 'videos', 'games',
    'favorites', 'trash'
  ];

  const getAppsForPage = (page: number): AppDefinition[] => {
    let ids: AppId[] = [];
    if (page === 0) ids = page0AppIds;
    else if (page === 1) ids = page1AppIds;
    else ids = page2AppIds;

    return ids
      .map((id) => APPS_REGISTRY.find((app) => app.id === id))
      .filter(Boolean) as AppDefinition[];
  };

  const currentWidgets = placedWidgets.filter((w) => w.page === homePageIndex);
  const currentApps = getAppsForPage(homePageIndex);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    longPressTimerRef.current = setTimeout(() => {
      toggleHomeEditing(true);
    }, 650);
  };

  const handleTouchMove = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0 && homePageIndex < 2) {
        setHomePageIndex(homePageIndex + 1);
      } else if (diff < 0 && homePageIndex > 0) {
        setHomePageIndex(homePageIndex - 1);
      }
    }
    setTouchStartX(null);
  };

  const handleMouseDown = () => {
    longPressTimerRef.current = setTimeout(() => {
      toggleHomeEditing(true);
    }, 650);
  };

  const handleMouseUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const nameStyle: React.CSSProperties = {
    color: '#ffffff',
    textShadow: '0 1px 2px rgba(0,0,0,0.85), 0 2px 6px rgba(0,0,0,0.55)'
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        toggleHomeEditing(!isHomeEditing);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="ios-wallpaper-text iphone-home-screen relative flex-1 min-h-0 w-full flex flex-col justify-between px-3 select-none overflow-hidden"
      style={{ paddingTop: '58px', paddingBottom: 'calc(64px + 58px)' }}
    >
      <h1 className="sr-only">Abinash Swain — AI/ML Portfolio</h1>
      <AnimatePresence>
        {isHomeEditing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-between px-2 py-1 mb-1 z-30"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWidgetGallery(true);
              }}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-800/90 text-white hover:bg-zinc-700 text-xs font-bold border border-white/10 shadow-lg active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Widget</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleHomeEditing(false);
              }}
              className="flex items-center gap-1 px-3.5 py-1 rounded-full bg-sky-500 text-white hover:bg-sky-400 text-xs font-bold shadow-lg shadow-sky-500/30 active:scale-95 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Done</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col justify-start">
        {currentWidgets.length > 0 && (
          <div className="grid grid-cols-4 gap-x-2 gap-y-2 mb-2.5 px-0.5">
            {currentWidgets.map((w) => (
              <WidgetTile key={w.instanceId} widget={w} />
            ))}
          </div>
        )}


        {/* Corrected app grid: 3 stacked rows of 2 apps per homescreen */}
        <div className="ios-home-grid grid grid-cols-4 gap-x-1 gap-y-3 px-0.5">
          {currentApps.map((app) => (
            <motion.div
              key={app.id}
              whileTap={{ scale: isHomeEditing ? 1 : 0.9 }}
              onClick={() => {
                if (!isHomeEditing) {
                  openApp(app.id);
                }
              }}
              className={`flex flex-col items-center gap-1 cursor-pointer group relative ${isHomeEditing ? 'animate-jiggle' : ''}`}
            >
              <div className="relative">
                <div
                  className={`w-[64px] h-[64px] rounded-[20px] bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all border border-white/20`}
                >
                  <AppIconGlyph name={app.iconName} className="w-[26px] h-[26px] text-white drop-shadow-sm" />
                </div>
                {!isHomeEditing && app.badge && (
                  <span className="absolute -top-1 -right-1 px-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-bold shadow-md border border-white">
                    {app.badge}
                  </span>
                )}
              </div>
              <span className="text-[13px] font-semibold tracking-tight truncate max-w-[66px] text-center" style={nameStyle}>
                {app.name}
              </span>
            </motion.div>
          ))}

          {homePageIndex === 1 && (
            <motion.div
              whileTap={{ scale: isHomeEditing ? 1 : 0.9 }}
              onClick={() => {
                if (!isHomeEditing) {
                  setActiveFolderId('folder-devtools');
                }
              }}
              className={`flex flex-col items-center gap-1 cursor-pointer group ${isHomeEditing ? 'animate-jiggle' : ''}`}
            >
              <div className={`w-[64px] h-[64px] rounded-[20px] backdrop-blur-xl p-1.5 grid grid-cols-2 gap-1 items-center justify-items-center shadow-lg group-hover:scale-105 transition-transform ${isDark ? 'bg-white/20 border border-white/25' : 'bg-white/80 border border-black/15'}`}>
                <div className="w-4 h-4 rounded-xs bg-sky-500/80" />
                <div className="w-4 h-4 rounded-xs bg-emerald-500/80" />
                <div className="w-4 h-4 rounded-xs bg-purple-500/80" />
                <div className="w-4 h-4 rounded-xs bg-amber-500/80" />
              </div>
              <span className="text-[13px] font-semibold tracking-tight truncate max-w-[66px] text-center" style={nameStyle}>
                Dev Tools
              </span>
            </motion.div>
          )}

          {homePageIndex === 2 && (
            <motion.div
              whileTap={{ scale: isHomeEditing ? 1 : 0.9 }}
              onClick={() => {
                if (!isHomeEditing) {
                  setActiveFolderId('folder-media');
                }
              }}
              className={`flex flex-col items-center gap-1 cursor-pointer group ${isHomeEditing ? 'animate-jiggle' : ''}`}
            >
              <div className={`w-[64px] h-[64px] rounded-[20px] backdrop-blur-xl p-1.5 grid grid-cols-2 gap-1 items-center justify-items-center shadow-lg group-hover:scale-105 transition-transform ${isDark ? 'bg-white/20 border border-white/25' : 'bg-white/80 border border-black/15'}`}>
                <div className="w-4 h-4 rounded-xs bg-rose-500/80" />
                <div className="w-4 h-4 rounded-xs bg-indigo-500/80" />
                <div className="w-4 h-4 rounded-xs bg-teal-500/80" />
                <div className="w-4 h-4 rounded-xs bg-pink-500/80" />
              </div>
              <span className="text-[13px] font-semibold tracking-tight truncate max-w-[66px] text-center" style={nameStyle}>
                Media
              </span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-2 mb-2.5 flex items-center justify-center gap-3">
        {homePageIndex > 0 && (
          <button
            onClick={() => setHomePageIndex(homePageIndex - 1)}
            className={`flex items-center justify-center w-9 h-9 rounded-full transition-all active:scale-90 ${isDark ? 'bg-white/10 text-white/85 hover:bg-white/20' : 'bg-black/10 text-zinc-800 hover:bg-black/20'}`}
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        <div className={`flex items-center gap-1.5 backdrop-blur-md px-2.5 py-2 rounded-full border ${isDark ? 'bg-black/25 border-white/10' : 'bg-white/45 border-black/10'}`}>
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setHomePageIndex(idx)}
              className={`min-h-[10px] min-w-[10px] h-3 rounded-full transition-all duration-200 ${homePageIndex === idx ? (isDark ? 'w-5 bg-white' : 'w-5 bg-zinc-900') : isDark ? 'w-2.5 bg-white/55 hover:bg-white/85' : 'w-2.5 bg-zinc-900/55 hover:bg-zinc-900/80'}`}
              title={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
        {homePageIndex < 2 && (
          <button
            onClick={() => setHomePageIndex(homePageIndex + 1)}
            className={`flex items-center justify-center w-9 h-9 rounded-full transition-all active:scale-90 ${isDark ? 'bg-white/10 text-white/85 hover:bg-white/20' : 'bg-black/10 text-zinc-800 hover:bg-black/20'}`}
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search pill — sits above the dock (dock is absolutely positioned at the bottom) */}
      <div className="mb-3.5 flex justify-center">
        <button
          onClick={toggleSpotlight}
          className={`flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-full text-base backdrop-blur-xl border shadow-md transition-all active:scale-95 ${isDark ? 'bg-black/35 hover:bg-black/50 border-white/15 text-zinc-200' : 'bg-white/90 hover:bg-white border-black/15 text-zinc-900'}`}
        >
          <Search className={`w-5 h-5 shrink-0 ${isDark ? 'text-zinc-300' : 'text-zinc-500'}`} aria-hidden="true" />
          <span className="font-semibold tracking-tight text-base">Search</span>
        </button>
      </div>

      <div className="absolute bottom-2 left-0 right-0 z-30 px-3">
        <div className={`p-2.5 rounded-[34px] mx-auto max-w-[340px] flex items-center justify-around border shadow-[0_15px_35px_rgba(0,0,0,0.5)] ${isDark ? 'bg-zinc-900/45 border-white/25' : 'bg-white/90 border-black/15'}`}>
          {dockApps.map((app) => (
            <motion.div
              key={app.id}
              whileTap={{ scale: 0.88 }}
              onClick={() => {
                if (!isHomeEditing) {
                  openApp(app.id);
                }
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="relative">
                <div
                  className={`w-[56px] h-[56px] rounded-[20px] bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all border border-white/20`}
                >
                  <AppIconGlyph name={app.iconName} className="w-6 h-6 text-white drop-shadow-sm" />
                </div>
                {app.badge && (
                  <span className="absolute -top-1 -right-1 px-1.5 min-w-[16px] h-[16px] flex items-center justify-center rounded-full bg-rose-500 text-white text-[9px] font-bold shadow border border-white">
                    {app.badge}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
