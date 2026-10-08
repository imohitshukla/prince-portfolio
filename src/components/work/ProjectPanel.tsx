import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryLabel } from "@/components/work/CategoryLabel";
import { VideoPlaceholder } from "@/components/work/VideoPlaceholder";
import { Drawer } from "@/components/ui/Drawer";
import { useTilt } from "@/hooks/useTilt";
import { projectCount, projects, type Project, type ProjectType } from "@/data/projects";
import { useUI } from "@/context/UIContext";
import { cn } from "@/utils/cn";

type Filter = "all" | ProjectType;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "short", label: "SHORT-FORM" },
  { id: "long", label: "LONG-FORM" },
];

/** Wide, image-led index panel — the primary navigation device of the site. */
export function ProjectPanel() {
  const { panel, closePanel, openProject, projectId } = useUI();
  const [filter, setFilter] = useState<Filter>("all");
  const open = panel === "work";

  useEffect(() => {
    if (!open) setFilter("all");
  }, [open]);

  const list = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.type === filter)),
    [filter]
  );

  return (
    <Drawer
      open={open}
      onClose={closePanel}
      disableEscape={Boolean(projectId)}
      side="right"
      label="Selected work panel"
      eyebrow="PROJECT INDEX"
      title="SELECTED WORK"
      meta={
        <>
          <span className="label text-accent tabular-nums">
            {String(list.length).padStart(2, "0")} / {String(projectCount).padStart(2, "0")} SHOWN
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-line" />
          <span className="text-xs text-ink-3">Reels · YouTube · Podcast · Brand · Documentary</span>
        </>
      }
    >
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter projects">
          {FILTERS.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-display text-[0.62rem] tracking-[0.18em] uppercase transition-all duration-300",
                  active
                    ? "border-accent/70 bg-accent/18 text-ink"
                    : "border-line text-ink-3 hover:border-white/25 hover:text-ink"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <Link
          to="/work"
          onClick={closePanel}
          className="label group hidden items-center gap-1.5 text-ink-2 transition-colors hover:text-ink sm:inline-flex"
        >
          FULL PAGE
          <ArrowUpRight size={12} className="transition-transform duration-500 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <ul className="mt-4 space-y-3 lg:mt-6 lg:space-y-4">
        {list.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            active={projectId === project.id}
            onSelect={() => openProject(project.id)}
          />
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[42ch] text-xs leading-relaxed text-ink-3">
          Select any row to open the case study with tools, role and the full video link.
        </p>
        <Link to="/contact" onClick={closePanel} className="btn btn-ghost self-start sm:self-auto">
          START A PROJECT
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </Drawer>
  );
}

interface RowProps {
  project: Project;
  index: number;
  active: boolean;
  onSelect: () => void;
}

function ProjectRow({ project, index, active, onSelect }: RowProps) {
  const { ref, bind } = useTilt<HTMLButtonElement>({ max: 2.5, scale: 1.012, overlayZ: 14 });

  return (
    <li>
      <button
        ref={ref}
        type="button"
        onClick={onSelect}
        data-cursor="OPEN"
        {...bind}
        className={cn(
          "tilt group/card relative flex w-full items-stretch gap-4 overflow-hidden rounded-2xl border p-3 text-left transition-[background-color,border-color] duration-500 sm:gap-6 sm:p-4",
          active
            ? "border-accent/60 bg-accent/10"
            : "border-line-soft bg-white/[0.015] hover:border-line hover:bg-elevated",
          "focus-visible:border-accent focus-visible:[--tilt-scale:1.008]"
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        <span className="tilt-z flex w-8 shrink-0 items-start pt-1 font-display text-[0.72rem] tracking-[0.2em] text-ink-3 tabular-nums sm:w-10 sm:text-[0.8rem]">
          {project.number}
        </span>

        <span className="tilt-z flex min-w-0 flex-1 flex-col justify-between gap-3 py-1">
          <span className="block">
            <span className="block font-display text-[clamp(1.15rem,2.4vw,1.85rem)] leading-tight text-ink">
              {project.title}
            </span>
            <span className="label mt-1.5 block text-[0.58rem] text-ink-3">
              {project.category} · {project.duration} · {project.year}
            </span>
          </span>
          <span className="flex flex-wrap items-center gap-2">
            <CategoryLabel label={project.type === "short" ? "9:16" : "16:9"} accent={project.accentColor} />
            {project.tools.slice(0, index % 2 === 0 ? 2 : 3).map((tool) => (
              <span key={tool} className="label text-[0.56rem] text-ink-3">
                {tool}
              </span>
            ))}
          </span>
        </span>

        <span className="tilt-z relative hidden w-[168px] shrink-0 overflow-hidden rounded-xl sm:block lg:w-[240px] xl:w-[290px]">
          <VideoPlaceholder project={project} ratio="16 / 10" />
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center bg-black/45 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 group-focus-visible/card:opacity-100"
          >
            <span className="flex items-center gap-2 rounded-full border border-white/40 bg-black/45 px-3 py-1.5">
              <Play size={10} fill="currentColor" strokeWidth={0} />
              <span className="label text-[0.58rem]">PREVIEW</span>
            </span>
          </span>
        </span>
      </button>
    </li>
  );
}

/** Left arrow used by the detail overlay — exported here to avoid a dup. */
export function DetailBackButton({ onClick, label = "BACK" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 transition-colors duration-300 hover:border-accent/70 hover:bg-accent/10"
    >
      <ArrowLeft size={13} className="transition-transform duration-500 group-hover:-translate-x-0.5" />
      <span className="label text-[0.6rem]">{label}</span>
    </button>
  );
}
