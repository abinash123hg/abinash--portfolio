import React, { useState } from 'react';
import { StickyNote, ChevronRight, Search, Copy, CheckCircle2, X } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { useOSStore } from '../store/useOSStore';

interface NoteItem {
  id: string;
  title: string;
  category: string;
  date: string;
  snippet: string;
  content: string;
}

const NOTES: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Production RAG Architecture Blueprint',
    category: 'Architecture',
    date: 'Sep 12, 2026',
    snippet: 'Hybrid search with Reciprocal Rank Fusion (RRF) beats single vector search by 31%...',
    content: `PRODUCTION RAG BEST PRACTICES (DocuRAG Case Study):

1. Chunking Strategy:
- Semantic window chunking with 512 tokens + 64 token overlap preserves multi-turn reasoning context.
- Separate chunk metadata for parent document IDs and timestamps.

2. Hybrid Retrieval:
- Dense retrieval: BAAI/bge-large-en-v1.5 embeddings for semantic depth.
- Sparse retrieval: BM25 for precise part numbers, IDs, and domain acronyms.
- Fusion: Reciprocal Rank Fusion (RRF) with k=60 to normalize disparate score scales.

3. Re-ranking:
- Re-rank top-25 candidate passages with FlashRank cross-encoder to yield top-5 high-relevance chunks.
- Result: 94.2% Context Precision, 42% hallucination reduction.`
  },
  {
    id: 'note-2',
    title: 'Model Context Protocol (FastMCP) Setup',
    category: 'AI Agents',
    date: 'Aug 29, 2026',
    snippet: 'Exposing Python ML pipelines to Claude Desktop & Cursor via standardized stdio JSON-RPC...',
    content: `FAST-MCP IMPLEMENTATION NOTES:

- Model Context Protocol (MCP) enables LLM clients to safely invoke local tools without custom API glue.
- Server Architecture:
  * FastMCP wrapper exposing tool decorators: @mcp.tool()
  * Profiling tool: automated pandas-profiling / ydata summary JSON.
  * Training tool: Train classifier asynchronously, returning ROC-AUC and confusion matrix.
  * Local Ollama integration: Vector query over ChromaDB embeddings completely offline.`
  },
  {
    id: 'note-3',
    title: 'Search Ranking: LambdaMART & Two-Stage Scoring',
    category: 'Machine Learning',
    date: 'Aug 15, 2026',
    snippet: 'Faiss candidate generation paired with LambdaMART LightGBM optimization for 100k+ catalog...',
    content: `SEARCH RANKING & EXPLAINABILITY:

Stage 1: Candidate Generation
- Faiss IndexFlatIP (Inner Product) to retrieve top-200 candidates in <12ms.

Stage 2: Re-ranking
- LambdaMART via LightGBM optimized directly for NDCG@10.
- Features: BM25 score, semantic cosine similarity, user click history, freshness decay, price distance.
- Metric achieved: NDCG@10 of 0.892, +19.4% CTR lift, <65ms P95 latency.`
  },
  {
    id: 'note-4',
    title: '2027 AI/ML Interview Preparation Goals',
    category: 'Career Focus',
    date: 'Sep 01, 2026',
    snippet: 'Core milestones for LLM Engineer, RAG Architect, and Machine Learning internships...',
    content: `TARGET CAPABILITIES FOR 2027 APPLICATIONS:

1. End-to-End MLOps:
- CI/CD deployment, model monitoring (data drift, concept drift), containerization.

2. Agentic Workflows:
- LangGraph state machines, multi-agent coordination, human-in-the-loop validation, FastMCP.

3. Production Guardrails:
- NeMo Guardrails, hallucination detection, prompt injection mitigation, latency budget optimization.`
  }
];

export const NotesApp: React.FC = () => {
  const { theme } = useOSStore();
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [query, setQuery] = useState('');
  const isDark = theme === 'dark';

  const filteredNotes = NOTES.filter(
    (n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.snippet.toLowerCase().includes(query.toLowerCase()) ||
      n.content.toLowerCase().includes(query.toLowerCase())
  );

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col justify-between overflow-hidden pb-16">
      <AppHeader
        title={selectedNote ? 'Note' : 'Notes'}
        subtitle={selectedNote ? selectedNote.category : `${NOTES.length} Technical Notes`}
        onBack={selectedNote ? () => setSelectedNote(null) : undefined}
        backLabel={selectedNote ? 'Notes' : 'Home'}
        rightAction={
          selectedNote && (
            <button
              onClick={() => handleCopy(selectedNote.content)}
              className="p-1.5 rounded-full hover:bg-white/10 text-amber-400"
              title="Copy Note"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          )
        }
      />

      {selectedNote ? (
        /* Note Detail Screen */
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-3">
          <div className="text-[11px] text-zinc-400 font-mono">{selectedNote.date}</div>
          <h2 className="text-base font-bold text-amber-400">{selectedNote.title}</h2>
          <div
            className={`p-4 rounded-3xl border whitespace-pre-wrap font-sans text-xs leading-relaxed ${
              isDark ? 'bg-zinc-900/80 border-white/10 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-800'
            }`}
          >
            {selectedNote.content}
          </div>
        </div>
      ) : (
        /* Notes List Screen */
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search bar */}
          <div className="p-3 pb-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-2xl bg-zinc-800/80 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex-1 p-3 overflow-y-auto no-scrollbar space-y-2.5">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`p-3.5 rounded-2xl border shadow-sm cursor-pointer transition-all hover:border-amber-500/40 ${
                  isDark ? 'bg-zinc-900/70 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                    {note.category}
                  </span>
                  <span className="text-[10px] text-zinc-500">{note.date}</span>
                </div>
                <h3 className="text-xs font-bold mt-1 tracking-tight truncate">{note.title}</h3>
                <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-2 leading-relaxed">
                  {note.snippet}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
