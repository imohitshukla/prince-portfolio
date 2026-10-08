import { motion } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface SuccessMessageProps {
  name: string;
  onReset: () => void;
}

/** Post-submission state. Kept focusable so screen readers announce it. */
export function SuccessMessage({ name, onReset }: SuccessMessageProps) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-accent/45 bg-accent/[0.07] p-6 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(70% 60% at 20% 0%, rgba(124,92,255,0.24), transparent 65%)" }}
      />
      <span className="relative grid size-11 place-items-center rounded-full border border-accent/60 bg-accent/20 text-ink">
        <Check size={18} />
      </span>
      <h3 className="relative mt-5 text-[clamp(1.35rem,3vw,2rem)] leading-tight text-ink">
        Brief received{name ? `, ${name.split(" ")[0]}` : ""}.
      </h3>
      <p className="relative mt-3 max-w-[46ch] text-sm leading-relaxed text-ink-2">
        Thanks — I read every message myself and reply within 24 hours with a rate, a timeline and the first
        edit plan. If it’s urgent, DM me on Instagram.
      </p>
      <div className="relative mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${siteConfig.email}?subject=Project%20follow-up`}
          className="btn btn-primary"
          data-cursor="EMAIL"
        >
          EMAIL ME DIRECTLY
          <ExternalLink size={12} />
        </a>
        <button type="button" onClick={onReset} className="btn btn-ghost">
          SEND ANOTHER
        </button>
      </div>
      <p className="label relative mt-5 text-[0.55rem]">
        MOCK SUBMISSION — CONNECT A REAL ENDPOINT VIA VITE_CONTACT_ENDPOINT
      </p>
    </motion.div>
  );
}
