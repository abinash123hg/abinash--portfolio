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
      className="w-full h-full p-4 flex flex-col justify-between select-none cursor-pointer hover:opacity-95 transition-opacity"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
            Recruiter Quick Glance
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
          <CheckCircle2 className="w-2.5 h-2.5" />
          Open for 2027 Roles
        </span>
      </div>

      <div className="my-auto">
        <div className="flex items-center justify-between">
          <div>
            <h4 className={`text-sm font-bold leading-tight ${primary}`}>Abinash Swain</h4>
            <p className={`text-[10px] mt-0.5 ${muted}`}>B.Tech CSE (AI & Machine Learning)</p>
          </div>
          <div className="text-right">
            <span className={`text-sm font-extrabold font-mono ${primary}`}>CGPA 8.32</span>
            <span className={`text-[9px] block ${muted}`}>Centurion Univ. (CUTM)</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 mt-2.5 text-center">
          <div className={`p-1.5 rounded-lg border ${chip}`}>
            <span className={`text-[9px] block ${muted}`}>Focus</span>
            <span className={`text-[10px] font-bold ${primary}`}>RAG / Agents</span>
          </div>
          <div className={`p-1.5 rounded-lg border ${chip}`}>
            <span className={`text-[9px] block ${muted}`}>Graduation</span>
            <span className={`text-[10px] font-bold ${primary}`}>May 2027</span>
          </div>
          <div className={`p-1.5 rounded-lg border ${chip}`}>
            <span className={`text-[9px] block ${muted}`}>Location</span>
            <span className={`text-[10px] font-bold ${primary}`}>Odisha, IN</span>
          </div>
        </div>
      </div>

      <div className={`flex items-center justify-between text-[10px] pt-1.5 border-t ${muted} ${isDark ? 'border-white/10' : 'border-zinc-200'}`}>
        <span>Deep-dive resume, certifications & skill metrics</span>
        <span className="text-blue-600 font-semibold flex items-center gap-0.5">
          Tap to Open <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
