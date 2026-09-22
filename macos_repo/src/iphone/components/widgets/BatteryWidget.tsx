import React from 'react';
import { WidgetSize } from '../../data/widgetsRegistry';
import { Brain, Code2, Database, Sparkles } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface BatteryWidgetProps {
  size: WidgetSize;
}

export const BatteryWidget: React.FC<BatteryWidgetProps> = ({ size }) => {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';
  const primary = isDark ? 'text-white' : 'text-zinc-900';
  const muted = isDark ? 'text-zinc-400' : 'text-zinc-600';
  const chip = isDark ? 'bg-white/5 border-white/10' : 'bg-zinc-100/90 border-zinc-200';
  const track = isDark ? 'text-white/10' : 'text-zinc-300';

  const skills = [
    { name: 'Python / ML', pct: 92, icon: Code2, color: 'text-emerald-500' },
    { name: 'RAG / Agents', pct: 88, icon: Brain, color: 'text-sky-500' },
    { name: 'Data / SQL', pct: 85, icon: Database, color: 'text-violet-500' },
  ];

  if (size === 'medium') {
    return (
      <div className="w-full h-full p-4 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1.5 text-xs font-bold ${primary}`}>
            <Sparkles className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            <span>Top Skills</span>
          </div>
          <span className={`text-xs font-mono ${muted}`}>3 Highlights</span>
        </div>
        <div className="grid grid-cols-3 gap-2 my-auto">
          {skills.map((skill) => {
            const Icon = skill.icon;
            const strokeDash = `${skill.pct * 0.94} 100`;
            return (
              <div key={skill.name} className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center ${chip}`}>
                <div className="relative w-11 h-11 flex items-center justify-center mb-1">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                    <path className={track} strokeWidth="3.2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className={skill.color} strokeDasharray={strokeDash} strokeWidth="3.2" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <Icon className={`absolute w-4 h-4 ${primary}`} />
                </div>
                <span className={`text-xs font-bold leading-none ${primary}`}>{skill.pct}%</span>
                <span className={`text-[11px] mt-1 truncate max-w-full ${muted}`}>{skill.name}</span>
              </div>
            );
          })}
        </div>
        <div className={`text-xs text-center ${muted}`}>
          Core stack for AI/ML &amp; data roles
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-3.5 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between">
        <span className={`text-xs font-bold ${primary}`}>Top Skills</span>
        <Sparkles className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
      </div>
      <div className="flex items-center justify-center gap-3 my-auto">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
            <path className={track} strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="text-emerald-500" strokeDasharray="92 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <Brain className={`absolute w-4 h-4 ${primary}`} />
        </div>
        <div>
          <span className={`text-xl font-bold block leading-tight ${primary}`}>92%</span>
          <span className={`text-xs ${muted}`}>Python / ML</span>
        </div>
      </div>
      <div className={`flex items-center justify-between text-xs pt-1.5 border-t ${muted} ${isDark ? 'border-white/10' : 'border-zinc-200'}`}>
        <span>RAG: 88%</span>
        <span>Data: 85%</span>
      </div>
    </div>
  );
};
