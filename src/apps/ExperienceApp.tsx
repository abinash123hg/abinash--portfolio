import React from 'react';
import { Building2, MapPin, Calendar, CheckCircle2, Briefcase } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

export const ExperienceApp: React.FC = () => {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';

  return (
    <div className="flex-1 w-full h-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader title="Experience" subtitle="Career & Internships" />

      <div className="p-4 space-y-4">
        {PORTFOLIO_DATA.experience.map((item, idx) => (
          <div
            key={item.id}
            className={`p-4 rounded-3xl border shadow-xl relative ${
              isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-white">{item.company}</h3>
                  <p className="text-xs font-semibold text-emerald-400 mt-0.5">{item.role}</p>
                </div>
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                {idx === 0 ? 'Present' : 'Completed'}
              </span>
            </div>

            {/* Metadata tags */}
            <div className="mt-3 flex items-center gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>{item.period}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>{item.location}</span>
              </div>
            </div>

            {/* Responsibilities list */}
            <div className="mt-3.5 pt-3 border-t border-white/10 space-y-2 text-xs text-zinc-300">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Key Contributions & Responsibilities
              </h4>
              {item.responsibilities.map((resp, i) => (
                <div key={i} className="flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>

            {/* Skills chips */}
            <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap gap-1">
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-medium text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
