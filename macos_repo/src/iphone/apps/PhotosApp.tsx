import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Calendar,
  MapPin,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { useOSStore } from '../store/useOSStore';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { resolveMediaUrl } from '../utils/mediaResolver';
import { PhotoItem } from '../types';

export const PhotosApp: React.FC = () => {
  const { theme, showToast, capturedPhotos } = useOSStore();
  const isDark = theme === 'dark';

  const photos = [...capturedPhotos, ...PORTFOLIO_DATA.photos];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(photos.map((p) => p.category)))];

  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter((p) => p.category === selectedCategory);

  const activePhoto = selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  // Touch Swipe Handlers for mobile swipe gestures
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleShare = (photo: PhotoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast({
      id: `photo-share-${photo.id}`,
      title: 'Photo Shared',
      subtitle: photo.title
    });
  };

  return (
    <div className={`flex-1 min-h-0 w-full flex flex-col justify-between overflow-hidden pb-16 select-none ${
      isDark ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'
    }`}>
      <AppHeader
        title="Photos"
        subtitle="Verified Portraits & Highlights"
        rightAction={
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
            {photos.length} Photos
          </span>
        }
      />

      {/* Category Filter Pills */}
      <div className="px-3.5 pt-2 pb-2 flex gap-2 overflow-x-auto no-scrollbar border-b border-white/5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedIndex(null);
            }}
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

      {/* Main Grid Viewport */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 space-y-3.5">
        {/* Real Photos Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedIndex(idx)}
              className={`rounded-2xl overflow-hidden border cursor-pointer group shadow-sm flex flex-col transition-all ${
                isDark ? 'bg-zinc-900 border-white/10 hover:border-blue-500/40' : 'bg-white border-zinc-200 hover:border-blue-500/40'
              }`}
            >
              <div className="h-36 w-full bg-zinc-800 relative overflow-hidden">
                <img
                  src={resolveMediaUrl(photo.url)}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute bottom-2 left-2 text-[9px] font-bold uppercase bg-black/70 text-white px-2 py-0.5 rounded-full backdrop-blur-md">
                  {photo.category}
                </span>
              </div>

              <div className="p-2.5 flex flex-col justify-between">
                <h3 className="text-xs font-bold leading-snug line-clamp-1 text-white">
                  {photo.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1">
                  <span>{photo.date || '2026'}</span>
                  <span className="truncate">{photo.location || 'Odisha, India'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Screen Photo Viewer Modal with Swipe & Nav Buttons */}
      <AnimatePresence>
        {activePhoto && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 36 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 36 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="absolute inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 select-none"
            onClick={() => setSelectedIndex(null)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Modal Top Bar */}
            <div
              className="flex items-center justify-between pt-6 pb-2 text-white border-b border-white/10 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-zinc-500">•</span>
                <span className="text-xs text-zinc-400">
                  {selectedIndex + 1} of {filteredPhotos.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleShare(activePhoto, e)}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center cursor-pointer transition-colors"
                  title="Share"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center cursor-pointer transition-colors active:scale-95"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* High-res Photo Container with Prev/Next Navigation Controls */}
            <div
              className="flex-1 flex items-center justify-center my-auto overflow-hidden relative px-2"
              onClick={(e) => e.stopPropagation()}
            >
              {photos.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-2 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all active:scale-95"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              <img
                src={resolveMediaUrl(activePhoto.url)}
                alt={activePhoto.title}
                className="max-w-full max-h-[52vh] object-contain rounded-2xl shadow-2xl transition-transform duration-300"
              />

              {photos.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-2 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all active:scale-95"
                  title="Next Photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Photo Metadata Footer */}
            <div
              className="p-3.5 rounded-2xl bg-zinc-900/90 border border-white/10 text-white space-y-1.5 shrink-0 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-sm font-bold leading-tight">{activePhoto.title}</h3>
              {activePhoto.description && (
                <p className="text-xs text-zinc-300 leading-relaxed">{activePhoto.description}</p>
              )}
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-white/10">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  <span>{activePhoto.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  <span>{activePhoto.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
