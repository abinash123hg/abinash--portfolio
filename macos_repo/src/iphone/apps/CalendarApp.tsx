import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, Plus, MapPin } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

interface MilestoneEvent {
  date: string;
  title: string;
  category: string;
  badgeColor: string;
}

const MILESTONES: MilestoneEvent[] = [
  {
    date: 'Aug 17, 2026',
    title: 'Certified Oracle Associate — Agentic AI (1Z0-1135-25)',
    category: 'Certification',
    badgeColor: 'text-red-400 bg-red-500/15'
  },
  {
    date: 'Aug 14, 2026',
    title: 'Completed Deloitte Data Analytics Job Simulation',
    category: 'Certification',
    badgeColor: 'text-emerald-400 bg-emerald-500/15'
  },
  {
    date: 'Aug 12, 2026',
    title: 'Earned GenAI Powered Data Analytics Simulation (Tata / Forage)',
    category: 'Certification',
    badgeColor: 'text-blue-400 bg-blue-500/15'
  },
  {
    date: 'Jul 29, 2026',
    title: 'Certified AI Smart Inventory Management System (TutorialsPoint)',
    category: 'Certification',
    badgeColor: 'text-amber-400 bg-amber-500/15'
  },
  {
    date: 'Aug 01, 2026',
    title: 'Commenced Data Analyst Internship at InternPe',
    category: 'Career',
    badgeColor: 'text-blue-400 bg-blue-500/15'
  },
  {
    date: 'Jun 01, 2026',
    title: 'Joined TutorialsPoint Academy (AI/ML Developer)',
    category: 'Career',
    badgeColor: 'text-emerald-400 bg-emerald-500/15'
  },
  {
    date: 'Aug 2024',
    title: 'Admitted to B.Tech CSE (AI & ML) at Centurion University',
    category: 'Academic',
    badgeColor: 'text-cyan-400 bg-cyan-500/15'
  }
];

export const CalendarApp: React.FC = () => {
  const { theme } = useOSStore();
  const [scheduled, setScheduled] = useState(false);
  const [meetingDate, setMeetingDate] = useState('2026-09-22');
  const [meetingTime, setMeetingTime] = useState('14:00');
  const [company, setCompany] = useState('');
  const isDark = theme === 'dark';

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;
    setScheduled(true);
    setTimeout(() => {
      setScheduled(false);
      setCompany('');
    }, 4500);
  };

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader title="Calendar" subtitle="Milestones & Availability" />

      <div className="p-4 space-y-4">
        {/* Availability Banner */}
        <div
          className={`p-4 rounded-3xl border shadow-lg flex items-center justify-between ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
              Recruiter Availability
            </span>
            <div className="text-sm font-bold mt-0.5">Open for 2027 Interviews</div>
            <div className="text-xs text-zinc-400 mt-0.5">Mon–Fri: IST & Global Remote Hours</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            2027
          </div>
        </div>

        {/* Schedule Interview Meeting Widget */}
        <div
          className={`p-4 rounded-3xl border shadow-xl ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Request Recruiter Interview
            </h3>
          </div>

          {scheduled ? (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-400 mb-1" />
              <p className="font-bold">Interview Request Sent!</p>
              <p className="text-[11px] text-zinc-400">
                A calendar hold invitation has been prepared for {PORTFOLIO_DATA.personal.email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-2.5 text-xs">
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Company / Hiring Team</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OpenAI / Google / DeepMind"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-zinc-400 block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 block mb-1">Preferred Time</label>
                  <input
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white shadow-md transition-all active:scale-98"
              >
                Send Interview Calendar Request
              </button>
            </form>
          )}
        </div>

        {/* Chronological Milestones Timeline */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1 mb-2.5">
            Key Career Milestones
          </h3>

          <div className="space-y-2.5">
            {MILESTONES.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border shadow-sm ${
                  isDark ? 'bg-zinc-900/60 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.category}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">{item.date}</span>
                </div>
                <h4 className="text-xs font-semibold mt-1.5 leading-snug">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
