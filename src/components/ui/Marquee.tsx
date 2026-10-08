import { cn } from "@/utils/cn";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Infinite capability strip. The second track is decorative only. */
export function Marquee({ items, className }: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden py-4 edge-fade-x", className)}>
      <div className="marquee-track flex w-max items-center gap-10 will-change-transform">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10"
            aria-hidden={i >= items.length ? "true" : undefined}
          >
            <span className="label text-[0.7rem] text-ink-2 whitespace-nowrap">{item}</span>
            <span aria-hidden="true" className="size-1 rounded-full bg-accent/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
