import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "@/data/siteConfig";
import { useUI } from "@/context/UIContext";
import { cn } from "@/utils/cn";

const NAV_LINK =
  "relative px-1 py-1 font-display text-[0.7rem] font-medium tracking-[0.2em] uppercase transition-colors duration-300";

/**
 * Compact fixed navigation.
 *  · transparent at the very top, blur + hairline border once scrolled
 *  · WORK opens the sliding project index; ABOUT and CONTACT are routes
 *  · availability dial on the right opens the contact panel
 *  · same button becomes the menu trigger on mobile
 *  · 1px accent scrubber tracks page progress
 */
export function Navigation() {
  const { pathname } = useLocation();
  const { panel, openPanel, closePanel, menuOpen, setMenuOpen } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.4 });

  useEffect(() => {
    // Same value → React bails out, so this only re-renders twice per session.
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isWorkActive = pathname === "/work" || panel === "work";

  const routeLink = (label: string, to: string, active: boolean) => (
    <Link
      to={to}
      onClick={() => {
        if (panel) closePanel();
        setMenuOpen(false);
      }}
      className={cn(NAV_LINK, active ? "text-ink" : "text-ink-3 hover:text-ink")}
      aria-current={active ? "page" : undefined}
    >
      {label}
      {active ? (
        <motion.span
          layoutId="nav-route"
          className="absolute -bottom-1 left-0 h-px w-full bg-accent"
          transition={{ type: "spring", stiffness: 420, damping: 38 }}
        />
      ) : null}
    </Link>
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-[background-color,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled ? "border-b border-line bg-bg/72 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 w-full max-w-[1680px] items-center justify-between gap-6 px-4 sm:h-16 sm:px-6 lg:px-10"
      >
        <Link
          to="/"
          onClick={() => {
            if (panel) closePanel();
            if (menuOpen) setMenuOpen(false);
          }}
          className="group flex items-baseline gap-2.5"
          aria-label={`${siteConfig.fullName} — home`}
        >
          <span className="font-display text-[1.02rem] leading-none font-semibold tracking-[0.3em] text-ink uppercase">
            {siteConfig.name}
          </span>
          <span className="hidden text-[0.62rem] leading-none tracking-[0.22em] text-ink-3 uppercase transition-colors duration-300 group-hover:text-accent sm:inline">
            {siteConfig.role.split(" • ")[1] ?? "Creative"}
          </span>
          <span
            aria-hidden="true"
            className="size-1.5 -translate-y-px rotate-45 bg-accent transition-transform duration-500 group-hover:rotate-[135deg]"
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <button
            type="button"
            onClick={() => (panel === "work" ? closePanel() : openPanel("work"))}
            className={cn(NAV_LINK, isWorkActive ? "text-ink" : "text-ink-3 hover:text-ink")}
            aria-expanded={panel === "work"}
            data-cursor="INDEX"
          >
            WORK
            {isWorkActive ? (
              <motion.span
                layoutId="nav-work"
                className="absolute -bottom-1 left-0 h-px w-full bg-accent"
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            ) : null}
          </button>
          {routeLink("ABOUT", "/about", pathname === "/about")}
          {routeLink("CONTACT", "/contact", pathname === "/contact" || panel === "contact")}

          <Link
            to="/work"
            onClick={() => panel && closePanel()}
            className="group inline-flex items-center gap-1 font-display text-[0.62rem] tracking-[0.18em] text-ink-3 uppercase transition-colors duration-300 hover:text-ink"
          >
            FULL PAGE
            <ArrowUpRight
              size={11}
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openPanel("contact")}
            className="group hidden items-center gap-2 rounded-full border border-line py-1.5 pr-3.5 pl-2 transition-colors duration-300 hover:border-accent/60 hover:bg-accent/10 sm:flex"
            aria-label="Availability — open the contact panel"
            data-cursor="SAY HI"
          >
            <span className="relative flex size-2 items-center justify-center">
              <span
                className={cn(
                  "size-2 rounded-full",
                  siteConfig.availability.open ? "animate-pulse-dot bg-accent" : "bg-ink-3"
                )}
              />
            </span>
            <span className="label text-[0.6rem] text-ink-2 group-hover:text-ink">
              {siteConfig.availability.status}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-line bg-white/[0.02] text-ink transition-colors duration-300 hover:border-accent/60 lg:hidden"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <motion.span
        aria-hidden="true"
        className="block h-px origin-left bg-gradient-to-r from-accent via-accent/70 to-transparent"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
