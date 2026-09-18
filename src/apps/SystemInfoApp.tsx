import React from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, HardDrive, Cpu, Award } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

export const SystemInfoApp: React.FC = () => {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';

  const specs = [
    { label: 'Name', value: "Abinash Swain's iPhone 15" },
    { label: 'Model Name', value: 'iPhone 15 Pro Max Portfolio Edition' },
    { label: 'Model Number', value: 'AS-2027-AIML-PRO' },
    { label: 'OS Version', value: 'iOS 18.4.1 (Portfolio Architecture)' },
    { label: 'Candidate', value: PORTFOLIO_DATA.personal.name },
    { label: 'Specialization', value: 'AI/ML & RAG Systems' },
    { label: 'University', value: 'Centurion University (CUTM)' },
    { label: 'Verified CGPA', value: `${PORTFOLIO_DATA.personal.cgpa} / 10.0` },
    { label: 'Target Employment', value: '2027 Full-Time & High-Impact Roles' },
    { label: 'Hardware Enclave', value: 'Apple A17 Pro Neural Engine (35 TOPS)' }
  ];

  return (
    <div className="flex-1 w-full h-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader title="About" subtitle="Device & Candidate Specs" />

      <div className="p-4 space-y-4">
        {/* Device Icon Monogram */}
        <div className="flex flex-col items-center justify-center py-2 text-center">
          <div className="w-16 h-16 rounded-3xl bg-zinc-800 border border-white/10 flex items-center justify-center text-white shadow-xl mb-2">
            <Smartphone className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-base font-bold text-white">iPhone 15</h2>
          <p className="text-xs text-zinc-400">Abinash Swain AI/ML Candidate Edition</p>
        </div>

        {/* Specifications Table */}
        <div
          className={`rounded-3xl border shadow-md overflow-hidden divide-y divide-white/10 ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          {specs.map((spec) => (
            <div key={spec.label} className="p-3.5 flex items-center justify-between text-xs">
              <span className="text-zinc-400">{spec.label}</span>
              <span className="font-semibold text-zinc-200 text-right max-w-[200px] truncate">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Storage Bar Simulation */}
        <div
          className={`p-4 rounded-3xl border shadow-md ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-zinc-400 font-medium">Internal Storage</span>
            <span className="text-zinc-200 font-mono font-bold">42 GB of 128 GB Used</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-zinc-800 flex overflow-hidden">
            <div className="w-[18%] bg-blue-500" title="RAG & LLM Models" />
            <div className="w-[12%] bg-emerald-500" title="Neural Datasets" />
            <div className="w-[8%] bg-purple-500" title="FastMCP Agents" />
            <div className="w-[6%] bg-amber-500" title="Certificates" />
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-zinc-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>RAG Pipelines</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Data Models</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>MCP Tools</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Credentials</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
