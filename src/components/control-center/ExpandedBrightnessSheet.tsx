import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Sparkles, Eye, X } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface Props {
  onClose: () => void;
}

export const ExpandedBrightnessSheet: React.FC<Props> = ({ onClose }) => {
  const {
    brightness,
    setBrightness,
    theme,
    setTheme,
    nightShift,
    toggleNightShift,
    trueTone,
    toggleTrueTone
  } = useOSStore();

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientY = e.clientY;
    const offsetY = rect.bottom - clientY;
    const height = rect.height;
    const percentage = Math.max(10, Math.min(100, Math.round((offsetY / height) * 100)));
    setBrightness(percentage);
  };

  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.88, opacity: 0, y: 30 }}
      transition={{ type: 'spring', damping: 28, stiffness: 340 }}
      className="w-full max-w-[320px] rounded-[34px] bg-zinc-900/90 backdrop-blur-3xl border border-white/20 shadow-2xl p-5 text-white select-none relative flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Display & Brightness</span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 active:scale-95 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Giant Vertical Slider */}
      <div
        ref={sliderRef}
        onPointerDown={(e) => {
          setIsDragging(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          handlePointer(e);
        }}
        onPointerMove={(e) => {
          if (isDragging) handlePointer(e);
        }}
        onPointerUp={(e) => {
          setIsDragging(false);
          try {
            e.currentTarget.releasePointerCapture(e.pointerId);
          } catch {}
        }}
        className="w-28 h-56 rounded-[32px] bg-zinc-800/80 border border-white/20 relative overflow-hidden cursor-pointer shadow-inner touch-none flex flex-col justify-end items-center"
      >
        {/* Fill level */}
        <div
          className="w-full bg-white transition-all pointer-events-none rounded-b-[30px]"
          style={{ height: `${brightness}%` }}
        />

        {/* Center icon & percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-6 pointer-events-none text-zinc-900 mix-blend-difference">
          <Sun className="w-8 h-8 stroke-[2.2]" />
          <span className="text-base font-bold font-mono tracking-tight">{brightness}%</span>
        </div>
      </div>

      {/* 3 Pill Toggles at bottom */}
      <div className="grid grid-cols-3 gap-2.5 w-full mt-6">
        {/* Dark Mode */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`py-3 px-1.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
            theme === 'dark'
              ? 'bg-blue-600/30 border-blue-500/60 text-white'
              : 'bg-white/10 border-white/10 text-zinc-400 hover:bg-white/15'
          }`}
        >
          <Moon className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-zinc-400'}`} />
          <span className="text-[10px] font-semibold text-center leading-tight">Dark Mode</span>
          <span className="text-[9px] opacity-70 font-mono">{theme === 'dark' ? 'On' : 'Off'}</span>
        </button>

        {/* Night Shift */}
        <button
          onClick={toggleNightShift}
          className={`py-3 px-1.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
            nightShift
              ? 'bg-amber-600/30 border-amber-500/60 text-white'
              : 'bg-white/10 border-white/10 text-zinc-400 hover:bg-white/15'
          }`}
        >
          <Eye className={`w-4 h-4 ${nightShift ? 'text-amber-400' : 'text-zinc-400'}`} />
          <span className="text-[10px] font-semibold text-center leading-tight">Night Shift</span>
          <span className="text-[9px] opacity-70 font-mono">{nightShift ? 'On' : 'Off'}</span>
        </button>

        {/* True Tone */}
        <button
          onClick={toggleTrueTone}
          className={`py-3 px-1.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
            trueTone
              ? 'bg-blue-600/30 border-blue-500/60 text-white'
              : 'bg-white/10 border-white/10 text-zinc-400 hover:bg-white/15'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${trueTone ? 'text-blue-400' : 'text-zinc-400'}`} />
          <span className="text-[10px] font-semibold text-center leading-tight">True Tone</span>
          <span className="text-[9px] opacity-70 font-mono">{trueTone ? 'On' : 'Off'}</span>
        </button>
      </div>
    </motion.div>
  );
};
