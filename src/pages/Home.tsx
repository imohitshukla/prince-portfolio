import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/hero/HeroSection";
import { WorkSection } from "@/components/work/WorkSection";
import { PageTransition } from "@/components/layout/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities, workflow } from "@/data/content";
import { siteConfig } from "@/data/siteConfig";
import { useUI } from "@/context/UIContext";

export default function Home() {
  const { openPanel } = useUI();

  return (
    <PageTransition>
      <HeroSection />

      <div aria-hidden="true" className="border-y border-line-soft bg-bg-2/60">
        <Marquee items={[...capabilities]} />
      </div>

      <WorkSection />

      {/* ---------- process ---------- */}
      <section aria-labelledby="process-heading" className="border-t border-line-soft py-20 sm:py-28 lg:py-32">
        <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Reveal>
                <SectionHeading index="02" label="HOW AN EDIT GETS MADE" />
                <h2 id="process-heading" className="mt-6 text-[clamp(1.8rem,4.6vw,3.2rem)] leading-[0.98] text-ink">
                  Structure first.
                  <br />
                  <span className="text-ink-3">Effects last.</span>
                </h2>
                <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-ink-2">
                  The four steps I run on every project, whether it’s 18 seconds of product or 24 minutes of
                  documentary. Same discipline, different canvas.
                </p>
                <Link to="/about" className="btn btn-ghost mt-7">
                  MORE ABOUT ME
                  <ArrowUpRight size={13} />
                </Link>
              </Reveal>
            </div>

            <ol className="space-y-2">
              {workflow.map((item, index) => (
                <Reveal key={item.step} y={24} delay={index * 0.05}>
                  <li className="group relative grid grid-cols-[auto_1fr] items-start gap-5 border-t border-line py-6 transition-colors duration-500 hover:border-accent/60 sm:gap-8 sm:py-8">
                    <span className="font-display text-[0.72rem] tracking-[0.24em] text-ink-3 tabular-nums transition-colors duration-300 group-hover:text-accent">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-display text-[clamp(1.3rem,3.2vw,2.15rem)] leading-none text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ink-2">{item.body}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- closing band ---------- */}
      <section className="relative overflow-hidden border-t border-line py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(70% 100% at 50% 120%, rgba(124,92,255,0.16), transparent 65%)" }}
        />
        <div className="relative mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="label mb-4 flex items-center gap-2">
                  <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" />
                  {siteConfig.availability.status.toUpperCase()}
                </p>
                <p className="max-w-[24ch] font-display text-[clamp(1.7rem,5vw,3.4rem)] leading-[1.02] tracking-[-0.03em] text-ink">
                  Send the footage. I’ll find the story inside it.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button type="button" className="btn btn-primary" onClick={() => openPanel("contact")} data-cursor="BRIEF">
                  LET’S WORK TOGETHER
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => openPanel("work")}>
                  BROWSE THE INDEX
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
