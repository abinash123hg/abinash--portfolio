import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Hash,
  X,
  Download,
  Share2,
  Sparkles,
  ShieldCheck,
  Eye,
  ZoomIn
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { Certification } from '../types';
import { useOSStore } from '../store/useOSStore';
import { resolveMediaUrl } from '../utils/mediaResolver';

export const CertificationsApp: React.FC = () => {
  const { selectedCertId, selectCert, theme, showToast } = useOSStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isDark = theme === 'dark';

  const certs = PORTFOLIO_DATA.certifications;
  const activeCert = certs.find((c) => c.id === selectedCertId) || null;

  const handleCopy = (id: string) => {
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    showToast({
      id: `copy-${id}`,
      title: 'Credential ID Copied',
      subtitle: id
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col overflow-y-auto no-scrollbar pb-16 select-none">
      <AppHeader
        title="Certifications"
        subtitle={`${certs.length} Verified AI/ML Credentials`}
        rightAction={
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
            {certs.length} Verified
          </span>
        }
      />

      <div className="p-3.5 space-y-3.5">
        {certs.map((cert, index) => (
          <motion.div
            key={cert.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => selectCert(cert.id)}
            className={`p-3.5 rounded-3xl border shadow-lg cursor-pointer transition-all flex flex-col gap-3 ${
              isDark
                ? 'bg-zinc-900/80 border-white/10 hover:border-amber-500/40 text-white'
                : 'bg-white border-zinc-200 hover:border-amber-500/40 text-zinc-900'
            }`}
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center border border-amber-500/30">
                  {index + 1}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300">
                  {cert.badgeLabel}
                </span>
              </div>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>

            {/* Real Certificate Image Scan Preview */}
            {cert.imageSrc && (
              <div className="w-full h-36 rounded-2xl bg-zinc-950/80 border border-white/10 overflow-hidden relative group">
                <img
                  src={resolveMediaUrl(cert.imageSrc, 'certifications')}
                  alt={cert.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[10px] font-semibold text-white/90 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                    <ZoomIn className="w-3 h-3 text-amber-400" />
                    <span>Tap to view document scan</span>
                  </span>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-bold tracking-tight text-white leading-snug">{cert.title}</h3>
              <p className="text-xs font-semibold text-amber-400 mt-0.5">{cert.issuer}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/10">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>{cert.date}</span>
              </div>
              {cert.credentialId && (
                <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[140px]">
                  ID: {cert.credentialId}
                </span>
              )}
            </div>

            {/* Skills chips */}
            <div className="flex flex-wrap gap-1">
              {cert.skills.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-zinc-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-Screen Certificate Scan Document Viewer Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl text-white flex flex-col justify-between p-4 overflow-y-auto no-scrollbar"
            onClick={() => selectCert(null)}
          >
            {/* Top Close Bar */}
            <div
              className="flex items-center justify-between pt-6 pb-2 border-b border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="leading-tight">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {activeCert.badgeLabel}
                </span>
                <h3 className="text-xs font-bold text-white truncate max-w-[240px]">
                  {activeCert.title}
                </h3>
              </div>
              <button
                onClick={() => selectCert(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center cursor-pointer active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Official Document Scan */}
            <div
              className="my-auto py-3 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {activeCert.imageSrc ? (
                <div className="w-full max-w-[360px] rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-zinc-950 p-1">
                  <img
                    src={resolveMediaUrl(activeCert.imageSrc, 'certifications')}
                    alt={activeCert.title}
                    className="w-full max-h-[50vh] object-contain rounded-xl"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Award className="w-10 h-10" />
                </div>
              )}

              <div className="w-full max-w-[360px] mt-4 p-3.5 rounded-2xl bg-zinc-900/90 border border-white/10 space-y-2.5 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Issued by:</span>
                  <span className="font-bold text-amber-400">{activeCert.issuer}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Awarded to:</span>
                  <span className="font-bold text-blue-400">{PORTFOLIO_DATA.personal.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Date:</span>
                  <span className="font-medium text-zinc-300">{activeCert.date}</span>
                </div>

                {activeCert.credentialId && (
                  <div className="bg-black/60 p-2 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 text-[10px]">Credential ID:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-amber-300 font-semibold text-[11px]">
                        {activeCert.credentialId}
                      </span>
                      <button
                        onClick={() => handleCopy(activeCert.credentialId!)}
                        className="text-[10px] text-blue-400 hover:underline font-semibold"
                      >
                        {copiedId === activeCert.credentialId ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                )}

                {activeCert.description && (
                  <p className="text-[11px] text-zinc-400 leading-relaxed pt-1 border-t border-white/10">
                    {activeCert.description}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div
              className="flex items-center gap-2 pt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => selectCert(null)}
                className="w-full p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors active:scale-98"
              >
                Back to Certifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
