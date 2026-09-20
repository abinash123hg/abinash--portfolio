import React, { useState } from 'react';
import { Folder, FileText, Award, Boxes, ChevronRight, Download, Eye, X } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

interface FileItem {
  id: string;
  name: string;
  size: string;
  date: string;
  category: string;
  content: string;
}

const FILES: Record<string, FileItem[]> = {
  Documents: [
    {
      id: 'f1',
      name: PORTFOLIO_DATA.personal.resumeFileName,
      size: '142 KB',
      date: 'Sep 12, 2026',
      category: 'PDF Document',
      content: `Official Candidate Resume for Abinash Swain.\nTarget: LLM Engineer – RAG, AI Assistants & Knowledge Systems.\nCGPA: 8.32 / 10.0 (Centurion University).`
    },
    {
      id: 'f2',
      name: 'recruiter_candidate_brief.md',
      size: '28 KB',
      date: 'Sep 14, 2026',
      category: 'Markdown Document',
      content: `Executive candidate brief outlining RAG production metrics, FastMCP architecture, and 2027 employment availability.`
    }
  ],
  Projects: [
    {
      id: 'f3',
      name: 'docurag_pipeline.py',
      size: '34 KB',
      date: 'Aug 28, 2026',
      category: 'Python Source',
      content: `Hybrid retrieval: Reciprocal Rank Fusion (BM25 + BAAI/bge-large-en-v1.5) + FlashRank Cross-Encoder re-ranking.`
    },
    {
      id: 'f4',
      name: 'fastmcp_server.py',
      size: '19 KB',
      date: 'Aug 14, 2026',
      category: 'Python Source',
      content: `FastMCP tool registry exposing automated dataset profiling, Scikit-learn model fitting, and ChromaDB vector search to Claude Desktop.`
    }
  ],
  Certificates: [
    {
      id: 'f5',
      name: 'Oracle_Agentic_AI_1Z0-1135-25.pdf',
      size: '1.2 MB',
      date: 'Aug 17, 2026',
      category: 'Credential File',
      content: `Oracle Certified Associate — Agentic AI credential issued to Abinash Swain.`
    },
    {
      id: 'f6',
      name: 'Adobe_AI_Essentials_Marketers.pdf',
      size: '890 KB',
      date: 'Sep 01, 2026',
      category: 'Credential File',
      content: `Adobe Certified: AI Essentials for Marketers issued to Abinash Swain.`
    }
  ]
};

export const FinderApp: React.FC = () => {
  const { theme } = useOSStore();
  const [activeFolder, setActiveFolder] = useState<string>('Documents');
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const isDark = theme === 'dark';

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col justify-between overflow-hidden pb-16">
      <AppHeader title="Files" subtitle="iCloud Drive & Local Storage" />

      {/* Folder Tab Selector */}
      <div className="p-3 bg-zinc-900/80 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {Object.keys(FILES).map((folder) => (
          <button
            key={folder}
            onClick={() => setActiveFolder(folder)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFolder === folder
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>{folder}</span>
          </button>
        ))}
      </div>

      {/* File List in Current Folder */}
      <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-2.5">
        {FILES[activeFolder].map((file) => (
          <div
            key={file.id}
            onClick={() => setPreviewFile(file)}
            className={`p-3.5 rounded-2xl border shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-500/40 transition-all ${
              isDark ? 'bg-zinc-900/70 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold truncate text-white">{file.name}</h4>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5">
                  <span>{file.category}</span>
                  <span>•</span>
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>{file.date}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-500 shrink-0" />
          </div>
        ))}
      </div>

      {/* Quick Look Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-4 text-white">
          <div className="flex items-center justify-between py-2">
            <span className="text-xs font-semibold text-zinc-400 truncate max-w-[240px]">
              {previewFile.name}
            </span>
            <button
              onClick={() => setPreviewFile(null)}
              className="w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto p-5 rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-bold">{previewFile.name}</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono">{previewFile.size}</span>
            </div>
            <p className="text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed font-mono bg-black/40 p-3 rounded-xl">
              {previewFile.content}
            </p>
          </div>

          <button
            onClick={() => setPreviewFile(null)}
            className="w-full py-2.5 rounded-2xl bg-blue-600 text-xs font-bold text-white shadow-lg"
          >
            Close Preview
          </button>
        </div>
      )}
    </div>
  );
};
