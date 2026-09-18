import React from 'react';
import { motion } from 'motion/react';
import { Flame, X } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface Props {
  onClose: () => void;
}

export const ExpandedFlashlightSheet: React.FC<Props> = ({ onClose }) => {
  const {
    flashlight,
    flashlightLevel,
    setFlashlightLevel,
    toggleFlashlight
  } = useOSStore();

  const levels: (1 | 2 | 3 | 4)[] = [4, 3, 2, 1];

  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.88, opacity: 0, y: 30 }}
      transition={{ type: 'spring', damping: 28, stiffness: 340 }}
      className="w-full max-w-[280px] rounded-[34px] bg-zinc-900/90 backdrop-blur-3xl border border-white/20 shadow-2xl p-5 text-white select-none relative flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Flashlight</span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 active:scale-95 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 4-level stacked segmented bar */}
      <div className="w-24 h-56 rounded-[30px] bg-zinc-800/80 border border-white/20 p-2 flex flex-col justify-between gap-1.5 shadow-inner">
        {levels.map((lvl) => {
          const isActive = flashlight && flashlightLevel >= lvl;
          return (
            <button
              key={lvl}
              onClick={() => {
                if (!flashlight) toggleFlashlight();
                setFlashlightLevel(lvl);
              }}
              className={`flex-1 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-400 shadow-md shadow-amber-500/30'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            />
          );
        })}
      </div>

      {/* Power Button */}
      <button
        onClick={toggleFlashlight}
        className={`mt-5 px-6 py-2.5 rounded-2xl border font-bold text-xs flex items-center gap-2 transition-all active:scale-95 ${
          flashlight
            ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-lg shadow-amber-500/20'
            : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
        }`}
      >
        <Flame className="w-4 h-4" />
        <span>{flashlight ? 'Turn Off' : 'Turn On'}</span>
      </button>
    </motion.div>
  );
};
