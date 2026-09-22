import React from 'react';
import { Sparkles, ArrowLeft, Smartphone } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { useOSStore } from '../store/useOSStore';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onAction?: () => void;
  actionLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'App Ready',
  message = 'This module is configured and active in the portfolio environment.',
  onAction,
  actionLabel = 'Return to Home'
}) => {
  const { closeApp, theme } = useOSStore();
  const isDark = theme === 'dark';

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col justify-between overflow-y-auto no-scrollbar pb-16">
      <AppHeader title={title} />

      <div className="my-auto p-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl mb-4">
          <Smartphone className="w-8 h-8" />
        </div>

        <h2 className={`text-base font-bold mb-1.5 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
          {title}
        </h2>
        <p className={isDark ? 'text-xs text-zinc-400 max-w-[260px] leading-relaxed mb-6' : 'text-xs text-zinc-500 max-w-[260px] leading-relaxed mb-6'}>
          {message}
        </p>

        <button
          onClick={onAction || closeApp}
          className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/25 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{actionLabel}</span>
        </button>
      </div>

      <div className="p-4 text-center">
        <span className="text-[10px] text-zinc-500 font-mono">Portfolio OS • iOS 18</span>
      </div>
    </div>
  );
};

export default EmptyState;
