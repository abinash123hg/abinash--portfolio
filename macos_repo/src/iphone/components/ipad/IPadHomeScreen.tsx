import React from 'react';
import { motion } from 'motion/react';
import {
  Battery,
  CloudSun,
  Cpu,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Folder
} from 'lucide-react';
import { APPS_REGISTRY } from '../../data/appsRegistry';
import { FOLDERS_REGISTRY } from '../../data/foldersRegistry';
import { useOSStore } from '../../store/useOSStore';
import { AppIconGlyph } from '../ui/AppIconGlyph';
import { sound } from '../../utils/audioHaptics';
import { AppId } from '../../types';

export const IPadHomeScreen: React.FC = () => {
  const { openApp, setActiveFolderId, toggleSpotlight } = useOSStore();

  const handleLaunch = (appId: AppId) => {
    sound.tap();
    openApp(appId);
  };

  const handleOpenFolder = (folderId: string) => {
    sound.tap();
    setActiveFolderId(folderId);
  };

  const primaryAppIds = [
    'about', 'projects', 'cv', 'skills', 'experience', 'certifications',
    'videos', 'photos', 'music', 'notes', 'safari', 'terminal',
    'education', 'contact', 'settings'
  ];
  const primaryApps = primaryAppIds
    .map((id) => APPS_REGISTRY.find((a) => a.id === id))
    .filter(Boolean);

  return (
    <div className="w-full h-full p-6 sm:p-8 flex flex-col md:flex-row gap-6 overflow-y-auto no-scrollbar select-none">
      <div className="w-full md:w-72 shrink-0 flex flex-col gap-4">
        {/* Candidate Bio Widget */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          onClick={() => handleLaunch('about')}
          className="p-4 rounded-[22px] bg-white/20 dark:bg-black/35 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-lg cursor-pointer hover:bg-white/25 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[14px] overflow-hidden border border-cyan-400/40 shadow-sm shrink-0">
              <img
                src="/assets/images/abinash-profile-192.webp"
                alt="Abinash Swain"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-white truncate">Abinash Swain</h2>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-cyan-300 font-medium truncate">AI & ML Engineer</p>
              <p className="text-[10px] text-white/60 truncate">B.Tech CSE • CGPA 8.5</p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/80">
            <span>View Profile & Highlights</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </motion.div>

        {/* Batteries Widget (iPad + Pencil + AirPods) */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="p-4 rounded-[22px] bg-white/20 dark:bg-black/35 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/70 flex items-center gap-1">
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
              Batteries
            </span>
            <span className="text-[10px] text-white/50">All Connected</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* iPad */}
            <div className="p-2 rounded-xl bg-white/10 dark:bg-white/5 flex flex-col items-center">
              <div className="text-[10px] text-white/70 font-medium">iPad Pro</div>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">94%</div>
              <div className="w-full bg-white/10 h-1 rounded-full mt-1 overflow-hidden">
                <div className="bg-emerald-400 h-full w-[94%]" />
              </div>
            </div>

            {/* Apple Pencil */}
            <div className="p-2 rounded-xl bg-white/10 dark:bg-white/5 flex flex-col items-center">
              <div className="text-[10px] text-white/70 font-medium">Pencil Pro</div>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">100%</div>
              <div className="w-full bg-white/10 h-1 rounded-full mt-1 overflow-hidden">
                <div className="bg-emerald-400 h-full w-[100%]" />
              </div>
            </div>

            {/* AirPods */}
            <div className="p-2 rounded-xl bg-white/10 dark:bg-white/5 flex flex-col items-center">
              <div className="text-[10px] text-white/70 font-medium">AirPods</div>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">88%</div>
              <div className="w-full bg-white/10 h-1 rounded-full mt-1 overflow-hidden">
                <div className="bg-emerald-400 h-full w-[88%]" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI & ML Radar Widget */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          onClick={() => handleLaunch('skills')}
          className="p-4 rounded-[22px] bg-white/20 dark:bg-black/35 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-lg cursor-pointer hover:bg-white/25 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/70 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Core Competencies
            </span>
            <span className="text-[10px] text-cyan-300 font-mono">15+ Skills</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['LLMs & RAG', 'PyTorch', 'FastAPI', 'LangChain', 'Vector DBs', 'React 19'].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/15 dark:bg-white/10 text-white border border-white/10"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Main iPad App Grid (Spacious Right Column) */}
      <div className="flex-1 flex flex-col justify-start">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="grid grid-cols-4 sm:grid-cols-5 gap-y-6 gap-x-4 sm:gap-x-6 justify-items-center"
        >
          {primaryApps.map((app) => {
            if (!app) return null;
            return (
              <motion.button
                key={app.id}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleLaunch(app.id)}
                className="flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] sm:rounded-[18px] overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow flex items-center justify-center">
                  <AppIconGlyph name={app.iconName} className="w-[58px] h-[58px]" />
                </div>
                <span className="text-[11.5px] sm:text-xs font-medium text-white drop-shadow-md text-center truncate max-w-[76px]">
                  {app.name}
                </span>
              </motion.button>
            );
          })}

          {/* Folders on iPad */}
          {FOLDERS_REGISTRY.map((folder) => (
            <motion.button
              key={folder.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleOpenFolder(folder.id)}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] sm:rounded-[18px] p-2 bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-lg grid grid-cols-2 gap-1 place-items-center">
                {folder.appIds.slice(0, 4).map((fAppId) => (
                  <div key={fAppId} className="w-4 h-4 rounded-[4px] overflow-hidden">
                    <AppIconGlyph
                      name={APPS_REGISTRY.find((app) => app.id === fAppId)?.iconName ?? 'Folder'}
                      className="w-4 h-4"
                    />
                  </div>
                ))}
              </div>
              <span className="text-[11.5px] sm:text-xs font-medium text-white drop-shadow-md text-center truncate max-w-[76px]">
                {folder.name}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
