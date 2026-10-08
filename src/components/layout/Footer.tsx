import { ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/data/siteConfig";
import { useUI } from "@/context/UIContext";
import { cn } from "@/utils/cn";

const columns = [
  { title: "PAGES", links: [
      { label: "WORK INDEX", to: "/work" },
      { label: "PROJECTS", to: "/work" },
      { label: "ABOUT", to: "/about" },
      { label: "CONTACT", to: "/contact" },
    ] },
];

export function Footer() {
  const { openPanel } = useUI();

  return (
    <footer className="relative border-t border-line bg-bg">
      <div className="mx-auto w-full max-w-[1680px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <Reveal>
          <button
            type="button"
            onClick={() => openPanel("contact")}
            data-cursor="BRIEF"
            className="group block w-full text-left"
          >
            <p className="label mb-6 flex items-center gap-3 text-accent">
              <span aria-hidden="true" className="h-px w-10 bg-accent/70 transition-all duration-700 group-hover:w-20" />
              NEXT STEP
            </p>
            <span className="block font-display text-[clamp(1.9rem,7.6vw,5.4rem)] leading-[0.92] tracking-[-0.04em] text-ink transition-colors duration-500 group-hover:text-ink-2">
              LET’S CREATE SOMETHING
              <br />
              WORTH{" "}
              <span className="relative inline-block">
                WATCHING
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[0.12em] h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </span>
              <span className="text-accent">.</span>
            </span>
            <span className="mt-7 inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 font-display text-[0.7rem] tracking-[0.18em] text-ink uppercase transition-colors duration-300 group-hover:border-accent/70 group-hover:bg-accent/10">
              OPEN THE CONTACT PANEL
              <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </button>
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-[1rem] tracking-[0.3em] text-ink uppercase">{siteConfig.name}</p>
            <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-ink-3">
              {siteConfig.fullName} — {siteConfig.role}. Editing for brands, creators and podcasters who care
              about the first three seconds.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="label mb-4">{column.title}</p>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="label mb-4">ELSEWHERE</p>
            <ul className="space-y-2.5">
              {siteConfig.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink"
                  >
                    {social.label}
                    <span className="text-[0.68rem] text-ink-3">{social.handle}</span>
                    <ArrowUpRight size={12} className="opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-ink-2 transition-colors hover:text-ink">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <p className="label mb-4">STATUS</p>
            <div className="rounded-2xl border border-line bg-bg-2 p-4">
              <p className="flex items-center gap-2 text-sm text-ink">
                <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
                {siteConfig.availability.status}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink-3">{siteConfig.availability.note}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-6">
          <p className="label text-[0.55rem]">
            © {siteConfig.copyrightYear} {siteConfig.fullName} · ALL EDITS RESERVED
          </p>
          <p className="label text-[0.55rem] text-ink-3">DESIGNED, CUT & BUILT BY PRINCE</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 transition-colors duration-300 hover:border-accent/70"
            )}
          >
            <span className="label text-[0.55rem]">BACK TO TOP</span>
            <ArrowUp size={12} className="text-ink-3 transition-transform duration-500 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
