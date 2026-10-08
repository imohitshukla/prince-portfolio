import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/hero/MagneticButton";
import { HeroMedia } from "@/components/hero/HeroMedia";
import { HeroText } from "@/components/hero/HeroText";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { TiltWrapper } from "@/components/motion/TiltWrapper";
import { siteConfig } from "@/data/siteConfig";
import { longFormProjects, projectCount, shortFormProjects } from "@/data/projects";
import { useUI } from "@/context/UIContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Full-bleed cinematic hero.
 * Depth stack (slowest → fastest):
 *   media layer (scroll parallax) → side rail → headline (pointer parallax)
 *   → labels / CTAs (faster pointer parallax)
 * Whole text block carries a max ±3° pointer tilt; everything collapses to a
 * static composition on touch and reduced motion.
 */
export function HeroSection() {
  const { openPanel } = useUI();
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-bg"
    >
      {/* Oversized by 14% vertically so the parallax translate can never expose
          an edge of the media while the hero scrolls out of view. */}
      <ParallaxLayer scroll={reduced ? 0 : 70} className="absolute inset-x-0 -inset-y-[14%] -z-10">
        <HeroMedia />
      </ParallaxLayer>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1680px] flex-col px-4 pt-20 pb-10 sm:px-6 sm:pt-24 lg:px-10 lg:pt-28 lg:pb-14">
        {/* top HUD strip */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduced ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-4 border-b border-line-soft pb-3"
        >
          <p className="label text-[0.58rem] sm:text-[0.65rem]">
            PORTFOLIO <span className="text-ink-3">/</span> {siteConfig.copyrightYear}{" "}
            <span className="hidden text-ink-3 sm:inline">/ {siteConfig.location}</span>
          </p>
          <p className="label hidden text-[0.65rem] md:block tabular-nums">
            {String(projectCount).padStart(2, "0")} PROJECTS · {String(shortFormProjects.length).padStart(2, "0")}{" "}
            SHORT · {String(longFormProjects.length).padStart(2, "0")} LONG
          </p>
          <p className="label flex items-center gap-2 text-[0.58rem] sm:text-[0.65rem]">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" />
            AVAILABLE
          </p>
        </motion.div>

        <div className="flex flex-1 flex-col justify-end gap-8 pt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:pt-16">
          {/* min-w-0 lets this flex item shrink below its content width instead
              of forcing the row wider than the viewport (mobile overflow). */}
          <div className="relative w-full min-w-0">
            {/* EDIT • STORY • CREATE rail — sits above the headline so the
                composition stays asymmetric without clipping off-canvas */}
            <div className="mb-5 flex items-center gap-3 sm:mb-7 sm:gap-4">
              {siteConfig.hero.mantra.map((word, i) => (
                <span key={word} className="flex items-center gap-3 sm:gap-4">
                  <motion.span
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: reduced ? 0 : 0.5 + i * 0.12 }}
                    className={i === 1 ? "label text-accent" : "label"}
                  >
                    {word}
                  </motion.span>
                  {i < siteConfig.hero.mantra.length - 1 ? (
                    <span aria-hidden="true" className="size-1 rotate-45 bg-line" />
                  ) : null}
                </span>
              ))}
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </div>

            <ParallaxLayer x={reduced ? 0 : 16} y={reduced ? 0 : 12} scroll={reduced ? 0 : -34}>
              <TiltWrapper
                max={3}
                scale={1.004}
                overlayZ={0}
                perspective={1000}
                glare={false}
                className="lg:[transform-style:preserve-3d]"
              >
                <div className="tilt-z">
                  <HeroText />
                </div>

                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: reduced ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 lg:mt-10"
                >
                  <MagneticButton to="/work" cursor="VIEW" strength={9}>
                    VIEW MY WORK
                    <ArrowRight size={13} />
                  </MagneticButton>
                  <MagneticButton variant="ghost" onClick={() => openPanel("contact")} cursor="WRITE" strength={9}>
                    LET’S WORK TOGETHER
                  </MagneticButton>
                </motion.div>
              </TiltWrapper>
            </ParallaxLayer>
          </div>

          <ParallaxLayer x={reduced ? 0 : 26} y={reduced ? 0 : 16} scroll={reduced ? 0 : -12} className="w-full min-w-0 max-w-full lg:max-w-[340px] lg:pb-3">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: reduced ? 0 : 0.78, ease: [0.16, 1, 0.3, 1] }}
              className="border-l border-line pl-4 lg:pl-5"
            >
              <p className="text-[0.95rem] leading-relaxed text-ink-2">
                I cut for the first three seconds and the last one — reels, YouTube,
                podcasts and brand films with pacing that holds attention.
              </p>
              <button
                type="button"
                onClick={() => openPanel("work")}
                className="group mt-4 inline-flex items-center gap-2 font-display text-[0.68rem] tracking-[0.2em] text-ink uppercase"
                data-cursor="OPEN"
              >
                OPEN PROJECT INDEX
                <ArrowRight size={13} className="transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </ParallaxLayer>
        </div>

        {/* bottom strip: scroll cue + fake timeline scrubber */}
        <div className="mt-10 flex items-center gap-5 border-t border-line-soft pt-4">
          <span className="label flex items-center gap-2 whitespace-nowrap">
            {siteConfig.hero.scrollCue}
            <motion.span
              aria-hidden="true"
              animate={reduced ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowDown size={12} />
            </motion.span>
          </span>

          <div aria-hidden="true" className="relative h-px flex-1 overflow-hidden bg-white/10">
            <span className="absolute inset-y-[-1px] left-0 w-1/4 animate-scrub bg-accent" />
          </div>

          <span aria-hidden="true" className="label hidden text-[0.58rem] tabular-nums sm:block">
            TC 00:00:00:00
          </span>
        </div>
      </div>
    </section>
  );
}
