import React, { useState } from 'react';
import { Cpu, Sparkles, Layers, Terminal, CheckCircle2, Search, X } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

export const SkillsApp: React.FC = () => {
  const { theme } = useOSStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const isDark = theme === 'dark';

  const categories = PORTFOLIO_DATA.skillsCategorized;

  const filteredCategories = categories
    .filter((c) => activeCategory === 'all' || c.category.toLowerCase().includes(activeCategory.toLowerCase()))
    .map((group) => {
      if (!searchQuery.trim()) return group;
      const q = searchQuery.toLowerCase().trim();
      const catMatches = group.category.toLowerCase().includes(q);
      if (catMatches) return group;
      const matchingSkills = group.skills.filter((s) => s.name.toLowerCase().includes(q));
      return {
        ...group,
        skills: matchingSkills
      };
    })
    .filter((group) => group.skills.length > 0);

  const totalSkillsCount = filteredCategories.reduce((acc, g) => acc + g.skills.length, 0);

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader
        title="Skills & Stack"
        subtitle="AI/ML Core Capabilities"
        rightAction={
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
            {totalSkillsCount}
          </span>
        }
      />

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
            placeholder="Search AI/ML competencies, PyTorch, RAG, MCP..."
            className="w-full bg-transparent text-xs placeholder:text-zinc-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`p-0.5 transition-colors cursor-pointer ${isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-800'}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-3 pt-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
            activeCategory === 'all'
              ? 'bg-purple-600 text-white shadow-md'
              : isDark ? 'bg-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-200 text-zinc-700'
          }`}
        >
          All Domains
        </button>
        {categories.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              activeCategory === cat.category
                ? 'bg-purple-600 text-white shadow-md'
                : isDark ? 'bg-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-200 text-zinc-700'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {filteredCategories.map((group) => (
          <div
            key={group.category}
            className={`p-4 rounded-3xl border shadow-xl ${
              isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-white/10' : 'border-zinc-200'}`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>{group.category}</h3>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono">
                {group.skills.length} competencies
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2">
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`p-2.5 rounded-2xl border flex items-center justify-between transition-colors ${
                    isDark
                      ? 'bg-white/5 border-white/5 hover:bg-white/10'
                      : 'bg-zinc-50 border-zinc-200/80 hover:bg-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {skill.highlight ? (
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    )}
                    <span className={`text-xs font-medium truncate ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      {skill.name}
                    </span>
                  </div>

                  <div className="flex items-end gap-1 shrink-0 ml-2" title={`Proficiency ${skill.level}/5`}>
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <div
                        key={bar}
                        className={`w-1 rounded-xs transition-all ${
                          bar <= skill.level
                            ? skill.highlight ? 'bg-amber-400' : 'bg-blue-400'
                            : isDark ? 'bg-zinc-700' : 'bg-zinc-300'
                        }`}
                        style={{ height: `${bar * 3.2}px` }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
