import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Smartphone, Headphones, Laptop, Check, X } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface Props {
  onClose: () => void;
}

const OUTPUT_DEVICES = [
  { id: 'speaker', name: 'iPhone Speaker', icon: Smartphone, type: 'Internal' },
  { id: 'airpods', name: 'AirPods Pro (2nd Gen)', icon: Headphones, type: 'Spatial Audio' },
  { id: 'macbook', name: 'MacBook Pro M3 Max', icon: Laptop, type: 'AirPlay' }
] as const;

export const ExpandedVolumeSheet: React.FC<Props> = ({ onClose }) => {
  const {
    volume,
    setVolume,
    activeAudioOutput,
    setActiveAudioOutput
  } = useOSStore();

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const offsetY = rect.bottom - e.clientY;
    const height = rect.height;
    const percentage = Math.max(0, Math.min(100, Math.round((offsetY / height) * 100)));
    setVolume(percentage);
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
          <Volume2 className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Volume & Audio</span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 active:scale-95 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Giant Vertical Volume Slider */}
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
          style={{ height: `${volume}%` }}
        />

        {/* Center icon & percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-6 pointer-events-none text-zinc-900 mix-blend-difference">
          {volume === 0 ? (
            <VolumeX className="w-8 h-8 stroke-[2.2]" />
          ) : (
            <Volume2 className="w-8 h-8 stroke-[2.2]" />
          )}
          <span className="text-base font-bold font-mono tracking-tight">{volume}%</span>
        </div>
      </div>

      {/* Output Device Selector */}
      <div className="w-full mt-5 space-y-1.5">
        <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 px-1 mb-1">
          Audio Destination
        </p>

        {OUTPUT_DEVICES.map((dev) => {
          const isSelected = activeAudioOutput === dev.id;
          const Icon = dev.icon;
          return (
            <div
              key={dev.id}
              onClick={() => setActiveAudioOutput(dev.id as any)}
              className={`p-2.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                isSelected
                  ? 'bg-blue-600/30 border-blue-500/50 text-white'
                  : 'bg-white/5 border-white/5 hover:bg-white/10 text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-blue-500 text-white' : 'bg-white/10 text-zinc-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-semibold">{dev.name}</p>
                  <p className="text-[10px] text-zinc-400">{dev.type}</p>
                </div>
              </div>
              {isSelected && <Check className="w-4 h-4 text-blue-400" />}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
