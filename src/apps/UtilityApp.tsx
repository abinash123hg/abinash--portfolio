import React, { useState } from 'react';
import { Wrench, Calculator, Zap, Cpu, CheckCircle2, Sparkles } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { useOSStore } from '../store/useOSStore';

export const UtilityApp: React.FC = () => {
  const { theme } = useOSStore();
  const [tokens, setTokens] = useState<number>(15000);
  const [activeTab, setActiveTab] = useState<'tokens' | 'latency'>('latency');
  const isDark = theme === 'dark';

  // RAG Latency Budget Simulator
  const [denseLatency, setDenseLatency] = useState(18); // ms
  const [sparseLatency, setSparseLatency] = useState(12); // ms
  const [rerankLatency, setRerankLatency] = useState(85); // ms
  const [ttftLatency, setTtftLatency] = useState(240); // ms

  const totalRagLatency = Math.max(denseLatency, sparseLatency) + rerankLatency + ttftLatency;

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader title="Utilities" subtitle="AI Engineering Calculators" />

      {/* Segmented Control */}
      <div className="p-3 pt-2">
        <div
          className={`p-1 rounded-2xl flex items-center justify-between text-xs font-medium border ${
            isDark ? 'bg-zinc-900/80 border-white/10' : 'bg-zinc-200 border-zinc-300'
          }`}
        >
          <button
            onClick={() => setActiveTab('latency')}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer text-center text-xs ${
              activeTab === 'latency'
                ? 'bg-blue-600 text-white shadow font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            RAG Latency Budget
          </button>
          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer text-center text-xs ${
              activeTab === 'tokens'
                ? 'bg-blue-600 text-white shadow font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            LLM Token Estimator
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {activeTab === 'latency' ? (
          /* RAG Latency Budget Simulator */
          <div className="space-y-4">
            <div
              className={`p-4 rounded-3xl border shadow-xl text-center ${
                isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
                Total Estimated Pipeline Latency
              </span>
              <div className="text-3xl font-black text-emerald-400 mt-1 font-mono tracking-tight">
                {totalRagLatency} ms
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                {totalRagLatency < 580 ? 'Optimal Production Budget (<580ms)' : 'Latency Exceeds Budget'}
              </p>
            </div>

            {/* Sliders */}
            <div
              className={`p-4 rounded-3xl border shadow-md space-y-4 ${
                isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            >
              {/* Dense Retrieval */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-300">
                  <span>Dense Vector Search (Qdrant / Chroma)</span>
                  <span className="font-mono text-blue-400 font-bold">{denseLatency} ms</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={denseLatency}
                  onChange={(e) => setDenseLatency(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              {/* Sparse BM25 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-300">
                  <span>Sparse Keyword Search (BM25)</span>
                  <span className="font-mono text-cyan-400 font-bold">{sparseLatency} ms</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={sparseLatency}
                  onChange={(e) => setSparseLatency(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              {/* Cross-Encoder Re-ranker */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-300">
                  <span>Re-ranking (FlashRank Cross-Encoder)</span>
                  <span className="font-mono text-purple-400 font-bold">{rerankLatency} ms</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  value={rerankLatency}
                  onChange={(e) => setRerankLatency(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              {/* LLM TTFT */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-300">
                  <span>LLM Time to First Token (TTFT)</span>
                  <span className="font-mono text-amber-400 font-bold">{ttftLatency} ms</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="800"
                  value={ttftLatency}
                  onChange={(e) => setTtftLatency(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Token Cost Estimator */
          <div className="space-y-4">
            <div
              className={`p-4 rounded-3xl border shadow-xl ${
                isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            >
              <div className="flex justify-between text-xs text-zinc-400 mb-1">
                <span>Estimated Prompt Tokens</span>
                <span className="font-mono font-bold text-white">{tokens.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={tokens}
                onChange={(e) => setTokens(Number(e.target.value))}
                className="w-full accent-blue-500"
              />

              <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Gemini 2.5 Flash</span>
                  <span className="font-mono font-bold text-emerald-400">
                    ${((tokens / 1000000) * 0.075).toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Claude 3.5 Sonnet</span>
                  <span className="font-mono font-bold text-blue-400">
                    ${((tokens / 1000000) * 3.0).toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Local Ollama (Llama-3)</span>
                  <span className="font-mono font-bold text-emerald-400">$0.00 (Self-Hosted)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
