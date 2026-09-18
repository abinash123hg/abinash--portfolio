// Real HTML5 Audio Player Engine for iOS 15 & Control Center
export interface AudioTrackInfo {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  durationFormatted: string;
  audioUrl: string;
  coverColor: string;
  genre: string;
}

export const REAL_AUDIO_TRACKS: AudioTrackInfo[] = [
  {
    id: 'track-1',
    title: 'Rhythm Funk',
    artist: 'AlexGuz',
    album: 'Studio Funk Grooves',
    duration: 160,
    durationFormatted: '2:40',
    audioUrl: '/assets/music/alexguz-rhythm-funk-511536.mp3',
    coverColor: 'from-purple-600 via-indigo-600 to-blue-700',
    genre: 'Funk / Focus Groove'
  },
  {
    id: 'track-2',
    title: 'Tokyo Funk Commercial Promo',
    artist: 'FASSounds',
    album: 'Tokyo Neon Nights',
    duration: 95,
    durationFormatted: '1:35',
    audioUrl: '/assets/music/fassounds-tokyo-funk-commercial-promo-funk-423844.mp3',
    coverColor: 'from-amber-600 via-orange-600 to-rose-700',
    genre: 'Commercial Funk / Upbeat'
  }
];

export interface AudioPlaybackState {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: AudioTrackInfo;
  currentTime: number;
  duration: number;
  progressPercent: number;
  volume: number; // 0 - 100
}

type AudioListener = (state: AudioPlaybackState) => void;

class RealAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private currentTrackIndex = 0;
  private isPlaying = false;
  private currentTime = 0;
  private duration = REAL_AUDIO_TRACKS[0].duration;
  private volume = 80;
  private listeners = new Set<AudioListener>();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;
    this.audio = new Audio();
    this.audio.preload = 'metadata';
    this.audio.volume = this.volume / 100;
    this.audio.src = REAL_AUDIO_TRACKS[this.currentTrackIndex].audioUrl;

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio) {
        this.currentTime = this.audio.currentTime;
        if (Number.isFinite(this.audio.duration) && this.audio.duration > 0) {
          this.duration = this.audio.duration;
        }
        this.notify();
      }
    });

    this.audio.addEventListener('loadedmetadata', () => {
      if (this.audio && Number.isFinite(this.audio.duration) && this.audio.duration > 0) {
        this.duration = this.audio.duration;
        this.notify();
      }
    });

    this.audio.addEventListener('ended', () => {
      this.next();
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.error('Audio listener error:', err);
      }
    });
  }

  public getState(): AudioPlaybackState {
    const currentTrack = REAL_AUDIO_TRACKS[this.currentTrackIndex] || REAL_AUDIO_TRACKS[0];
    const dur = this.duration > 0 ? this.duration : currentTrack.duration;
    const progressPercent = dur > 0 ? (this.currentTime / dur) * 100 : 0;

    return {
      isPlaying: this.isPlaying,
      currentTrackIndex: this.currentTrackIndex,
      currentTrack,
      currentTime: this.currentTime,
      duration: dur,
      progressPercent: Math.min(100, Math.max(0, progressPercent)),
      volume: this.volume
    };
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public play(trackIndex?: number) {
    this.initAudio();
    if (!this.audio) return;

    if (trackIndex !== undefined && trackIndex !== this.currentTrackIndex) {
      this.currentTrackIndex = (trackIndex + REAL_AUDIO_TRACKS.length) % REAL_AUDIO_TRACKS.length;
      this.audio.src = REAL_AUDIO_TRACKS[this.currentTrackIndex].audioUrl;
      this.currentTime = 0;
    }

    this.audio.play().then(() => {
      this.isPlaying = true;
      this.notify();
    }).catch(() => {
      // Browser autoplay policy might restrict without user interaction
      this.isPlaying = false;
      this.notify();
    });
  }

  public playTrack(trackIndex: number) {
    this.play(trackIndex);
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public next() {
    const nextIdx = (this.currentTrackIndex + 1) % REAL_AUDIO_TRACKS.length;
    this.currentTrackIndex = nextIdx;
    if (this.audio) {
      this.audio.src = REAL_AUDIO_TRACKS[nextIdx].audioUrl;
      this.currentTime = 0;
      this.audio.play().catch(() => {});
    }
    this.isPlaying = true;
    this.notify();
  }

  public prev() {
    // If more than 3 seconds into track, seek to beginning; otherwise go to previous
    if (this.currentTime > 3) {
      this.seek(0);
      return;
    }
    const prevIdx = (this.currentTrackIndex - 1 + REAL_AUDIO_TRACKS.length) % REAL_AUDIO_TRACKS.length;
    this.currentTrackIndex = prevIdx;
    if (this.audio) {
      this.audio.src = REAL_AUDIO_TRACKS[prevIdx].audioUrl;
      this.currentTime = 0;
      this.audio.play().catch(() => {});
    }
    this.isPlaying = true;
    this.notify();
  }

  public seek(seconds: number) {
    if (this.audio) {
      const clamped = Math.max(0, Math.min(seconds, this.duration));
      this.audio.currentTime = clamped;
      this.currentTime = clamped;
      this.notify();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(100, vol));
    if (this.audio) {
      this.audio.volume = this.volume / 100;
    }
    this.notify();
  }
}

export const audioPlayer = new RealAudioPlayer();
