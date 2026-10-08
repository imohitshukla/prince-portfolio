import { ArrowUpRight, Play } from "lucide-react";
import { CategoryLabel } from "@/components/work/CategoryLabel";
import { VideoPlaceholder } from "@/components/work/VideoPlaceholder";
import { useTilt } from "@/hooks/useTilt";
import type { Project } from "@/data/projects";
import { useUI } from "@/context/UIContext";
import { cn } from "@/utils/cn";

interface ProjectCardProps {
  project: Project;
  variant?: "short" | "long";
  eager?: boolean;
  className?: string;
}

/**
 * Interactive project surface. The <button> is itself the tilt host so that
 * keyboard focus drives exactly the same transform as pointer hover
 * (focus-visible sets the same --tilt-* custom properties).
 */
export function ProjectCard({ project, variant = "short", eager, className }: ProjectCardProps) {
  const { openProject } = useUI();
  const { ref, bind } = useTilt<HTMLButtonElement>({
    max: 5,
    scale: 1.025,
    perspective: 1100,
    overlayZ: 30,
  });

  const isLong = variant === "long";

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => openProject(project.id)}
      data-cursor="VIEW"
      aria-label={`Open project ${project.number}: ${project.title}`}
      {...bind}
      className={cn(
        "tilt group/card relative flex w-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface text-left",
        "transition-[box-shadow,border-color,background-color] duration-500",
        "hover:border-white/20 hover:bg-elevated hover:shadow-[0_40px_90px_-50px_rgba(124,92,255,0.55)]",
        "focus-visible:border-accent focus-visible:shadow-[0_40px_90px_-50px_rgba(124,92,255,0.7)]",
        "focus-visible:[--tilt-scale:1.02] focus-visible:[--tilt-z:18px]",
        isLong && "lg:flex-row lg:items-stretch",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={cn("relative w-full", isLong ? "lg:w-[62%] lg:shrink-0" : "")}>
        <VideoPlaceholder project={project} eager={eager} videoSrc={project.localVideo} />
        {isLong ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent lg:block"
          />
        ) : null}
      </div>

      <div
        className={cn(
          "tilt-z flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6",
          isLong && "lg:p-8"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span
              className="font-display text-[0.72rem] tracking-[0.24em] text-ink-3 tabular-nums transition-colors duration-300 group-hover/card:text-accent"
              aria-hidden="true"
            >
              {project.number}
            </span>
            <h3
              className={cn(
                "mt-2 font-display text-ink",
                isLong
                  ? "text-[clamp(1.5rem,3.1vw,2.5rem)] leading-[1.02]"
                  : "text-[clamp(1.2rem,2.1vw,1.6rem)] leading-tight"
              )}
            >
              {project.title}
            </h3>
          </div>
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition-all duration-500 group-hover/card:border-accent group-hover/card:bg-accent/15 group-hover/card:text-ink group-focus-visible/card:border-accent"
          >
            <ArrowUpRight size={15} />
          </span>
        </div>

        <div className="space-y-4">
          <p className={cn("text-sm leading-relaxed text-ink-2", isLong ? "max-w-[52ch]" : "line-clamp-3")}>
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <CategoryLabel label={project.type === "short" ? "SHORT-FORM" : "LONG-FORM"} accent={project.accentColor} />
            <span className="label text-[0.58rem]">{project.year}</span>
            {!isLong ? (
              <span className="label flex items-center gap-1.5 text-[0.58rem] text-ink-3">
                <Play size={9} fill="currentColor" strokeWidth={0} />
                {project.duration}
              </span>
            ) : null}
          </div>

          {isLong ? (
            <span className="label inline-flex items-center gap-2 pt-1 text-ink">
              VIEW PROJECT
              <span className="relative block h-px w-10 overflow-hidden bg-white/20">
                <span className="absolute inset-y-0 left-0 w-0 bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:w-full" />
              </span>
              <ArrowUpRight size={12} className="transition-transform duration-500 group-hover/card:translate-x-0.5" />
            </span>
          ) : (
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] text-ink-3">
              {project.tools.slice(0, 3).map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </button>
  );
}
