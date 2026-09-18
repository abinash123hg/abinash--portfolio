import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Play, Pause, RotateCcw, X } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { sound } from '../../utils/audioHaptics';

interface Props {
  onClose: () => void;
}

const PRESETS = [
  { label: '1 min', seconds: 60 },
  { label: '5 min', seconds: 300 },
  { label: '15 min', seconds: 900 },
  { label: '30 min', seconds: 1800 }
];

export const ExpandedTimerSheet: React.FC<Props> = ({ onClose }) => {
  const { showToast } = useOSStore();
  const [remaining, setRemaining] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && remaining > 0) {
      timer = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            sound.notificationPing();
            showToast({
              id: 'timer-done',
              title: 'Timer Complete',
              subtitle: 'Focus session finished successfully.'
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, remaining]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.88, opacity: 0, y: 30 }}
      transition={{ type: 'spring', damping: 28, stiffness: 340 }}
      className="w-full max-w-[300px] rounded-[34px] bg-zinc-900/90 backdrop-blur-3xl border border-white/20 shadow-2xl p-5 text-white select-none relative flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Quick Timer</span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 active:scale-95 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Timer Display */}
      <div className="text-4xl font-bold font-mono tracking-tight my-2 text-amber-400 drop-shadow">
        {timeFormatted}
      </div>

      {/* Preset pills */}
      <div className="grid grid-cols-4 gap-1.5 w-full my-4">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => {
              setRemaining(p.seconds);
              setIsRunning(false);
            }}
            className={`py-1.5 rounded-xl border text-[11px] font-semibold transition-all ${
              remaining === p.seconds
                ? 'bg-amber-500 text-zinc-950 border-amber-400 font-bold'
                : 'bg-white/10 border-white/10 text-zinc-300 hover:bg-white/15'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={() => {
            setIsRunning(false);
            setRemaining(300);
          }}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/15 text-zinc-300 flex items-center justify-center active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all ${
            isRunning ? 'bg-amber-600 text-white' : 'bg-amber-500 text-zinc-950'
          }`}
        >
          {isRunning ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
        </button>
      </div>
    </motion.div>
  );
};
