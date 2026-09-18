import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ChevronRight, Briefcase, Boxes, Award, Cpu, GraduationCap, Building2, Phone } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { AppId } from '../../types';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  appId: AppId;
  description: string;
  icon: any;
  projectId?: string;
  certId?: string;
}

export const Spotlight: React.FC = () => {
  const { isSpotlightOpen, toggleSpotlight, openApp, selectProject, selectCert } = useOSStore();
  const [query, setQuery] = useState('');

  const searchIndex = useMemo<SearchResult[]>(() => {
    const list: SearchResult[] = [];

    // Recruiter & Positioning
    list.push({
      id: 'recruiter-profile',
      title: 'Abinash Swain — Candidate Brief',
      category: 'Recruiter',
      appId: 'recruiter',
      description: 'LLM Engineer – RAG, AI Assistants & Knowledge Systems. Open to 2027 full-time roles.',
      icon: Briefcase
    });

    // Projects
    PORTFOLIO_DATA.projects.forEach((proj) => {
      list.push({
        id: `proj-${proj.id}`,
        title: proj.title,
        category: 'Project',
        appId: 'projects',
        description: `${proj.category} • ${proj.technologies.slice(0, 4).join(', ')}`,
        icon: Boxes,
        projectId: proj.id
      });
    });

    // Skills
    PORTFOLIO_DATA.skillsCategorized.forEach((cat) => {
      cat.skills.forEach((skill) => {
        list.push({
          id: `skill-${skill.name}`,
          title: skill.name,
          category: `Skill (${cat.category})`,
          appId: 'skills',
          description: `Proficiency Level ${skill.level}/5 in ${cat.category}`,
          icon: Cpu
        });
      });
    });

    // Experience
    PORTFOLIO_DATA.experience.forEach((exp) => {
      list.push({
        id: `exp-${exp.id}`,
        title: `${exp.role} @ ${exp.company}`,
        category: 'Experience',
        appId: 'experience',
        description: `${exp.location} • ${exp.period}`,
        icon: Building2
      });
    });

    // Education
    PORTFOLIO_DATA.education.forEach((edu) => {
      list.push({
        id: `edu-${edu.id}`,
        title: `${edu.degree} — ${edu.institution}`,
        category: 'Education',
        appId: 'education',
        description: edu.cgpa ? `CGPA: ${edu.cgpa} • ${edu.period}` : edu.period,
        icon: GraduationCap
      });
    });

    // Certifications
    PORTFOLIO_DATA.certifications.forEach((cert) => {
      list.push({
        id: `cert-${cert.id}`,
        title: cert.title,
        category: 'Certification',
        appId: 'certifications',
        description: `${cert.issuer} • ${cert.date}`,
        icon: Award,
        certId: cert.id
      });
    });

    // Contact
    list.push({
      id: 'contact-info',
      title: 'Contact Abinash Swain',
      category: 'Contact',
      appId: 'contact',
      description: `${PORTFOLIO_DATA.personal.email} • ${PORTFOLIO_DATA.personal.phone}`,
      icon: Phone
    });

    return list;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) {
      // Return suggestions
      return searchIndex.filter((item) =>
        ['recruiter-profile', 'proj-docurag-engine', 'proj-mlops-agent-mcp', 'edu-btech'].includes(item.id)
      );
    }
    const q = query.toLowerCase();
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, searchIndex]);

  if (!isSpotlightOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 bg-black/60 backdrop-blur-2xl p-4 pt-16 flex flex-col items-center select-none"
        onClick={toggleSpotlight}
      >
        <div
          className="w-full max-w-[360px] flex flex-col gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Bar */}
          <div className="relative flex items-center w-full">
            <Search className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Spotlight Search (RAG, MCP, CUTM...)"
              autoFocus
              className="w-full h-11 pl-10 pr-9 rounded-2xl bg-zinc-800/90 text-white placeholder-zinc-400 text-sm border border-white/10 focus:outline-none focus:border-blue-500/80 shadow-xl"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 w-5 h-5 rounded-full bg-zinc-700 text-zinc-300 flex items-center justify-center hover:bg-zinc-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Quick Suggestion Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
            {['RAG', 'MCP', 'LangGraph', 'DocuRAG', 'CUTM', 'Oracle', 'InternPe'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 rounded-full bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20 transition-colors shrink-0 text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto no-scrollbar rounded-2xl bg-zinc-900/90 border border-white/10 p-1.5 divide-y divide-white/5 shadow-2xl">
            {results.length === 0 ? (
              <div className="text-center text-zinc-400 text-xs py-8">
                No matching portfolio records found for "{query}"
              </div>
            ) : (
              results.map((res) => {
                const Icon = res.icon;
                return (
                  <div
                    key={res.id}
                    onClick={() => {
                      if (res.projectId) selectProject(res.projectId);
                      if (res.certId) selectCert(res.certId);
                      openApp(res.appId);
                      toggleSpotlight();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-white truncate max-w-[190px]">
                            {res.title}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 uppercase font-medium">
                            {res.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 truncate max-w-[220px]">
                          {res.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                  </div>
                );
              })
            )}
          </div>

          <div className="text-center text-[10px] text-zinc-400">
            Tap outside or click result to open app
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
