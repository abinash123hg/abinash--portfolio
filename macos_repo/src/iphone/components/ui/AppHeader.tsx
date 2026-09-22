import React from 'react';
import { ChevronLeft, RotateCw } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { sound } from '../../utils/audioHaptics';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  onBack,
  backLabel = 'Home',
  rightAction,
  transparent = false
}) => {
  const { closeApp, theme } = useOSStore();
  const isDark = theme === 'dark';

  const handleBack = onBack || closeApp;

  const handleManualRefresh = () => {
    sound.tap();
    window.dispatchEvent(new CustomEvent('ios_app_request_refresh'));
  };

  return (
    <div
      className={`sticky top-0 z-30 w-full px-3 py-2 flex items-center justify-between border-b select-none transition-colors ${
        transparent
          ? 'bg-transparent border-transparent'
          : isDark
          ? 'bg-zinc-950/80 backdrop-blur-xl border-zinc-800/80 text-white'
          : 'bg-white/85 backdrop-blur-xl border-zinc-200/90 text-zinc-900'
      }`}
    >
      <button
        onClick={handleBack}
        className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-400 active:opacity-70 transition-all cursor-pointer min-w-[65px]"
      >
        <ChevronLeft className="w-5 h-5 -ml-1 stroke-[2.5]" />
        <span>{backLabel}</span>
      </button>

      <div
        onClick={handleManualRefresh}
        className="flex-1 text-center px-1 min-w-0 cursor-pointer group"
        title="Tap to refresh"
      >
        <h1 className="text-sm font-semibold tracking-tight truncate leading-tight group-hover:text-blue-500 transition-colors">
          {title}
        </h1>
        {subtitle && (
          <p className={`text-[10px] truncate -mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="min-w-[65px] flex items-center justify-end">
        {rightAction || (
          <button
            onClick={handleManualRefresh}
            className={`w-7 h-7 rounded-full flex items-center justify-center hover:text-blue-500 active:scale-95 transition-all cursor-pointer ${
              isDark ? 'text-zinc-400 hover:bg-white/10' : 'text-zinc-500 hover:bg-zinc-100'
            }`}
            title="Refresh"
            aria-label="Refresh app"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
