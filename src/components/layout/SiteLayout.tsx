import { type ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { Navigation } from "@/components/navigation/Navigation";
import { ProjectDetail } from "@/components/work/ProjectDetail";
import { ProjectPanel } from "@/components/work/ProjectPanel";
import { CursorFollower } from "@/components/motion/CursorFollower";
import { Footer } from "@/components/layout/Footer";
import { useUI } from "@/context/UIContext";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/**
 * App shell: ambient canvas, navigation, routed page, footer, and the three
 * overlay layers (work panel, contact panel, project detail) which are mounted
 * once so they can be opened from anywhere in the site.
 */
export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname, search } = useLocation();
  const { menuOpen, panel, projectId } = useUI();
  const overlayOpen = Boolean(panel || projectId || menuOpen);
  useSmoothScroll();

  // Scroll to top only on a genuine route change — never while an overlay is
  // open, and never when a panel simply closes (that would jump mid-page).
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    const params = new URLSearchParams(search);
    if (params.has("panel") || params.has("project")) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, search]);

  return (
    <div className="relative min-h-screen">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 70% at 88% -8%, rgba(124,92,255,0.10), transparent 58%), radial-gradient(90% 60% at 6% 105%, rgba(124,92,255,0.07), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.035] scan" />
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[130] focus:rounded-full focus:border focus:border-accent focus:bg-bg-2 focus:px-4 focus:py-2 focus:font-display focus:text-[0.65rem] focus:tracking-[0.2em] focus:uppercase"
      >
        Skip to content
      </a>

      {/* While a drawer or the case study is open the page shell is inert:
          no stray Tab focus into content behind the backdrop. */}
      <div inert={overlayOpen || undefined}>
        <Navigation />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </div>

      <MobileMenu />

      <ProjectPanel />
      <ContactPanel />
      <ProjectDetail />
      <CursorFollower />
    </div>
  );
}
