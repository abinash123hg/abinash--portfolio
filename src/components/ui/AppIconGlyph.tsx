import React from 'react';
import {
  Briefcase,
  Boxes,
  FileText,
  MessageSquareText,
  User,
  Cpu,
  Building2,
  Award,
  GraduationCap,
  Phone,
  Compass,
  Mail,
  StickyNote,
  Calendar,
  BarChart3,
  Folder,
  Image,
  Images,
  Music,
  Video,
  Camera,
  Gamepad2,
  Heart,
  Wrench,
  Info,
  Settings,
  Trash2
} from 'lucide-react';

interface AppIconGlyphProps {
  name: string;
  className?: string;
}

export const AppIconGlyph: React.FC<AppIconGlyphProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Boxes':
      return <Boxes className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'MessageSquareText':
      return <MessageSquareText className={className} />;
    case 'User':
      return <User className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Building2':
      return <Building2 className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Phone':
      return <Phone className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Mail':
      return <Mail className={className} />;
    case 'StickyNote':
      return <StickyNote className={className} />;
    case 'Calendar':
      return <Calendar className={className} />;
    case 'BarChart3':
      return <BarChart3 className={className} />;
    case 'Folder':
      return <Folder className={className} />;
    case 'Image':
      return <Image className={className} />;
    case 'Images':
      return <Images className={className} />;
    case 'Music':
      return <Music className={className} />;
    case 'Video':
      return <Video className={className} />;
    case 'Camera':
      return <Camera className={className} />;
    case 'Gamepad2':
      return <Gamepad2 className={className} />;
    case 'Heart':
      return <Heart className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Info':
      return <Info className={className} />;
    case 'Settings':
      return <Settings className={className} />;
    case 'Trash2':
      return <Trash2 className={className} />;
    default:
      return <Boxes className={className} />;
  }
};
