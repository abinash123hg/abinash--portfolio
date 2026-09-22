import React from 'react';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

export const EducationApp: React.FC = () => {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';

  const muted = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const primary = isDark ? 'text-white' : 'text-zinc-900';
  const secondary = isDark ? 'text-zinc-300' : 'text-zinc-700';

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader title="Education" subtitle="Academic Background" />

      <div className="p-4 space-y-4">
        {PORTFOLIO_DATA.education.map((edu) => (
          <div
            key={edu.id}
            className={`p-4 rounded-3xl border shadow-xl ${
              isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-600 to-blue-700 flex items-center justify-center text-white shadow-md">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold tracking-tight ${primary}`}>{edu.degree}</h3>
                  {edu.specialization && (
                    <p className="text-xs font-semibold text-blue-500 mt-0.5">
                      Spec: {edu.specialization}
                    </p>
                  )}
                </div>
              </div>

              {edu.cgpa && (
                <div className="text-right">
                  <span className={`text-[10px] block uppercase ${muted}`}>CGPA</span>
                  <span className="text-xs font-bold text-emerald-500">{edu.cgpa}</span>
                </div>
              )}
            </div>

            <div
              className={`mt-3 pt-2.5 border-t space-y-1.5 text-xs ${
                isDark ? 'border-white/10' : 'border-zinc-200'
              }`}
            >
              <div className={`font-medium ${primary}`}>{edu.institution}</div>
              <div className={`flex items-center gap-3 ${muted}`}>
                <div className="flex items-center gap-1">
                  <Calendar className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
                  <span>{edu.period}</span>
                </div>
                {edu.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
                    <span>{edu.location}</span>
                  </div>
                )}
              </div>
              {edu.focus && (
                <div className={`mt-2 text-xs leading-relaxed ${muted}`}>
                  <span className={`font-semibold ${secondary}`}>Focus: </span>
                  {edu.focus}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
