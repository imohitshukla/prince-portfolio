import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { CategoryLabel } from "@/components/work/CategoryLabel";
import { VideoPlaceholder } from "@/components/work/VideoPlaceholder";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { useUI } from "@/context/UIContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Home-page work band — a horizontal, image-led panel strip (the composition
 * borrowed from the reference screenshot: wide dark panels, huge negative
 * space, minimal white type). Clicking a panel opens the project detail.
 */
export function WorkSection() {
  const { openProject, openPanel } = useUI();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const nudge = (direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    const amount = Math.min(node.clientWidth * 0.82, 720);
    node.scrollBy({ left: direction * amount, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section
      id="work"
      aria-labelledby="home-work-heading"
      className="relative isolate border-t border-line-soft bg-bg py-20 sm:py-28 lg:py-36"
    >
      <ParallaxLayer
        scroll={reduced ? 0 : -140}
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-[420px] max-w-[900px] rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(124,92,255,0.16), transparent 70%)" }}
      />

      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            index="01"
            label="SELECTED WORK / 2025 — 2026"
            title={<span id="home-work-heading">The timeline, panel by panel.</span>}
            description="Five short-form pieces. Drag the strip, or open the full index panel for tools, role and the original video."
            action={
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => nudge(-1)}
                  aria-label="Scroll work strip left"
                  className="grid size-9 place-items-center rounded-full border border-line text-ink-2 transition-colors duration-300 hover:border-accent/70 hover:text-ink"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => nudge(1)}
                  aria-label="Scroll work strip right"
                  className="grid size-9 place-items-center rounded-full border border-line text-ink-2 transition-colors duration-300 hover:border-accent/70 hover:text-ink"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            }
          />
        </Reveal>

        <div
          ref={trackRef}
          data-scroll-x
          className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:gap-6 sm:px-6 lg:-mx-10 lg:px-10"
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group/card relative flex w-[86vw] shrink-0 snap-start flex-col justify-between gap-6 overflow-hidden rounded-[22px] border border-line bg-bg-2 p-4 transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] last:pr-0 hover:border-white/22 hover:bg-elevated sm:w-[62vw] lg:w-[46vw] xl:w-[900px] sm:p-5 lg:flex-row lg:items-stretch lg:gap-8 lg:p-7"
            >
              <div className="order-2 flex flex-1 flex-col justify-between gap-5 lg:order-1 lg:max-w-[42%]">
                <div>
                  <p className="flex items-center gap-3">
                    <span className="font-display text-[0.72rem] tracking-[0.24em] text-accent tabular-nums">
                      {project.number}
                    </span>
                    <span aria-hidden="true" className="h-px w-8 bg-line" />
                    <span className="label text-[0.56rem]">{project.type === "short" ? "SHORT" : "LONG"}</span>
                  </p>
                  <h3 className="mt-3 text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.03] text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <CategoryLabel
                    label={project.aspectRatio.replace(/\s/g, "")}
                    accent={project.accentColor}
                  />
                  <span className="label text-[0.56rem] tabular-nums">{project.duration}</span>
                  <span className="label text-[0.56rem]">{project.year}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openProject(project.id)}
                data-cursor="VIEW"
                aria-label={`Open project ${project.number}: ${project.title}`}
                className="relative order-1 block w-full overflow-hidden rounded-xl lg:order-2 lg:w-[58%]"
              >
                <VideoPlaceholder
                  project={project}
                  eager={index < 2}
                  ratio="16 / 10"
                  videoSrc={project.localVideo}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-between rounded-lg border border-white/15 bg-black/55 px-3 py-2 opacity-0 backdrop-blur transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100"
                >
                  <span className="label text-[0.58rem] text-ink">CASE STUDY</span>
                  <ArrowRight size={13} className="text-accent" />
                </span>
              </button>
            </article>
          ))}
        </div>

        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="text-sm text-ink-3">
              Need the full breakdown, raw numbers and every cut?
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="btn btn-primary" onClick={() => openPanel("work")} data-cursor="INDEX">
                OPEN PROJECT INDEX
                <ArrowRight size={13} />
              </button>
              <Link to="/work" className="btn btn-ghost">
                VIEW WORK PAGE
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
