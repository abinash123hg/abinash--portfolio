import React, { useEffect, useRef, useState } from 'react';
import { Camera, Zap, RefreshCw, Circle, Image, Sparkles } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { useOSStore } from '../store/useOSStore';

export const CameraApp: React.FC = () => {
  const { openApp, addCapturedPhoto, showToast } = useOSStore();
  const [flash, setFlash] = useState(false);
  const [facingMode, setFacingMode] = useState<'back' | 'front'>('back');
  const [mode, setMode] = useState<'photo' | 'portrait' | 'video'>('photo');
  const [shutterEffect, setShutterEffect] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let cancelled = false;
    const startCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) return;
      try {
        streamRef.current?.getTracks().forEach((track) => track.stop());
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch {
        showToast({ id: `camera-unavailable-${Date.now()}`, title: 'Camera Permission Needed', subtitle: 'Allow camera access to capture a real photo.' });
      }
    };
    startCamera();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, [facingMode]);

  const handleSnap = () => {
    if (mode === 'video') return;
    const video = videoRef.current;
    if (video?.videoWidth && video.videoHeight) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        if (facingMode === 'front') {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        addCapturedPhoto({
          id: `camera-photo-${Date.now()}`,
          title: `${mode === 'portrait' ? 'Portrait' : 'Photo'} ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`,
          category: mode === 'portrait' ? 'Portrait' : 'Camera',
          description: 'Captured with the portfolio camera.',
          url: canvas.toDataURL('image/jpeg', 0.9),
          date: new Date().toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }),
          location: 'This device'
        });
        showToast({ id: `camera-photo-${Date.now()}`, title: 'Photo Saved', subtitle: 'Your photo is available in Photos.' });
      }
    } else {
      showToast({ id: `camera-not-ready-${Date.now()}`, title: 'Camera Not Ready', subtitle: 'Wait for the live preview, then try again.' });
    }
    setShutterEffect(true);
    setTimeout(() => setShutterEffect(false), 200);
  };

  return (
    <div className="flex-1 w-full h-full bg-black text-white flex flex-col justify-between overflow-hidden pb-16 select-none">
      <AppHeader title="Camera" subtitle="48MP Photonic Engine" transparent />

      {/* Top Camera Controls */}
      <div className="px-6 py-2 flex items-center justify-between text-zinc-300">
        <button
          onClick={() => setFlash(!flash)}
          className={`p-2 rounded-full ${flash ? 'text-amber-400 bg-amber-400/20' : 'hover:bg-white/10'}`}
        >
          <Zap className="w-4 h-4" />
        </button>
        <span className="text-[10px] font-mono tracking-widest text-zinc-400">RAW 48MP</span>
        <span className="text-[10px] font-mono tracking-widest text-emerald-400">HDR ON</span>
      </div>

      {/* Viewfinder Canvas Area */}
      <div className="relative flex-1 mx-3 my-1 rounded-3xl bg-zinc-900 overflow-hidden border border-white/10 flex items-center justify-center">
        {/* Shutter White Flash overlay */}
        {shutterEffect && <div className="absolute inset-0 bg-white z-20 animate-fade-in" />}

        {/* Viewfinder Grid 3x3 */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-b border-white" />
          <div className="border-r border-white" />
          <div className="border-r border-white" />
          <div />
        </div>

        <video ref={videoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover" />

        {/* Center Target Box */}
        <div className="w-32 h-32 border border-amber-400/80 rounded-2xl flex flex-col items-center justify-center text-center p-2 relative animate-pulse">
          <span className="text-[10px] font-mono text-amber-400 tracking-wider">AI FOCUS</span>
          <span className="text-xs font-bold text-white mt-1">Abinash Swain</span>
          <span className="text-[9px] text-zinc-400">Target Candidate</span>
        </div>

        {/* Lens Zoom selector pill */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-3 text-xs font-mono">
          <span className="px-2 py-0.5 rounded-full bg-black/60 text-zinc-400">0.5x</span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-300 font-bold border border-amber-400/50">
            1x
          </span>
          <span className="px-2 py-0.5 rounded-full bg-black/60 text-zinc-400">2x</span>
        </div>
      </div>

      {/* Camera Modes Selector */}
      <div className="py-2 flex items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        <button
          onClick={() => setMode('video')}
          className={`cursor-pointer transition-colors ${mode === 'video' ? 'text-amber-400' : ''}`}
        >
          Video
        </button>
        <button
          onClick={() => setMode('photo')}
          className={`cursor-pointer transition-colors ${mode === 'photo' ? 'text-amber-400' : ''}`}
        >
          Photo
        </button>
        <button
          onClick={() => setMode('portrait')}
          className={`cursor-pointer transition-colors ${mode === 'portrait' ? 'text-amber-400' : ''}`}
        >
          Portrait
        </button>
      </div>

      {/* Bottom Shutter Controls */}
      <div className="p-4 flex items-center justify-around">
        {/* Gallery Preview thumbnail */}
        <button
          onClick={() => openApp('photos')}
          className="w-11 h-11 rounded-xl bg-zinc-800 border border-white/20 flex items-center justify-center overflow-hidden cursor-pointer"
        >
          <Image className="w-5 h-5 text-zinc-400" />
        </button>

        {/* Big Apple Shutter Button */}
        <button
          onClick={handleSnap}
          className="w-18 h-18 rounded-full border-4 border-white p-1 flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
        >
          <div className="w-full h-full rounded-full bg-white active:bg-zinc-300" />
        </button>

        {/* Flip Camera */}
        <button
          onClick={() => setFacingMode(facingMode === 'back' ? 'front' : 'back')}
          className="w-11 h-11 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center cursor-pointer transition-colors"
        >
          <RefreshCw className="w-5 h-5 text-zinc-300" />
        </button>
      </div>
    </div>
  );
};
