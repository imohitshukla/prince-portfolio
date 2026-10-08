import { useState } from "react";
import { cn } from "@/utils/cn";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** CSS aspect-ratio, e.g. "9 / 16" */
  ratio?: string;
  eager?: boolean;
  sizes?: string;
  /** Shows a film-strip texture instead of a broken image icon. */
  fallbackLabel?: string;
}

/**
 * Image frame with intentional object-fit, lazy decoding and a designed
 * fallback: if an asset is missing we render a labelled placeholder surface
 * rather than a broken image icon.
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  ratio,
  eager = false,
  sizes,
  fallbackLabel = "MEDIA PLACEHOLDER — DROP FILE IN src/assets",
}: SmartImageProps) {
  const [status, setStatus] = useState<"idle" | "loaded" | "error">(src ? "idle" : "error");

  return (
    <div
      className={cn("relative overflow-hidden bg-surface", className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {status === "error" || !src ? (
        <div className="media-fallback absolute inset-0 flex items-end justify-between gap-4 p-4">
          <span className="label max-w-[26ch] leading-relaxed">{fallbackLabel}</span>
          <span className="label text-ink-3/70">NO FILE</span>
        </div>
      ) : (
        <>
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 bg-elevated transition-opacity duration-700",
              status === "loaded" ? "opacity-0" : "opacity-100 animate-pulse"
            )}
          />
          <img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            sizes={sizes}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
            className={cn(
              "media-fill transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              status === "loaded" ? "opacity-100" : "opacity-0",
              imgClassName
            )}
            draggable={false}
          />
        </>
      )}
    </div>
  );
}
