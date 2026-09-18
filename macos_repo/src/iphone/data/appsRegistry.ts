import { AppDefinition } from '../types';

export const APPS_REGISTRY: AppDefinition[] = [
  // Primary Recruiter & Professional apps (top rows)
  {
    id: 'recruiter',
    name: 'Recruiter',
    subtitle: 'Candidate Brief',
    iconName: 'Briefcase',
    gradient: 'from-blue-500 via-indigo-600 to-violet-700',
    category: 'professional',
    badge: 'Hire',
    dock: true
  },
  {
    id: 'projects',
    name: 'Projects',
    subtitle: 'RAG & AI Agents',
    iconName: 'Boxes',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    category: 'professional',
    badge: 4,
    dock: true
  },
  {
    id: 'resume',
    name: 'Resume',
    subtitle: 'CV & Experience',
    iconName: 'FileText',
    gradient: 'from-amber-500 via-orange-500 to-rose-600',
    category: 'professional',
    dock: true
  },
  {
    id: 'chatbot',
    name: 'Chatbot',
    subtitle: 'AI Twin Assistant',
    iconName: 'MessageSquareText',
    gradient: 'from-violet-500 via-purple-600 to-indigo-700',
    category: 'professional',
    badge: 'AI',
    dock: true
  },
  {
    id: 'about',
    name: 'About',
    subtitle: 'Bio & Overview',
    iconName: 'User',
    gradient: 'from-sky-400 via-blue-500 to-indigo-600',
    category: 'professional'
  },
  {
    id: 'skills',
    name: 'Skills',
    subtitle: 'Tech & Frameworks',
    iconName: 'Cpu',
    gradient: 'from-purple-500 via-fuchsia-600 to-pink-600',
    category: 'professional'
  },
  {
    id: 'experience',
    name: 'Experience',
    subtitle: 'Career Timeline',
    iconName: 'Building2',
    gradient: 'from-teal-400 via-emerald-600 to-green-700',
    category: 'professional'
  },
  {
    id: 'certifications',
    name: 'Certs',
    subtitle: '8 Credentials',
    iconName: 'Award',
    gradient: 'from-amber-400 via-yellow-500 to-orange-600',
    category: 'professional',
    badge: 8
  },
  {
    id: 'education',
    name: 'Education',
    subtitle: 'CUTM B.Tech',
    iconName: 'GraduationCap',
    gradient: 'from-cyan-500 via-sky-600 to-blue-700',
    category: 'professional'
  },
  {
    id: 'contact',
    name: 'Contact',
    subtitle: 'Get in Touch',
    iconName: 'Phone',
    gradient: 'from-green-500 via-emerald-600 to-teal-700',
    category: 'professional'
  },
  {
    id: 'safari',
    name: 'Safari',
    subtitle: 'Web Browser',
    iconName: 'Compass',
    gradient: 'from-sky-400 via-blue-500 to-blue-600',
    category: 'system'
  },
  {
    id: 'mail',
    name: 'Mail',
    subtitle: 'Inbox & Direct',
    iconName: 'Mail',
    gradient: 'from-blue-400 via-sky-500 to-indigo-500',
    category: 'system',
    badge: 1
  },
  {
    id: 'notes',
    name: 'Notes',
    subtitle: 'AI Research Log',
    iconName: 'StickyNote',
    gradient: 'from-amber-300 via-yellow-400 to-amber-500',
    category: 'system'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    subtitle: 'Milestones',
    iconName: 'Calendar',
    gradient: 'from-rose-500 via-red-500 to-rose-600',
    category: 'system'
  },
  {
    id: 'analytics',
    name: 'Analytics',
    subtitle: 'Profile Stats',
    iconName: 'BarChart3',
    gradient: 'from-indigo-500 via-violet-600 to-purple-700',
    category: 'utility'
  },
  {
    id: 'finder',
    name: 'Files',
    subtitle: 'File Browser',
    iconName: 'Folder',
    gradient: 'from-sky-400 via-blue-500 to-indigo-600',
    category: 'system'
  },
  {
    id: 'photos',
    name: 'Photos',
    subtitle: 'Architecture & Visuals',
    iconName: 'Image',
    gradient: 'from-pink-500 via-rose-500 to-orange-400',
    category: 'media'
  },
  {
    id: 'gallery',
    name: 'Gallery',
    subtitle: 'Media Portfolio',
    iconName: 'Images',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-600',
    category: 'media'
  },
  {
    id: 'music',
    name: 'Music',
    subtitle: 'Lo-Fi AI Tunes',
    iconName: 'Music',
    gradient: 'from-rose-500 via-pink-600 to-red-600',
    category: 'media'
  },
  {
    id: 'videos',
    name: 'Videos',
    subtitle: 'Tech Demos',
    iconName: 'Video',
    gradient: 'from-red-500 via-rose-600 to-orange-600',
    category: 'media'
  },
  {
    id: 'camera',
    name: 'Camera',
    subtitle: 'Vision Scanner',
    iconName: 'Camera',
    gradient: 'from-zinc-700 via-zinc-800 to-zinc-900',
    category: 'system'
  },
  {
    id: 'games',
    name: 'Games',
    subtitle: 'Neural Run',
    iconName: 'Gamepad2',
    gradient: 'from-purple-600 via-pink-600 to-rose-500',
    category: 'media'
  },
  {
    id: 'favorites',
    name: 'Favorites',
    subtitle: 'Favorite Shows',
    iconName: 'Heart',
    gradient: 'from-red-500 via-rose-500 to-pink-600',
    category: 'media'
  },
  {
    id: 'utility',
    name: 'Utility',
    subtitle: 'QR & Token Calc',
    iconName: 'Wrench',
    gradient: 'from-slate-600 via-zinc-700 to-neutral-800',
    category: 'utility'
  },
  {
    id: 'systeminfo',
    name: 'System',
    subtitle: 'About iPhone 15',
    iconName: 'Info',
    gradient: 'from-zinc-600 via-slate-700 to-zinc-800',
    category: 'system'
  },
  {
    id: 'settings',
    name: 'Settings',
    subtitle: 'Preferences',
    iconName: 'Settings',
    gradient: 'from-zinc-500 via-slate-600 to-zinc-700',
    category: 'system'
  },
  {
    id: 'trash',
    name: 'Trash',
    subtitle: 'Recently Deleted',
    iconName: 'Trash2',
    gradient: 'from-zinc-600 via-zinc-700 to-zinc-800',
    category: 'system'
  }
];
