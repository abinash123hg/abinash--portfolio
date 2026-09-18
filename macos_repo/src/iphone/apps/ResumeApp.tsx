import React, { useState } from 'react';
import {
  FileText,
  Download,
  Share2,
  ExternalLink,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Boxes,
  Cpu,
  Award,
  Sparkles
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

export const ResumeApp: React.FC = () => {
  const { setDynamicIslandMode, theme } = useOSStore();
  const [downloading, setDownloading] = useState(false);
  const [shared, setShared] = useState(false);
  const isDark = theme === 'dark';

  const handleDownload = () => {
    setDownloading(true);
    setDynamicIslandMode('resume');

    const link = document.createElement('a');
    link.href = '/assets/CV/cv (4).pdf';
    link.download = 'Abinash_Swain_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloading(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Abinash Swain - AI/ML Resume',
        text: 'Abinash Swain — AI/ML Developer (RAG & Neural Networks) Resume',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader
        title="Resume"
        subtitle={PORTFOLIO_DATA.personal.resumeFileName}
        rightAction={
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-white/10 text-blue-400 active:scale-95 transition-all"
              title="Share"
            >
              {shared ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-full hover:bg-white/10 text-amber-400 active:scale-95 transition-all"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        }
      />

      <div className="p-4 space-y-4">
        {/* Document Header & Quick Actions */}
        <div
          className={`p-4 rounded-3xl border shadow-lg flex items-center justify-between ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white tracking-tight">
                {PORTFOLIO_DATA.personal.resumeFileName}
              </h2>
              <p className="text-[11px] text-zinc-400">Updated for 2027 Opportunities</p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            {downloading ? (
              <span>Saving...</span>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </>
            )}
          </button>
        </div>

        {/* Paper Document Preview Frame */}
        <div className="p-5 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-2xl text-left text-xs text-zinc-300 space-y-4 font-sans leading-relaxed">
          {/* Header block */}
          <div className="border-b border-white/10 pb-3">
            <h1 className="text-lg font-bold text-white tracking-tight">{PORTFOLIO_DATA.personal.name}</h1>
            <p className="text-xs font-semibold text-blue-400">{PORTFOLIO_DATA.personal.title}</p>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-zinc-400">
              <span>{PORTFOLIO_DATA.personal.location}</span>
              <span>•</span>
              <span>{PORTFOLIO_DATA.personal.email}</span>
              <span>•</span>
              <span>{PORTFOLIO_DATA.personal.phone}</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Summary</span>
            </h3>
            <p className="text-xs text-zinc-300">{PORTFOLIO_DATA.personal.bio}</p>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1.5 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education</span>
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-white">
                <span>Centurion University of Technology and Management (CUTM)</span>
                <span className="text-emerald-400 font-mono">CGPA: 8.32 / 10.0</span>
              </div>
              <p className="text-[11px] text-zinc-400">B.Tech Computer Science & Engineering (AI & ML) • 2024–Present</p>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Experience</span>
            </h3>
            <div className="space-y-2.5">
              {PORTFOLIO_DATA.experience.map((exp) => (
                <div key={exp.id} className="space-y-0.5">
                  <div className="flex justify-between font-semibold text-white">
                    <span>{exp.company} — {exp.role}</span>
                    <span className="text-[10px] text-zinc-400">{exp.period}</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 line-clamp-2">
                    {exp.responsibilities[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Projects */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-1.5 flex items-center gap-1">
              <Boxes className="w-3.5 h-3.5" />
              <span>Featured Projects</span>
            </h3>
            <div className="space-y-2.5">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between font-semibold text-white">
                    <span>{proj.title}</span>
                    <span className="text-[10px] text-blue-400">{proj.category}</span>
                  </div>
                  <p className="text-[11px] text-zinc-300">{proj.description}</p>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    Tech: {proj.technologies.slice(0, 5).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Snapshot */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Certifications</span>
            </h3>
            <p className="text-[11px] text-zinc-300">
              Oracle Certified Associate — Agentic AI (Oracle University), GenAI Powered Data Analytics Job Simulation (Tata / Forage), Deloitte Data Analytics Job Simulation (Deloitte / Forage), AI-Powered Smart Inventory Management System using Python (TutorialsPoint Academy • Skill India / NSDC).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
