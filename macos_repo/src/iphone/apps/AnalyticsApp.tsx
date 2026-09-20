import React from 'react';
import { BarChart3, TrendingUp, Cpu, Clock, Zap, Target } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { useOSStore } from '../store/useOSStore';

export const AnalyticsApp: React.FC = () => {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';

  const metrics = [
    { label: 'RAG Context Precision', value: '94.2%', sub: 'Verified by Ragas', color: 'text-emerald-400' },
    { label: 'P95 Retrieval Latency', value: '<580ms', sub: 'Cross-encoder included', color: 'text-blue-400' },
    { label: 'Tool Calling Accuracy', value: '96.8%', sub: 'LangGraph & FastMCP', color: 'text-purple-400' },
    { label: 'Search Ranking NDCG@10', value: '0.892', sub: 'Faiss + LambdaMART', color: 'text-amber-400' }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 7.5 },
    { day: 'Tue', hours: 9.0 },
    { day: 'Wed', hours: 8.5 },
    { day: 'Thu', hours: 10.0 },
    { day: 'Fri', hours: 8.0 },
    { day: 'Sat', hours: 6.5 },
    { day: 'Sun', hours: 5.0 }
  ];

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader title="Analytics" subtitle="Performance & Focus Metrics" />

      <div className="p-4 space-y-4">
        {/* Top Summary Banner */}
        <div
          className={`p-4 rounded-3xl border shadow-xl ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Engineering Velocity
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+34% vs Last Quarter</span>
            </span>
          </div>
          <div className="text-2xl font-black mt-2 tracking-tight">1,840+ Hours</div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Dedicated to Deep Learning, RAG Pipelines, and FastMCP Agents.
          </p>
        </div>

        {/* 4 Core Verification Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {metrics.map((m) => (
            <div
              key={m.label}
              className={`p-3 rounded-2xl border shadow-sm ${
                isDark ? 'bg-zinc-900/70 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            >
              <span className="text-[10px] text-zinc-400 block truncate">{m.label}</span>
              <div className={`text-lg font-black tracking-tight mt-0.5 ${m.color}`}>
                {m.value}
              </div>
              <span className="text-[9px] text-zinc-500 block truncate mt-0.5">{m.sub}</span>
            </div>
          ))}
        </div>

        {/* Weekly Activity Bar Chart */}
        <div
          className={`p-4 rounded-3xl border shadow-lg ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Weekly Deep Work Hours</span>
          </h3>

          <div className="h-32 flex items-end justify-between gap-2 px-2">
            {weeklyActivity.map((item) => {
              const heightPercent = (item.hours / 10) * 100;
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full h-24 bg-white/5 rounded-lg flex items-end p-0.5">
                    <div
                      className="w-full rounded-md bg-gradient-to-t from-blue-600 to-cyan-400 transition-all"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Competency Distribution */}
        <div
          className={`p-4 rounded-3xl border shadow-lg ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-purple-400" />
            <span>Effort Allocation</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between text-zinc-300 font-medium text-[11px] mb-1">
                <span>RAG & Knowledge Retrieval Engines</span>
                <span>45%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="w-[45%] h-full bg-blue-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-300 font-medium text-[11px] mb-1">
                <span>Machine Learning & Neural Networks</span>
                <span>30%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="w-[30%] h-full bg-emerald-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-300 font-medium text-[11px] mb-1">
                <span>Autonomous Agents & Tool Calling (MCP)</span>
                <span>25%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="w-[25%] h-full bg-purple-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
