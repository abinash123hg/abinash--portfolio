import React from 'react';
import { BarChart3, TrendingUp, Activity, Target } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { useOSStore } from '../store/useOSStore';

export const AnalyticsApp: React.FC = () => {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';

  const metrics = [
    { label: 'Model Accuracy', value: '94.2%', sub: 'RAG eval suite', trend: '+2.1%' },
    { label: 'Inference Latency', value: '38ms', sub: 'p95 edge path', trend: '-12ms' },
    { label: 'Pipeline Uptime', value: '99.4%', sub: 'last 30 days', trend: '+0.3%' },
    { label: 'Active Agents', value: '12', sub: 'MCP tools live', trend: '+3' }
  ];

  const weekly = [
    { day: 'Mon', h: 42 },
    { day: 'Tue', h: 58 },
    { day: 'Wed', h: 51 },
    { day: 'Thu', h: 67 },
    { day: 'Fri', h: 73 },
    { day: 'Sat', h: 35 },
    { day: 'Sun', h: 28 }
  ];

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader title="Analytics Lab" subtitle="Model & Pipeline Insights" />

      <div className="p-4 space-y-4">
        <div
          className={`p-4 rounded-3xl border shadow-xl ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className={isDark ? 'text-[10px] uppercase font-bold text-zinc-400 tracking-wider' : 'text-[10px] uppercase font-bold text-zinc-500 tracking-wider'}>
              Live Performance
            </span>
          </div>
          <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>AI Systems Dashboard</h2>
          <p className={isDark ? 'text-xs text-zinc-400 mt-0.5' : 'text-xs text-zinc-500 mt-0.5'}>
            Snapshot of portfolio model health, latency, and agent activity.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {metrics.map((m) => (
            <div
              key={m.label}
              className={`p-3 rounded-2xl border ${
                isDark ? 'bg-zinc-900/70 border-white/10' : 'bg-white border-zinc-200'
              }`}
            >
              <span className={isDark ? 'text-[10px] text-zinc-400 block truncate' : 'text-[10px] text-zinc-500 block truncate'}>{m.label}</span>
              <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{m.value}</span>
              <span className={isDark ? 'text-[9px] text-zinc-500 block truncate mt-0.5' : 'text-[9px] text-zinc-500 block truncate mt-0.5'}>{m.sub}</span>
              <span className="text-[10px] text-emerald-400 font-semibold">{m.trend}</span>
            </div>
          ))}
        </div>

        <div
          className={`p-4 rounded-3xl border shadow-md ${
            isDark ? 'bg-zinc-900/80 border-white/10' : 'bg-white border-zinc-200'
          }`}
        >
          <h3 className={isDark ? 'text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-1.5' : 'text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-1.5'}>
            <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
            <span>Weekly Activity</span>
          </h3>
          <div className="flex items-end justify-between gap-1.5 h-28">
            {weekly.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-1">
                <div className={isDark ? 'w-full h-24 bg-white/5 rounded-lg flex items-end p-0.5' : 'w-full h-24 bg-zinc-100 rounded-lg flex items-end p-0.5'}>
                  <div
                    className="w-full rounded-md bg-gradient-to-t from-blue-600 to-cyan-400"
                    style={{ height: `${item.h}%` }}
                  />
                </div>
                <span className={isDark ? 'text-[10px] text-zinc-400 font-medium' : 'text-[10px] text-zinc-500 font-medium'}>{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`p-4 rounded-3xl border shadow-md ${
            isDark ? 'bg-zinc-900/80 border-white/10' : 'bg-white border-zinc-200'
          }`}
        >
          <h3 className={isDark ? 'text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5' : 'text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5'}>
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>Focus Areas</span>
          </h3>
          <div className="space-y-3">
            <div>
              <div className={isDark ? 'flex justify-between text-zinc-300 font-medium text-[11px] mb-1' : 'flex justify-between text-zinc-700 font-medium text-[11px] mb-1'}>
                <span>RAG Quality</span><span>92%</span>
              </div>
              <div className={isDark ? 'h-1.5 rounded-full bg-white/10' : 'h-1.5 rounded-full bg-zinc-200'}>
                <div className="h-full w-[92%] rounded-full bg-blue-500" />
              </div>
            </div>
            <div>
              <div className={isDark ? 'flex justify-between text-zinc-300 font-medium text-[11px] mb-1' : 'flex justify-between text-zinc-700 font-medium text-[11px] mb-1'}>
                <span>Agent Reliability</span><span>88%</span>
              </div>
              <div className={isDark ? 'h-1.5 rounded-full bg-white/10' : 'h-1.5 rounded-full bg-zinc-200'}>
                <div className="h-full w-[88%] rounded-full bg-emerald-500" />
              </div>
            </div>
            <div>
              <div className={isDark ? 'flex justify-between text-zinc-300 font-medium text-[11px] mb-1' : 'flex justify-between text-zinc-700 font-medium text-[11px] mb-1'}>
                <span>Eval Coverage</span><span>76%</span>
              </div>
              <div className={isDark ? 'h-1.5 rounded-full bg-white/10' : 'h-1.5 rounded-full bg-zinc-200'}>
                <div className="h-full w-[76%] rounded-full bg-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
