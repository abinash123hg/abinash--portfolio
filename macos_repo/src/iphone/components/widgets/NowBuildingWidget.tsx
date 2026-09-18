import React from 'react';
import { WidgetSize } from '../../data/widgetsRegistry';
import { Cpu, Sparkles, Terminal, ArrowRight } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

interface NowBuildingWidgetProps {
  size: WidgetSize;
}

export const NowBuildingWidget: React.FC<NowBuildingWidgetProps> = ({ size }) => {
  const { setActiveApp, selectProject } = useOSStore();

  const handleOpenDocuRAG = () => {
    selectProject('docurag');
    setActiveApp('projects');
  };

  return (
    <div
      onClick={handleOpenDocuRAG}
      className="w-full h-full p-4 flex flex-col justify-between select-none cursor-pointer hover:opacity-95 transition-opacity"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">
            Active Engineering Sprint
          </span>
        </div>
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
      </div>

      <div className="my-auto">
        <div className="text-sm font-bold text-white flex items-center gap-1.5">
          <span>DocuRAG & FastMCP Pipeline</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
        </div>
        <p className="text-[11px] text-zinc-300 line-clamp-2 mt-0.5">
          Autonomous tool-calling server with hybrid dense BM25 + Reciprocal Rank Fusion re-ranking.
        </p>

        <div className="flex flex-wrap gap-1 mt-2">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Python 3.12
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-sky-500/20 text-sky-300 border border-sky-500/30">
            FastMCP
          </span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Qdrant Vector
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1.5 border-t border-white/10">
        <div className="flex items-center gap-1">
          <Terminal className="w-3 h-3 text-zinc-400" />
          <span>Evaluation: 94.2% Context Precision</span>
        </div>
        <span className="text-sky-400 font-medium">View Project →</span>
      </div>
    </div>
  );
};
