import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const lineVariant: Variants = {
  hidden: { opacity: 0, y: "62%" },
  show: (i: number) => ({
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.15 + (typeof i === "number" ? i : 0) * 0.085,
    },
  }),
};

const staticVariant: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

/**
 * Line-by-line masked reveal. The opening line is set small and quiet so the
 * two statement lines carry the optical weight — editorial hierarchy rather
 * than one uniformly huge headline.
 */
export function HeroText() {
  const reduced = useReducedMotion();
  const variants = reduced ? staticVariant : lineVariant;
  const [first, ...rest] = siteConfig.hero.headline;
  // `min` sized so the longest single word ("Bringing") always fits the
  // narrowest viewport (320px − 32px padding = 288px) with headroom, so no word
  // can ever be clipped by the overflow-hidden line mask above.
  const bigLine =
    "block text-[clamp(2rem,7vw,5.9rem)] leading-[0.94] tracking-[-0.035em] text-ink [text-wrap:balance]";

  return (
    // NOTE: the width cap here is in px/rem, deliberately NOT in `ch`.
    // `ch` resolves against this element's own font-size (16px, inherited from
    // body) — so `max-w-[20ch]` was ~160px and clipped every headline line.
    // The headline is allowed the full padded column and only gets a generous
    // cap once the layout is wide enough to need one.
    <div className="w-full min-w-0 max-w-full lg:max-w-[820px]">
      <motion.p
        className="label mb-5 flex items-center gap-3 text-accent sm:mb-7"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 0.05 }}
      >
        <span aria-hidden="true" className="inline-block h-px w-8 bg-accent/70" />
        {siteConfig.hero.eyebrow}
      </motion.p>

      <h1 className="font-display">
        <motion.span className="block overflow-hidden" variants={variants} initial="hidden" animate="show" custom={0}>
          <span className="block text-[clamp(1.2rem,2.4vw,1.7rem)] leading-tight font-normal text-ink-2">
            {first.text}
          </span>
        </motion.span>

        {rest.map((line, index) => (
          <motion.span
            key={line.text}
            className="block overflow-hidden pb-[0.14em] -mb-[0.14em]"
            variants={variants}
            initial="hidden"
            animate="show"
            custom={index + 1}
          >
            <span className={bigLine}>
              {line.text}
              {index === rest.length - 1 ? <span className="text-accent">.</span> : null}
            </span>
          </motion.span>
        ))}
      </h1>
    </div>
  );
}
