import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Image as ImageIcon,
  X,
  ZoomIn,
  Share2,
  Calendar,
  MapPin,
  Sparkles,
  Download,
  Maximize2,
  SlidersHorizontal
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { useOSStore } from '../store/useOSStore';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { resolveMediaUrl } from '../utils/mediaResolver';
import { PhotoItem } from '../types';

export const PhotosApp: React.FC = () => {
  const { theme, showToast } = useOSStore();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const isDark = theme === 'dark';

  const categories = ['All', ...Array.from(new Set(PORTFOLIO_DATA.photos.map((p) => p.category)))];

  const filteredPhotos = PORTFOLIO_DATA.photos.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col justify-between overflow-hidden pb-16 select-none">
      <AppHeader title="Photos" subtitle="Campus, AI Labs & Life" />

      {/* Category Filter Pills */}
      <div className="px-3 pt-2 pb-1 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? isDark
                  ? 'bg-white text-zinc-950 font-bold'
                  : 'bg-zinc-900 text-white font-bold'
                : isDark
                ? 'bg-white/10 text-zinc-400 hover:bg-white/15'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="flex-1 p-3 overflow-y-auto no-scrollbar">
        <div className="grid grid-cols-2 gap-2.5">
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedPhoto(photo)}
              className={`rounded-2xl overflow-hidden border cursor-pointer group shadow-sm flex flex-col ${
                isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-zinc-200'
              }`}
            >
              {/* Photo Media Container */}
              <div className="h-32 w-full bg-zinc-800 relative overflow-hidden">
                <img
                  src={resolveMediaUrl(photo.url)}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to stylized graphic placeholder if image asset path requires resolution
                    (e.target as HTMLImageElement).src = '/assets/images/cute_white_cat.jpg';
                  }}
                />
                <span className="absolute bottom-2 left-2 text-[9px] font-bold uppercase bg-black/60 text-white px-2 py-0.5 rounded-full backdrop-blur-md">
                  {photo.category}
                </span>
              </div>

              {/* Caption */}
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <h3 className="text-xs font-bold leading-snug line-clamp-1">
                  {photo.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-1">
                  <span>{photo.date || '2026'}</span>
                  <span className="truncate">{photo.location || 'Bhubaneswar'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Screen Photo Inspection Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col justify-between p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pt-8 pb-2 text-white">
              <span className="text-xs uppercase font-bold tracking-wider text-zinc-400">
                {selectedPhoto.category}
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* High-res Image Preview */}
            <div
              className="flex-1 flex items-center justify-center my-auto overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={resolveMediaUrl(selectedPhoto.url)}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[55vh] object-contain rounded-2xl shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/cute_white_cat.jpg';
                }}
              />
            </div>

            {/* Photo Metadata Footer */}
            <div
              className="p-4 rounded-3xl bg-zinc-900/90 border border-white/10 text-white space-y-2 mb-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white">{selectedPhoto.title}</h2>
                <button
                  onClick={() => {
                    showToast({
                      id: `photo-share-${Date.now()}`,
                      title: 'Photo Link Copied',
                      subtitle: selectedPhoto.title
                    });
                  }}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {selectedPhoto.description}
              </p>

              <div className="flex items-center gap-4 text-[11px] text-zinc-400 pt-1 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>{selectedPhoto.date || '2026'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{selectedPhoto.location || 'India'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
