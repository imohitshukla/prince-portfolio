import { Clapperboard, Eye, Scissors } from "lucide-react";
import { TiltWrapper } from "@/components/motion/TiltWrapper";
import { cn } from "@/utils/cn";

const ICONS = { clapperboard: Clapperboard, scissors: Scissors, eye: Eye } as const;

interface SkillCardProps {
  number: string;
  title: string;
  body: string;
  details: readonly string[];
  icon: string;
  className?: string;
}

/** About card: max ±3° tilt, translateZ capped at 10px, shadow only. */
export function SkillCard({ number, title, body, details, icon, className }: SkillCardProps) {
  const Icon = ICONS[icon as keyof typeof ICONS] ?? Eye;

  return (
    <TiltWrapper
      max={2.6}
      scale={1.014}
      overlayZ={10}
      perspective={1200}
      className={cn(
        "h-full rounded-[20px] border border-line bg-bg-2 p-6 transition-[border-color,box-shadow] duration-500",
        "hover:border-white/20 hover:shadow-[0_36px_70px_-46px_rgba(124,92,255,0.65)] sm:p-7",
        "focus-within:border-accent/60",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="tilt-z flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="font-display text-[0.72rem] tracking-[0.24em] text-accent tabular-nums">{number}</span>
          <span className="grid size-9 place-items-center rounded-full border border-line text-ink-2">
            <Icon size={15} strokeWidth={1.4} />
          </span>
        </div>

        <h3 className="mt-8 font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-none text-ink">{title}</h3>
        <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-ink-2">{body}</p>

        <ul className="mt-6 space-y-2 border-t border-line-soft pt-5">
          {details.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-ink-3">
              <span aria-hidden="true" className="mt-[7px] size-1 shrink-0 rounded-full bg-accent/80" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </TiltWrapper>
  );
}
