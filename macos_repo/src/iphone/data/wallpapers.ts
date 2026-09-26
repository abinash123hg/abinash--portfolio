export interface Wallpaper {
  id: string;
  name: string;
  category: 'dynamic' | 'dark' | 'light';
  className: string;
  dominantColor: string;
  textColor: 'light' | 'dark';
  thumbnailStyle: string;
  description: string;
}

export const WALLPAPERS: Wallpaper[] = [
  // iPhone-inspired layered wallpapers: lightweight CSS gradients keep the preview fast and offline.
  {
    id: 'ios-blue-ripple',
    name: 'Blue Ripple',
    category: 'dynamic',
    className: 'wallpaper-ios-blue-ripple',
    dominantColor: '#1777c8',
    textColor: 'light',
    thumbnailStyle: 'radial-gradient(circle at 30% 20%, #8be7ff 0%, #1777c8 38%, #071a4b 100%)',
    description: 'Blue iPhone-style ocean ripple with soft daylight highlights'
  },
  {
    id: 'ios-purple-orbit',
    name: 'Purple Orbit',
    category: 'dynamic',
    className: 'wallpaper-ios-purple-orbit',
    dominantColor: '#7c3aed',
    textColor: 'light',
    thumbnailStyle: 'radial-gradient(circle at 70% 18%, #f0abfc 0%, #7c3aed 42%, #180b35 100%)',
    description: 'Deep violet iPhone-inspired orbital gradient'
  },
  {
    id: 'ios-sunset-glow',
    name: 'Sunset Glow',
    category: 'light',
    className: 'wallpaper-ios-sunset-glow',
    dominantColor: '#f97316',
    textColor: 'dark',
    thumbnailStyle: 'linear-gradient(150deg, #ffd6a5 0%, #f97316 45%, #9d174d 100%)',
    description: 'Warm coral sunset gradient inspired by iPhone wallpapers'
  },
  // --- Dynamic Animated Wallpapers ---
  {
    id: 'dynamic-aurora',
    name: 'iOS 18 Aurora',
    category: 'dynamic',
    className: 'wallpaper-aurora',
    dominantColor: '#3B2667',
    textColor: 'light',
    thumbnailStyle: 'linear-gradient(135deg, #091236 0%, #1e1b4b 25%, #3b1d60 50%, #0f3747 75%, #051923 100%)',
    description: 'Dynamic animated atmospheric mesh with shifting polar tones'
  },
  {
    id: 'dynamic-neon-flow',
    name: 'Cosmic Nebula',
    category: 'dynamic',
    className: 'wallpaper-neon-flow',
    dominantColor: '#4f46e5',
    textColor: 'light',
    thumbnailStyle: 'radial-gradient(circle at 30% 35%, #4f46e5 0%, #7c3aed 35%, #180828 70%, #030712 100%)',
    description: 'Animated pulsating multi-chromatic deep space gradient'
  },
  {
    id: 'dynamic-solstice',
    name: 'Solar Horizon',
    category: 'dynamic',
    className: 'wallpaper-solstice',
    dominantColor: '#ea580c',
    textColor: 'light',
    thumbnailStyle: 'linear-gradient(135deg, #ea580c 0%, #db2777 35%, #4c1d95 70%, #09090b 100%)',
    description: 'Radiant twilight glow with smooth chromatic pulse'
  },
  {
    id: 'dynamic-laguna',
    name: 'Laguna Deep',
    category: 'dynamic',
    className: 'wallpaper-laguna',
    dominantColor: '#0284c7',
    textColor: 'light',
    thumbnailStyle: 'linear-gradient(145deg, #0284c7 0%, #0369a1 25%, #1e1b4b 65%, #020617 100%)',
    description: 'Flowing Pacific azure and cobalt ocean shimmer'
  },

  // --- Dark Stills ---
  {
    id: 'dark-astronomy',
    name: 'Deep Astronomy',
    category: 'dark',
    className: 'wallpaper-astronomy',
    dominantColor: '#0A84FF',
    textColor: 'light',
    thumbnailStyle: 'radial-gradient(circle at 50% 20%, #1e293b 0%, #090d16 50%, #000000 100%)',
    description: 'Apple Astronomy dark tone with deep true-black contrast'
  },
  {
    id: 'dark-titanium',
    name: 'Black Titanium',
    category: 'dark',
    className: 'wallpaper-titanium',
    dominantColor: '#8E8E93',
    textColor: 'light',
    thumbnailStyle: 'linear-gradient(135deg, #27272a 0%, #18181b 35%, #09090b 70%, #141417 100%)',
    description: 'Industrial matte titanium luster with micro-contrast sheen'
  },
  {
    id: 'dark-emerald-ray',
    name: 'Cyber Matrix',
    category: 'dark',
    className: 'wallpaper-cyber-matrix',
    dominantColor: '#30D158',
    textColor: 'light',
    thumbnailStyle: 'radial-gradient(circle at 70% 30%, #064e3b 0%, #022c22 35%, #051410 70%, #000000 100%)',
    description: 'Subtle deep emerald luminescence for neural network engineering'
  },
  {
    id: 'dark-midnight-slate',
    name: 'Midnight Slate',
    category: 'dark',
    className: 'wallpaper-midnight-slate',
    dominantColor: '#38bdf8',
    textColor: 'light',
    thumbnailStyle: 'linear-gradient(180deg, #0f172a 0%, #020617 60%, #000000 100%)',
    description: 'Refined minimalist charcoal with cool night blue tones'
  },

  // --- Light Stills ---
  {
    id: 'light-solstice',
    name: 'Solstice Light',
    category: 'light',
    className: 'wallpaper-solstice-light',
    dominantColor: '#0A84FF',
    textColor: 'dark',
    thumbnailStyle: 'linear-gradient(180deg, #e0f2fe 0%, #e0e7ff 35%, #f5f3ff 70%, #fafafa 100%)',
    description: 'Crisp high-clarity daylight gradient with subtle pastel hue'
  },
  {
    id: 'light-prism',
    name: 'Prism Pure',
    category: 'light',
    className: 'wallpaper-prism-light',
    dominantColor: '#FF9F0A',
    textColor: 'dark',
    thumbnailStyle: 'linear-gradient(135deg, #fff1f2 0%, #fffbeb 30%, #f0fdf4 65%, #f0f9ff 100%)',
    description: 'Soft optical rainbow dispersion on refined warm white canvas'
  },
  {
    id: 'light-quartz',
    name: 'Silver Quartz',
    category: 'light',
    className: 'wallpaper-quartz-light',
    dominantColor: '#64748b',
    textColor: 'dark',
    thumbnailStyle: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
    description: 'Serene arctic silver with frosted glass and cool daylight'
  },
  {
    id: 'light-golden-hour',
    name: 'Golden Hour',
    category: 'light',
    className: 'wallpaper-golden-hour',
    dominantColor: '#f59e0b',
    textColor: 'dark',
    thumbnailStyle: 'linear-gradient(155deg, #fef3c7 0%, #fed7aa 35%, #fbcfe8 75%, #f1f5f9 100%)',
    description: 'Soft California dusk amber, blush silk and golden horizon'
  }
];

export const getWallpaperById = (id: string): Wallpaper => {
  return WALLPAPERS.find((w) => w.id === id) || WALLPAPERS[0];
};
