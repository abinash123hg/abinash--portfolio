import React, { useRef, useState } from 'react';
import {
  Wifi,
  WifiOff,
  Bluetooth,
  Plane,
  Radio,
  Sun,
  Volume2,
  VolumeX,
  Moon,
  BatteryCharging,
  Sparkles,
  Camera,
  Play,
  Pause,
  SkipForward,
  RotateCw,
  Flame,
  Clock,
  Calculator,
  FileText,
  Video,
  Battery,
  Sliders,
  Minus,
  Maximize2,
  Plus,
  Cast
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { REAL_AUDIO_TRACKS } from '../../utils/audioPlayer';

interface Props {
  onOpenSheet: (sheet: string) => void;
  onNavigateToMedia: () => void;
  onOpenGallery: () => void;
}

export const FavoritesPage: React.FC<Props> = ({
  onOpenSheet,
  onNavigateToMedia,
  onOpenGallery
}) => {
  const {
    wifi,
    toggleWifi,
    bluetooth,
    toggleBluetooth,
    airplaneMode,
    toggleAirplaneMode,
    cellularData,
    toggleCellularData,
    orientationLocked,
    toggleOrientationLock,
    focusMode,
    toggleFocusMode,
    focusModeType,
    brightness,
    setBrightness,
    volume,
    setVolume,
    flashlight,
    toggleFlashlight,
    screenRecordingState,
    screenRecordingCountdown,
    screenRecordingDuration,
    startScreenRecording,
    stopScreenRecording,
    lowPowerMode,
    toggleLowPowerMode,
    isPlayingMedia,
    toggleMediaPlay,
    nextMediaTrack,
    currentTrackIndex,
    openApp,
    controlCenterTiles,
    removeCCTile,
    isControlCenterEditing,
    textSizePercent,
    setTextSizePercent
  } = useOSStore();

  const currentTrack = REAL_AUDIO_TRACKS[currentTrackIndex] || REAL_AUDIO_TRACKS[0];

  // Vertical Slider Handlers
  const brightnessRef = useRef<HTMLDivElement>(null);
  const [isBrightDragging, setIsBrightDragging] = useState(false);

  const handleBrightnessPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!brightnessRef.current) return;
    const rect = brightnessRef.current.getBoundingClientRect();
    const offsetY = rect.bottom - e.clientY;
    const height = rect.height;
    const pct = Math.max(10, Math.min(100, Math.round((offsetY / height) * 100)));
    setBrightness(pct);
  };

  const volumeRef = useRef<HTMLDivElement>(null);
  const [isVolDragging, setIsVolDragging] = useState(false);

  const handleVolumePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!volumeRef.current) return;
    const rect = volumeRef.current.getBoundingClientRect();
    const offsetY = rect.bottom - e.clientY;
    const height = rect.height;
    const pct = Math.max(0, Math.min(100, Math.round((offsetY / height) * 100)));
    setVolume(pct);
  };

  // Long press helper
  const longPressTimer = useRef<any>(null);
  const handleTouchStart = (sheetName: string) => {
    longPressTimer.current = setTimeout(() => {
      onOpenSheet(sheetName);
    }, 450);
  };
  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  // Jiggle CSS class when editing
  const jiggleClass = isControlCenterEditing ? 'animate-[jiggle_0.3s_infinite_alternate]' : '';

  return (
    <div className="w-full flex-1 flex flex-col items-center pb-20 select-none">
      {/* 4-column Grid */}
      <div className="grid grid-cols-4 gap-3 w-full max-w-[340px]">
        {/* 1. Connectivity Bundle (2x2) */}
        {controlCenterTiles.includes('connectivity') && (
          <div
            className={`col-span-2 row-span-2 rounded-[28px] bg-zinc-900/75 backdrop-blur-2xl border border-white/15 p-2.5 grid grid-cols-2 gap-2 shadow-xl relative transition-transform ${jiggleClass}`}
            onContextMenu={(e) => {
              e.preventDefault();
              onOpenSheet('connectivity');
            }}
          >
            {isControlCenterEditing && (
              <button
                onClick={() => removeCCTile('connectivity')}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}

            {/* Airplane */}
            <button
              onClick={toggleAirplaneMode}
              className={`rounded-full h-11 w-11 mx-auto flex items-center justify-center transition-all ${
                airplaneMode ? 'bg-amber-500 text-white shadow-md' : 'bg-white/10 text-zinc-300 hover:bg-white/15'
              }`}
              title="Airplane Mode"
            >
              <Plane className="w-5 h-5" />
            </button>

            {/* Cellular */}
            <button
              onClick={toggleCellularData}
              disabled={airplaneMode}
              className={`rounded-full h-11 w-11 mx-auto flex items-center justify-center transition-all ${
                cellularData && !airplaneMode ? 'bg-emerald-500 text-white shadow-md' : 'bg-white/10 text-zinc-400 opacity-60'
              }`}
              title="Cellular 5G"
            >
              <Radio className="w-5 h-5" />
            </button>

            {/* Wi-Fi */}
            <button
              onClick={toggleWifi}
              onTouchStart={() => handleTouchStart('connectivity')}
              onTouchEnd={handleTouchEnd}
              onMouseDown={() => handleTouchStart('connectivity')}
              onMouseUp={handleTouchEnd}
              className={`rounded-full h-11 w-11 mx-auto flex items-center justify-center transition-all ${
                wifi ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-zinc-400'
              }`}
              title="Wi-Fi"
            >
              {wifi ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            </button>

            {/* Bluetooth */}
            <button
              onClick={toggleBluetooth}
              onTouchStart={() => handleTouchStart('connectivity')}
              onTouchEnd={handleTouchEnd}
              onMouseDown={() => handleTouchStart('connectivity')}
              onMouseUp={handleTouchEnd}
              className={`rounded-full h-11 w-11 mx-auto flex items-center justify-center transition-all ${
                bluetooth ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-zinc-400'
              }`}
              title="Bluetooth"
            >
              <Bluetooth className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* 2. Media Widget (2x2) */}
        {controlCenterTiles.includes('media') && (
          <div
            onClick={onNavigateToMedia}
            className={`col-span-2 row-span-2 rounded-[28px] bg-zinc-900/75 backdrop-blur-2xl border border-white/15 p-3 flex flex-col justify-between shadow-xl relative cursor-pointer group hover:bg-zinc-850 transition-all ${jiggleClass}`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('media');
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}

            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${currentTrack.coverColor} flex items-center justify-center text-white shadow-md shrink-0`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="leading-tight truncate pr-1">
                <h4 className="text-xs font-bold text-white truncate">{currentTrack.title}</h4>
                <p className="text-[10px] text-zinc-400 truncate">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Wave animation if playing */}
            <div className="flex items-center justify-between mt-auto pt-2">
              <div className="flex items-end gap-0.5 h-4">
                {[40, 90, 60, 100, 50].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full bg-white transition-all ${
                      isPlayingMedia ? 'animate-pulse' : 'opacity-40'
                    }`}
                    style={{ height: isPlayingMedia ? `${h}%` : '25%', animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMediaPlay();
                  }}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center active:scale-90 transition-all"
                >
                  {isPlayingMedia ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextMediaTrack();
                  }}
                  className="w-8 h-8 rounded-full hover:bg-white/10 text-zinc-300 flex items-center justify-center active:scale-90 transition-all"
                >
                  <SkipForward className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. Orientation Lock (1x1) */}
        {controlCenterTiles.includes('orientation') && (
          <div
            onClick={toggleOrientationLock}
            className={`col-span-1 h-[74px] rounded-[24px] bg-zinc-900/75 backdrop-blur-2xl border border-white/15 flex items-center justify-center shadow-lg relative cursor-pointer active:scale-95 transition-all ${jiggleClass} ${
              orientationLocked ? 'bg-white/20' : ''
            }`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('orientation');
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}
            <RotateCw className={`w-6 h-6 ${orientationLocked ? 'text-red-400' : 'text-zinc-400'}`} />
          </div>
        )}

        {/* 4. Screen Mirroring (1x1 or 2x1) */}
        {controlCenterTiles.includes('mirroring') && (
          <div
            onClick={() => onOpenSheet('connectivity')}
            className={`col-span-1 h-[74px] rounded-[24px] bg-zinc-900/75 backdrop-blur-2xl border border-white/15 flex items-center justify-center shadow-lg relative cursor-pointer active:scale-95 transition-all ${jiggleClass}`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('mirroring');
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}
            <Cast className="w-6 h-6 text-zinc-300" />
          </div>
        )}

        {/* 5. Focus Mode (2x1) */}
        {controlCenterTiles.includes('focus') && (
          <div
            onClick={toggleFocusMode}
            onTouchStart={() => handleTouchStart('focus')}
            onTouchEnd={handleTouchEnd}
            onMouseDown={() => handleTouchStart('focus')}
            onMouseUp={handleTouchEnd}
            className={`col-span-2 h-[74px] rounded-[24px] border border-white/15 p-3 flex items-center gap-3 shadow-lg relative cursor-pointer transition-all ${jiggleClass} ${
              focusMode
                ? 'bg-indigo-600/40 border-indigo-500/50 text-white'
                : 'bg-zinc-900/75 backdrop-blur-2xl text-zinc-300 hover:bg-zinc-850'
            }`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('focus');
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              focusMode ? 'bg-indigo-500 text-white shadow-md' : 'bg-white/10 text-zinc-300'
            }`}>
              <Moon className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <h4 className="text-xs font-bold text-white capitalize">{focusMode ? focusModeType : 'Focus'}</h4>
              <p className="text-[10px] text-zinc-400">{focusMode ? 'Active' : 'Off'}</p>
            </div>
          </div>
        )}

        {/* 6. Brightness Slider (1x2 Vertical) */}
        {controlCenterTiles.includes('brightness') && (
          <div
            ref={brightnessRef}
            onPointerDown={(e) => {
              if (isControlCenterEditing) return;
              setIsBrightDragging(true);
              e.currentTarget.setPointerCapture(e.pointerId);
              handleBrightnessPointer(e);
            }}
            onPointerMove={(e) => {
              if (isBrightDragging) handleBrightnessPointer(e);
            }}
            onPointerUp={(e) => {
              setIsBrightDragging(false);
              try {
                e.currentTarget.releasePointerCapture(e.pointerId);
              } catch {}
            }}
            onTouchStart={() => handleTouchStart('brightness')}
            onTouchEnd={handleTouchEnd}
            onContextMenu={(e) => {
              e.preventDefault();
              onOpenSheet('brightness');
            }}
            className={`col-span-1 row-span-2 h-[160px] rounded-[28px] bg-zinc-900/80 backdrop-blur-2xl border border-white/15 relative overflow-hidden shadow-xl cursor-pointer touch-none flex flex-col justify-end items-center ${jiggleClass}`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('brightness');
                }}
                className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}

            {/* Fill Level */}
            <div
              className="w-full bg-white transition-all pointer-events-none rounded-b-[26px]"
              style={{ height: `${brightness}%` }}
            />

            {/* Centered Sun Icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-zinc-950 mix-blend-difference">
              <Sun className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>
        )}

        {/* 7. Volume Slider (1x2 Vertical) */}
        {controlCenterTiles.includes('volume') && (
          <div
            ref={volumeRef}
            onPointerDown={(e) => {
              if (isControlCenterEditing) return;
              setIsVolDragging(true);
              e.currentTarget.setPointerCapture(e.pointerId);
              handleVolumePointer(e);
            }}
            onPointerMove={(e) => {
              if (isVolDragging) handleVolumePointer(e);
            }}
            onPointerUp={(e) => {
              setIsVolDragging(false);
              try {
                e.currentTarget.releasePointerCapture(e.pointerId);
              } catch {}
            }}
            onTouchStart={() => handleTouchStart('volume')}
            onTouchEnd={handleTouchEnd}
            onContextMenu={(e) => {
              e.preventDefault();
              onOpenSheet('volume');
            }}
            className={`col-span-1 row-span-2 h-[160px] rounded-[28px] bg-zinc-900/80 backdrop-blur-2xl border border-white/15 relative overflow-hidden shadow-xl cursor-pointer touch-none flex flex-col justify-end items-center ${jiggleClass}`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('volume');
                }}
                className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}

            {/* Fill Level */}
            <div
              className="w-full bg-white transition-all pointer-events-none rounded-b-[26px]"
              style={{ height: `${volume}%` }}
            />

            {/* Centered Volume Icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-zinc-950 mix-blend-difference">
              {volume === 0 ? (
                <VolumeX className="w-6 h-6 stroke-[2.2]" />
              ) : (
                <Volume2 className="w-6 h-6 stroke-[2.2]" />
              )}
            </div>
          </div>
        )}

        {/* 8. Flashlight (1x1) */}
        {controlCenterTiles.includes('flashlight') && (
          <div
            onClick={toggleFlashlight}
            onTouchStart={() => handleTouchStart('flashlight')}
            onTouchEnd={handleTouchEnd}
            onMouseDown={() => handleTouchStart('flashlight')}
            onMouseUp={handleTouchEnd}
            className={`col-span-1 h-[74px] rounded-[24px] border border-white/15 flex items-center justify-center shadow-lg relative cursor-pointer active:scale-95 transition-all ${jiggleClass} ${
              flashlight ? 'bg-amber-400 text-zinc-950 shadow-amber-500/30' : 'bg-zinc-900/75 backdrop-blur-2xl text-zinc-300'
            }`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('flashlight');
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}
            <Flame className="w-6 h-6" />
          </div>
        )}

        {/* 9. Timer (1x1) */}
        {controlCenterTiles.includes('timer') && (
          <div
            onClick={() => onOpenSheet('timer')}
            className={`col-span-1 h-[74px] rounded-[24px] bg-zinc-900/75 backdrop-blur-2xl border border-white/15 flex items-center justify-center shadow-lg relative cursor-pointer active:scale-95 transition-all text-zinc-300 hover:text-white ${jiggleClass}`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('timer');
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}
            <Clock className="w-6 h-6" />
          </div>
        )}

        {/* 10. Calculator (1x1) */}
        {controlCenterTiles.includes('calculator') && (
          <div
            onClick={() => onOpenSheet('calculator')}
            className={`col-span-1 h-[74px] rounded-[24px] bg-zinc-900/75 backdrop-blur-2xl border border-white/15 flex items-center justify-center shadow-lg relative cursor-pointer active:scale-95 transition-all text-zinc-300 hover:text-white ${jiggleClass}`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('calculator');
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}
            <Calculator className="w-6 h-6" />
          </div>
        )}

        {/* 11. Camera (1x1) */}
        {controlCenterTiles.includes('camera') && (
          <div
            onClick={() => openApp('camera')}
            className={`col-span-1 h-[74px] rounded-[24px] bg-zinc-900/75 backdrop-blur-2xl border border-white/15 flex items-center justify-center shadow-lg relative cursor-pointer active:scale-95 transition-all text-zinc-300 hover:text-white ${jiggleClass}`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('camera');
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}
            <Camera className="w-6 h-6" />
          </div>
        )}

        {/* 12. Notes (1x1) */}
        {controlCenterTiles.includes('notes') && (
          <div
            onClick={() => openApp('notes')}
            className={`col-span-1 h-[74px] rounded-[24px] bg-zinc-900/75 backdrop-blur-2xl border border-white/15 flex items-center justify-center shadow-lg relative cursor-pointer active:scale-95 transition-all text-zinc-300 hover:text-white ${jiggleClass}`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('notes');
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}
            <FileText className="w-6 h-6" />
          </div>
        )}

        {/* 13. Screen Recording (1x1) */}
        {controlCenterTiles.includes('screen_recording') && (
          <div
            onClick={startScreenRecording}
            className={`col-span-1 h-[74px] rounded-[24px] border border-white/15 flex items-center justify-center shadow-lg relative cursor-pointer active:scale-95 transition-all ${jiggleClass} ${
              screenRecordingState === 'recording'
                ? 'bg-red-600 text-white animate-pulse'
                : screenRecordingState === 'countdown'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'bg-zinc-900/75 backdrop-blur-2xl text-zinc-300 hover:text-white'
            }`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('screen_recording');
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}
            {screenRecordingState === 'countdown' ? (
              <span className="text-xl font-mono font-black">{screenRecordingCountdown}</span>
            ) : (
              <div className="flex flex-col items-center">
                <Video className="w-5 h-5" />
                {screenRecordingState === 'recording' && (
                  <span className="text-[9px] font-mono mt-0.5">{screenRecordingDuration}s</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* 14. Low Power Mode (1x1) */}
        {controlCenterTiles.includes('low_power') && (
          <div
            onClick={toggleLowPowerMode}
            className={`col-span-1 h-[74px] rounded-[24px] border border-white/15 flex items-center justify-center shadow-lg relative cursor-pointer active:scale-95 transition-all ${jiggleClass} ${
              lowPowerMode
                ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'bg-zinc-900/75 backdrop-blur-2xl text-zinc-300 hover:text-white'
            }`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('low_power');
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}
            <Battery className="w-6 h-6" />
          </div>
        )}

        {/* 15. Text Size (1x1) */}
        {controlCenterTiles.includes('text_size') && (
          <div
            onClick={() => {
              const next = textSizePercent === 100 ? 115 : textSizePercent === 115 ? 85 : 100;
              setTextSizePercent(next);
            }}
            className={`col-span-1 h-[74px] rounded-[24px] bg-zinc-900/75 backdrop-blur-2xl border border-white/15 flex flex-col items-center justify-center shadow-lg relative cursor-pointer active:scale-95 transition-all text-zinc-300 hover:text-white ${jiggleClass}`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCCTile('text_size');
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}
            <Sliders className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] font-mono opacity-80">{textSizePercent}%</span>
          </div>
        )}

        {/* 16. Resume PDF Shortcut (2x1) */}
        {controlCenterTiles.includes('resume_shortcut') && (
          <a
            href="/Abinash-Swain-Resume.pdf"
            download="Abinash-Swain-Resume.pdf"
            className={`col-span-2 h-[74px] rounded-[24px] bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-blue-500/40 backdrop-blur-2xl p-3 flex items-center justify-between shadow-lg relative cursor-pointer hover:border-blue-400 transition-all ${jiggleClass}`}
          >
            {isControlCenterEditing && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeCCTile('resume_shortcut');
                }}
                className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white border border-white/40 flex items-center justify-center z-20 shadow active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
            )}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-md">
                <FileText className="w-5 h-5" />
              </div>
              <div className="leading-tight text-left">
                <h4 className="text-xs font-bold text-white">Official Resume</h4>
                <p className="text-[10px] text-blue-300">Tap to Download PDF</p>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-blue-500/30 px-2 py-0.5 rounded text-blue-200">
              2027
            </span>
          </a>
        )}
      </div>

      {/* Edit Mode: Add a Control Button */}
      {isControlCenterEditing && (
        <div className="w-full max-w-[340px] mt-6 flex flex-col items-center">
          <button
            onClick={onOpenGallery}
            className="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 text-blue-400" />
            <span>Add a Control</span>
          </button>
        </div>
      )}
    </div>
  );
};
