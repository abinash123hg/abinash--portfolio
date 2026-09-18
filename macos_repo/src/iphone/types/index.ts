export type AppId =
  | 'recruiter'
  | 'about'
  | 'projects'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'skills'
  | 'resume'
  | 'chatbot'
  | 'contact'
  | 'safari'
  | 'analytics'
  | 'photos'
  | 'gallery'
  | 'music'
  | 'notes'
  | 'calendar'
  | 'camera'
  | 'games'
  | 'favorites'
  | 'videos'
  | 'finder'
  | 'settings'
  | 'systeminfo'
  | 'mail'
  | 'utility'
  | 'trash'
  | 'cv'
  | 'certificatepreview'
  | 'certificate-preview';

export interface AppDefinition {
  id: AppId;
  name: string;
  subtitle?: string;
  iconName: string;
  gradient: string;
  iconColor?: string;
  category: 'professional' | 'system' | 'media' | 'utility';
  badge?: number | string;
  dock?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  architecture: string[];
  highlights: string[];
  challenges?: string;
  results?: string;
  evaluation?: string;
  githubUrl: string;
  liveDemoUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  responsibilities: string[];
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  specialization?: string;
  location?: string;
  period: string;
  cgpa?: string;
  focus?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  skills: string[];
  accentColor: string;
  badgeLabel: string;
  imageSrc?: string;
  pdfUrl?: string;
  description?: string;
}

export interface FavoriteShow {
  title: string;
  genre: string;
  rating: string;
  color: string;
  quote: string;
  posterSrc: string;
  synopsis?: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  date?: string;
  location?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  filename?: string;
  url: string;
  duration: string;
  category: string;
  description: string;
  posterBg?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  audioUrl: string;
  coverColor: string;
  genre?: string;
}

export interface ControlCenterTileConfig {
  id: string;
  title: string;
  category: 'connectivity' | 'display' | 'media' | 'utility' | 'capture' | 'accessibility';
  size: '1x1' | '2x1' | '2x2';
  icon: string;
  isRemovable?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: 1 | 2 | 3 | 4 | 5; // signal strength bars
    highlight?: boolean;
    tags?: string[];
  }[];
}

export interface NoteItem {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'milestone' | 'certification' | 'internship';
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; appId?: AppId; action?: () => void }[];
}

export type PortfolioData = any;

