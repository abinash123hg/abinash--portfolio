import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Video as VideoIcon,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Film,
  Layers,
  Clock,
  Tag
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { useOSStore } from '../store/useOSStore';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { VideoItem } from '../types';

export const VideosApp: React.FC = () => {
  const { theme, showToast, recordedVideos } = useOSStore();
  const isDark = theme === 'dark';
  const videos: VideoItem[] = [...recordedVideos, ...(PORTFOLIO_DATA.videos || [])];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const categories = ['All', ...Array.from(new Set(videos.map((v) => v.category)))];

  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter((v) => v.category === selectedCategory);

  const activeVideo = activeVideoIndex !== null ? filteredVideos[activeVideoIndex] : null;

  const handleOpenVideo = (index: number) => {
    setActiveVideoIndex(index);
    setIsPlaying(true);
  };

  const handleCloseModal = () => {
    setActiveVideoIndex(null);
    setIsPlaying(false);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeVideoIndex !== null) {
      const next = (activeVideoIndex + 1) % filteredVideos.length;
      setActiveVideoIndex(next);
      setIsPlaying(true);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeVideoIndex !== null) {
      const prev = (activeVideoIndex - 1 + filteredVideos.length) % filteredVideos.length;
      setActiveVideoIndex(prev);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className={`flex-1 min-h-0 w-full flex flex-col justify-between overflow-hidden pb-16 select-none ${
      isDark ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'
    }`}>
      <AppHeader
        title="Videos"
        subtitle="Visual Motion & Technical Reels"
        rightAction={
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
            {videos.length} Videos
          </span>
        }
      />

      {/* Category Filter Tabs */}
      <div className="px-3.5 pt-2 pb-2 flex gap-2 overflow-x-auto no-scrollbar border-b border-white/5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
                : isDark
                ? 'bg-zinc-900/90 text-zinc-400 hover:text-white border border-white/5'
                : 'bg-zinc-200 text-zinc-700 hover:text-black border border-zinc-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Videos List / Grid */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 space-y-3.5">
        {filteredVideos.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => handleOpenVideo(idx)}
            className={`group rounded-3xl border overflow-hidden cursor-pointer shadow-lg transition-all active:scale-[0.98] ${
              isDark
                ? 'bg-zinc-900/80 border-white/10 hover:border-blue-500/40'
                : 'bg-white border-zinc-200 hover:border-blue-400 shadow-sm'
            }`}
          >
            {/* Video Preview Container */}
            <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
              <video
                src={video.url}
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play Icon Pill */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform backdrop-blur-sm">
                  <Play className="w-5 h-5 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-semibold text-white flex items-center gap-1">
                <Clock className="w-3 h-3 text-blue-400" />
                <span>{video.duration}</span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-blue-500/80 backdrop-blur-md text-[10px] font-semibold text-white uppercase tracking-wider">
                {video.category}
              </div>

              {/* Bottom Video Title Overlay */}
              <div className="absolute bottom-2.5 left-3 right-3 text-left">
                <h3 className="text-sm font-bold text-white tracking-tight drop-shadow truncate">
                  {video.title}
                </h3>
              </div>
            </div>

            {/* Video Card Details */}
            <div className="p-3.5 space-y-1 text-left">
              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {video.description}
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>{video.filename}</span>
                <span className="text-blue-400 font-sans font-medium flex items-center gap-1">
                  <Film className="w-3 h-3" /> Tap to Watch
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 36 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 36 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between"
          >
            {/* Modal Header */}
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex-1 truncate pr-2 text-left">
                <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                  {activeVideo.category} · {activeVideo.duration}
                </span>
                <h2 className="text-sm font-bold text-white truncate">
                  {activeVideo.title}
                </h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Video Screen */}
            <div className="relative flex-1 flex items-center justify-center p-3">
              <video
                ref={videoRef}
                src={activeVideo.url}
                autoPlay
                playsInline
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full max-h-[65vh] rounded-2xl shadow-2xl bg-black object-contain"
              />

              {/* Prev / Next Floating Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white transition-all backdrop-blur-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white transition-all backdrop-blur-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Video Footer Info */}
            <div className="p-4 bg-zinc-900/80 border-t border-white/10 text-left space-y-1.5">
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeVideo.description}
              </p>
              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-1">
                <span>{activeVideo.filename}</span>
                <span>Video {(activeVideoIndex ?? 0) + 1} of {filteredVideos.length}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideosApp;

