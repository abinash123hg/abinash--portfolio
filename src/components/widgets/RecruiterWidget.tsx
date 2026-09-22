import React from 'react';
import { WidgetSize } from '../../data/widgetsRegistry';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface RecruiterWidgetProps {
  size: WidgetSize;
}

export const RecruiterWidget: React.FC<RecruiterWidgetProps> = ({ size }) => {
  const { setActiveApp, theme } = useOSStore();
  const isDark = theme === 'dark';

  const handleOpenRecruiter = () => {
    setActiveApp('recruiter');
  };

  const primary = isDark ? 'text-white' : 'text-zinc-900';
  const muted = isDark ? 'text-zinc-400' : 'text-zinc-600';
  const chip = isDark ? 'bg-white/5 border-white/10' : 'bg-zinc-100/90 border-zinc-200';

  return (
    <div
      onClick={handleOpenRecruiter}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpenRecruiter();
        }
      }}
      aria-label="Open Recruiter Quick Glance — Abinash Swain portfolio summary"
      className="w-full h-full p-4 flex flex-col justify-between select-none cursor-pointer hover:opacity-95 transition-opacity"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 truncate">
            Recruiter Quick Glance
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shrink-0">
          <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
          Open for 2027 Roles
        </span>
      </div>

      <div className="my-auto py-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className={`text-sm font-bold leading-snug ${primary}`}>Abinash Swain</h2>
            <p className={`text-xs mt-1 ${muted}`}>B.Tech CSE (AI &amp; Machine Learning)</p>
          </div>
          <div className="text-right shrink-0">
            <span className={`text-sm font-extrabold font-mono ${primary}`}>CGPA 8.32</span>
            <span className={`text-[11px] block mt-0.5 ${muted}`}>Centurion Univ. (CUTM)</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 mt-3 text-center">
          <div className={`p-1.5 rounded-lg border ${chip}`}>
            <span className={`text-[11px] block ${muted}`}>Focus</span>
            <span className={`text-xs font-bold ${primary}`}>RAG / Agents</span>
          </div>
          <div className={`p-1.5 rounded-lg border ${chip}`}>
            <span className={`text-[11px] block ${muted}`}>Graduation</span>
            <span className={`text-xs font-bold ${primary}`}>May 2027</span>
          </div>
          <div className={`p-1.5 rounded-lg border ${chip}`}>
            <span className={`text-[11px] block ${muted}`}>Location</span>
            <span className={`text-xs font-bold ${primary}`}>Odisha, IN</span>
          </div>
        </div>
      </div>

      <div
        className={`flex items-center justify-between gap-2 pt-2.5 border-t ${
          isDark ? 'border-white/10' : 'border-zinc-200'
        }`}
      >
        <span className={`text-xs ${muted} min-w-0 truncate`}>
          Deep-dive resume, certifications &amp; skill metrics
        </span>
        <span
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-sm shrink-0"
          aria-hidden="true"
        >
          Tap to Open <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
