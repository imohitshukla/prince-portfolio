import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Project } from "@/data/projects";
import { cn } from "@/utils/cn";

interface VideoPlaceholderProps {
  project: Project;
  className?: string;
  eager?: boolean;
  /** Optional local/CDN file. When set, the poster becomes a looping video. */
  videoSrc?: string;
  /** Detail view shows richer controls. */
  interactive?: boolean;
  /** Override the project's own aspect ratio (used by compact index rows). */
  ratio?: string;
}

/**
 * Project media frame.
 * Default state = poster image (never a broken icon). Drop a real file into
 * `src/assets/work/` and pass it as `videoSrc`, or set `videoUrl` in
 * src/data/projects.ts to link out to YouTube / Vimeo / Drive.
 */
export function VideoPlaceholder({
  project,
  className,
  eager = false,
  videoSrc,
  interactive = false,
  ratio,
}: VideoPlaceholderProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);
  const reduced = useReducedMotion();
  const hasVideo = Boolean(videoSrc);

  const nudge = (on: boolean) => {
    setHover(on);
    const video = videoRef.current;
    if (!video || !hasVideo || reduced) return;
    if (on) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else if (!interactive) {
      video.pause();
      setPlaying(false);
    }
  };

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => undefined);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface",
        interactive && "border border-line",
        className
      )}
      style={{ aspectRatio: ratio ?? project.aspectRatio }}
      onPointerEnter={() => nudge(true)}
      onPointerLeave={() => nudge(false)}
    >
      {hasVideo ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={project.thumbnail}
          muted={!interactive}
          loop
          playsInline
          preload="none"
          className="media-fill"
          aria-label={`${project.title} — preview loop`}
        />
      ) : (
        <SmartImage
          src={project.thumbnail}
          alt={`${project.title} — ${project.category}`}
          eager={eager}
          ratio={ratio ?? project.aspectRatio}
          className="h-full w-full"
          imgClassName={cn(
            "scale-[1.01] transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            !reduced && "group-hover/card:scale-[1.07]"
          )}
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/card:opacity-100"
        style={{ background: "linear-gradient(to top, rgba(8,8,8,0.86), rgba(8,8,8,0.1) 60%, transparent)" }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 scan opacity-25" />

      {!interactive ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/35 text-ink backdrop-blur-[2px] transition-[transform,opacity,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-110 group-hover/card:border-accent group-hover/card:bg-accent/25 group-focus-visible/card:scale-110"
        >
          <Play size={15} fill="currentColor" strokeWidth={0} />
        </span>
      ) : null}

      <span className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2">
        <span className="label rounded-full bg-black/55 px-2 py-1 text-[0.55rem] text-ink-2 tabular-nums backdrop-blur-sm">
          {project.duration}
        </span>
        {hover && !reduced ? (
          <span className="label rounded-full bg-black/55 px-2 py-1 text-[0.55rem] text-accent backdrop-blur-sm">
            {hasVideo && playing ? "LOOPING" : "POSTER FRAME"}
          </span>
        ) : null}
      </span>

      {interactive && hasVideo ? (
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 bottom-3 flex items-center gap-2 rounded-full border border-line bg-black/55 px-3 py-1.5 backdrop-blur transition-colors hover:border-accent"
          aria-label={playing ? "Pause preview" : "Play preview"}
          aria-pressed={playing}
        >
          {playing ? <Pause size={12} /> : <Play size={12} />}
          <span className="label text-[0.58rem]">{playing ? "PAUSE" : "PLAY"}</span>
        </button>
      ) : null}
    </div>
  );
}
