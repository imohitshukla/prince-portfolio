import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { VideoPlaceholder } from "@/components/work/VideoPlaceholder";
import { getProjectById, projects } from "@/data/projects";
import { useUI } from "@/context/UIContext";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

/**
 * Deep-linkable case study overlay (`?project=id`). Sits above the index panel,
 * owns the Escape key while open, traps focus and restores it on close.
 */
export function ProjectDetail() {
  const { projectId, closeProject, openProject, openPanel } = useUI();
  const project = getProjectById(projectId);
  const reduced = useReducedMotion();
  const open = Boolean(project);

  const close = useCallback(() => closeProject(), [closeProject]);
  const dialogRef = useFocusTrap<HTMLDivElement>(open, close);
  useLockBodyScroll(open);

  const index = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const next = index >= 0 ? projects[(index + 1) % projects.length] : undefined;
  const prev = index >= 0 ? projects[(index - 1 + projects.length) % projects.length] : undefined;

  return (
    <AnimatePresence>
      {project ? (
        <div className="fixed inset-0 z-[100] flex items-stretch justify-center p-0 sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-black/82 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.001 : 0.3 }}
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            tabIndex={-1}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 42, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.99 }}
            transition={reduced ? { duration: 0.001 } : { type: "spring", stiffness: 240, damping: 30, mass: 0.9 }}
            className="relative z-10 flex w-full max-w-[1180px] flex-col overflow-hidden border border-line bg-bg-2 sm:rounded-[26px]"
            data-scroll-native
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(80% 50% at 88% -6%, ${project.accentColor}22, transparent 62%)`,
              }}
            />

            <header className="relative z-10 flex items-center justify-between gap-4 border-b border-line px-4 py-3.5 sm:px-7">
              <button
                type="button"
                onClick={close}
                className="group inline-flex items-center gap-2 text-ink-2 transition-colors hover:text-ink"
              >
                <ArrowLeft size={15} className="transition-transform duration-500 group-hover:-translate-x-1" />
                <span className="label text-[0.6rem]">BACK</span>
              </button>
              <p className="label hidden text-[0.6rem] sm:block">
                CASE STUDY <span className="text-ink-3">/</span>{" "}
                <span className="tabular-nums text-accent">{project.number}</span> OF{" "}
                <span className="tabular-nums">{String(projects.length).padStart(2, "0")}</span>
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close project detail"
                className="grid size-9 place-items-center rounded-full border border-line text-ink-2 transition-all duration-300 hover:rotate-90 hover:border-accent/60 hover:text-ink"
              >
                <X size={15} />
              </button>
            </header>

            <div className="relative z-10 grid min-h-0 flex-1 gap-6 overflow-y-auto px-4 py-5 sm:px-7 sm:py-7 lg:grid-cols-[1.08fr_0.92fr] lg:gap-9" data-scroll-native>
              <div className="group/card">
                <VideoPlaceholder
                  project={project}
                  eager
                  interactive
                  videoSrc={project.localVideo}
                  className="rounded-2xl"
                />
                <p className="label mt-3 flex flex-wrap items-center gap-2 text-[0.56rem] text-ink-3">
                  <span>
                    {isLocalPosterLabel(project.videoUrl)}
                  </span>
                </p>
              </div>

              <div className="flex min-w-0 flex-col">
                <p className="label mb-3 flex items-center gap-2">
                  <span className="size-1.5 rounded-full" style={{ background: project.accentColor }} />
                  {project.category}
                </p>
                <h2
                  id="project-detail-title"
                  className="text-[clamp(1.75rem,4vw,2.9rem)] leading-[1.0] text-ink"
                >
                  {project.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-2">{project.description}</p>

                <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-line pt-5 text-xs">
                  <div>
                    <dt className="label text-[0.55rem]">ROLE</dt>
                    <dd className="mt-1.5 text-ink">{project.role}</dd>
                  </div>
                  <div>
                    <dt className="label text-[0.55rem]">TYPE</dt>
                    <dd className="mt-1.5 text-ink">
                      {project.type === "short" ? "Short-form" : "Long-form"} · {project.aspectRatio.replace(/\s/g, "")}
                    </dd>
                  </div>
                  <div>
                    <dt className="label text-[0.55rem]">TOOLS</dt>
                    <dd className="mt-1.5 flex flex-wrap gap-1.5">
                      {project.tools.map((tool) => (
                        <span key={tool} className="rounded-full border border-line px-2 py-0.5 text-[0.68rem] text-ink-2">
                          {tool}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="label text-[0.55rem]">DELIVERED</dt>
                    <dd className="mt-1.5 text-ink tabular-nums">
                      {project.year} · {project.duration}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="label text-[0.55rem]">DELIVERABLES</dt>
                    <dd className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-ink-2">
                      {project.deliverables.map((item) => (
                        <span key={item} className="flex items-center gap-1.5">
                          <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-primary"
                    data-cursor="WATCH"
                  >
                    WATCH FULL VIDEO
                    <ArrowUpRight size={13} />
                  </a>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      close();
                      openPanel("contact");
                    }}
                  >
                    BRIEF ME LIKE THIS
                  </button>
                </div>

                {project.videoUrl.includes("REPLACE_WITH_REAL_VIDEO_ID") ? (
                  <p className="mt-3 text-[0.68rem] leading-relaxed text-ink-3">
                    Placeholder link — paste the real YouTube / Vimeo / Drive URL for “{project.title}”.
                  </p>
                ) : null}
              </div>
            </div>

            <footer className="relative z-10 flex items-center justify-between gap-4 border-t border-line px-4 py-3.5 sm:px-7">
              <button
                type="button"
                onClick={() => prev && openProject(prev.id)}
                className="group flex items-center gap-3 text-left"
                data-cursor="PREV"
              >
                <ArrowLeft size={14} className="text-ink-3 transition-transform duration-500 group-hover:-translate-x-1" />
                <span className="hidden sm:block">
                  <span className="label block text-[0.52rem]">PREVIOUS</span>
                  <span className="block text-xs text-ink-2 group-hover:text-ink">{prev?.title}</span>
                </span>
              </button>

              <Link to="/work" onClick={close} className={cn("label hidden text-[0.58rem] text-ink-3 transition-colors hover:text-ink md:block")}>
                ALL PROJECTS
              </Link>

              <button
                type="button"
                onClick={() => next && openProject(next.id)}
                className="group flex items-center gap-3 text-right"
                data-cursor="NEXT"
              >
                <span className="hidden sm:block">
                  <span className="label block text-[0.52rem]">NEXT</span>
                  <span className="block text-xs text-ink-2 group-hover:text-ink">{next?.title}</span>
                </span>
                <ArrowRight size={14} className="text-ink-3 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </footer>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function isLocalPosterLabel(videoUrl: string) {
  return videoUrl.startsWith("http") ? "POSTER FRAME · LINKED VIDEO" : "POSTER FRAME";
}
