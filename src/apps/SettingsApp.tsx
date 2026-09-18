import React, { useState } from 'react';
import {
  Moon,
  Sun,
  Volume2,
  Sliders,
  Wifi,
  Bluetooth,
  Smartphone,
  Info,
  Shield,
  Bell,
  Sparkles,
  ChevronRight,
  Image as ImageIcon,
  Check,
  Eye
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';
import { WALLPAPERS, getWallpaperById } from '../data/wallpapers';

export const SettingsApp: React.FC = () => {
  const {
    theme,
    toggleTheme,
    brightness,
    setBrightness,
    volume,
    setVolume,
    isWifiOn,
    toggleWifi,
    isBluetoothOn,
    toggleBluetooth,
    openApp,
    wallpaperId,
    lockWallpaperId,
    setWallpaper,
    perspectiveZoom,
    togglePerspectiveZoom
  } = useOSStore();

  const [wallpaperTarget, setWallpaperTarget] = useState<'both' | 'lock' | 'home'>('both');
  const [activeCategory, setActiveCategory] = useState<'all' | 'dynamic' | 'dark' | 'light'>('all');

  const isDark = theme === 'dark';
  const currentHomeWallpaper = getWallpaperById(wallpaperId);
  const currentLockWallpaper = getWallpaperById(lockWallpaperId);

  const filteredWallpapers = WALLPAPERS.filter(
    (w) => activeCategory === 'all' || w.category === activeCategory
  );

  return (
    <div className="flex-1 w-full h-full flex flex-col overflow-y-auto no-scrollbar pb-20">
      <AppHeader title="Settings" subtitle="System & Preferences" />

      <div className="p-4 space-y-4">
        {/* Profile Card inside Settings */}
        <div
          onClick={() => openApp('about')}
          className={`p-3.5 rounded-3xl border shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-500/40 transition-all ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow">
              AS
            </div>
            <div>
              <h3 className="text-sm font-bold">{PORTFOLIO_DATA.personal.name}</h3>
              <p className="text-[11px] text-zinc-400">Apple ID, iCloud, Portfolio OS</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </div>

        {/* Wallpaper Picker Group */}
        <div
          className={`p-4 rounded-3xl border shadow-sm space-y-4 ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Wallpaper & Style
              </h4>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">iOS 18 Gallery</span>
          </div>

          {/* Current Live Pair Preview Cards */}
          <div className="flex items-center justify-center gap-4 py-2">
            {/* Lock Screen Mini Preview */}
            <div className="flex flex-col items-center">
              <div
                className={`w-24 h-44 rounded-2xl border border-white/25 overflow-hidden relative shadow-lg ${currentLockWallpaper.className} p-1 flex flex-col justify-between`}
              >
                <div className="pt-2 text-center text-white">
                  <div className="text-[7px] opacity-80 uppercase">Tuesday</div>
                  <div className="text-sm font-light leading-none">9:41</div>
                </div>
                <div className="text-center text-[7px] text-white/70 pb-1">Lock Screen</div>
              </div>
              <span className="text-[10px] font-semibold text-zinc-300 mt-1.5">Lock Screen</span>
            </div>

            {/* Home Screen Mini Preview */}
            <div className="flex flex-col items-center">
              <div
                className={`w-24 h-44 rounded-2xl border border-white/25 overflow-hidden relative shadow-lg ${currentHomeWallpaper.className} p-1 flex flex-col justify-between`}
              >
                <div className="grid grid-cols-2 gap-0.5 pt-2 px-1">
                  <div className="h-4 rounded-xs bg-white/20" />
                  <div className="h-4 rounded-xs bg-white/20" />
                </div>
                <div className="text-center text-[7px] text-white/70 pb-1">Home Screen</div>
              </div>
              <span className="text-[10px] font-semibold text-zinc-300 mt-1.5">Home Screen</span>
            </div>
          </div>

          {/* Target Selector Tabs (Both, Lock, Home) */}
          <div className="flex items-center justify-center bg-zinc-800/80 p-1 rounded-xl border border-white/5">
            {(['both', 'lock', 'home'] as const).map((target) => (
              <button
                key={target}
                onClick={() => setWallpaperTarget(target)}
                className={`flex-1 py-1 text-[11px] font-bold rounded-lg uppercase transition-all ${
                  wallpaperTarget === target
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {target === 'both' ? 'Set Pair' : target === 'lock' ? 'Lock Screen' : 'Home Screen'}
              </button>
            ))}
          </div>

          {/* Perspective Zoom Switch */}
          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
            <span className="font-medium text-zinc-200">Perspective Zoom</span>
            <button
              onClick={togglePerspectiveZoom}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                perspectiveZoom ? 'bg-sky-500' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  perspectiveZoom ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {(['all', 'dynamic', 'dark', 'light'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                  activeCategory === cat
                    ? 'bg-white/25 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Wallpaper Thumbnails Grid */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {filteredWallpapers.map((wp) => {
              const isSelected =
                (wallpaperTarget === 'both' && wallpaperId === wp.id) ||
                (wallpaperTarget === 'home' && wallpaperId === wp.id) ||
                (wallpaperTarget === 'lock' && lockWallpaperId === wp.id);

              return (
                <div
                  key={wp.id}
                  onClick={() => setWallpaper(wp.id, wallpaperTarget)}
                  className={`relative aspect-2/3 rounded-xl overflow-hidden cursor-pointer border-2 transition-all group ${
                    isSelected ? 'border-sky-400 scale-102 shadow-lg' : 'border-white/10 hover:border-white/30'
                  }`}
                  style={{ background: wp.thumbnailStyle }}
                  title={wp.name}
                >
                  {isSelected && (
                    <div className="absolute inset-0 bg-sky-500/20 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shadow">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>
                  )}
                  <span className="absolute bottom-1 left-1 right-1 text-[8px] font-bold text-white truncate drop-shadow text-center">
                    {wp.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Connectivity Group */}
        <div
          className={`rounded-3xl border shadow-sm overflow-hidden divide-y divide-white/10 ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          {/* Wi-Fi */}
          <div className="p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                <Wifi className="w-4 h-4" />
              </div>
              <span className="font-medium">Wi-Fi</span>
            </div>
            <button
              onClick={toggleWifi}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                isWifiOn ? 'bg-emerald-500' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isWifiOn ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Bluetooth */}
          <div className="p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Bluetooth className="w-4 h-4" />
              </div>
              <span className="font-medium">Bluetooth</span>
            </div>
            <button
              onClick={toggleBluetooth}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                isBluetoothOn ? 'bg-emerald-500' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isBluetoothOn ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Appearance & Display Group */}
        <div
          className={`p-4 rounded-3xl border shadow-sm space-y-4 ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Display & Appearance
          </h4>

          {/* Theme Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => {
                if (theme !== 'light') toggleTheme();
              }}
              className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                theme === 'light'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-bold'
                  : 'border-white/10 bg-white/5 text-zinc-400'
              }`}
            >
              <Sun className="w-5 h-5 mx-auto mb-1 text-amber-400" />
              <span className="text-xs">Light Mode</span>
            </div>

            <div
              onClick={() => {
                if (theme !== 'dark') toggleTheme();
              }}
              className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                theme === 'dark'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-bold'
                  : 'border-white/10 bg-white/5 text-zinc-400'
              }`}
            >
              <Moon className="w-5 h-5 mx-auto mb-1 text-blue-400" />
              <span className="text-xs">Dark Mode</span>
            </div>
          </div>

          {/* Brightness Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5" />
                <span>Screen Brightness</span>
              </span>
              <span className="font-mono">{brightness}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Volume Slider */}
          <div className="space-y-1.5 pt-2 border-t border-white/10">
            <div className="flex justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Volume</span>
              </span>
              <span className="font-mono">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>
        </div>

        {/* System Info Link */}
        <div
          onClick={() => openApp('systeminfo')}
          className={`p-3.5 rounded-3xl border shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-500/40 transition-all ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="flex items-center gap-3 text-xs">
            <div className="w-7 h-7 rounded-lg bg-zinc-700 flex items-center justify-center text-white">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <span className="font-medium text-white block">General • About</span>
              <span className="text-[10px] text-zinc-400">iPhone 15 • iOS 18 Portfolio Edition</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </div>
      </div>
    </div>
  );
};

