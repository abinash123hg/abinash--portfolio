import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, Check } from 'lucide-react';
import { sound } from '../../utils/audioHaptics';
import { useOSStore } from '../../store/useOSStore';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh?: () => Promise<void> | void;
  className?: string;
  disabled?: boolean;
  appName?: string;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  className = '',
  disabled = false,
  appName = 'App'
}) => {
  const { theme, showToast } = useOSStore();
  const isDark = theme === 'dark';

  const [pullY, setPullY] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isPrimed, setIsPrimed] = useState<boolean>(false);
  const [justRefreshed, setJustRefreshed] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const startYRef = useRef<number | null>(null);
  const isPullingRef = useRef<boolean>(false);
  const primedSoundFiredRef = useRef<boolean>(false);

  const PULL_THRESHOLD = 54;
  const REFRESHING_HEIGHT = 44;

  const triggerRefresh = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setPullY(REFRESHING_HEIGHT);
    sound.pullRefresh();

    try {
      if (onRefresh) {
        await onRefresh();
      } else {
        // Realistic iOS refresh latency
        await new Promise((resolve) => setTimeout(resolve, 750));
      }

      setJustRefreshed(true);
      showToast({
        id: `refresh-${Date.now()}`,
        title: `${appName} Refreshed`,
        subtitle: 'Content synchronized just now',
        duration: 2200
      });

      // Window event for apps that listen for refresh
      window.dispatchEvent(new CustomEvent('ios_app_refreshed', { detail: { appName } }));

      setTimeout(() => {
        setJustRefreshed(false);
        setIsRefreshing(false);
        setPullY(0);
        setIsPrimed(false);
      }, 550);
    } catch {
      setIsRefreshing(false);
      setPullY(0);
      setIsPrimed(false);
    }
  }, [isRefreshing, onRefresh, showToast, appName]);

  useEffect(() => {
    const handleManualRefresh = () => {
      if (!isRefreshing) {
        triggerRefresh();
      }
    };
    window.addEventListener('ios_app_request_refresh', handleManualRefresh);
    return () => window.removeEventListener('ios_app_request_refresh', handleManualRefresh);
  }, [triggerRefresh, isRefreshing]);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isRefreshing) return;
    const target = e.target as HTMLElement | null;

    // Check if user is scrolled down in any inner scrollable element
    const scrollContainer = target?.closest('.overflow-y-auto, .overflow-auto') as HTMLElement | null;
    if (scrollContainer && scrollContainer.scrollTop > 2) {
      return;
    }

    startYRef.current = e.touches[0].clientY;
    isPullingRef.current = true;
    primedSoundFiredRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPullingRef.current || startYRef.current === null || disabled || isRefreshing) return;

    const currentY = e.touches[0].clientY;
    const rawDelta = currentY - startYRef.current;

    // Only handle downward pull
    if (rawDelta <= 0) {
      setPullY(0);
      return;
    }

    // Double check scroll position
    const target = e.target as HTMLElement | null;
    const scrollContainer = target?.closest('.overflow-y-auto, .overflow-auto') as HTMLElement | null;
    if (scrollContainer && scrollContainer.scrollTop > 2) {
      isPullingRef.current = false;
      setPullY(0);
      return;
    }

    // Authentic iOS resistance curve (rubber banding)
    const damped = Math.min(85, Math.pow(rawDelta, 0.82) * 1.45);
    setPullY(damped);

    if (damped >= PULL_THRESHOLD) {
      setIsPrimed(true);
      if (!primedSoundFiredRef.current) {
        sound.pullThresholdTick();
        primedSoundFiredRef.current = true;
      }
    } else {
      setIsPrimed(false);
      primedSoundFiredRef.current = false;
    }
  };

  const handleTouchEnd = () => {
    if (!isPullingRef.current || isRefreshing) return;
    isPullingRef.current = false;
    startYRef.current = null;

    if (pullY >= PULL_THRESHOLD) {
      triggerRefresh();
    } else {
      setPullY(0);
      setIsPrimed(false);
    }
  };

  // Mouse drag support for desktop preview
  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled || isRefreshing) return;
    // Only left click
    if (e.button !== 0) return;

    const target = e.target as HTMLElement | null;
    // Check if clicked near top header or inside non-scrolled container
    const scrollContainer = target?.closest('.overflow-y-auto, .overflow-auto') as HTMLElement | null;
    if (scrollContainer && scrollContainer.scrollTop > 2) {
      return;
    }

    startYRef.current = e.clientY;
    isPullingRef.current = true;
    primedSoundFiredRef.current = false;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isPullingRef.current || startYRef.current === null) return;
      const rawDelta = moveEvent.clientY - startYRef.current;
      if (rawDelta <= 0) {
        setPullY(0);
        return;
      }

      const damped = Math.min(85, Math.pow(rawDelta, 0.82) * 1.45);
      setPullY(damped);

      if (damped >= PULL_THRESHOLD) {
        setIsPrimed(true);
        if (!primedSoundFiredRef.current) {
          sound.pullThresholdTick();
          primedSoundFiredRef.current = true;
        }
      } else {
        setIsPrimed(false);
        primedSoundFiredRef.current = false;
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      if (!isPullingRef.current) return;
      isPullingRef.current = false;
      startYRef.current = null;

      if (pullY >= PULL_THRESHOLD) {
        triggerRefresh();
      } else {
        setPullY(0);
        setIsPrimed(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Pull progress ratio: 0 to 1
  const pullProgress = Math.min(1, pullY / PULL_THRESHOLD);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      className={`relative w-full h-full flex flex-col overflow-hidden select-none ${className}`}
    >
      {/* iOS Activity Indicator Header Drawer */}
      <div
        className="absolute top-0 left-0 right-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden"
        style={{
          height: `${Math.max(pullY, isRefreshing ? REFRESHING_HEIGHT : 0)}px`,
          transition: isPullingRef.current ? 'none' : 'height 0.35s cubic-bezier(0.2, 0.9, 0.3, 1)'
        }}
      >
        <div className="flex items-center justify-center gap-2 py-1">
          {justRefreshed ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold backdrop-blur-md border border-emerald-500/30"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Updated just now</span>
            </motion.div>
          ) : isRefreshing ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 text-blue-400 text-xs font-medium backdrop-blur-md border border-white/10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
              >
                <RotateCw className="w-3.5 h-3.5 text-blue-400" />
              </motion.div>
              <span className="text-[11px] text-zinc-300">Refreshing {appName}...</span>
            </div>
          ) : pullY > 8 ? (
            <motion.div
              style={{
                opacity: pullProgress,
                transform: `scale(${0.75 + pullProgress * 0.25})`
              }}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10"
            >
              <motion.div
                style={{
                  transform: `rotate(${pullY * 4.5}deg)`
                }}
              >
                <RotateCw
                  className={`w-3.5 h-3.5 transition-colors ${
                    isPrimed ? 'text-blue-400' : isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                />
              </motion.div>
              <span
                className={`text-[10px] font-medium tracking-tight ${
                  isPrimed ? 'text-blue-400 font-semibold' : 'text-zinc-400'
                }`}
              >
                {isPrimed ? 'Release to refresh' : 'Pull down to refresh'}
              </span>
            </motion.div>
          ) : null}
        </div>
      </div>

      {/* Main App Content that slides down when pulled */}
      <div
        className="flex-1 w-full h-full flex flex-col overflow-hidden"
        style={{
          transform: `translate3d(0, ${Math.max(0, pullY)}px, 0)`,
          transition: isPullingRef.current ? 'none' : 'transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1)'
        }}
      >
        {children}
      </div>

      {/* Discreet iOS Push/Tap to Refresh Pill (Accessible shortcut for click/push) */}
      <AnimatePresence>
        {!isRefreshing && !isPullingRef.current && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.4 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              triggerRefresh();
            }}
            title="Push to Refresh"
            className="absolute bottom-5 right-4 z-20 flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-white/10 shadow-lg text-[10px] backdrop-blur-md cursor-pointer transition-opacity"
          >
            <RotateCw className="w-2.5 h-2.5 text-blue-400" />
            <span className="hidden sm:inline font-medium">Push to refresh</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
