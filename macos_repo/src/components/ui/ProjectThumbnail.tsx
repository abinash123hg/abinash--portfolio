import React, { useEffect, useState } from 'react';

interface ProjectThumbnailProps {
  /** The project's real link (GitHub repo or live demo) the thumbnail is generated from */
  url: string;
  /** Project title — used for the placeholder monogram while loading / on failure */
  title: string;
  /** Accent color for the placeholder gradient */
  accent?: string;
  /** Extra classes for the outer frame (size, rounding) */
  className?: string;
}

/** Strip .git and whitespace for clean repo paths */
const cleanRepoUrl = (url: string) => url.trim().replace(/\.git$/, '');

/**
 * Live thumbnail derived 100% from the project's own links — no static jpgs:
 *  1. mshots (GitHub's link-preview screenshot service) renders the live page.
 *  2. If it fails, fall back to GitHub's official OpenGraph social card.
 *  3. Last resort: gradient placeholder with the project monogram.
 */
export const ProjectThumbnail: React.FC<ProjectThumbnailProps> = ({
  url,
  title,
  accent = '#0ea5e9',
  className = ''
}) => {
  const repoUrl = cleanRepoUrl(url);
  const isGithub = repoUrl.includes('github.com');
  const repoPath = isGithub ? repoUrl.replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '') : '';

  const [fallbackToOg, setFallbackToOg] = useState(false);
  const [imgReady, setImgReady] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  // Reset state when the project link changes
  useEffect(() => {
    setFallbackToOg(false);
    setImgReady(false);
    setImgFailed(false);
  }, [repoUrl]);

  const src = fallbackToOg && repoPath
    ? `https://opengraph.githubassets.com/1/${repoPath}`
    : `https://s0.wp.com/mshots/v1/${encodeURIComponent(repoUrl)}?w=1200&h=675`;

  const showImage = !imgFailed;
  const monogram = title.trim().charAt(0).toUpperCase();

  return (
    <div
      className={`relative overflow-hidden bg-zinc-900 ${className}`}
      style={{
        background: imgReady ? undefined : `linear-gradient(135deg, ${accent}33 0%, #18181b 60%, #09090b 100%)`
      }}
    >
      {/* Placeholder layer: monogram + subtle grid, visible until the screenshot loads */}
      {!imgReady && showImage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 pointer-events-none">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white shadow-lg"
            style={{ backgroundColor: accent }}
          >
            {monogram}
          </div>
          <span className="text-[9px] uppercase tracking-widest text-white/40 font-semibold">
            Loading preview…
          </span>
        </div>
      )}

      {/* Live screenshot of the project's link */}
      {showImage && (
        <img
          src={src}
          alt={`${title} — live preview`}
          loading="lazy"
          onLoad={() => setImgReady(true)}
          onError={() => {
            if (!fallbackToOg && repoPath) {
              setFallbackToOg(true);
            } else {
              setImgFailed(true);
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
            imgReady ? 'opacity-100' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
        />
      )}

      {/* Last-resort fallback: accent gradient + monogram + domain */}
      {imgFailed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-xl"
            style={{ backgroundColor: accent }}
          >
            {monogram}
          </div>
        </div>
      )}
    </div>
  );
};
