import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { siteConfig } from "@/data/siteConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

interface HeroMediaProps {
  className?: string;
}

/**
 * Hero media layer, driven entirely by `siteConfig.hero.media`.
 *  · type "image"  → SmartImage with a slow scale drift
 *  · type "video"  → muted, playsInline, loop, preload=metadata, with a
 *                    real play/pause control and automatic poster fallback
 * Replace one object in src/data/siteConfig.ts — nothing here is hardcoded.
 */
export function HeroMedia({ className }: HeroMediaProps) {
  const media = siteConfig.hero.media;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const reduced = useReducedMotion();

  /**
   * The hero becomes a video the instant `videoSrc` is non-empty — there is no
   * separate type flag to remember to flip. If the file is missing or 404s,
   * `videoFailed` flips and the poster renders instead, so the hero can never
   * end up blank.
   */
  const useVideo = Boolean(media.videoSrc) && !videoFailed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    const attempt = video.play();
    if (typeof attempt?.catch === "function") attempt.catch(() => setPlaying(false));
  }, [reduced, useVideo]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <figure className={cn("relative h-full w-full overflow-hidden bg-bg-2", className)}>
      <div className={cn("absolute inset-0", !reduced && useVideo && "grain")}>
        {useVideo ? (
          <video
            ref={videoRef}
            className="media-fill"
            src={media.videoSrc}
            poster={media.poster}
            muted
            loop
            playsInline
            autoPlay={!reduced}
            preload="metadata"
            aria-label={media.alt}
            onError={() => setVideoFailed(true)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        ) : (
          <div className={cn("h-full w-full", !reduced && "animate-ken-burns")}>
            <SmartImage
              src={media.poster}
              alt={media.alt}
              eager
              ratio="auto"
              className="h-full w-full"
              imgClassName="object-[62%_42%] sm:object-center"
            />
          </div>
        )}
      </div>

      {/* cinematic grading layers */}
      <div aria-hidden="true" className="vignette pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 scan opacity-40 mix-blend-overlay"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 12% 8%, rgba(124,92,255,0.18), transparent 62%)",
        }}
      />

      {/* HUD */}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-4 pb-4 sm:px-6 lg:px-10 lg:pb-6">
        <span className="label flex items-center gap-2 text-[0.6rem] text-ink-2">
          <span className="relative flex size-1.5">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-warm" />
          </span>
          {media.caption}
        </span>

        {useVideo ? (
          <button
            type="button"
            onClick={toggle}
            className="pointer-events-auto flex items-center gap-2 rounded-full border border-line bg-black/40 px-3 py-1.5 backdrop-blur transition-colors duration-300 hover:border-accent/70"
            aria-label={playing ? "Pause showreel" : "Play showreel"}
            aria-pressed={playing}
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
            <span className="label text-[0.6rem]">{playing ? "PAUSE" : "PLAY"}</span>
          </button>
        ) : (
          <span className="label hidden text-[0.6rem] sm:inline">
            VIDEO / IMAGE — SET IN siteConfig.hero.media
          </span>
        )}
      </figcaption>
    </figure>
  );
}
