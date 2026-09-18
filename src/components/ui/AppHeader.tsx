import React from 'react';
import { ChevronLeft, Share2, ExternalLink } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

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
      {/* Left Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-400 active:opacity-70 transition-all cursor-pointer min-w-[65px]"
      >
        <ChevronLeft className="w-5 h-5 -ml-1 stroke-[2.5]" />
        <span>{backLabel}</span>
      </button>

      {/* Center Title */}
      <div className="flex-1 text-center px-1 min-w-0">
        <h1 className="text-sm font-semibold tracking-tight truncate leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[10px] text-zinc-400 truncate -mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Action */}
      <div className="min-w-[65px] flex items-center justify-end">
        {rightAction || <div className="w-6" />}
      </div>
    </div>
  );
};
