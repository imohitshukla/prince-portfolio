import { motion } from "framer-motion";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import portrait from "@/assets/about/portrait.jpg";
import { siteConfig } from "@/data/siteConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTilt } from "@/hooks/useTilt";

/** Editorial opener: statement left, tilted portrait right. */
export function AboutIntro() {
  const reduced = useReducedMotion();
  const { ref, bind } = useTilt<HTMLDivElement>({ max: 3, scale: 1.015, overlayZ: 10, perspective: 1200 });

  return (
    <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      <div>
        <Reveal>
          <p className="label mb-6 flex items-center gap-3 text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent/70" />
            ABOUT / {siteConfig.age} YRS OLD
          </p>
        </Reveal>

        <Reveal y={26}>
          <h1 className="font-display text-[clamp(2.6rem,10vw,7rem)] leading-[0.86] tracking-[-0.045em] text-ink">
            BEHIND
            <br />
            THE <span className="text-ink-3">EDITS.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1} y={20}>
          <div className="mt-8 max-w-[54ch] space-y-5 text-[0.98rem] leading-relaxed text-ink-2 sm:text-[1.05rem]">
            <p>
              I’m Prince, a {siteConfig.age}-year-old video editor passionate about storytelling, content
              and visual communication.
            </p>
            <p className="text-ink-3">
              I believe good editing is more than adding effects. It’s about understanding the story, keeping
              attention and making every second of a video count.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.08} y={30}>
        <ParallaxLayer y={reduced ? 0 : 18} scroll={reduced ? 0 : -30}>
          <div ref={ref} {...bind} className="tilt relative">
            <div className="relative overflow-hidden rounded-[22px] border border-line bg-surface">
              <SmartImage
                src={portrait}
                alt="Prince sitting in a dark edit suite, face lit by monitor glow"
                eager
                ratio="4 / 5"
                className="w-full"
                imgClassName="object-[50%_22%]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(8,8,8,0.8), transparent 55%)" }}
              />
              <div className="tilt-z absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                <p className="font-display text-[0.95rem] leading-tight text-ink">
                  {siteConfig.fullName}
                  <span className="label block text-[0.55rem] text-ink-2">{siteConfig.role}</span>
                </p>
                <motion.span
                  aria-hidden="true"
                  animate={reduced ? undefined : { opacity: [1, 0.25, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-1 size-1.5 rounded-full bg-warm"
                />
              </div>
            </div>
          </div>
        </ParallaxLayer>
      </Reveal>

    </div>
  );
}
