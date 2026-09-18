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

  // Filter dock apps and page-specific apps
  const dockApps = APPS_REGISTRY.filter((app) => app.dock);

  // Group non-dock apps into pages
  // Page 0: Priority Candidate & Technical Apps
  const page0AppIds: AppId[] = ['about', 'skills', 'experience', 'certifications', 'education', 'contact'];
  // Page 1: Utilities, Tools & Creative Apps
  const page1AppIds: AppId[] = ['safari', 'mail', 'notes', 'calendar', 'utility', 'camera'];
  // Page 2: System, Media & All Other Apps
  const page2AppIds: AppId[] = ['photos', 'videos', 'music', 'settings', 'gallery', 'games'];

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

  // Touch Swipe Handlers for Page Turning
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
      className="relative flex-1 w-full h-full flex flex-col justify-between pt-1 pb-20 px-3 select-none overflow-hidden"
    >
      {/* Edit Mode Top Toolbar (iOS 18 Authenticity) */}
      <AnimatePresence>
        {isHomeEditing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-between px-2 py-1 mb-1 z-30"
          >
            {/* + Button for Widget Gallery */}
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

            {/* Done Button */}
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

      {/* Main Multi-Page Screen Area */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col justify-start">
        {/* Placed Widgets on This Page */}
        {currentWidgets.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-3.5 px-0.5">
            {currentWidgets.map((w) => (
              <WidgetTile key={w.instanceId} widget={w} />
            ))}
          </div>
        )}

        {/* Apps Grid (4 Columns) */}
        <div className="grid grid-cols-4 gap-y-4 gap-x-2 px-1 justify-items-center">
          {currentApps.map((app) => (
            <motion.div
              key={app.id}
              whileTap={{ scale: isHomeEditing ? 1 : 0.9 }}
              onClick={() => {
                if (!isHomeEditing) {
                  openApp(app.id);
                }
              }}
              className={`flex flex-col items-center gap-1 cursor-pointer group relative ${
                isHomeEditing ? 'animate-jiggle' : ''
              }`}
            >
              {/* Squircle App Icon */}
              <div className="relative">
                <div
                  className={`w-[58px] h-[58px] rounded-[16px] bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all border border-white/20`}
                >
                  <AppIconGlyph name={app.iconName} className="w-7 h-7 text-white drop-shadow-sm" />
                </div>

                {/* Notification Badge */}
                {!isHomeEditing && app.badge && (
                  <span className="absolute -top-1 -right-1 px-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-bold shadow-md border border-white">
                    {app.badge}
                  </span>
                )}
              </div>

              {/* App Label */}
              <span
                className="text-[11px] font-medium tracking-tight truncate max-w-[66px] text-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              >
                {app.name}
              </span>
            </motion.div>
          ))}

          {/* Render Folders on Page 1 & 2 */}
          {homePageIndex === 1 && (
            <motion.div
              whileTap={{ scale: isHomeEditing ? 1 : 0.9 }}
              onClick={() => {
                if (!isHomeEditing) {
                  setActiveFolderId('folder-devtools');
                }
              }}
              className={`flex flex-col items-center gap-1 cursor-pointer group ${
                isHomeEditing ? 'animate-jiggle' : ''
              }`}
            >
              {/* Folder Glass Squircle */}
              <div className="w-[58px] h-[58px] rounded-[16px] bg-white/20 backdrop-blur-xl border border-white/25 p-1.5 grid grid-cols-2 gap-1 items-center justify-items-center shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-4 h-4 rounded-xs bg-sky-500/80" />
                <div className="w-4 h-4 rounded-xs bg-emerald-500/80" />
                <div className="w-4 h-4 rounded-xs bg-purple-500/80" />
                <div className="w-4 h-4 rounded-xs bg-amber-500/80" />
              </div>
              <span className="text-[11px] font-medium tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
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
              className={`flex flex-col items-center gap-1 cursor-pointer group ${
                isHomeEditing ? 'animate-jiggle' : ''
              }`}
            >
              {/* Folder Glass Squircle */}
              <div className="w-[58px] h-[58px] rounded-[16px] bg-white/20 backdrop-blur-xl border border-white/25 p-1.5 grid grid-cols-2 gap-1 items-center justify-items-center shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-4 h-4 rounded-xs bg-rose-500/80" />
                <div className="w-4 h-4 rounded-xs bg-indigo-500/80" />
                <div className="w-4 h-4 rounded-xs bg-teal-500/80" />
                <div className="w-4 h-4 rounded-xs bg-pink-500/80" />
              </div>
              <span className="text-[11px] font-medium tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Media
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Page Dots & Navigation Chevron Indicators */}
      <div className="my-2 flex items-center justify-center gap-3">
        {homePageIndex > 0 && (
          <button
            onClick={() => setHomePageIndex(homePageIndex - 1)}
            className="text-white/60 hover:text-white transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setHomePageIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                homePageIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              title={`Go to page ${idx + 1}`}
            />
          ))}
        </div>

        {homePageIndex < 2 && (
          <button
            onClick={() => setHomePageIndex(homePageIndex + 1)}
            className="text-white/60 hover:text-white transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Search Pill Button */}
      <div className="mb-2 flex justify-center">
        <button
          onClick={toggleSpotlight}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-black/35 hover:bg-black/50 backdrop-blur-xl border border-white/15 text-zinc-200 shadow-md transition-all active:scale-95"
        >
          <Search className="w-3 h-3 text-zinc-300" />
          <span className="font-semibold text-[11px]">Search</span>
        </button>
      </div>

      {/* Persistent Floating iOS Liquid Glass Dock */}
      <div className="absolute bottom-2 left-0 right-0 z-30 px-3">
        <div className="p-2.5 rounded-[34px] mx-auto max-w-[340px] flex items-center justify-around ios-glass-dark border border-white/25 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
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
                  className={`w-[54px] h-[54px] rounded-[15px] bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all border border-white/20`}
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
