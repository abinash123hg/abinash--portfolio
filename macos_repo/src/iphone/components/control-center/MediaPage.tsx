import React, { useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Sparkles,
  Cast,
  Headphones,
  Disc3,
  ListMusic
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { REAL_AUDIO_TRACKS } from '../../utils/audioPlayer';

interface Props {
  onOpenVolumeSheet: () => void;
}

export const MediaPage: React.FC<Props> = ({ onOpenVolumeSheet }) => {
  const {
    isPlayingMedia,
    toggleMediaPlay,
    nextMediaTrack,
    prevMediaTrack,
    currentTrackIndex,
    currentMediaTime,
    currentMediaDuration,
    seekMedia,
    volume,
    setVolume,
    activeAudioOutput
  } = useOSStore();

  const track = REAL_AUDIO_TRACKS[currentTrackIndex] || REAL_AUDIO_TRACKS[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = currentMediaDuration > 0 ? (currentMediaTime / currentMediaDuration) * 100 : 0;

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    seekMedia(pos * currentMediaDuration);
  };

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center py-4 px-3 mx-auto select-none">
      {/* Large Album Art Frame */}
      <div className="w-full flex flex-col items-center my-auto space-y-5">
        <div
          className={`w-48 h-48 rounded-[36px] bg-gradient-to-tr ${track.coverColor} p-1 shadow-2xl border-2 border-white/20 relative flex items-center justify-center overflow-hidden transition-all duration-700`}
        >
          <div className="absolute inset-0 bg-black/25 backdrop-blur-xs" />
          <Disc3
            className={`w-28 h-28 text-white drop-shadow-2xl ${
              isPlayingMedia ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '7s' }}
          />

          <div className="absolute bottom-3 left-0 right-0 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/90 bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10">
              {track.genre}
            </span>
          </div>
        </div>

        {/* Title & Artist */}
        <div className="text-center w-full">
          <h2 className="text-base font-bold text-white tracking-tight truncate">{track.title}</h2>
          <p className="text-xs text-zinc-400 truncate mt-0.5">{track.artist} • {track.album}</p>
        </div>

        {/* Scrubber */}
        <div className="w-full space-y-1.5">
          <div
            onClick={handleScrub}
            className="w-full h-2 rounded-full bg-zinc-800/90 border border-white/10 cursor-pointer overflow-hidden relative group"
          >
            <div
              className="h-full bg-white rounded-full transition-all group-hover:bg-blue-400"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
            <span>{formatTime(currentMediaTime)}</span>
            <span>-{formatTime(Math.max(0, currentMediaDuration - currentMediaTime))}</span>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center justify-center gap-7">
          <button
            onClick={prevMediaTrack}
            className="p-3 text-zinc-300 hover:text-white transition-colors active:scale-90"
          >
            <SkipBack className="w-6 h-6 fill-current" />
          </button>

          <button
            onClick={toggleMediaPlay}
            className="w-16 h-16 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            {isPlayingMedia ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-1" />
            )}
          </button>

          <button
            onClick={nextMediaTrack}
            className="p-3 text-zinc-300 hover:text-white transition-colors active:scale-90"
          >
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
        </div>

        {/* Volume & Output Route */}
        <div className="w-full pt-2 flex items-center justify-between gap-3 text-zinc-400 text-xs">
          <Volume2 className="w-4 h-4 shrink-0" />
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setVolume(pct);
            }}
            className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden cursor-pointer"
          >
            <div className="h-full bg-zinc-300 rounded-full" style={{ width: `${volume}%` }} />
          </div>

          <button
            onClick={onOpenVolumeSheet}
            className="flex items-center gap-1 text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-xl border border-blue-500/20 active:scale-95"
          >
            <Cast className="w-3.5 h-3.5" />
            <span className="capitalize">{activeAudioOutput}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
