import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  ChevronLeft,
  ChevronRight,
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
  CheckCircle2,
  Globe,
  Home,
  BookOpen,
  Laptop
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

interface FavoriteBookmark {
  id: string;
  title: string;
  url: string;
  iconType: 'github' | 'linkedin' | 'oracle' | 'forage' | 'tutorialspoint' | 'cutm' | 'demo' | 'web';
  accent: string;
}

const FAVORITES: FavoriteBookmark[] = [
  {
    id: 'github',
    title: 'GitHub',
    url: PORTFOLIO_DATA.personal.github,
    iconType: 'github',
    accent: 'bg-zinc-800 text-white'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    url: PORTFOLIO_DATA.personal.linkedin,
    iconType: 'linkedin',
    accent: 'bg-sky-600 text-white'
  },
  {
    id: 'oracle',
    title: 'Oracle Verify',
    url: 'https://catalog-education.oracle.com',
    iconType: 'oracle',
    accent: 'bg-red-600 text-white'
  },
  {
    id: 'deloitte',
    title: 'Deloitte Sim',
    url: 'https://forage.com/verify/6a7f3098aa694bdf89596229',
    iconType: 'forage',
    accent: 'bg-emerald-600 text-white'
  },
  {
    id: 'tata',
    title: 'Tata GenAI',
    url: 'https://forage.com/verify/6a7c8a233266dbc982059c85',
    iconType: 'forage',
    accent: 'bg-blue-600 text-white'
  },
  {
    id: 'tutorialspoint',
    title: 'TutorialsPoint',
    url: 'https://verify.tutorialspoint.com',
    iconType: 'tutorialspoint',
    accent: 'bg-amber-600 text-white'
  },
  {
    id: 'cutm',
    title: 'CUTM Portal',
    url: 'https://cutm.ac.in',
    iconType: 'cutm',
    accent: 'bg-purple-600 text-white'
  },
  {
    id: 'demo',
    title: 'DocuRAG Live',
    url: 'https://ais-dev-clxhguavorwiqmygvyflld-888038745886.asia-east1.run.app',
    iconType: 'demo',
    accent: 'bg-indigo-600 text-white'
  }
];

export const SafariApp: React.FC = () => {
  const { theme, safariUrl, safariTitle, setSafariNavigation, showToast } = useOSStore();
  const isDark = theme === 'dark';

  // Navigation History Stack
  const [history, setHistory] = useState<string[]>(() => [safariUrl || 'home']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'iframe' | 'reader'>('iframe');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentUrl = history[historyIndex] || 'home';
  const isHomePage = currentUrl === 'home' || currentUrl === '' || currentUrl === 'about:blank';

  // Synchronize when store pushes a new safariUrl
  useEffect(() => {
    if (safariUrl && safariUrl !== currentUrl) {
      navigateTo(safariUrl);
    }
  }, [safariUrl]);

  // Update address bar text when URL changes
  useEffect(() => {
    if (isHomePage) {
      setInputUrl('');
    } else {
      setInputUrl(currentUrl);
    }
  }, [currentUrl, isHomePage]);

  const navigateTo = (url: string) => {
    let cleanUrl = url.trim();
    if (!cleanUrl) {
      cleanUrl = 'home';
    } else if (cleanUrl !== 'home' && !cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `https://${cleanUrl}`;
    }

    setIsLoading(true);
    // Push to history after current index
    setHistory((prev) => {
      const next = prev.slice(0, historyIndex + 1);
      return [...next, cleanUrl];
    });
    setHistoryIndex((prev) => prev + 1);
    setSafariNavigation(cleanUrl);

    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  const handleGoBack = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      const url = history[prevIdx];
      setSafariNavigation(url);
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const handleGoForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      const url = history[nextIdx];
      setSafariNavigation(url);
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setReloadKey((k) => k + 1);
    setTimeout(() => setIsLoading(false), 600);
  };

  const handleGoHome = () => {
    navigateTo('home');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    navigateTo(inputUrl);
  };

  const handleShare = () => {
    const urlToShare = isHomePage ? window.location.href : currentUrl;
    navigator.clipboard?.writeText(urlToShare);
    setCopiedLink(true);
    showToast({
      id: `safari-copy-${Date.now()}`,
      title: 'Link Copied to Clipboard',
      subtitle: urlToShare
    });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleOpenExternal = () => {
    if (!isHomePage) {
      window.open(currentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Helper to extract clean domain for address pill
  const getDomain = (urlStr: string) => {
    if (isHomePage) return 'Search or enter website name';
    try {
      const parsed = new URL(urlStr);
      return parsed.hostname.replace('www.', '');
    } catch {
      return urlStr;
    }
  };

  const isGitHub = currentUrl.toLowerCase().includes('github.com');
  const isLinkedIn = currentUrl.toLowerCase().includes('linkedin.com');

  return (
    <div className={`flex-1 min-h-0 w-full flex flex-col justify-between overflow-hidden pb-16 select-none ${
      isDark ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-900'
    }`}>
      {/* Safari Glass Header & Search / Address Bar */}
      <div className={`pt-2 px-3 pb-2 border-b z-20 backdrop-blur-2xl transition-colors ${
        isDark ? 'bg-zinc-900/85 border-white/10' : 'bg-white/85 border-zinc-200 shadow-xs'
      }`}>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {/* Glass Address Input Capsule */}
          <div className={`flex-1 h-9 px-3 rounded-full border flex items-center justify-between text-xs transition-all shadow-inner ${
            isDark
              ? 'bg-zinc-800/90 border-white/10 text-white focus-within:border-blue-500/50'
              : 'bg-zinc-100 border-zinc-300 text-zinc-900 focus-within:border-blue-500/60'
          }`}>
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {!isHomePage ? (
                <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              ) : (
                <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              )}
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Search or enter website name"
                className="bg-transparent border-none outline-none w-full text-xs truncate font-medium"
              />
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-1">
              {!isHomePage && (
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors"
                  title="Reload page"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Loading Progress Line */}
        {isLoading && (
          <div className="h-0.5 w-full bg-transparent mt-1.5 overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full animate-pulse w-4/5 transition-all duration-300" />
          </div>
        )}
      </div>

      {/* Main Browser Viewport */}
      <div className="flex-1 min-h-0 w-full overflow-hidden relative flex flex-col">
        {isHomePage ? (
          /* Safari Start Page (Favorites, Recents, Privacy Report) */
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
            {/* Start Page Greeting */}
            <div className="pt-2">
              <h2 className="text-2xl font-bold tracking-tight">Favorites</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Quick access to verified links and live demos</p>
            </div>

            {/* Favorites Icon Grid */}
            <div className="grid grid-cols-4 gap-4">
              {FAVORITES.map((fav) => (
                <button
                  key={fav.id}
                  onClick={() => navigateTo(fav.url)}
                  className="flex flex-col items-center gap-1.5 group cursor-pointer active:scale-95 transition-transform"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${fav.accent} shadow-md flex items-center justify-center border border-white/10 group-hover:scale-105 transition-all`}
                  >
                    {fav.iconType === 'github' && <Github className="w-7 h-7" />}
                    {fav.iconType === 'linkedin' && <Linkedin className="w-7 h-7" />}
                    {fav.iconType === 'oracle' && <ShieldCheck className="w-7 h-7" />}
                    {fav.iconType === 'forage' && <Globe className="w-7 h-7" />}
                    {fav.iconType === 'tutorialspoint' && <Sparkles className="w-7 h-7" />}
                    {fav.iconType === 'cutm' && <BookOpen className="w-7 h-7" />}
                    {fav.iconType === 'demo' && <Layers className="w-7 h-7" />}
                    {fav.iconType === 'web' && <Globe className="w-7 h-7" />}
                  </div>
                  <span className="text-[11px] font-semibold text-center truncate max-w-[70px] leading-tight">
                    {fav.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Reading List / Key Repositories */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span>Frequently Visited</span>
              </h3>

              <div className="space-y-2">
                <div
                  onClick={() => navigateTo('https://github.com/abinash123hg')}
                  className={`p-3 rounded-2xl border shadow-sm cursor-pointer flex items-center justify-between transition-all active:scale-98 ${
                    isDark ? 'bg-zinc-900/80 border-white/10 hover:bg-zinc-800' : 'bg-white border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-800 text-white flex items-center justify-center border border-white/10">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">GitHub — abinash123hg</h4>
                      <p className="text-[11px] text-zinc-400">Repositories, FastMCP tools & RAG pipelines</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </div>

                <div
                  onClick={() => navigateTo('https://www.linkedin.com/in/abinash-swain-a941a3330/')}
                  className={`p-3 rounded-2xl border shadow-sm cursor-pointer flex items-center justify-between transition-all active:scale-98 ${
                    isDark ? 'bg-zinc-900/80 border-white/10 hover:bg-zinc-800' : 'bg-white border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center border border-white/10">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">LinkedIn Profile</h4>
                      <p className="text-[11px] text-zinc-400">Professional experience, network & verified credentials</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </div>
              </div>
            </div>

            {/* Privacy & Security Card */}
            <div className={`p-3.5 rounded-2xl border ${
              isDark ? 'bg-zinc-900/50 border-white/10 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700'
            }`}>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Privacy Report</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Safari on iPhone automatically isolates external browsing sessions and protects against cross-site tracking. External sites load directly inside this web view.
              </p>
            </div>
          </div>
        ) : (
          /* Live Browser Web View (iframe + Smart Reader Fallback) */
          <div className="flex-1 min-h-0 w-full flex flex-col relative bg-white">
            {/* Embedded Web View Status Pill */}
            <div className="bg-zinc-900 px-3 py-1.5 text-white text-[11px] flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-1.5 truncate max-w-[220px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="truncate text-zinc-300 font-mono text-[10px]">{getDomain(currentUrl)}</span>
              </div>

              <div className="flex items-center gap-1">
                {(isGitHub || isLinkedIn) && (
                  <button
                    onClick={() => setViewMode(viewMode === 'iframe' ? 'reader' : 'iframe')}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border transition-all ${
                      viewMode === 'reader'
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-zinc-800 text-zinc-300 border-white/10 hover:bg-zinc-700'
                    }`}
                  >
                    {viewMode === 'reader' ? 'Live Frame' : 'Reader View'}
                  </button>
                )}
                <button
                  onClick={handleOpenExternal}
                  className="p-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                  title="Open in new window"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Either Render Smart Mobile Reader OR Live Iframe */}
            {viewMode === 'reader' && (isGitHub || isLinkedIn) ? (
              <div className="flex-1 overflow-y-auto no-scrollbar p-4 bg-zinc-950 text-white space-y-4">
                {isGitHub && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                      <div className="w-12 h-12 rounded-2xl bg-white text-zinc-950 flex items-center justify-center">
                        <Github className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold">abinash123hg</h3>
                        <p className="text-xs text-blue-400">Abinash Swain • AI/ML Developer</p>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Specializing in Retrieval-Augmented Generation (RAG), FastMCP Agent Workflows, and Neural Network architectures.
                    </p>
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-zinc-400">Featured Repositories</span>
                      <div className="p-3 rounded-2xl bg-zinc-900 border border-white/10 space-y-1">
                        <span className="text-xs font-bold text-blue-400">DocuRAG-MCP-Assistant</span>
                        <p className="text-[11px] text-zinc-400">Multi-modal hybrid RAG engine using LlamaIndex, Qdrant, and FlashRank re-ranking.</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-zinc-900 border border-white/10 space-y-1">
                        <span className="text-xs font-bold text-blue-400">Cutm-Placement-Intelligence</span>
                        <p className="text-[11px] text-zinc-400">Automated candidate ranking and talent match system built with Python and FastAPI.</p>
                      </div>
                    </div>
                  </div>
                )}

                {isLinkedIn && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                      <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center">
                        <Linkedin className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold">Abinash Swain</h3>
                        <p className="text-xs text-sky-400">AI/ML Developer | LLM & RAG Systems</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-zinc-900 border border-white/10 space-y-2 text-xs">
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Education</span>
                        <span className="font-semibold text-white">Centurion University of Technology and Management</span>
                        <span className="text-zinc-400 block text-[11px]">B.Tech CSE (AI & ML) • CGPA 8.32 / 10.0</span>
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <span className="text-zinc-400 block text-[10px]">Current Experience</span>
                        <span className="font-semibold text-white">TutorialsPoint Academy — AI/ML Developer</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 min-h-0 w-full relative bg-white">
                <iframe
                  ref={iframeRef}
                  key={`${currentUrl}-${reloadKey}`}
                  src={currentUrl}
                  title={safariTitle || 'Safari Browser'}
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
                  onLoad={() => setIsLoading(false)}
                />

                {/* Subtle overlay hint if the remote server blocks framing */}
                {(isGitHub || isLinkedIn) && (
                  <div className="absolute bottom-2 left-3 right-3 p-2.5 rounded-xl bg-zinc-900/90 border border-white/15 text-white shadow-xl backdrop-blur-md flex items-center justify-between">
                    <span className="text-[10px] text-zinc-300">
                      If page restricts iframe embedding:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setViewMode('reader')}
                        className="text-[10px] font-bold px-2 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                      >
                        Reader Mode
                      </button>
                      <button
                        onClick={handleOpenExternal}
                        className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-1"
                      >
                        <span>Open Ext</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Safari Bottom iOS Toolbar */}
      <div className={`px-4 py-2 border-t flex items-center justify-between z-20 backdrop-blur-2xl transition-colors ${
        isDark ? 'bg-zinc-950/95 border-white/10 text-zinc-400' : 'bg-white/95 border-zinc-200 text-zinc-600 shadow-lg'
      }`}>
        <button
          onClick={handleGoBack}
          disabled={historyIndex <= 0}
          className={`p-2 rounded-full transition-all active:scale-95 ${
            historyIndex > 0 ? 'text-blue-500 hover:bg-blue-500/15' : 'text-zinc-600 opacity-40 cursor-not-allowed'
          }`}
          title="Back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleGoForward}
          disabled={historyIndex >= history.length - 1}
          className={`p-2 rounded-full transition-all active:scale-95 ${
            historyIndex < history.length - 1 ? 'text-blue-500 hover:bg-blue-500/15' : 'text-zinc-600 opacity-40 cursor-not-allowed'
          }`}
          title="Forward"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={handleShare}
          className="p-2 rounded-full text-blue-500 hover:bg-blue-500/15 transition-all active:scale-95"
          title="Share Page"
        >
          {copiedLink ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
        </button>

        <button
          onClick={handleGoHome}
          className={`p-2 rounded-full transition-all active:scale-95 ${
            isHomePage ? 'text-blue-500 bg-blue-500/15' : 'text-zinc-400 hover:text-white hover:bg-white/10'
          }`}
          title="Start Page"
        >
          <Compass className="w-5 h-5" />
        </button>

        <button
          onClick={handleOpenExternal}
          disabled={isHomePage}
          className={`p-2 rounded-full transition-all active:scale-95 ${
            !isHomePage ? 'text-zinc-400 hover:text-white hover:bg-white/10' : 'text-zinc-600 opacity-40 cursor-not-allowed'
          }`}
          title="Open in new window"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
