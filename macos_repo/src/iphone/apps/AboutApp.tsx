import React from 'react';
import {
  User,
  MapPin,
  GraduationCap,
  Mail,
  ExternalLink,
  Award,
  Sparkles,
  Code2,
  FileText
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

export const AboutApp: React.FC = () => {
  const { openApp, openSafari, theme } = useOSStore();
  const isDark = theme === 'dark';

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader title="About Abinash" subtitle="Profile Overview" />

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <div
          className={`p-5 rounded-3xl border shadow-xl flex flex-col items-center text-center ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          {/* Avatar / Monogram */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white text-3xl shadow-xl border-2 border-white/20 mb-3">
            AS
          </div>

          <h2 className="text-xl font-bold tracking-tight">{PORTFOLIO_DATA.personal.name}</h2>
          <p className="text-xs font-semibold text-blue-400 mt-0.5">{PORTFOLIO_DATA.personal.title}</p>
          <p className="text-xs text-zinc-400 mt-2 max-w-[280px] leading-relaxed">
            "{PORTFOLIO_DATA.personal.headline}"
          </p>

          {/* Quick Metrics Bar */}
          <div className="w-full mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 rounded-2xl bg-white/5">
              <span className="text-[10px] text-zinc-400 block uppercase">CGPA</span>
              <span className="text-sm font-bold text-emerald-400">{PORTFOLIO_DATA.personal.cgpa}</span>
            </div>
            <div className="p-2 rounded-2xl bg-white/5">
              <span className="text-[10px] text-zinc-400 block uppercase">Status</span>
              <span className="text-xs font-bold text-blue-400 truncate block">Open to Roles</span>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div
          className={`p-4 rounded-3xl border shadow-md ${
            isDark ? 'bg-zinc-900/60 border-white/10' : 'bg-white border-zinc-200'
          }`}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>Bio</span>
          </h3>
          <p className="text-xs leading-relaxed text-zinc-300">
            {PORTFOLIO_DATA.personal.bio}
          </p>
        </div>

        {/* Scannable Details Rows */}
        <div
          className={`rounded-3xl border shadow-md overflow-hidden divide-y divide-white/10 ${
            isDark ? 'bg-zinc-900/60 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          {/* Location */}
          <div className="p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 text-zinc-400">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Location</span>
            </div>
            <span className="font-medium text-zinc-200">{PORTFOLIO_DATA.personal.location}</span>
          </div>

          {/* College */}
          <div className="p-3.5 flex items-start justify-between text-xs">
            <div className="flex items-center gap-2.5 text-zinc-400">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>College</span>
            </div>
            <div className="text-right">
              <span className="font-medium text-zinc-200 block">Centurion University (CUTM)</span>
              <span className="text-[10px] text-zinc-400">B.Tech CSE (AI & ML)</span>
            </div>
          </div>

          {/* Email */}
          <div className="p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 text-zinc-400">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Email</span>
            </div>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="font-medium text-blue-400 hover:underline truncate max-w-[180px]"
            >
              {PORTFOLIO_DATA.personal.email}
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => openApp('resume')}
            className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500/25 flex items-center justify-center gap-2 text-xs font-semibold transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Open Resume</span>
          </button>

          <button
            onClick={() => openApp('contact')}
            className="p-3 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 hover:bg-blue-500/25 flex items-center justify-center gap-2 text-xs font-semibold transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Abinash</span>
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => openSafari(PORTFOLIO_DATA.personal.github, 'GitHub — abinash123hg')}
            className="flex-1 p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors cursor-pointer"
          >
            <span>GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => openSafari(PORTFOLIO_DATA.personal.linkedin, 'LinkedIn — Abinash Swain')}
            className="flex-1 p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-blue-400 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors cursor-pointer"
          >
            <span>LinkedIn Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
