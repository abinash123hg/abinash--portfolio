import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Boxes,
  ExternalLink,
  Github,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Layers,
  BarChart2,
  Cpu,
  Search,
  X
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { Project } from '../types';
import { useOSStore } from '../store/useOSStore';

export const ProjectsApp: React.FC = () => {
  const { selectedProjectId, selectProject, openSafari, theme } = useOSStore();
  const [filter, setFilter] = useState<'all' | 'rag' | 'agents' | 'ml'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const isDark = theme === 'dark';

  const projects = PORTFOLIO_DATA.projects;
  const activeProject = projects.find((p) => p.id === selectedProjectId) || null;

  const filteredProjects = projects.filter((p) => {
    // Category filter
    if (filter === 'rag' && !(p.category.includes('RAG') || p.technologies.includes('RAG'))) return false;
    if (filter === 'agents' && !(p.category.includes('Agents') || p.technologies.includes('FastMCP') || p.technologies.includes('LangGraph'))) return false;
    if (filter === 'ml' && !(p.category.includes('Machine Learning') || p.category.includes('Ranking'))) return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchTagline = p.tagline.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTech = p.technologies.some((t) => t.toLowerCase().includes(q));
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchHighlights = p.highlights?.some((h) => h.toLowerCase().includes(q));
      return matchTitle || matchTagline || matchDesc || matchTech || matchCategory || matchHighlights;
    }

    return true;
  });

  return (
    <div className="flex-1 w-full h-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader
        title="Projects"
        subtitle="AI/ML & RAG Systems"
        rightAction={
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
            {filteredProjects.length}
          </span>
        }
      />

      {/* Search Input for Recruiters & Engineering Leads */}
      <div className="px-3 pt-2">
        <div
          className={`relative flex items-center rounded-2xl border px-3 py-2 transition-all ${
            isDark ? 'bg-zinc-900/90 border-white/10 text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-900'
          }`}
        >
          <Search className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter competencies, FastMCP, RAG, PyTorch..."
            className="w-full bg-transparent text-xs placeholder:text-zinc-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-0.5 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Segmented Control */}
      <div className="p-3 pt-2">
        <div
          className={`p-1 rounded-2xl flex items-center justify-between text-xs font-medium border ${
            isDark ? 'bg-zinc-900/80 border-white/10' : 'bg-zinc-200 border-zinc-300'
          }`}
        >
          {[
            { id: 'all', label: 'All' },
            { id: 'rag', label: 'RAG Systems' },
            { id: 'agents', label: 'AI Agents' },
            { id: 'ml', label: 'ML & Ranking' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer text-center text-[11px] ${
                filter === tab.id
                  ? 'bg-blue-600 text-white shadow-md font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="p-3 space-y-3.5">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => selectProject(project.id)}
            className={`p-4 rounded-3xl border shadow-lg cursor-pointer transition-all ${
              isDark
                ? 'bg-zinc-900/75 border-white/10 hover:border-blue-500/40 text-white'
                : 'bg-white border-zinc-200 hover:border-blue-500/40 text-zinc-900'
            }`}
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">
                {project.category}
              </span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </div>

            <h3 className="text-sm font-bold tracking-tight mt-2 text-white">{project.title}</h3>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            {/* Metrics Chips Preview */}
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {project.metrics.slice(0, 2).map((m, i) => (
                <div key={i} className="p-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px]">
                  <span className="text-zinc-400 block">{m.label}</span>
                  <span className="font-bold text-emerald-400">{m.value}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="mt-3 flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-[10px] px-1.5 py-0.5 text-zinc-500">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>

            {/* Bottom links quick row */}
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-blue-400 font-medium flex items-center gap-1 text-[11px]">
                <span>View Full Architecture & Metrics</span>
                <ArrowRight className="w-3 h-3" />
              </span>
              {project.liveDemoUrl && (
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                  Live Demo
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Slide-Up Drawer */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ y: '100%', opacity: 0.95 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.9 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            className="absolute inset-0 z-50 bg-zinc-950 text-white flex flex-col overflow-y-auto no-scrollbar shadow-2xl"
          >
            {/* iOS Modal Grabber Bar */}
            <div className="w-full flex justify-center pt-2 pb-1 bg-zinc-900/90 backdrop-blur-xl">
              <div className="w-10 h-1 rounded-full bg-zinc-600" />
            </div>

            {/* Detail Navigation Header */}
            <div className="sticky top-0 z-30 px-3 py-2.5 bg-zinc-900/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
              <button
                onClick={() => selectProject(null)}
                className="flex items-center gap-1 text-xs text-blue-400 font-medium cursor-pointer"
              >
                <X className="w-5 h-5" />
                <span>Close</span>
              </button>
              <span className="text-xs font-semibold text-zinc-300 truncate max-w-[180px]">
                {activeProject.title}
              </span>
              <div className="w-12 flex justify-end">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-semibold">
                  {activeProject.category}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-4 pb-20">
              {/* Title & Tagline */}
              <div>
                <h2 className="text-lg font-bold tracking-tight">{activeProject.title}</h2>
                <p className="text-xs text-blue-400 font-medium mt-0.5">{activeProject.tagline}</p>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Action Buttons: GitHub & Live Demo */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openSafari(activeProject.githubUrl, `${activeProject.title} — GitHub`)}
                  className="flex-1 p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center gap-2 text-xs font-semibold transition-colors cursor-pointer text-white"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                {activeProject.liveDemoUrl && (
                  <button
                    onClick={() => openSafari(activeProject.liveDemoUrl!, `${activeProject.title} — Live Engine`)}
                    className="flex-1 p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center gap-2 text-xs font-semibold shadow-lg transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Key Metrics Grid */}
              <div className="p-4 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-lg">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Key Verified Metrics</span>
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {activeProject.metrics.map((metric, i) => (
                    <div key={i} className="p-2.5 rounded-2xl bg-white/5 border border-white/5">
                      <span className="text-[10px] text-zinc-400 block">{metric.label}</span>
                      <span className="text-base font-bold text-emerald-400 tracking-tight">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Flow Diagram */}
              <div className="p-4 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-lg">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>System Architecture Flow</span>
                </h3>
                <div className="space-y-2">
                  {activeProject.architecture.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0 border border-blue-500/30">
                        {idx + 1}
                      </span>
                      <span className="p-2 rounded-xl bg-white/5 border border-white/5 text-zinc-200 flex-1">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Highlights */}
              <div className="p-4 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-lg">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  <span>Technical Highlights</span>
                </h3>
                <div className="space-y-2 text-xs">
                  {activeProject.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges & Results */}
              {activeProject.challenges && (
                <div className="p-4 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-lg space-y-3 text-xs">
                  <div>
                    <h4 className="font-bold text-amber-400 uppercase text-[11px] mb-1">Challenge</h4>
                    <p className="text-zinc-300 leading-relaxed">{activeProject.challenges}</p>
                  </div>
                  {activeProject.results && (
                    <div className="pt-2 border-t border-white/10">
                      <h4 className="font-bold text-emerald-400 uppercase text-[11px] mb-1">Results</h4>
                      <p className="text-zinc-300 leading-relaxed">{activeProject.results}</p>
                    </div>
                  )}
                  {activeProject.evaluation && (
                    <div className="pt-2 border-t border-white/10">
                      <h4 className="font-bold text-blue-400 uppercase text-[11px] mb-1">Evaluation</h4>
                      <p className="text-zinc-300 leading-relaxed">{activeProject.evaluation}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Technologies */}
              <div className="p-4 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-lg">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-zinc-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
