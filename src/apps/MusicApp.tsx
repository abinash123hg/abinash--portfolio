import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Disc3,
  Sparkles,
  ListMusic,
  Headphones
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { useOSStore } from '../store/useOSStore';
import { REAL_AUDIO_TRACKS } from '../utils/audioPlayer';
import { audioPlayer } from '../utils/audioPlayer';

export const MusicApp: React.FC = () => {
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
    setVolume
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
    <div className="flex-1 min-h-0 w-full flex flex-col justify-between overflow-y-auto no-scrollbar pb-16 select-none">
      <AppHeader title="Music" subtitle="Soundtracks & Focus Grooves" />

      <div className="p-4 flex-1 flex flex-col items-center justify-between space-y-4">
        {/* Large Album Artwork */}
        <div
          className={`w-48 h-48 rounded-[36px] bg-gradient-to-tr ${track.coverColor} shadow-2xl flex flex-col items-center justify-center text-white relative overflow-hidden border-2 border-white/20 transition-all duration-700`}
        >
          <div className="absolute inset-0 bg-black/25 backdrop-blur-xs" />
          <Disc3
            className={`w-28 h-28 drop-shadow-2xl text-white/90 ${
              isPlayingMedia ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '7s' }}
          />
          <div className="absolute bottom-3 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/90 bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10">
              {track.genre}
            </span>
          </div>
        </div>

        {/* Track Title & Album */}
        <div className="text-center w-full max-w-[280px]">
          <h2 className="text-base font-bold tracking-tight text-white truncate">{track.title}</h2>
          <p className="text-xs text-zinc-400 truncate mt-0.5">{track.artist} • {track.album}</p>
        </div>

        {/* Live Scrubber & Time */}
        <div className="w-full max-w-[320px] space-y-1.5">
          <div
            onClick={handleScrub}
            className="w-full h-2 rounded-full bg-zinc-800 cursor-pointer overflow-hidden relative group"
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

        {/* Playback Controls */}
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

        {/* Volume Scrubber */}
        <div className="w-full max-w-[300px] flex items-center gap-3 text-zinc-400">
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
          <span className="text-[10px] font-mono w-7 text-right">{volume}%</span>
        </div>

        {/* Track Playlist */}
        <div className="w-full max-w-[320px] space-y-1.5 pt-2">
          <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 px-1">
            Official Audio Tracks ({REAL_AUDIO_TRACKS.length})
          </p>

          <div className="space-y-1.5">
            {REAL_AUDIO_TRACKS.map((t, idx) => {
              const isSelected = currentTrackIndex === idx;
              return (
                <div
                  key={t.id}
                  onClick={() => audioPlayer.playTrack(idx)}
                  className={`p-2.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white/15 border-white/20 text-white'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${t.coverColor} flex items-center justify-center text-white shrink-0`}>
                      {isSelected && isPlayingMedia ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-white truncate">{t.title}</p>
                      <p className="text-[10px] text-zinc-400 truncate">{t.artist}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono shrink-0">{t.duration}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
