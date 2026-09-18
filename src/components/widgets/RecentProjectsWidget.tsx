import React from 'react';
import { WidgetSize } from '../../data/widgetsRegistry';
import { FolderGit2, ArrowUpRight } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface RecentProjectsWidgetProps {
  size: WidgetSize;
}

export const RecentProjectsWidget: React.FC<RecentProjectsWidgetProps> = ({ size }) => {
  const { setActiveApp, selectProject } = useOSStore();

  const projects = [
    {
      id: 'docurag',
      name: 'DocuRAG',
      desc: 'Local RAG with Hybrid Search & RRF',
      badge: '94.2% Precision'
    },
    {
      id: 'fastmcp',
      name: 'FastMCP Agent Server',
      desc: 'Tool-calling API for AI LLM agents',
      badge: 'v1.4'
    },
    {
      id: 'neuralrank',
      name: 'NeuralRank Engine',
      desc: 'Cross-encoder candidate scoring',
      badge: 'PyTorch'
    }
  ];

  const handleOpen = (projId: string) => {
    selectProject(projId);
    setActiveApp('projects');
  };

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
          <FolderGit2 className="w-4 h-4 text-sky-400" />
          <span>Recent Projects</span>
        </div>
        <button
          onClick={() => setActiveApp('projects')}
          className="text-[10px] text-sky-400 font-medium hover:underline"
        >
          All (12) →
        </button>
      </div>

      <div className="space-y-1.5 my-1">
        {projects.slice(0, size === 'large' ? 3 : 2).map((proj) => (
          <div
            key={proj.id}
            onClick={() => handleOpen(proj.id)}
            className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 group"
          >
            <div>
              <div className="text-[11px] font-bold text-white flex items-center gap-1">
                <span>{proj.name}</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-sky-400 transition-colors" />
              </div>
              <div className="text-[9px] text-zinc-400 truncate max-w-[170px]">{proj.desc}</div>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-white/10 text-zinc-300">
              {proj.badge}
            </span>
          </div>
        ))}
      </div>

      <div className="text-[9px] text-zinc-400 text-center">
        Tap to open live project benchmarks & source code
      </div>
    </div>
  );
};
