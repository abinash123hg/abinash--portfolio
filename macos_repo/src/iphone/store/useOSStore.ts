import { useState, useEffect } from 'react';
import { AppId, PhotoItem, VideoItem } from '../types';
import { audioPlayer, REAL_AUDIO_TRACKS } from '../utils/audioPlayer';
import { sound } from '../utils/audioHaptics';
import { SEED_NOTIFICATIONS, OSNotification } from '../data/notifications';
import { DEFAULT_PLACED_WIDGETS, PlacedWidget, WidgetSize } from '../data/widgetsRegistry';
import { WALLPAPERS } from '../data/wallpapers';

export interface ToastNotification {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  duration?: number;
}

export interface OSState {
  isLocked: boolean;
  activeApp: AppId | null;
  runningApps: AppId[];
  isAppSwitcherOpen: boolean;
  isControlCenterOpen: boolean;
  controlCenterPage: number; // 0 = Favorites, 1 = Media, 2 = Connectivity
  isControlCenterEditing: boolean;
  isSpotlightOpen: boolean;
  isDynamicIslandExpanded: boolean;
  dynamicIslandMode: 'idle' | 'music' | 'rag-task' | 'resume' | 'call' | 'recording';
  theme: 'dark' | 'light';
  brightness: number; // 0 - 100
  volume: number; // 0 - 100
  wifi: boolean;
  bluetooth: boolean;
  airplaneMode: boolean;
  cellularData: boolean;
  personalHotspot: boolean;
  airDropMode: 'off' | 'contacts' | 'everyone';
  vpnConnected: boolean;
  focusMode: boolean;
  focusModeType: 'dnd' | 'work' | 'personal' | 'sleep';
  lowPowerMode: boolean;
  reduceMotion: boolean;
  flashlight: boolean;
  flashlightLevel: 1 | 2 | 3 | 4;
  nightShift: boolean;
  trueTone: boolean;
  orientationLocked: boolean;
  screenRecordingState: 'idle' | 'countdown' | 'recording';
  screenRecordingCountdown: number;
  screenRecordingDuration: number;
  micEnabled: boolean;
  activeAudioOutput: 'speaker' | 'airpods' | 'macbook';
  batteryLevel: number | null;
  isCharging: boolean | null;
  isOnline: boolean;
  networkType: string | null;
  activeWifiNetwork: string;
  activeBluetoothDevice: string;
  textSizePercent: number; // 80, 90, 100, 110, 120
  fontSize: 'sm' | 'md' | 'lg';
  isPlayingMedia: boolean;
  currentTrackIndex: number;
  currentMediaTime: number;
  currentMediaDuration: number;
  selectedProjectId: string | null;
  selectedCertId: string | null;
  capturedPhotos: PhotoItem[];
  recordedVideos: VideoItem[];
  hapticsEnabled: boolean;
  soundEnabled: boolean;
  controlCenterTiles: string[];
  activeToast: ToastNotification | null;
  notifications: OSNotification[];
  // Wallpapers & Appearance
  wallpaperId: string;
  lockWallpaperId: string;
  perspectiveZoom: boolean;
  // Home Screen & Widgets
  homePageIndex: number;
  isHomeEditing: boolean;
  isWidgetGalleryOpen: boolean;
  placedWidgets: PlacedWidget[];
  activeFolderId: string | null;
  // Notification Center
  isNotificationCenterOpen: boolean;
  // In-iPhone Safari Web Browsing
  safariUrl: string;
  safariTitle: string;
  safariPreviousApp: AppId | null;
}

export const DEFAULT_CC_TILES = [
  'connectivity',
  'media',
  'orientation',
  'mirroring',
  'focus',
  'brightness',
  'volume',
  'flashlight',
  'timer',
  'calculator',
  'camera',
  'notes',
  'screen_recording',
  'low_power',
  'text_size',
  'resume_shortcut',
  'restart'
];

const getStoredTiles = (): string[] => {
  if (typeof window === 'undefined') return DEFAULT_CC_TILES;
  try {
    const saved = localStorage.getItem('ios_cc_tiles');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (!parsed.includes('restart')) {
          parsed.push('restart');
        }
        return parsed;
      }
    }
  } catch {}
  return DEFAULT_CC_TILES;
};

const getStoredWallpaperId = (key: string, fallback: string): string => {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(key);
    return saved && WALLPAPERS.some((wallpaper) => wallpaper.id === saved) ? saved : fallback;
  } catch {
    return fallback;
  }
};

const DEFAULT_STATE: OSState = {
  isLocked: false,
  activeApp: null,
  runningApps: ['recruiter', 'projects', 'chatbot'],
  isAppSwitcherOpen: false,
  isControlCenterOpen: false,
  controlCenterPage: 0,
  isControlCenterEditing: false,
  isSpotlightOpen: false,
  isDynamicIslandExpanded: false,
  dynamicIslandMode: 'idle',
  theme: 'dark',
  brightness: 95,
  volume: 80,
  wifi: true,
  bluetooth: true,
  airplaneMode: false,
  cellularData: true,
  personalHotspot: false,
  airDropMode: 'contacts',
  vpnConnected: false,
  focusMode: false,
  focusModeType: 'dnd',
  lowPowerMode: false,
  reduceMotion: false,
  flashlight: false,
  flashlightLevel: 4,
  nightShift: false,
  trueTone: true,
  orientationLocked: true,
  screenRecordingState: 'idle',
  screenRecordingCountdown: 3,
  screenRecordingDuration: 0,
  micEnabled: true,
  activeAudioOutput: 'speaker',
  batteryLevel: null,
  isCharging: null,
  isOnline: typeof navigator === 'undefined' ? true : navigator.onLine,
  networkType: null,
  activeWifiNetwork: 'Abinash-Fiber-5G',
  activeBluetoothDevice: 'AirPods Pro (2nd Gen)',
  textSizePercent: 100,
  fontSize: 'md',
  isPlayingMedia: false,
  currentTrackIndex: 0,
  currentMediaTime: 0,
  currentMediaDuration: 160,
  selectedProjectId: null,
  selectedCertId: null,
  capturedPhotos: [],
  recordedVideos: [],
  hapticsEnabled: true,
  soundEnabled: true,
  controlCenterTiles: getStoredTiles(),
  activeToast: null,
  notifications: SEED_NOTIFICATIONS,
  wallpaperId: getStoredWallpaperId('ios_wallpaper_id', 'dynamic-aurora'),
  lockWallpaperId: getStoredWallpaperId('ios_lock_wallpaper_id', 'dynamic-aurora'),
  perspectiveZoom: true,
  homePageIndex: 0,
  isHomeEditing: false,
  isWidgetGalleryOpen: false,
  placedWidgets: (() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ios_placed_widgets');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return DEFAULT_PLACED_WIDGETS;
  })(),
  activeFolderId: null,
  isNotificationCenterOpen: false,
  safariUrl: 'https://github.com/abinash123hg',
  safariTitle: 'GitHub — abinash123hg',
  safariPreviousApp: null
};

// Global reactive store listeners
type Listener = (state: OSState) => void;
let currentState: OSState = { ...DEFAULT_STATE };
const listeners = new Set<Listener>();
let screenRecorder: MediaRecorder | null = null;
let screenRecorderStream: MediaStream | null = null;
let screenRecorderChunks: Blob[] = [];

export const getOSState = (): OSState => currentState;

export const setOSState = (updater: Partial<OSState> | ((prev: OSState) => OSState)) => {
  if (typeof updater === 'function') {
    currentState = updater(currentState);
  } else {
    currentState = { ...currentState, ...updater };
  }
  listeners.forEach((listener) => {
    try {
      listener(currentState);
    } catch (e) {
      console.error(e);
    }
  });
};

const initializeDeviceTelemetry = () => {
  if (typeof window === 'undefined') return;

  const updateConnection = () => {
    const connection = (navigator as Navigator & { connection?: { type?: string; effectiveType?: string } }).connection;
    setOSState({
      isOnline: navigator.onLine,
      networkType: connection?.type || connection?.effectiveType || null
    });
  };

  window.addEventListener('online', updateConnection);
  window.addEventListener('offline', updateConnection);
  const connection = (navigator as Navigator & { connection?: EventTarget & { type?: string; effectiveType?: string } }).connection;
  connection?.addEventListener('change', updateConnection);
  updateConnection();

  const batteryNavigator = navigator as Navigator & {
    getBattery?: () => Promise<{
      level: number;
      charging: boolean;
      addEventListener: (type: string, listener: () => void) => void;
    }>;
  };
  batteryNavigator.getBattery?.().then((battery) => {
    const updateBattery = () => setOSState({
      batteryLevel: Math.round(battery.level * 100),
      isCharging: battery.charging
    });
    battery.addEventListener('levelchange', updateBattery);
    battery.addEventListener('chargingchange', updateBattery);
    updateBattery();
  }).catch(() => undefined);
};

initializeDeviceTelemetry();

// Initialize audio player subscription
if (typeof window !== 'undefined') {
  audioPlayer.subscribe((audioState) => {
    setOSState((prev) => ({
      ...prev,
      isPlayingMedia: audioState.isPlaying,
      currentTrackIndex: audioState.currentTrackIndex,
      currentMediaTime: audioState.currentTime,
      currentMediaDuration: audioState.duration,
      dynamicIslandMode: audioState.isPlaying ? 'music' : (prev.dynamicIslandMode === 'music' ? 'idle' : prev.dynamicIslandMode)
    }));
  });
}

// Global recording timer ticker
let recordingInterval: any = null;
let countdownInterval: any = null;

export const useOSStore = () => {
  const [state, setState] = useState<OSState>(currentState);

  useEffect(() => {
    const listener: Listener = (newState) => setState(newState);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const showToast = (toast: ToastNotification) => {
    setOSState({ activeToast: toast });
    sound.notificationPing();
    const duration = toast.duration || 3200;
    setTimeout(() => {
      setOSState((prev) => (prev.activeToast?.id === toast.id ? { ...prev, activeToast: null } : prev));
    }, duration);
  };

  const openApp = (appId: AppId) => {
    sound.appOpen();
    setOSState((prev) => {
      const running = prev.runningApps.includes(appId)
        ? prev.runningApps
        : [appId, ...prev.runningApps];
      return {
        ...prev,
        activeApp: appId,
        runningApps: running,
        isAppSwitcherOpen: false,
        isControlCenterOpen: false,
        isSpotlightOpen: false,
        isLocked: false
      };
    });
  };

  const closeApp = () => {
    sound.tap();
    setOSState({
      activeApp: null,
      isAppSwitcherOpen: false,
      isControlCenterOpen: false,
      isSpotlightOpen: false
    });
  };

  const toggleAppSwitcher = () => {
    sound.tap();
    setOSState((prev) => ({
      ...prev,
      isAppSwitcherOpen: !prev.isAppSwitcherOpen,
      isControlCenterOpen: false,
      isSpotlightOpen: false
    }));
  };

  const toggleControlCenter = (force?: boolean | React.MouseEvent | unknown) => {
    sound.tap();
    setOSState((prev) => ({
      ...prev,
      isControlCenterOpen: typeof force === 'boolean' ? force : !prev.isControlCenterOpen,
      isSpotlightOpen: false
    }));
  };

  const setControlCenterPage = (page: number) => {
    sound.tap();
    setOSState({ controlCenterPage: Math.max(0, Math.min(2, page)) });
  };

  const toggleControlCenterEdit = (force?: boolean) => {
    sound.tap();
    setOSState((prev) => ({
      ...prev,
      isControlCenterEditing: force !== undefined ? force : !prev.isControlCenterEditing
    }));
  };

  const toggleSpotlight = () => {
    sound.tap();
    setOSState((prev) => ({
      ...prev,
      isSpotlightOpen: !prev.isSpotlightOpen,
      isControlCenterOpen: false
    }));
  };

  const toggleLock = (force?: boolean) => {
    const nextLocked = force !== undefined ? force : !currentState.isLocked;
    if (nextLocked) {
      sound.lockSound();
    } else {
      sound.unlock();
    }
    setOSState((prev) => ({
      ...prev,
      isLocked: nextLocked,
      activeApp: null,
      isAppSwitcherOpen: false,
      isControlCenterOpen: false,
      isSpotlightOpen: false
    }));
  };

  const killApp = (appId: AppId) => {
    sound.tap();
    setOSState((prev) => {
      const remaining = prev.runningApps.filter((id) => id !== appId);
      const nextActive = prev.activeApp === appId ? (remaining[0] || null) : prev.activeApp;
      return {
        ...prev,
        runningApps: remaining,
        activeApp: nextActive
      };
    });
  };

  const toggleDynamicIsland = (force?: boolean) => {
    sound.tap();
    setOSState((prev) => ({
      ...prev,
      isDynamicIslandExpanded: force !== undefined ? force : !prev.isDynamicIslandExpanded
    }));
  };

  const setDynamicIslandMode = (mode: OSState['dynamicIslandMode']) => {
    setOSState({
      dynamicIslandMode: mode,
      isDynamicIslandExpanded: mode !== 'idle'
    });
  };

  const addCapturedPhoto = (photo: PhotoItem) => {
    setOSState((prev) => ({ ...prev, capturedPhotos: [photo, ...prev.capturedPhotos] }));
  };

  const startScreenRecording = async () => {
    sound.tap();
    if (currentState.screenRecordingState === 'recording') {
      stopScreenRecording();
      return;
    }
    if (countdownInterval) clearInterval(countdownInterval);
    if (recordingInterval) clearInterval(recordingInterval);

    setOSState({
      screenRecordingState: 'countdown',
      screenRecordingCountdown: 3,
      screenRecordingDuration: 0
    });

    let count = 3;
    countdownInterval = setInterval(async () => {
      count--;
      if (count <= 0) {
        clearInterval(countdownInterval);
        sound.notificationPing();
        setOSState({
          screenRecordingState: 'recording',
          screenRecordingDuration: 0,
          dynamicIslandMode: 'recording'
        });

        if (!navigator.mediaDevices?.getDisplayMedia || typeof MediaRecorder === 'undefined') {
          setOSState({ screenRecordingState: 'idle', dynamicIslandMode: 'idle' });
          showToast({ id: `screen-rec-unsupported-${Date.now()}`, title: 'Screen Recording Unavailable', subtitle: 'This browser does not support screen capture.' });
          return;
        }

        try {
          screenRecorderStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
          screenRecorderChunks = [];
          screenRecorder = new MediaRecorder(screenRecorderStream);
          screenRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) screenRecorderChunks.push(event.data);
          };
          screenRecorder.onstop = () => {
            const blob = new Blob(screenRecorderChunks, { type: screenRecorder?.mimeType || 'video/webm' });
            const url = URL.createObjectURL(blob);
            const duration = Math.max(1, currentState.screenRecordingDuration);
            setOSState((prev) => ({
              ...prev,
              recordedVideos: [{
                id: `screen-recording-${Date.now()}`,
                title: `Screen Recording ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`,
                url,
                duration: `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`,
                category: 'Screen Recording',
                description: 'Captured from the device screen using MediaRecorder.',
                posterBg: 'linear-gradient(135deg, #0f172a, #2563eb)'
              }, ...prev.recordedVideos]
            }));
            screenRecorderStream?.getTracks().forEach((track) => track.stop());
            screenRecorderStream = null;
          };
          screenRecorderStream.getVideoTracks()[0]?.addEventListener('ended', stopScreenRecording);
          screenRecorder.start();
        } catch {
          setOSState({ screenRecordingState: 'idle', dynamicIslandMode: 'idle' });
          showToast({ id: `screen-rec-denied-${Date.now()}`, title: 'Screen Recording Cancelled', subtitle: 'Screen sharing permission was not granted.' });
          return;
        }

        recordingInterval = setInterval(() => {
          setOSState((prev) => ({
            ...prev,
            screenRecordingDuration: prev.screenRecordingDuration + 1
          }));
        }, 1000);
      } else {
        sound.cameraControlClick();
        setOSState({ screenRecordingCountdown: count });
      }
    }, 1000);
  };

  const stopScreenRecording = () => {
    if (countdownInterval) clearInterval(countdownInterval);
    if (recordingInterval) clearInterval(recordingInterval);
    if (screenRecorder?.state === 'recording') {
      screenRecorder.stop();
    }
    sound.successChime();

    setOSState((prev) => ({
      ...prev,
      screenRecordingState: 'idle',
      screenRecordingCountdown: 3,
      screenRecordingDuration: 0,
      dynamicIslandMode: prev.dynamicIslandMode === 'recording' ? 'idle' : prev.dynamicIslandMode
    }));

    showToast({
      id: `screen-rec-${Date.now()}`,
      title: 'Screen Recording Saved',
      subtitle: 'Video clip saved directly to Photos app.',
      icon: 'video'
    });
  };

  return {
    ...state,
    openApp,
    closeApp,
    toggleAppSwitcher,
    toggleControlCenter,
    setControlCenterPage,
    toggleControlCenterEdit,
    toggleSpotlight,
    toggleLock,
    killApp,
    toggleDynamicIsland,
    setDynamicIslandMode,
    showToast,
    startScreenRecording,
    stopScreenRecording,
    addCapturedPhoto,
    selectProject: (id: string | null) => {
      sound.tap();
      setOSState({ selectedProjectId: id });
    },
    selectCert: (id: string | null) => {
      sound.tap();
      setOSState({ selectedCertId: id });
    },
    setTheme: (theme: 'dark' | 'light') => {
      sound.tap();
      try {
        document.documentElement.classList.toggle('light', theme === 'light');
        document.documentElement.classList.toggle('dark', theme !== 'light');
      } catch {}
      setOSState({ theme });
    },
    toggleTheme: () => {
      sound.tap();
      setOSState((prev) => {
        const next = prev.theme === 'dark' ? 'light' : 'dark';
        try {
          document.documentElement.classList.toggle('light', next === 'light');
          document.documentElement.classList.toggle('dark', next !== 'light');
        } catch {}
        return { ...prev, theme: next };
      });
    },
    // Compatibility aliases
    isPlayingMusic: state.isPlayingMedia,
    toggleMusic: () => {
      sound.tap();
      audioPlayer.toggle();
    },
    isWifiOn: state.wifi,
    isBluetoothOn: state.bluetooth,
    setBrightness: (brightness: number) => {
      const b = Math.max(10, Math.min(100, Math.round(brightness)));
      setOSState({ brightness: b });
    },
    setVolume: (volume: number) => {
      const v = Math.max(0, Math.min(100, Math.round(volume)));
      audioPlayer.setVolume(v);
      sound.setVolume(v / 100);
      setOSState({ volume: v });
    },
    toggleWifi: () => {
      sound.tap();
      setOSState((prev) => ({ ...prev, wifi: !prev.wifi }));
    },
    toggleBluetooth: () => {
      sound.tap();
      setOSState((prev) => ({ ...prev, bluetooth: !prev.bluetooth }));
    },
    toggleAirplaneMode: () => {
      sound.tap();
      setOSState((prev) => {
        const next = !prev.airplaneMode;
        return {
          ...prev,
          airplaneMode: next,
          wifi: next ? false : prev.wifi,
          cellularData: next ? false : prev.cellularData
        };
      });
    },
    toggleCellularData: () => {
      sound.tap();
      setOSState((prev) => ({ ...prev, cellularData: !prev.cellularData }));
    },
    togglePersonalHotspot: () => {
      sound.tap();
      setOSState((prev) => ({ ...prev, personalHotspot: !prev.personalHotspot }));
    },
    setAirDropMode: (mode: 'off' | 'contacts' | 'everyone') => {
      sound.tap();
      setOSState({ airDropMode: mode });
    },
    toggleVPN: () => {
      sound.tap();
      setOSState((prev) => ({ ...prev, vpnConnected: !prev.vpnConnected }));
    },
    toggleFocusMode: () => {
      sound.tap();
      setOSState((prev) => ({ ...prev, focusMode: !prev.focusMode }));
    },
    setFocusModeType: (type: 'dnd' | 'work' | 'personal' | 'sleep') => {
      sound.tap();
      setOSState({ focusModeType: type, focusMode: true });
    },
    toggleLowPowerMode: () => {
      sound.tap();
      setOSState((prev) => ({ ...prev, lowPowerMode: !prev.lowPowerMode }));
    },
    toggleFlashlight: () => {
      sound.tap();
      setOSState((prev) => ({ ...prev, flashlight: !prev.flashlight }));
    },
    setFlashlightLevel: (level: 1 | 2 | 3 | 4) => {
      sound.tap();
      setOSState({ flashlightLevel: level, flashlight: true });
    },
    toggleNightShift: () => {
      sound.tap();
      setOSState((prev) => ({ ...prev, nightShift: !prev.nightShift }));
    },
    toggleTrueTone: () => {
      sound.tap();
      setOSState((prev) => ({ ...prev, trueTone: !prev.trueTone }));
    },
    toggleOrientationLock: () => {
      sound.tap();
      setOSState((prev) => ({ ...prev, orientationLocked: !prev.orientationLocked }));
    },
    toggleMic: () => {
      sound.tap();
      setOSState((prev) => ({ ...prev, micEnabled: !prev.micEnabled }));
    },
    setActiveAudioOutput: (output: 'speaker' | 'airpods' | 'macbook') => {
      sound.tap();
      setOSState({ activeAudioOutput: output });
    },
    setActiveWifiNetwork: (net: string) => {
      sound.tap();
      setOSState({ activeWifiNetwork: net, wifi: true });
    },
    setActiveBluetoothDevice: (dev: string) => {
      sound.tap();
      setOSState({ activeBluetoothDevice: dev, bluetooth: true });
    },
    setTextSizePercent: (size: number) => {
      sound.tap();
      const clamped = Math.max(80, Math.min(120, size));
      setOSState({
        textSizePercent: clamped,
        fontSize: clamped <= 85 ? 'sm' : clamped >= 115 ? 'lg' : 'md'
      });
    },
    // Media controls
    toggleMediaPlay: () => {
      sound.tap();
      audioPlayer.toggle();
    },
    nextMediaTrack: () => {
      sound.tap();
      audioPlayer.next();
    },
    prevMediaTrack: () => {
      sound.tap();
      audioPlayer.prev();
    },
    seekMedia: (sec: number) => {
      audioPlayer.seek(sec);
    },
    // Tile configuration & edit mode
    addCCTile: (tileId: string) => {
      sound.tap();
      setOSState((prev) => {
        if (prev.controlCenterTiles.includes(tileId)) return prev;
        const updated = [...prev.controlCenterTiles, tileId];
        try {
          localStorage.setItem('ios_cc_tiles', JSON.stringify(updated));
        } catch {}
        return { ...prev, controlCenterTiles: updated };
      });
    },
    removeCCTile: (tileId: string) => {
      sound.deleteTrash();
      setOSState((prev) => {
        const updated = prev.controlCenterTiles.filter((t) => t !== tileId);
        try {
          localStorage.setItem('ios_cc_tiles', JSON.stringify(updated));
        } catch {}
        return { ...prev, controlCenterTiles: updated };
      });
    },
    resetCCTiles: () => {
      sound.tap();
      try {
        localStorage.setItem('ios_cc_tiles', JSON.stringify(DEFAULT_CC_TILES));
      } catch {}
      setOSState({ controlCenterTiles: DEFAULT_CC_TILES });
    },
    dismissNotification: (id: string) => {
      sound.tap();
      setOSState((prev) => ({
        ...prev,
        notifications: prev.notifications.filter((n) => n.id !== id)
      }));
    },
    clearAllNotifications: () => {
      sound.deleteTrash();
      setOSState({ notifications: [] });
    },
    addNotification: (notif: OSNotification) => {
      sound.notificationPing();
      setOSState((prev) => ({
        ...prev,
        notifications: [notif, ...prev.notifications]
      }));
    },
    toggleNotificationCenter: (open?: boolean) => {
      sound.tap();
      setOSState((prev) => ({
        ...prev,
        isNotificationCenterOpen: open !== undefined ? open : !prev.isNotificationCenterOpen,
        isControlCenterOpen: false,
        isSpotlightOpen: false
      }));
    },
    // Wallpaper actions
    setWallpaper: (id: string, target: 'both' | 'lock' | 'home' = 'both') => {
      sound.tap();
      try {
        if (target === 'both' || target === 'home') {
          localStorage.setItem('ios_wallpaper_id', id);
        }
        if (target === 'both' || target === 'lock') {
          localStorage.setItem('ios_lock_wallpaper_id', id);
        }
      } catch {}
      setOSState((prev) => ({
        ...prev,
        wallpaperId: target === 'lock' ? prev.wallpaperId : id,
        lockWallpaperId: target === 'home' ? prev.lockWallpaperId : id
      }));
    },
    togglePerspectiveZoom: () => {
      sound.tap();
      setOSState((prev) => ({ ...prev, perspectiveZoom: !prev.perspectiveZoom }));
    },
    // Home screen pages, edit mode, widgets & folders
    setHomePageIndex: (page: number) => {
      sound.tap();
      setOSState({ homePageIndex: Math.max(0, Math.min(2, page)) });
    },
    toggleHomeEditing: (editing?: boolean) => {
      sound.tap();
      setOSState((prev) => ({
        ...prev,
        isHomeEditing: editing !== undefined ? editing : !prev.isHomeEditing
      }));
    },
    toggleWidgetGallery: (open?: boolean) => {
      sound.tap();
      setOSState((prev) => ({
        ...prev,
        isWidgetGalleryOpen: open !== undefined ? open : !prev.isWidgetGalleryOpen
      }));
    },
    addWidget: (widgetId: string, size: WidgetSize, page?: number) => {
      sound.tap();
      setOSState((prev) => {
        const targetPage = page !== undefined ? page : prev.homePageIndex;
        const newWidget: PlacedWidget = {
          instanceId: `widget-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          widgetId,
          type: (widgetId.replace('widget-', '') as any) || 'clock',
          size,
          page: targetPage
        };
        const updated = [...prev.placedWidgets, newWidget];
        try {
          localStorage.setItem('ios_placed_widgets', JSON.stringify(updated));
        } catch {}
        return {
          ...prev,
          placedWidgets: updated,
          isWidgetGalleryOpen: false
        };
      });
    },
    removeWidget: (instanceId: string) => {
      sound.deleteTrash();
      setOSState((prev) => {
        const updated = prev.placedWidgets.filter((w) => w.instanceId !== instanceId);
        try {
          localStorage.setItem('ios_placed_widgets', JSON.stringify(updated));
        } catch {}
        return { ...prev, placedWidgets: updated };
      });
    },
    setActiveFolderId: (id: string | null) => {
      sound.tap();
      setOSState({ activeFolderId: id });
    },
    // App & Safari navigation helpers
    setActiveApp: (appId: AppId | null) => {
      if (!appId) {
        closeApp();
      } else {
        openApp(appId);
      }
    },
    setSafariNavigation: (url: string, title?: string) => {
      setOSState((prev) => ({
        ...prev,
        safariUrl: url,
        safariTitle: title || (url.includes('github') ? 'GitHub' : url.includes('linkedin') ? 'LinkedIn' : 'Safari Web'),
        safariPreviousApp: prev.activeApp !== 'safari' ? prev.activeApp : prev.safariPreviousApp
      }));
    },
    // In-simulated-iPhone Safari browsing
    openSafari: (url: string, title?: string) => {
      sound.appOpen();
      setOSState((prev) => ({
        ...prev,
        isLocked: false,
        safariPreviousApp: prev.activeApp,
        activeApp: 'safari',
        safariUrl: url,
        safariTitle: title || (url.includes('github') ? 'GitHub' : url.includes('linkedin') ? 'LinkedIn' : 'Safari Web'),
        isNotificationCenterOpen: false,
        isControlCenterOpen: false,
        isSpotlightOpen: false
      }));
    },
    closeSafari: () => {
      sound.tap();
      setOSState((prev) => ({
        ...prev,
        activeApp: prev.safariPreviousApp || null,
        safariPreviousApp: null
      }));
    }
  };
};
