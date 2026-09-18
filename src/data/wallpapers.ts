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
  {
    id: 'dynamic-aurora',
    name: 'iOS 18 Aurora',
    category: 'dynamic',
    className: 'wallpaper-aurora',
    dominantColor: '#3B2667',
    textColor: 'light',
    thumbnailStyle: 'linear-gradient(135deg, #091236 0%, #1E215D 30%, #3B2667 60%, #154563 100%)',
    description: 'Dynamic animated atmospheric mesh with shifting polar tones'
  },
  {
    id: 'dynamic-neon-flow',
    name: 'Cosmic Nebula',
    category: 'dynamic',
    className: 'wallpaper-neon-flow',
    dominantColor: '#4f46e5',
    textColor: 'light',
    thumbnailStyle: 'radial-gradient(circle at 20% 30%, #4f46e5, #030712)',
    description: 'Animated pulsating multi-chromatic deep space gradient'
  },
  {
    id: 'dynamic-solstice',
    name: 'Solar Horizon',
    category: 'dynamic',
    className: 'wallpaper-solstice',
    dominantColor: '#f97316',
    textColor: 'light',
    thumbnailStyle: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #1e1b4b 100%)',
    description: 'Radiant twilight glow with smooth chromatic pulse'
  },
  {
    id: 'dark-astronomy',
    name: 'Deep Astronomy',
    category: 'dark',
    className: 'bg-gradient-to-b from-slate-950 via-zinc-950 to-black',
    dominantColor: '#0A84FF',
    textColor: 'light',
    thumbnailStyle: 'linear-gradient(180deg, #020617 0%, #09090b 60%, #000000 100%)',
    description: 'Apple Astronomy dark tone with deep true-black contrast'
  },
  {
    id: 'dark-titanium',
    name: 'Black Titanium',
    category: 'dark',
    className: 'bg-gradient-to-tr from-zinc-950 via-neutral-900 to-zinc-800',
    dominantColor: '#8E8E93',
    textColor: 'light',
    thumbnailStyle: 'linear-gradient(135deg, #09090b 0%, #1c1917 50%, #27272a 100%)',
    description: 'Industrial matte titanium luster with micro-contrast sheen'
  },
  {
    id: 'dark-emerald-ray',
    name: 'Cyber Matrix',
    category: 'dark',
    className: 'bg-gradient-to-br from-emerald-950 via-zinc-950 to-black',
    dominantColor: '#30D158',
    textColor: 'light',
    thumbnailStyle: 'linear-gradient(135deg, #022c22 0%, #052e16 40%, #000000 100%)',
    description: 'Subtle deep emerald luminescence for neural network engineering'
  },
  {
    id: 'light-solstice',
    name: 'Solstice Light',
    category: 'light',
    className: 'bg-gradient-to-b from-sky-100 via-indigo-50 to-zinc-100',
    dominantColor: '#0A84FF',
    textColor: 'dark',
    thumbnailStyle: 'linear-gradient(180deg, #e0f2fe 0%, #eef2ff 50%, #f4f4f5 100%)',
    description: 'Crisp high-clarity daylight gradient with subtle pastel hue'
  },
  {
    id: 'light-prism',
    name: 'Prism Pure',
    category: 'light',
    className: 'bg-gradient-to-tr from-rose-50 via-amber-50 to-teal-50',
    dominantColor: '#FF9F0A',
    textColor: 'dark',
    thumbnailStyle: 'linear-gradient(135deg, #fff1f2 0%, #fffbeb 50%, #f0fdfa 100%)',
    description: 'Soft optical rainbow dispersion on refined warm white canvas'
  }
];

export const getWallpaperById = (id: string): Wallpaper => {
  return WALLPAPERS.find((w) => w.id === id) || WALLPAPERS[0];
};
