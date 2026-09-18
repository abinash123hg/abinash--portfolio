import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Video as VideoIcon,
  Clock,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Sparkles,
  Share2
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { useOSStore } from '../store/useOSStore';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { resolveMediaUrl } from '../utils/mediaResolver';
import { VideoItem } from '../types';

export const VideosApp: React.FC = () => {
  const { theme, showToast } = useOSStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const isDark = theme === 'dark';

  const videos = PORTFOLIO_DATA.videos;
  const currentVideo: VideoItem = videos[activeVideoIndex] || videos[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [activeVideoIndex]);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex-1 w-full h-full flex flex-col justify-between overflow-y-auto no-scrollbar pb-16 select-none">
      <AppHeader title="Videos" subtitle="Technical Architecture & Demos" />

      <div className="p-3 space-y-4">
        {/* Main Video Frame */}
        <div className="rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl relative group">
          <video
            ref={videoRef}
            src={resolveMediaUrl(currentVideo.url || currentVideo.filename, 'video')}
            className="w-full h-52 object-contain bg-black"
            playsInline
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onClick={handleTogglePlay}
          />

          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none flex flex-col justify-between p-3 opacity-90 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between pointer-events-auto">
              <span className="text-[10px] font-bold uppercase bg-blue-600/80 text-white px-2 py-0.5 rounded-md backdrop-blur-md">
                {currentVideo.category}
              </span>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Play Button Center */}
            <div className="my-auto text-center pointer-events-auto">
              {!isPlaying && (
                <button
                  onClick={handleTogglePlay}
                  className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white mx-auto shadow-xl active:scale-95 transition-all"
                >
                  <Play className="w-6 h-6 fill-current ml-1" />
                </button>
              )}
            </div>

            {/* Scrubber & Duration */}
            <div className="space-y-1.5 pointer-events-auto">
              <div
                onClick={handleScrub}
                className="w-full h-2 rounded-full bg-white/20 hover:bg-white/30 cursor-pointer overflow-hidden relative"
              >
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || 18)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info Card */}
        <div
          className={`p-3.5 rounded-2xl border ${
            isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-zinc-200'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-sm font-bold text-white leading-snug">{currentVideo.title}</h2>
            <button
              onClick={() => {
                showToast({
                  id: `share-vid-${currentVideo.id}`,
                  title: 'Demo Shared',
                  subtitle: currentVideo.title
                });
              }}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/15 text-zinc-300 shrink-0"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            {currentVideo.description}
          </p>
        </div>

        {/* Video Playlist */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
            System Demonstrations ({videos.length})
          </h3>

          <div className="space-y-2">
            {videos.map((vid, idx) => {
              const isSelected = activeVideoIndex === idx;
              return (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideoIndex(idx)}
                  className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500/60 shadow-md'
                      : isDark
                      ? 'bg-zinc-900/70 border-white/5 hover:bg-zinc-850'
                      : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-white/10 text-zinc-400'
                      }`}
                    >
                      {isSelected && isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </div>

                    <div className="leading-tight">
                      <h4 className="text-xs font-bold text-white line-clamp-1">{vid.title}</h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{vid.category}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-400 shrink-0 ml-2">
                    {vid.duration}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
