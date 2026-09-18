import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Music as MusicIcon,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Disc3,
  Sparkles,
  Headphones,
  Radio,
  Clock,
  ListMusic
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { useOSStore } from '../store/useOSStore';
import { audioPlayer, REAL_AUDIO_TRACKS, AudioPlaybackState } from '../utils/audioPlayer';

export const MusicApp: React.FC = () => {
  const {
    theme,
    isPlayingMedia,
    currentTrackIndex,
    currentMediaTime,
    currentMediaDuration,
    toggleMediaPlay,
    nextMediaTrack,
    prevMediaTrack,
    seekMedia
  } = useOSStore();

  const isDark = theme === 'dark';
  const [playback, setPlayback] = useState<AudioPlaybackState>(audioPlayer.getState());

  useEffect(() => {
    const unsub = audioPlayer.subscribe((state) => {
      setPlayback(state);
    });
    return unsub;
  }, []);

  const activeTrack = REAL_AUDIO_TRACKS[playback.currentTrackIndex] || REAL_AUDIO_TRACKS[0];

  const formatSeconds = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleTrackClick = (idx: number) => {
    if (playback.currentTrackIndex === idx) {
      toggleMediaPlay();
    } else {
      audioPlayer.playTrack(idx);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetPercent = parseFloat(e.target.value);
    const targetSeconds = (targetPercent / 100) * playback.duration;
    seekMedia(targetSeconds);
  };

  return (
    <div className={`flex-1 w-full h-full flex flex-col justify-between overflow-hidden pb-16 select-none ${
      isDark ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'
    }`}>
      <AppHeader
        title="Music"
        subtitle="Curated Audio Tracks"
        rightAction={
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
            {REAL_AUDIO_TRACKS.length} Tracks
          </span>
        }
      />

      {/* Main Music Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {/* Now Playing Album Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative rounded-3xl p-5 shadow-2xl border overflow-hidden ${
            isDark
              ? 'bg-zinc-900/90 border-white/10'
              : 'bg-white border-zinc-200'
          }`}
        >
          {/* Background Ambient Glow */}
          <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-25 bg-gradient-to-br ${activeTrack.coverColor} pointer-events-none`} />

          {/* Album Vinyl / Art Display */}
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${activeTrack.coverColor} p-2 shadow-xl flex items-center justify-center relative overflow-hidden shrink-0 group`}>
              <motion.div
                animate={{ rotate: playback.isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                className="w-full h-full rounded-full border-2 border-white/20 flex items-center justify-center bg-black/40"
              >
                <Disc3 className="w-10 h-10 text-white" />
              </motion.div>
              {playback.isPlaying && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="flex items-end gap-0.5 h-4">
                    <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
                    <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s] h-4" />
                    <span className="w-1 bg-white rounded-full animate-bounce h-2" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 text-left">
              <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">
                {activeTrack.genre}
              </span>
              <h2 className="text-base font-bold text-white tracking-tight truncate mt-0.5">
                {activeTrack.title}
              </h2>
              <p className="text-xs text-zinc-400 truncate">
                {activeTrack.artist}
              </p>
              <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                {activeTrack.album}
              </p>
            </div>
          </div>

          {/* Progress Slider */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max="100"
              value={playback.progressPercent || 0}
              onChange={handleSeek}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>{formatSeconds(playback.currentTime)}</span>
              <span>{formatSeconds(playback.duration)}</span>
            </div>
          </div>

          {/* Transport Playback Controls */}
          <div className="flex items-center justify-center gap-6 mt-3">
            <button
              onClick={prevMediaTrack}
              className="p-2 text-zinc-400 hover:text-white transition-colors active:scale-95"
              title="Previous Track"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={toggleMediaPlay}
              className="w-13 h-13 rounded-full bg-pink-500 hover:bg-pink-400 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
              title={playback.isPlaying ? 'Pause' : 'Play'}
            >
              {playback.isPlaying ? (
                <Pause className="w-6 h-6 fill-white" />
              ) : (
                <Play className="w-6 h-6 fill-white translate-x-0.5" />
              )}
            </button>

            <button
              onClick={nextMediaTrack}
              className="p-2 text-zinc-400 hover:text-white transition-colors active:scale-95"
              title="Next Track"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>
        </motion.div>

        {/* Playlist Tracks Section */}
        <div className="space-y-2 text-left">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <ListMusic className="w-3.5 h-3.5 text-pink-400" />
              <span>Project Audio Library</span>
            </h3>
            <span className="text-[10px] text-zinc-500 font-mono">Local MP3 Assets</span>
          </div>

          <div className="space-y-1.5">
            {REAL_AUDIO_TRACKS.map((track, idx) => {
              const isCurrent = playback.currentTrackIndex === idx;
              return (
                <div
                  key={track.id}
                  onClick={() => handleTrackClick(idx)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group active:scale-[0.99] ${
                    isCurrent
                      ? isDark
                        ? 'bg-pink-500/15 border-pink-500/40 text-white'
                        : 'bg-pink-50 border-pink-300 text-zinc-900'
                      : isDark
                      ? 'bg-zinc-900/60 border-white/5 hover:border-white/20 text-zinc-300'
                      : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${track.coverColor} flex items-center justify-center text-white shrink-0 shadow`}>
                      {isCurrent && playback.isPlaying ? (
                        <div className="flex items-end gap-0.5 h-3">
                          <span className="w-0.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s] h-2.5" />
                          <span className="w-0.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s] h-3" />
                          <span className="w-0.5 bg-white rounded-full animate-bounce h-1.5" />
                        </div>
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className={`text-xs font-bold truncate ${isCurrent ? 'text-pink-400' : 'text-white'}`}>
                        {track.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {track.artist} · {track.album}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-right shrink-0">
                    <span className="text-[11px] font-mono text-zinc-500">
                      {track.durationFormatted}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicApp;
