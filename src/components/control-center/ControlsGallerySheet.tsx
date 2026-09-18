import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Plus,
  Check,
  X,
  Sliders,
  Sun,
  Volume2,
  Wifi,
  Radio,
  Flame,
  Clock,
  Calculator,
  Camera,
  FileText,
  Video,
  Battery,
  Share2,
  ShieldCheck,
  Sparkles,
  Mic,
  RotateCw,
  Moon
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface Props {
  onClose: () => void;
}

interface GalleryControl {
  id: string;
  name: string;
  category: 'Connectivity' | 'Display' | 'Utilities' | 'Media' | 'Portfolio';
  description: string;
  icon: any;
  color: string;
}

const ALL_GALLERY_CONTROLS: GalleryControl[] = [
  { id: 'connectivity', name: 'Network Bundle', category: 'Connectivity', description: 'Airplane, Wi-Fi, Bluetooth, Cellular 4-in-1 tile', icon: Wifi, color: 'bg-blue-600' },
  { id: 'cellular_solo', name: 'Cellular Data', category: 'Connectivity', description: 'Direct toggle for 5G mobile data', icon: Radio, color: 'bg-emerald-600' },
  { id: 'airdrop_solo', name: 'AirDrop', category: 'Connectivity', description: 'Quick toggle AirDrop visibility mode', icon: Share2, color: 'bg-blue-500' },
  { id: 'vpn_solo', name: 'VPN Security', category: 'Connectivity', description: 'WireGuard enterprise encryption status', icon: ShieldCheck, color: 'bg-indigo-600' },

  { id: 'brightness', name: 'Brightness Slider', category: 'Display', description: 'Vertical smooth screen illumination controller', icon: Sun, color: 'bg-amber-500' },
  { id: 'volume', name: 'Volume Slider', category: 'Display', description: 'Vertical smooth sound and audio controller', icon: Volume2, color: 'bg-zinc-700' },
  { id: 'dark_mode_solo', name: 'Dark Mode', category: 'Display', description: 'Toggle between dark and light appearance', icon: Moon, color: 'bg-purple-600' },
  { id: 'text_size', name: 'Text Size', category: 'Display', description: 'Scale interface font accessibility sizing', icon: Sliders, color: 'bg-blue-700' },
  { id: 'orientation', name: 'Orientation Lock', category: 'Display', description: 'Lock screen rotation mode', icon: RotateCw, color: 'bg-red-600' },

  { id: 'media', name: 'Now Playing Widget', category: 'Media', description: 'Compact track playback controls and album art', icon: Sparkles, color: 'bg-pink-600' },
  { id: 'voice_memos', name: 'Voice Memos', category: 'Media', description: 'Quick microphone audio note recorder', icon: Mic, color: 'bg-red-500' },

  { id: 'flashlight', name: 'Flashlight Torch', category: 'Utilities', description: '4-level LED beam screen torch', icon: Flame, color: 'bg-amber-500' },
  { id: 'timer', name: 'Quick Timer', category: 'Utilities', description: 'Countdown timer with 1m/5m/15m presets', icon: Clock, color: 'bg-amber-600' },
  { id: 'calculator', name: 'Mini Calculator', category: 'Utilities', description: 'Quick mathematical calculations popover', icon: Calculator, color: 'bg-amber-500' },
  { id: 'camera', name: 'Camera', category: 'Utilities', description: 'Launch camera capture lens', icon: Camera, color: 'bg-zinc-800' },
  { id: 'notes', name: 'Quick Notes', category: 'Utilities', description: 'Draft candidate ideas or task notes', icon: FileText, color: 'bg-amber-400' },
  { id: 'screen_recording', name: 'Screen Recording', category: 'Utilities', description: '3-second countdown video screen capture', icon: Video, color: 'bg-red-600' },
  { id: 'low_power', name: 'Low Power Mode', category: 'Utilities', description: 'Conserve battery and optimize performance', icon: Battery, color: 'bg-amber-500' },

  { id: 'resume_shortcut', name: 'Candidate Resume', category: 'Portfolio', description: 'Instant 1-tap download & view of official PDF', icon: FileText, color: 'bg-blue-600' },
  { id: 'recruiter_brief', name: 'Recruiter Brief', category: 'Portfolio', description: 'Quick summary for hiring managers & engineers', icon: Sparkles, color: 'bg-emerald-600' }
];

const CATEGORIES = ['All', 'Connectivity', 'Display', 'Utilities', 'Media', 'Portfolio'] as const;

export const ControlsGallerySheet: React.FC<Props> = ({ onClose }) => {
  const { controlCenterTiles, addCCTile, removeCCTile, resetCCTiles } = useOSStore();
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = ALL_GALLERY_CONTROLS.filter((ctrl) => {
    const matchesCat = selectedCat === 'All' || ctrl.category === selectedCat;
    const matchesSearch =
      ctrl.name.toLowerCase().includes(search.toLowerCase()) ||
      ctrl.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      className="absolute inset-x-0 bottom-0 top-16 z-50 rounded-t-[36px] bg-zinc-950/95 backdrop-blur-3xl border-t border-white/20 shadow-2xl p-4 flex flex-col text-white select-none overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 shrink-0">
        <div>
          <h2 className="text-sm font-bold tracking-tight">Controls Gallery</h2>
          <p className="text-[11px] text-zinc-400">Add or remove iOS 18 Control Center widgets</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetCCTiles}
            className="text-[11px] font-semibold text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded-lg bg-white/5 active:scale-95"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 active:scale-95 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-3 shrink-0">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search controls..."
          className="w-full bg-white/10 border border-white/10 rounded-2xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-all"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2.5 mb-2 shrink-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
              selectedCat === cat
                ? 'bg-white text-zinc-950 font-bold'
                : 'bg-white/10 text-zinc-400 hover:bg-white/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Control Tiles Grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pb-6">
        {filtered.map((ctrl) => {
          const isAdded = controlCenterTiles.includes(ctrl.id);
          const Icon = ctrl.icon;
          return (
            <div
              key={ctrl.id}
              className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                isAdded
                  ? 'bg-zinc-900/80 border-white/15'
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl ${ctrl.color} flex items-center justify-center text-white shadow-md shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">{ctrl.name}</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">{ctrl.description}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (isAdded) {
                    removeCCTile(ctrl.id);
                  } else {
                    addCCTile(ctrl.id);
                  }
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all active:scale-90 ${
                  isAdded
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                }`}
                title={isAdded ? 'Remove tile' : 'Add tile'}
              >
                {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
