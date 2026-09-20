import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Calendar,
  X,
  ShieldCheck,
  ZoomIn,
  Copy,
  FileCheck
} from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { Certification } from '../types';
import { useOSStore } from '../store/useOSStore';
import { resolveMediaUrl } from '../utils/mediaResolver';

export const CertificationsApp: React.FC = () => {
  const { selectedCertId, selectCert, theme, showToast, openSafari } = useOSStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isDark = theme === 'dark';

  const certs = PORTFOLIO_DATA.certifications;
  const activeCert = certs.find((c) => c.id === selectedCertId) || null;

  const handleCopy = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    showToast({
      id: `copy-${id}`,
      title: 'Credential ID Copied',
      subtitle: id
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleVerify = (cert: Certification, e: React.MouseEvent) => {
    e.stopPropagation();
    if (cert.verificationUrl) {
      openSafari(cert.verificationUrl, `${cert.issuer} — Verification`);
    } else {
      showToast({
        id: `verify-${cert.id}`,
        title: 'Verified Credential',
        subtitle: `Issued by ${cert.issuer}`
      });
    }
  };

  return (
    <div className={`flex-1 min-h-0 w-full flex flex-col justify-between overflow-hidden pb-16 select-none ${
      isDark ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'
    }`}>
      <AppHeader
        title="Certifications"
        subtitle={`${certs.length} Verified AI/ML Credentials`}
        rightAction={
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {certs.length} Verified
          </span>
        }
      />

      <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 space-y-3.5">
        <p className="text-xs text-zinc-400 px-1 leading-relaxed">
          Official credentials verified via LinkedIn and issuing bodies, covering Autonomous Agentic AI, GenAI Analytics, and Deep Learning.
        </p>

        {certs.map((cert, index) => (
          <div
            key={cert.id}
            onClick={() => selectCert(cert.id)}
            className={`p-3.5 rounded-3xl border shadow-lg cursor-pointer transition-all flex flex-col gap-3 ${
              isDark
                ? 'bg-zinc-900/90 border-white/10 hover:border-amber-500/40 text-white'
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
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
            </div>

            {/* Real Certificate Image Preview */}
            {cert.imageSrc && (
              <div className="w-full h-40 rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden relative group">
                <img
                  src={resolveMediaUrl(cert.imageSrc, 'certifications')}
                  alt={cert.title}
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-2.5">
                  <span className="text-[10px] font-semibold text-white/90 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-md flex items-center gap-1">
                    <ZoomIn className="w-3 h-3 text-amber-400" />
                    <span>Tap to view document scan</span>
                  </span>
                </div>
              </div>
            )}

            {/* Title & Issuer */}
            <div>
              <h3 className="text-sm font-bold tracking-tight text-white leading-snug">
                {cert.title}
              </h3>
              <p className="text-xs font-semibold text-amber-400 mt-0.5">{cert.issuer}</p>
            </div>

            {/* Date & Credential ID */}
            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/10">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>{cert.date}</span>
              </div>
              {cert.credentialId && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[120px]">
                    ID: {cert.credentialId}
                  </span>
                  <button
                    onClick={(e) => handleCopy(cert.credentialId!, e)}
                    className="p-1 text-zinc-400 hover:text-white transition-colors"
                    title="Copy ID"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
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

            {/* Action Buttons: View Document & Verify in Safari */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => selectCert(cert.id)}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>View Scan</span>
              </button>

              {cert.verificationUrl && (
                <button
                  onClick={(e) => handleVerify(cert, e)}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <span>Verify in Safari</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Certificate Scan Document Viewer Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 36 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 36 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="absolute inset-0 z-50 bg-black/95 backdrop-blur-2xl text-white flex flex-col justify-between p-4 overflow-y-auto no-scrollbar"
            onClick={() => selectCert(null)}
          >
            {/* Top Close Bar */}
            <div
              className="flex items-center justify-between pt-6 pb-2 border-b border-white/10 shrink-0"
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
                <div className="w-full max-w-[360px] rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-zinc-950 p-1">
                  <img
                    src={resolveMediaUrl(activeCert.imageSrc, 'certifications')}
                    alt={activeCert.title}
                    className="w-full max-h-[46vh] object-contain rounded-xl"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Award className="w-10 h-10" />
                </div>
              )}

              <div className="w-full max-w-[360px] mt-4 p-3.5 rounded-2xl bg-zinc-900/90 border border-white/10 space-y-2 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Issuer:</span>
                  <span className="font-bold text-amber-400">{activeCert.issuer}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Awarded To:</span>
                  <span className="font-bold text-blue-400">{PORTFOLIO_DATA.personal.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Issue Date:</span>
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
                        onClick={(e) => handleCopy(activeCert.credentialId!, e)}
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
              className="flex items-center gap-2 pt-2 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => selectCert(null)}
                className="flex-1 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors active:scale-98"
              >
                Back to Certifications
              </button>

              {activeCert.verificationUrl && (
                <button
                  onClick={(e) => {
                    selectCert(null);
                    handleVerify(activeCert, e);
                  }}
                  className="flex-1 p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-lg active:scale-98"
                >
                  <span>Verify in Safari</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
