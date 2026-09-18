import React from 'react';
import { WidgetSize } from '../../data/widgetsRegistry';
import { Briefcase, Award, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface RecruiterWidgetProps {
  size: WidgetSize;
}

export const RecruiterWidget: React.FC<RecruiterWidgetProps> = ({ size }) => {
  const { setActiveApp } = useOSStore();

  const handleOpenRecruiter = () => {
    setActiveApp('recruiter');
  };

  return (
    <div
      onClick={handleOpenRecruiter}
      className="w-full h-full p-4 flex flex-col justify-between select-none cursor-pointer hover:opacity-95 transition-opacity"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
            Recruiter Quick Glance
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
          <CheckCircle2 className="w-2.5 h-2.5" />
          Open for 2027 Roles
        </span>
      </div>

      <div className="my-auto">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white leading-tight">Abinash Swain</h4>
            <p className="text-[10px] text-zinc-300 mt-0.5">B.Tech CSE (AI & Machine Learning)</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-extrabold text-white font-mono">CGPA 8.32</span>
            <span className="text-[9px] text-zinc-400 block">Centurion Univ. (CUTM)</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 mt-2.5 text-center">
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
            <span className="text-[9px] text-zinc-400 block">Focus</span>
            <span className="text-[10px] font-bold text-white">RAG / Agents</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
            <span className="text-[9px] text-zinc-400 block">Graduation</span>
            <span className="text-[10px] font-bold text-white">May 2027</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/5">
            <span className="text-[9px] text-zinc-400 block">Location</span>
            <span className="text-[10px] font-bold text-white">Odisha, IN</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1.5 border-t border-white/10">
        <span>Deep-dive resume, certifications & skill metrics</span>
        <span className="text-blue-400 font-semibold flex items-center gap-0.5">
          Tap to Open <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
