import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Play, Pause, FileCheck, PhoneCall, Sparkles, X } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { PORTFOLIO_DATA } from '../../data/portfolio';

export const DynamicIsland: React.FC = () => {
  const {
    isDynamicIslandExpanded,
    dynamicIslandMode,
    toggleDynamicIsland,
    setDynamicIslandMode,
    isPlayingMusic,
    toggleMusic,
    currentTrackIndex,
    openApp
  } = useOSStore();

  const currentTrack = PORTFOLIO_DATA.musicTracks[currentTrackIndex];

  return (
    <div className="relative z-50 flex justify-center items-center pointer-events-auto">
      <motion.div
        layout
        onClick={() => {
          if (!isDynamicIslandExpanded && dynamicIslandMode === 'idle') {
            setDynamicIslandMode('rag-task');
          } else {
            toggleDynamicIsland();
          }
        }}
        className={`bg-black text-white cursor-pointer shadow-2xl transition-[width,height,transform,opacity] duration-200 ease-out flex items-center justify-between overflow-hidden border border-zinc-800/80 will-change-[width,height,transform] ${
          isDynamicIslandExpanded
            ? 'w-[176px] min-h-[54px] rounded-[21px] p-2'
            : dynamicIslandMode !== 'idle'
            ? 'w-[140px] h-[28px] rounded-full px-2'
            : 'w-[112px] h-[26px] rounded-full px-1.5'
        }`}
        animate={{
          scale: 1,
          transition: { type: 'spring', stiffness: 450, damping: 32 }
        }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Compact Mode */}
        {!isDynamicIslandExpanded && (
          <div className="w-full flex items-center justify-between text-xs">
            {dynamicIslandMode === 'music' ? (
              <>
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-[11px] font-medium truncate max-w-[85px] text-zinc-200">
                    {currentTrack.title}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-rose-400">
                  <span className="w-1 h-3 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
                  <span className="w-1 h-4 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.1s]" />
                  <span className="w-1 h-2 bg-rose-500 rounded-full animate-bounce" />
                </div>
              </>
            ) : dynamicIslandMode === 'rag-task' ? (
              <>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin [animation-duration:3s]" />
                  <span className="text-[11px] font-medium text-cyan-300">DocuRAG</span>
                </div>
                <span className="text-[10px] text-zinc-400 bg-cyan-950/80 px-1.5 py-0.5 rounded-full border border-cyan-800/50">
                  94.2%
                </span>
              </>
            ) : dynamicIslandMode === 'resume' ? (
              <>
                <div className="flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] font-medium text-emerald-300">Resume.pdf</span>
                </div>
                <span className="text-[10px] text-emerald-400">Ready</span>
              </>
            ) : (
              /* Idle Pill */
              <div className="w-full flex items-center justify-between px-1">
                <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80" />
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
              </div>
            )}
          </div>
        )}

        {/* Expanded Mode */}
        <AnimatePresence>
          {isDynamicIslandExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {dynamicIslandMode === 'music' ? (
                <div className="flex items-center justify-between w-full">
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => {
                      openApp('music');
                      toggleDynamicIsland(false);
                    }}
                  >
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${currentTrack.coverColor} flex items-center justify-center shadow-md shrink-0`}>
                      <Music className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="text-[10px] font-semibold text-white truncate">
                        {currentTrack.title}
                      </div>
                      <div className="text-[9px] text-zinc-400 truncate">
                        {currentTrack.artist}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMusic}
                      className="w-6 h-6 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white shrink-0"
                      title={isPlayingMusic ? 'Pause' : 'Play'}
                    >
                      {isPlayingMusic ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                    </button>
                    <button
                      onClick={() => toggleDynamicIsland(false)}
                      className="w-6 h-6 rounded-full bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : dynamicIslandMode === 'rag-task' ? (
                <div className="flex items-center justify-between w-full">
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => {
                      openApp('projects');
                      toggleDynamicIsland(false);
                    }}
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold text-white truncate">DocuRAG Engine</div>
                      <div className="text-[9px] text-cyan-400 whitespace-nowrap">94.2% precision</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleDynamicIsland(false)}
                    className="w-6 h-6 rounded-full bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => {
                      openApp('recruiter');
                      toggleDynamicIsland(false);
                    }}
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold text-white truncate">Abinash • AI/ML 2027</div>
                      <div className="text-[9px] text-zinc-400 truncate">Open to LLM & RAG</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleDynamicIsland(false)}
                    className="w-6 h-6 rounded-full bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
