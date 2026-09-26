import React from 'react';
import { useOSStore } from '../../store/useOSStore';
import { StatusBar } from './StatusBar';
import { LockScreen } from './LockScreen';
import { ControlCenter } from './ControlCenter';
import { AppSwitcher } from './AppSwitcher';
import { Spotlight } from './Spotlight';
import { HomeIndicator } from './HomeIndicator';
import { HomeScreen } from './HomeScreen';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { FolderModal } from './FolderModal';
import { WidgetGallery } from '../widgets/WidgetGallery';
import { getWallpaperById } from '../../data/wallpapers';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const {
    isLocked,
    toggleLock,
    brightness,
    activeApp,
    wallpaperId,
    perspectiveZoom,
    toggleControlCenter,
    toggleNotificationCenter
  } = useOSStore();

  const swipeStart = React.useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    swipeStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const deltaY = touch.clientY - start.y;
    const atTop = start.y <= 96;
    if (atTop && deltaY > 45) {
      if (start.x < event.currentTarget.clientWidth / 2) {
        toggleNotificationCenter(true);
      } else {
        toggleControlCenter(true);
      }
    }
  };

  const wallpaper = getWallpaperById(wallpaperId);

  return (
    <div className="iphone-shell relative h-[100dvh] min-h-0 w-full flex items-center justify-center p-0 sm:p-4 md:p-6 bg-neutral-950 font-sans antialiased overflow-hidden">
      <div className="absolute inset-0 bg-radial from-neutral-900 via-black to-black opacity-90 pointer-events-none" />

      <div className="iphone-frame relative w-full max-w-[430px] h-[100dvh] min-h-0 sm:h-[860px] sm:max-h-[96dvh] sm:rounded-[54px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 p-0 sm:p-[3px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden">
        <div
          onClick={() => toggleLock()}
          className="hidden sm:block absolute -right-[6px] top-32 w-[3px] h-14 bg-zinc-600 rounded-r-md cursor-pointer hover:bg-zinc-500 transition-colors"
          title="Side Button (Lock / Power)"
        />
        <div className="hidden sm:block absolute -left-[6px] top-24 w-[3px] h-8 bg-zinc-600 rounded-l-md" title="Action Button" />
        <div className="hidden sm:block absolute -left-[6px] top-36 w-[3px] h-12 bg-zinc-600 rounded-l-md" title="Volume Up" />
        <div className="hidden sm:block absolute -left-[6px] top-52 w-[3px] h-12 bg-zinc-600 rounded-l-md" title="Volume Down" />

        <div
          className="relative flex-1 min-h-0 w-full sm:rounded-[50px] overflow-hidden flex flex-col bg-black text-white"
          style={{ filter: `brightness(${brightness}%)`, touchAction: 'none' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            aria-hidden="true"
            className={`absolute inset-0 pointer-events-none transition-all duration-700 ${wallpaper.className} ${
              perspectiveZoom ? 'scale-105' : 'scale-100'
            }`}
            style={{ background: wallpaper.thumbnailStyle }}
          />

          {/* Home / app content — below status bar */}
          <div className="relative z-10 flex-1 min-h-0 w-full overflow-hidden flex flex-col">
            {activeApp ? children : <HomeScreen />}
          </div>

          {/* Status bar ABOVE content so time + battery are never overlapped */}
          <StatusBar />

          {isLocked && <LockScreen />}
          <NotificationCenter />
          <ControlCenter />
          <AppSwitcher />
          <Spotlight />
          <FolderModal />
          <WidgetGallery />
          <HomeIndicator />
        </div>
      </div>
    </div>
  );
};
