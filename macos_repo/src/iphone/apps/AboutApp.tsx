import React from 'react';
import {
  User,
  MapPin,
  GraduationCap,
  Mail,
  ExternalLink,
  FileText
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

export const AboutApp: React.FC = () => {
  const { openApp, openSafari, theme } = useOSStore();
  const isDark = theme === 'dark';

  const muted = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const secondary = isDark ? 'text-zinc-300' : 'text-zinc-700';
  const primary = isDark ? 'text-white' : 'text-zinc-900';
  const softBg = isDark ? 'bg-white/5' : 'bg-zinc-100';
  const divide = isDark ? 'divide-white/10' : 'divide-zinc-100';

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader title="About Abinash" subtitle="Profile Overview" />

      <div className="p-4 space-y-4">
        <div
          className={`p-5 rounded-3xl border shadow-xl flex flex-col items-center text-center ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white text-3xl shadow-xl border-2 border-white/20 mb-3">
            AS
          </div>

          <h2 className={`text-xl font-bold tracking-tight ${primary}`}>{PORTFOLIO_DATA.personal.name}</h2>
          <p className="text-xs font-semibold text-blue-500 mt-0.5">{PORTFOLIO_DATA.personal.title}</p>
          <p className={`text-xs mt-2 max-w-[280px] leading-relaxed ${muted}`}>
            "{PORTFOLIO_DATA.personal.headline}"
          </p>

          <div className={`w-full mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-center text-xs ${isDark ? 'border-white/10' : 'border-zinc-200'}`}>
            <div className={`p-2 rounded-2xl ${softBg}`}>
              <span className={`text-[10px] block uppercase ${muted}`}>CGPA</span>
              <span className="text-sm font-bold text-emerald-500">{PORTFOLIO_DATA.personal.cgpa}</span>
            </div>
            <div className={`p-2 rounded-2xl ${softBg}`}>
              <span className={`text-[10px] block uppercase ${muted}`}>Status</span>
              <span className="text-xs font-bold text-blue-500 truncate block">Open to Roles</span>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-3xl border shadow-md ${
            isDark ? 'bg-zinc-900/60 border-white/10' : 'bg-white border-zinc-200'
          }`}
        >
          <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${muted}`}>
            <User className="w-3.5 h-3.5 text-blue-500" />
            <span>Bio</span>
          </h3>
          <p className={`text-xs leading-relaxed ${secondary}`}>
            {PORTFOLIO_DATA.personal.bio}
          </p>
        </div>

        <div
          className={`rounded-3xl border shadow-md overflow-hidden divide-y ${divide} ${
            isDark ? 'bg-zinc-900/60 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="p-3.5 flex items-center justify-between text-xs">
            <div className={`flex items-center gap-2.5 ${muted}`}>
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Location</span>
            </div>
            <span className={`font-medium ${primary}`}>{PORTFOLIO_DATA.personal.location}</span>
          </div>

          <div className="p-3.5 flex items-start justify-between text-xs">
            <div className={`flex items-center gap-2.5 ${muted}`}>
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>College</span>
            </div>
            <div className="text-right">
              <span className={`font-medium block ${primary}`}>Centurion University (CUTM)</span>
              <span className={`text-[10px] ${muted}`}>B.Tech CSE (AI & ML)</span>
            </div>
          </div>

          <div className="p-3.5 flex items-center justify-between text-xs">
            <div className={`flex items-center gap-2.5 ${muted}`}>
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Email</span>
            </div>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="font-medium text-blue-500 hover:underline truncate max-w-[180px]"
            >
              {PORTFOLIO_DATA.personal.email}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => openApp('resume')}
            className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 flex items-center justify-center gap-2 text-xs font-semibold transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Open Resume</span>
          </button>

          <button
            onClick={() => openApp('contact')}
            className="p-3 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/25 flex items-center justify-center gap-2 text-xs font-semibold transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Abinash</span>
          </button>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => openSafari(PORTFOLIO_DATA.personal.github, 'GitHub — abinash123hg')}
            className={`flex-1 p-2.5 rounded-2xl border flex items-center justify-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300'
                : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-700'
            }`}
          >
            <span>GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => openSafari(PORTFOLIO_DATA.personal.linkedin, 'LinkedIn — Abinash Swain')}
            className={`flex-1 p-2.5 rounded-2xl border flex items-center justify-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 border-white/10 text-blue-400'
                : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-blue-600'
            }`}
          >
            <span>LinkedIn Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
