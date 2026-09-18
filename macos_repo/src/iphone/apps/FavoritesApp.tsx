import React, { useState } from 'react';
import { Heart, Star, Sparkles, Film, Quote, ChevronDown, ChevronUp } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';
import { resolveMediaUrl } from '../utils/mediaResolver';

export const FavoritesApp: React.FC = () => {
  const { theme } = useOSStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const isDark = theme === 'dark';

  return (
    <div className="flex-1 w-full h-full flex flex-col overflow-y-auto no-scrollbar pb-16 select-none">
      <AppHeader title="Favorites" subtitle="Shows, Cinema & Inspirations" />

      <div className="p-3.5 space-y-3.5">
        <p className="text-xs text-zinc-400 px-1 leading-relaxed">
          Top-tier series exploring complex systems, game theory, psychological depth, and calculated strategies.
        </p>

        {PORTFOLIO_DATA.favoriteShows.map((show, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={show.title}
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              className={`rounded-3xl border shadow-xl transition-all overflow-hidden cursor-pointer ${
                isDark
                  ? 'bg-zinc-900/85 border-white/10 text-white'
                  : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            >
              {/* Poster Header */}
              {show.posterSrc && (
                <div className="w-full h-36 bg-zinc-950 relative overflow-hidden">
                  <img
                    src={resolveMediaUrl(show.posterSrc, 'favorites')}
                    alt={show.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                        Rank #{idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-white tracking-tight drop-shadow">
                        {show.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-black/60 px-2 py-0.5 rounded-xl border border-amber-500/30 backdrop-blur-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{show.rating}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs text-blue-400 font-semibold">
                  <span>{show.genre}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                </div>

                <div className={`text-xs italic flex items-start gap-1.5 leading-relaxed p-2 rounded-xl border ${
                  isDark ? 'text-zinc-300 bg-white/5 border-white/5' : 'text-zinc-700 bg-zinc-100 border-zinc-200'
                }`}>
                  <Quote className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>"{show.quote}"</span>
                </div>

                {isExpanded && show.synopsis && (
                  <p className={`text-xs leading-relaxed pt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {show.synopsis}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
