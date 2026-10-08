import { ArrowRight, LayoutList } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { longFormProjects, projectCount, shortFormProjects } from "@/data/projects";
import { useUI } from "@/context/UIContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Work() {
  const { openPanel } = useUI();
  const reduced = useReducedMotion();

  return (
    <PageTransition>
      <div className="relative overflow-hidden pt-28 pb-12 sm:pt-36 lg:pt-44 lg:pb-16">
        <ParallaxLayer
          scroll={reduced ? 0 : 60}
          className="pointer-events-none absolute inset-x-0 -top-10 -z-10 h-[520px] opacity-70 blur-[130px]"
          style={{ background: "radial-gradient(50% 60% at 70% 20%, rgba(124,92,255,0.22), transparent 70%)" }}
        />
        <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="label mb-6 flex items-center gap-3 text-accent">
              <span aria-hidden="true" className="h-px w-10 bg-accent/70" />
              WORK / {String(projectCount).padStart(2, "0")} PROJECTS
            </p>
          </Reveal>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <Reveal y={28}>
              <h1 className="font-display text-[clamp(2.6rem,10vw,7.2rem)] leading-[0.86] tracking-[-0.045em] text-ink">
                SELECTED
                <br />
                <span className="text-ink-3">WORK.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1} className="w-full min-w-0 max-w-full lg:max-w-[420px] lg:pb-4">
              <p className="text-sm leading-relaxed text-ink-2">
                Short-form built for the feed, long-form built for patience. Every piece below lists the role,
                the toolchain and the finished video.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button type="button" className="btn btn-primary" onClick={() => openPanel("work")} data-cursor="INDEX">
                  <LayoutList size={13} />
                  SLIDING INDEX
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => document.getElementById("short-form-heading")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })}
                >
                  JUMP TO SHORT-FORM
                  <ArrowRight size={13} />
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line-soft sm:grid-cols-4">
              {[
                { k: "SHORT-FORM", v: String(shortFormProjects.length).padStart(2, "0") },
                { k: "LONG-FORM", v: String(longFormProjects.length).padStart(2, "0") },
                { k: "RATIOS", v: "9:16 / 16:9" },
                { k: "YEARS", v: "2025 — 2026" },
              ].map((item) => (
                <div key={item.k} className="bg-bg px-4 py-4 sm:px-6 sm:py-5">
                  <dt className="label text-[0.52rem]">{item.k}</dt>
                  <dd className="mt-1.5 font-display text-[0.95rem] text-ink tabular-nums">{item.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1680px] px-4 pb-24 sm:px-6 lg:px-10 lg:pb-32">
        <ProjectGrid />
      </div>
    </PageTransition>
  );
}
