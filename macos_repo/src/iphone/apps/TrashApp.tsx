import React, { useState } from 'react';
import { Trash2, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { useOSStore } from '../store/useOSStore';

interface TrashItem {
  id: string;
  name: string;
  reason: string;
  date: string;
}

const INITIAL_TRASH: TrashItem[] = [
  {
    id: 't1',
    name: 'CUDA Out-Of-Memory Errors',
    reason: 'Eliminated through gradient accumulation and FlashAttention-2',
    date: '3 days ago'
  },
  {
    id: 't2',
    name: 'Overfitted 99.9% Train Accuracy Model',
    reason: 'Purged in favor of cross-validated generalization',
    date: '1 week ago'
  },
  {
    id: 't3',
    name: 'Hardcoded Regex Parsers',
    reason: 'Replaced with FastMCP & structured LLM tool calling',
    date: '2 weeks ago'
  },
  {
    id: 't4',
    name: 'Manual Vector Distance Loops',
    reason: 'Replaced with Faiss IndexFlatIP and SIMD acceleration',
    date: '1 month ago'
  }
];

export const TrashApp: React.FC = () => {
  const { theme } = useOSStore();
  const [items, setItems] = useState<TrashItem[]>(INITIAL_TRASH);
  const [emptied, setEmptied] = useState(false);
  const isDark = theme === 'dark';

  const handleEmpty = () => {
    setItems([]);
    setEmptied(true);
    setTimeout(() => setEmptied(false), 3000);
  };

  const handleRestore = () => {
    setItems(INITIAL_TRASH);
  };

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col justify-between overflow-hidden pb-16">
      <AppHeader
        title="Recently Deleted"
        subtitle="Legacy Bugs & Deprecated Code"
        rightAction={
          items.length > 0 && (
            <button
              onClick={handleEmpty}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300"
            >
              Empty
            </button>
          )
        }
      />

      <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-3">
        {emptied ? (
          <div className="p-5 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-center space-y-2 my-auto">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
            <h3 className="font-bold text-sm">Trash Emptied!</h3>
            <p className={isDark ? 'text-xs text-zinc-400' : 'text-xs text-zinc-500'}>All legacy bugs and obsolete code purged.</p>
            <button
              onClick={handleRestore}
              className="mt-2 text-xs text-blue-400 underline cursor-pointer"
            >
              Restore for fun
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 text-xs space-y-2">
            <Trash2 className="w-10 h-10 mx-auto opacity-40" />
            <p>No Deleted Items</p>
            <button
              onClick={handleRestore}
              className="text-xs text-blue-400 underline cursor-pointer"
            >
              Reload Legacy Bugs
            </button>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border shadow-sm ${
                isDark ? 'bg-zinc-900/70 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400">{item.name}</span>
                <span className="text-[10px] text-zinc-500 font-mono">{item.date}</span>
              </div>
              <p className={isDark ? 'text-[11px] text-zinc-400 mt-1 leading-relaxed' : 'text-[11px] text-zinc-500 mt-1 leading-relaxed'}>{item.reason}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
