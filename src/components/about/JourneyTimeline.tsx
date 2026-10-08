import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journey } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Learning → Creating → Editing → Improving, with a scroll-driven progress line. */
export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 78%", "end 62%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });
  const filled = reduced ? 1 : undefined;

  return (
    <section aria-labelledby="journey-heading" className="relative">
      <Reveal>
        <SectionHeading
          index="02"
          label="THE PATH"
          title={<span id="journey-heading">How the eye was trained.</span>}
          action={
            <span className="label hidden text-[0.58rem] sm:inline">
              LEARNING → CREATING → EDITING → IMPROVING
            </span>
          }
        />
      </Reveal>

      <div ref={containerRef} className="relative mt-10 lg:mt-14">
        {/* vertical rail (mobile) */}
        <div aria-hidden="true" className="absolute top-0 left-[13px] h-full w-px bg-line lg:hidden">
          <motion.span
            className="block h-full w-full origin-top bg-gradient-to-b from-accent via-accent/70 to-transparent"
            style={filled !== undefined ? { scaleY: filled } : { scaleY: progress }}
          />
        </div>

        {/* horizontal rail (desktop) */}
        <div aria-hidden="true" className="absolute inset-x-0 top-[13px] hidden h-px bg-line lg:block">
          <motion.span
            className="block h-full w-full origin-left bg-gradient-to-r from-accent via-accent/70 to-transparent"
            style={filled !== undefined ? { scaleX: filled } : { scaleX: progress }}
          />
        </div>

        <ol className="grid gap-8 lg:grid-cols-4 lg:gap-6">
          {journey.map((item, index) => (
            <Reveal key={item.id} as="li" delay={index * 0.09} y={26} className="relative">
              <div className="flex gap-5 lg:block">
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-line bg-bg text-[0.55rem] text-ink-2 lg:mb-6 lg:text-[0.5rem]"
                >
                  <span className="absolute inset-0 rounded-full bg-accent-glow blur-md" />
                  <span className="relative tabular-nums">{index + 1}</span>
                </span>
                <div className="min-w-0">
                  <p className="label text-[0.55rem] text-accent">{item.year}</p>
                  <h3 className="mt-1.5 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-none text-ink">
                    {item.stage}
                  </h3>
                  <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-ink-2">{item.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
