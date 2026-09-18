import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  FileText,
  Boxes,
  Award,
  Building2,
  Mail,
  ExternalLink,
  CheckCircle2,
  Copy,
  Download,
  Sparkles,
  MapPin,
  Calendar,
  Share2
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

export const RecruiterApp: React.FC = () => {
  const { openApp, openSafari, theme } = useOSStore();
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';

  const handleCopySummary = () => {
    const text = `Candidate: ${PORTFOLIO_DATA.personal.name}
Target Role: ${PORTFOLIO_DATA.personal.targetRole}
Location: ${PORTFOLIO_DATA.personal.locationShort}
Status: ${PORTFOLIO_DATA.personal.status}
Email: ${PORTFOLIO_DATA.personal.email}
GitHub: ${PORTFOLIO_DATA.personal.github}
LinkedIn: ${PORTFOLIO_DATA.personal.linkedin}
Focus: Production RAG pipelines, MCP Agents, ML ranking, LLM tool calling.`;

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader
        title="Candidate Brief"
        subtitle="Recruiter Priority"
        rightAction={
          <button
            onClick={handleCopySummary}
            className="p-1.5 rounded-full hover:bg-white/10 text-blue-400 active:scale-95 transition-all"
            title="Copy Recruiter Brief"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        }
      />

      <div className="p-4 space-y-4">
        {/* Top Executive Summary Card */}
        <div
          className={`p-4 rounded-3xl border shadow-xl ${
            isDark
              ? 'bg-zinc-900/80 border-white/10 text-white'
              : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {PORTFOLIO_DATA.personal.statusBadge}
              </span>
              <h2 className="text-xl font-bold tracking-tight mt-2">{PORTFOLIO_DATA.personal.name}</h2>
              <p className="text-xs font-semibold text-blue-400 mt-0.5">
                {PORTFOLIO_DATA.personal.targetRole}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg text-lg">
              AS
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-1 gap-1.5 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="text-zinc-300">{PORTFOLIO_DATA.personal.locationShort}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="text-emerald-400 font-medium">{PORTFOLIO_DATA.personal.status}</span>
            </div>
          </div>
        </div>

        {/* Positioning Statement */}
        <div
          className={`p-4 rounded-3xl border shadow-md ${
            isDark ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-zinc-200'
          }`}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1.5">
            Positioning & Focus
          </h3>
          <p className="text-xs leading-relaxed text-zinc-300">
            {PORTFOLIO_DATA.personal.positioning}
          </p>
        </div>

        {/* Primary Areas of Competency */}
        <div
          className={`p-4 rounded-3xl border shadow-md ${
            isDark ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-zinc-200'
          }`}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
            Core Target Capabilities
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {PORTFOLIO_DATA.personal.primaryAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-[11px] font-medium text-zinc-200"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                <span className="truncate">{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Recruiter Navigation Actions */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
            Quick Recruiter Actions
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => openApp('resume')}
              className="p-3 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 flex items-center gap-2 text-xs font-semibold transition-all active:scale-98"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume</span>
            </button>

            <button
              onClick={() => openApp('projects')}
              className="p-3 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 flex items-center gap-2 text-xs font-semibold transition-all active:scale-98"
            >
              <Boxes className="w-4 h-4" />
              <span>View Projects</span>
            </button>

            <button
              onClick={() => openApp('experience')}
              className="p-3 rounded-2xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 flex items-center gap-2 text-xs font-semibold transition-all active:scale-98"
            >
              <Building2 className="w-4 h-4" />
              <span>Experience</span>
            </button>

            <button
              onClick={() => openApp('certifications')}
              className="p-3 rounded-2xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 flex items-center gap-2 text-xs font-semibold transition-all active:scale-98"
            >
              <Award className="w-4 h-4" />
              <span>Certifications</span>
            </button>

            <button
              onClick={() => openApp('contact')}
              className="col-span-2 p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center gap-2 text-xs font-bold shadow-lg transition-all active:scale-98"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Abinash Directly</span>
            </button>
          </div>
        </div>

        {/* External Links */}
        <div className="pt-2 flex items-center gap-2">
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
