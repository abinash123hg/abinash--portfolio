import React from 'react';
import { motion } from 'motion/react';
import { Moon, Briefcase, User, Bed, Check, X } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface Props {
  onClose: () => void;
}

const FOCUS_MODES = [
  { id: 'dnd', label: 'Do Not Disturb', icon: Moon, desc: 'Silence incoming calls & notifications' },
  { id: 'work', label: 'Work', icon: Briefcase, desc: 'Prioritize AI coding, GitHub & recruiter emails' },
  { id: 'personal', label: 'Personal', icon: User, desc: 'Focus on learning papers and personal growth' },
  { id: 'sleep', label: 'Sleep', icon: Bed, desc: 'Dim screen and mute all sound alerts' }
] as const;

export const ExpandedFocusSheet: React.FC<Props> = ({ onClose }) => {
  const {
    focusMode,
    toggleFocusMode,
    focusModeType,
    setFocusModeType
  } = useOSStore();

  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.88, opacity: 0, y: 30 }}
      transition={{ type: 'spring', damping: 28, stiffness: 340 }}
      className="w-full max-w-[320px] rounded-[34px] bg-zinc-900/90 backdrop-blur-3xl border border-white/20 shadow-2xl p-5 text-white select-none relative"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Focus Modes</span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 active:scale-95 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {FOCUS_MODES.map((mode) => {
          const isSelected = focusMode && focusModeType === mode.id;
          const Icon = mode.icon;
          return (
            <div
              key={mode.id}
              onClick={() => {
                if (isSelected) {
                  toggleFocusMode();
                } else {
                  setFocusModeType(mode.id as any);
                }
              }}
              className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                isSelected
                  ? 'bg-indigo-600/30 border-indigo-500/60 text-white'
                  : 'bg-white/5 border-white/5 hover:bg-white/10 text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-indigo-500 text-white' : 'bg-white/10 text-zinc-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-semibold">{mode.label}</p>
                  <p className="text-[10px] text-zinc-400">{mode.desc}</p>
                </div>
              </div>
              {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
