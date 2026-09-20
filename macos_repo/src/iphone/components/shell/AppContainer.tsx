import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOSStore } from '../../store/useOSStore';

// App Components
import { RecruiterApp } from '../../apps/RecruiterApp';
import { AboutApp } from '../../apps/AboutApp';
import { ProjectsApp } from '../../apps/ProjectsApp';
import { ExperienceApp } from '../../apps/ExperienceApp';
import { EducationApp } from '../../apps/EducationApp';
import { CertificationsApp } from '../../apps/CertificationsApp';
import { SkillsApp } from '../../apps/SkillsApp';
import { ResumeApp } from '../../apps/ResumeApp';
import { ChatbotApp } from '../../apps/ChatbotApp';
import { ContactApp } from '../../apps/ContactApp';
import { SafariApp } from '../../apps/SafariApp';
import { NotesApp } from '../../apps/NotesApp';
import { CalendarApp } from '../../apps/CalendarApp';
import { MusicApp } from '../../apps/MusicApp';
import { PhotosApp } from '../../apps/PhotosApp';
import { CameraApp } from '../../apps/CameraApp';
import { GamesApp } from '../../apps/GamesApp';
import { FavoritesApp } from '../../apps/FavoritesApp';
import { FinderApp } from '../../apps/FinderApp';
import { MailApp } from '../../apps/MailApp';
import { AnalyticsApp } from '../../apps/AnalyticsApp';
import { SettingsApp } from '../../apps/SettingsApp';
import { SystemInfoApp } from '../../apps/SystemInfoApp';
import { UtilityApp } from '../../apps/UtilityApp';
import { TrashApp } from '../../apps/TrashApp';
import { VideosApp } from '../../apps/VideosApp';
import { CVApp } from '../../apps/CVApp';
import { CertificatePreview } from '../../apps/CertificatePreview';
import { EmptyState } from '../../apps/EmptyState';
import { PullToRefresh } from '../ui/PullToRefresh';
import { APPS_REGISTRY } from '../../data/appsRegistry';

export const AppContainer: React.FC = () => {
  const { activeApp, theme } = useOSStore();
  const isDark = theme === 'dark';

  const activeAppMeta = APPS_REGISTRY.find((a) => a.id === activeApp);
  const appTitle = activeAppMeta?.name || (activeApp ? activeApp.charAt(0).toUpperCase() + activeApp.slice(1) : 'App');

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'recruiter':
        return <RecruiterApp />;
      case 'about':
        return <AboutApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'experience':
        return <ExperienceApp />;
      case 'education':
        return <EducationApp />;
      case 'certifications':
        return <CertificationsApp />;
      case 'certificatepreview':
      case 'certificate-preview':
        return <CertificatePreview />;
      case 'skills':
        return <SkillsApp />;
      case 'resume':
        return <ResumeApp />;
      case 'cv':
        return <CVApp />;
      case 'chatbot':
        return <ChatbotApp />;
      case 'contact':
        return <ContactApp />;
      case 'safari':
        return <SafariApp />;
      case 'notes':
        return <NotesApp />;
      case 'calendar':
        return <CalendarApp />;
      case 'music':
        return <MusicApp />;
      case 'photos':
      case 'gallery':
        return <PhotosApp />;
      case 'camera':
        return <CameraApp />;
      case 'games':
        return <GamesApp />;
      case 'favorites':
        return <FavoritesApp />;
      case 'finder':
        return <FinderApp />;
      case 'mail':
        return <MailApp />;
      case 'analytics':
        return <AnalyticsApp />;
      case 'settings':
        return <SettingsApp />;
      case 'systeminfo':
        return <SystemInfoApp />;
      case 'utility':
        return <UtilityApp />;
      case 'trash':
        return <TrashApp />;
      case 'videos':
        return <VideosApp />;
      default:
        return <EmptyState title={activeApp || 'App'} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {activeApp && (
        <motion.div
          key={activeApp}
          initial={{ opacity: 0, scale: 0.94, y: 36 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 40 }}
          transition={{
            type: 'spring',
            stiffness: 340,
            damping: 30,
            mass: 0.8
          }}
          className={`absolute inset-0 z-20 flex flex-col overflow-hidden pb-[var(--home-indicator-h)] ${isDark ? 'bg-black' : 'bg-zinc-100'}`}
        >
          <PullToRefresh appName={appTitle} disabled={activeApp === 'camera'}>
            {renderActiveApp()}
          </PullToRefresh>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
