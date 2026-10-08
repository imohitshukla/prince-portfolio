import { ArrowUpRight, Clock, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/utils/cn";

interface ContactDetailsProps {
  className?: string;
  variant?: "panel" | "page";
}

/** Direct channels + availability. Reads everything from siteConfig. */
export function ContactDetails({ className, variant = "panel" }: ContactDetailsProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <a
        href={`mailto:${siteConfig.email}`}
        className="group flex items-center justify-between gap-4 border-b border-line pb-5"
        data-cursor="COPY"
      >
        <span className="min-w-0">
          <span className="label mb-1.5 flex items-center gap-2 text-[0.55rem]">
            <Mail size={11} /> EMAIL
          </span>
          <span className="block truncate font-display text-[clamp(1rem,2.4vw,1.4rem)] text-ink transition-colors group-hover:text-accent">
            {siteConfig.email}
          </span>
        </span>
        <ArrowUpRight
          size={17}
          className="shrink-0 text-ink-3 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-ink"
        />
      </a>

      <ul className="space-y-2">
        {siteConfig.socials.map((social) => (
          <li key={social.id}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center justify-between gap-3 rounded-xl border border-line-soft px-4 py-3 transition-colors duration-300 hover:border-line hover:bg-white/[0.03]"
            >
              <span className="label text-[0.6rem] text-ink-2 group-hover:text-ink">{social.label}</span>
              <span className="flex items-center gap-2 text-xs text-ink-3">
                {social.handle}
                <ArrowUpRight size={13} className="transition-transform duration-500 group-hover:translate-x-0.5" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-white/[0.02] p-4">
          <p className="label mb-2 flex items-center gap-2 text-[0.55rem]">
            <Clock size={11} /> RESPONSE
          </p>
          <p className="text-sm leading-relaxed text-ink-2">
            Usually inside 24 hours. Rushed cuts — tell me the deadline first.
          </p>
        </div>
        <div className="rounded-xl border border-line bg-white/[0.02] p-4">
          <p className="label mb-2 flex items-center gap-2 text-[0.55rem]">
            <MapPin size={11} /> BASED
          </p>
          <p className="text-sm leading-relaxed text-ink-2">{siteConfig.location}</p>
        </div>
      </div>

      <div
        className={cn(
          "flex items-start gap-3 rounded-xl border p-4",
          siteConfig.availability.open ? "border-accent/45 bg-accent/[0.07]" : "border-line bg-white/[0.02]",
          variant === "page" && "sm:p-5"
        )}
      >
        <span className="mt-1.5 size-2 shrink-0 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-ink-2">
          <span className="font-display text-ink">{siteConfig.availability.status}.</span>{" "}
          {siteConfig.availability.note}
        </p>
      </div>
    </div>
  );
}
