import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "@/data/siteConfig";
import { useUI } from "@/context/UIContext";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const socialIcon: Record<string, string> = {
  instagram: "IG",
  linkedin: "IN",
  youtube: "YT",
};

/** Right-side full drawer. Routes for About / Contact, panel for Work index. */
export function MobileMenu() {
  const { menuOpen, setMenuOpen, openPanel } = useUI();
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const close = () => setMenuOpen(false);
  const panelRef = useFocusTrap<HTMLDivElement>(menuOpen, close);
  useLockBodyScroll(menuOpen);

  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {menuOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.001 : 0.25 }}
            onClick={close}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            tabIndex={-1}
            initial={reduced ? { opacity: 0 } : { x: "100%" }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: "100%" }}
            transition={reduced ? { duration: 0.001 } : { type: "spring", stiffness: 300, damping: 34 }}
            className="absolute inset-y-0 right-0 flex w-[min(100%,420px)] flex-col justify-between border-l border-line bg-bg-2 px-6 pt-20 pb-8"
            data-scroll-native
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(80% 45% at 100% 0%, rgba(124,92,255,0.16), transparent 60%)",
              }}
            />

            <nav aria-label="Mobile" className="relative">
              <p className="label mb-6">MENU</p>
              <ul className="space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      openPanel("work");
                    }}
                    className="group flex w-full items-end justify-between border-b border-line-soft py-4 text-left"
                  >
                    <span className="font-display text-[2rem] leading-none text-ink">Work</span>
                    <span className="label text-ink-3 group-hover:text-accent">Panel</span>
                  </button>
                </li>
                <li>
                  <Link to="/work" onClick={close} className="group flex w-full items-end justify-between border-b border-line-soft py-4">
                    <span className="font-display text-[2rem] leading-none text-ink">Projects</span>
                    <span className="label text-ink-3 group-hover:text-accent">Full page</span>
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={close} className="group flex w-full items-end justify-between border-b border-line-soft py-4">
                    <span className="font-display text-[2rem] leading-none text-ink">About</span>
                    <span className="label text-ink-3 group-hover:text-accent">02</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={close} className="group flex w-full items-end justify-between py-4">
                    <span className="font-display text-[2rem] leading-none text-ink">Contact</span>
                    <ArrowUpRight size={18} className="mb-1 text-ink-3 transition-colors group-hover:text-accent" />
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="relative space-y-5">
              <div className="rounded-2xl border border-line bg-surface/60 p-4">
                <p className="label mb-2 flex items-center gap-2">
                  <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" />
                  {siteConfig.availability.status}
                </p>
                <p className="text-xs leading-relaxed text-ink-2">{siteConfig.availability.note}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {siteConfig.socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 rounded-full border border-line px-3 py-2 font-display text-[0.65rem] tracking-[0.16em] text-ink-2 uppercase transition-colors hover:border-accent/60 hover:text-ink"
                  >
                    <span className="text-accent">{socialIcon[social.id] ?? "•"}</span>
                    {social.handle}
                  </a>
                ))}
              </div>
              <p className="label text-[0.58rem] text-ink-3">
                © {siteConfig.copyrightYear} {siteConfig.fullName}
              </p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
