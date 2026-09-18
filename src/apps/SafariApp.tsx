import React, { useState, useEffect } from 'react';
import {
  Compass,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Share2,
  Bookmark,
  ShieldCheck,
  Lock,
  Search,
  ExternalLink,
  Github,
  Linkedin,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

interface BookmarkItem {
  title: string;
  url: string;
  category: string;
  badge: string;
  type: 'github' | 'linkedin' | 'demo' | 'web';
}

export const SafariApp: React.FC = () => {
  const { theme, safariUrl, setSafariNavigation } = useOSStore();
  const [currentUrl, setCurrentUrl] = useState(safariUrl || 'https://github.com/abinash123hg');
  const [inputUrl, setInputUrl] = useState(currentUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (safariUrl) {
      setCurrentUrl(safariUrl);
      setInputUrl(safariUrl);
    }
  }, [safariUrl]);

  const isDark = theme === 'dark';

  const bookmarks: BookmarkItem[] = [
    {
      title: 'GitHub — abinash123hg',
      url: PORTFOLIO_DATA.personal.github,
      category: 'Code Repositories & OSS',
      badge: 'GitHub',
      type: 'github'
    },
    {
      title: 'LinkedIn — Abinash Swain',
      url: PORTFOLIO_DATA.personal.linkedin,
      category: 'Professional Network',
      badge: 'LinkedIn',
      type: 'linkedin'
    },
    {
      title: 'DocuRAG & MCP Agent Live Engine',
      url: 'https://ais-dev-clxhguavorwiqmygvyflld-888038745886.asia-east1.run.app',
      category: 'Cloud Run Deployment',
      badge: 'Live Run',
      type: 'demo'
    },
    {
      title: 'Centurion University CUTM',
      url: 'https://cutm.ac.in',
      category: 'Academic Institution',
      badge: 'Academic',
      type: 'web'
    }
  ];

  const handleNavigate = (url: string, title?: string) => {
    setIsLoading(true);
    setCurrentUrl(url);
    setInputUrl(url);
    setSafariNavigation(url, title || url);
    setTimeout(() => setIsLoading(false), 400);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputUrl.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = `https://${target}`;
    }
    handleNavigate(target);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isGitHub = currentUrl.toLowerCase().includes('github.com');
  const isLinkedIn = currentUrl.toLowerCase().includes('linkedin.com');
  const isDemo = currentUrl.toLowerCase().includes('run.app');

  return (
    <div className="flex-1 w-full h-full flex flex-col justify-between overflow-hidden pb-16 select-none bg-zinc-950 text-white">
      <AppHeader title="Safari" subtitle="iOS Web Browser" />

      {/* Safari Top Address & Navigation Bar */}
      <div className="px-3 py-2 bg-zinc-900/90 border-b border-white/10 backdrop-blur-xl">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="flex-1 h-9 px-3 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-between text-xs text-zinc-300">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="bg-transparent border-none outline-none text-zinc-200 w-full text-xs truncate"
                placeholder="Search or enter website name"
              />
            </div>
            <button
              type="button"
              onClick={() => handleNavigate(currentUrl)}
              className="text-zinc-400 hover:text-white ml-1 shrink-0 p-1"
              title="Refresh"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-sky-400' : ''}`} />
            </button>
          </div>
        </form>

        {/* Loading Progress Bar */}
        {isLoading && (
          <div className="h-0.5 w-full bg-zinc-800 mt-1 overflow-hidden">
            <div className="h-full bg-sky-500 animate-pulse w-3/4" />
          </div>
        )}
      </div>

      {/* Safari Page Content Canvas */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3">
        {/* Render simulated page content for external destinations */}
        {isGitHub && (
          <div className="rounded-3xl border border-white/15 bg-zinc-900/90 p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white text-zinc-900 flex items-center justify-center font-bold">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">abinash123hg</h3>
                  <span className="text-[10px] text-zinc-400">GitHub Verified Profile</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Active Contributor
              </span>
            </div>

            <div className="text-xs text-zinc-300 leading-relaxed">
              <strong>Abinash Swain</strong> • AI/ML Engineer specializing in Retrieval-Augmented Generation (RAG),
              FastMCP Agent Protocols, and production-grade LLM systems.
            </div>

            {/* Repositories showcase inside Safari */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Pinned Repositories
              </span>
              <div className="p-3 rounded-2xl bg-zinc-800/80 border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400">DocuRAG-MCP-Assistant</span>
                  <span className="text-[10px] text-amber-400">★ 94.2% Prec.</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Dual-tier agent orchestrating ChromaDB vector embeddings and Ollama local LLMs via MCP tool calling.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-800/80 border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400">Cutm-Placement-Intelligence</span>
                  <span className="text-[10px] text-zinc-400">Python • FastAPI</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Recruiter analytics pipeline parsing cohort performance and placement tracking.
                </p>
              </div>
            </div>
          </div>
        )}

        {isLinkedIn && (
          <div className="rounded-3xl border border-white/15 bg-zinc-900/90 p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Abinash Swain</h3>
                  <span className="text-[10px] text-sky-400">in/abinash-swain-635032338</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold">
                Open to Work
              </span>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <p className="leading-relaxed">
                <strong>Candidate:</strong> Target LLM Engineer / RAG Systems Developer
              </p>
              <div className="p-2.5 rounded-xl bg-zinc-800/70 border border-white/10 text-[11px] text-zinc-400">
                B.Tech in Computer Science & Engineering • CUTM (CGPA 8.32/10.0)
              </div>
            </div>
          </div>
        )}

        {isDemo && (
          <div className="rounded-3xl border border-white/15 bg-zinc-900/90 p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-white">DocuRAG Cloud Run Live Demo</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Google Cloud Run deployment serving DocuRAG hybrid semantic search with fast sub-120ms token streaming.
            </p>
            <div className="p-3 rounded-2xl bg-zinc-800 text-xs font-mono text-zinc-300">
              STATUS: 200 OK • Region: asia-east1 • Model: Ollama / Llama-3.2
            </div>
          </div>
        )}

        {/* Favorites & Bookmarks Section */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1.5 px-1">
            <Bookmark className="w-3.5 h-3.5 text-sky-400" />
            <span>Favorites & Bookmarks</span>
          </h3>

          <div className="grid grid-cols-1 gap-2">
            {bookmarks.map((bm) => (
              <div
                key={bm.title}
                onClick={() => handleNavigate(bm.url, bm.title)}
                className={`p-3 rounded-2xl border shadow-sm flex items-center justify-between cursor-pointer transition-all active:scale-98 ${
                  currentUrl === bm.url
                    ? 'bg-sky-500/15 border-sky-500/40 text-white'
                    : 'bg-zinc-900/80 hover:bg-zinc-800/80 border-white/10 text-zinc-300'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] text-sky-400 font-semibold block uppercase">
                    {bm.badge}
                  </span>
                  <div className="text-xs font-bold truncate mt-0.5 text-white">{bm.title}</div>
                  <div className="text-[10px] text-zinc-400 truncate">{bm.url}</div>
                </div>
                <Compass className="w-4 h-4 text-zinc-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Browser Security Information */}
        <div className="p-3.5 rounded-2xl border border-white/10 bg-zinc-900/50 space-y-1 text-zinc-400">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>In-Frame Simulated Browser</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            All professional links and project demonstrations render natively inside the simulated iPhone experience, preventing desktop context switching.
          </p>
        </div>
      </div>

      {/* Safari Bottom iOS Navigation Bar */}
      <div className="p-2.5 bg-zinc-950/95 border-t border-white/10 flex items-center justify-around text-zinc-400">
        <button
          onClick={() => handleNavigate(bookmarks[0].url)}
          className="p-2 hover:text-white transition-colors"
          title="Back to GitHub"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleNavigate(bookmarks[1].url)}
          className="p-2 hover:text-white transition-colors"
          title="Forward to LinkedIn"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleShare}
          className="p-2 hover:text-white transition-colors text-sky-400 flex items-center gap-1"
          title="Share URL"
        >
          {copiedLink ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={() => handleNavigate(bookmarks[2].url)}
          className="p-2 hover:text-white transition-colors"
          title="Bookmarks"
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
