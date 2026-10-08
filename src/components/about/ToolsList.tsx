import { motion } from "framer-motion";
import { Palette, Smartphone, Sparkles, Video } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { tools } from "@/data/content";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

const ICONS = { video: Video, sparkles: Sparkles, palette: Palette, smartphone: Smartphone } as const;

/** NLE toolkit with proficiency bars (scaleX, so only transforms animate). */
export function ToolsList() {
  return (
    <section aria-labelledby="tools-heading">
      <Reveal>
        <SectionHeading
          index="03"
          label="TOOLKIT"
          title={<span id="tools-heading">Four programs, one timeline.</span>}
          description="Nothing exotic — the tools are only as good as the decision about what to cut next."
        />
      </Reveal>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:gap-4">
        {tools.map((tool, index) => (
          <ToolRow key={tool.name} tool={tool} index={index} />
        ))}
      </ul>
    </section>
  );
}

function ToolRow({
  tool,
  index,
}: {
  tool: (typeof tools)[number];
  index: number;
}) {
  const { ref, revealed } = useRevealOnScroll<HTMLLIElement>();
  const reduced = useReducedMotion();
  const Icon = ICONS[tool.icon as keyof typeof ICONS] ?? Video;

  return (
    <li
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line bg-bg-2 p-5 transition-[border-color,background-color] duration-500",
        "hover:border-white/20 hover:bg-elevated",
        index > 1 && "sm:mt-0"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-[1.05rem] leading-none text-ink">{tool.name}</h3>
          <p className="mt-2 text-xs leading-relaxed text-ink-3">{tool.use}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition-colors duration-500 group-hover:border-accent/60 group-hover:text-ink">
          <Icon size={15} strokeWidth={1.4} />
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span aria-hidden="true" className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.span
            className="absolute inset-y-0 left-0 block w-full origin-left rounded-full bg-gradient-to-r from-accent to-accent/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: reduced || revealed ? 1 : 0 }}
            transition={{ duration: reduced ? 0.001 : 1.1, delay: reduced ? 0 : 0.1 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
          />
        </span>
        <span className="label text-[0.55rem] tabular-nums text-ink-2">{tool.level}%</span>
      </div>
    </li>
  );
}
