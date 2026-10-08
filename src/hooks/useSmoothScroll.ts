import { useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { useCoarsePointer } from "./useMediaQuery";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Optional Linear-style wheel easing.
 *
 * Deliberately conservative: it only intercepts the wheel on fine-pointer
 * devices, never inside drawers (`[data-scroll-native]`), never over
 * horizontally scrollable regions, and never for reduced-motion users.
 * Enable it from `siteConfig.smoothScroll` in src/data/siteConfig.ts.
 */
export function useSmoothScroll(enabledOverride?: boolean) {
  const enabled = enabledOverride ?? siteConfig.smoothScroll;
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const active = enabled && !reduced && !coarse;

  useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;

    let velocity = 0;
    let raf = 0;
    let target = window.scrollY;

    const isAllowed = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return false;
      if (event.deltaMode !== 0) return false;
      const path = event.composedPath();
      return !path.some(
        (node) =>
          node instanceof HTMLElement &&
          (node.closest("[data-scroll-native]") || node.closest("[data-scroll-x]"))
      );
    };

    const loop = () => {
      target = Math.max(0, Math.min(document.body.scrollHeight - window.innerHeight, target));
      const current = window.scrollY;
      const delta = target - current;
      if (Math.abs(delta) < 0.4) {
        window.scrollTo(0, target);
        velocity = 0;
        raf = 0;
        return;
      }
      velocity += (delta - velocity) * 0.14;
      window.scrollTo(0, current + velocity);
      raf = requestAnimationFrame(loop);
    };

    const onWheel = (event: WheelEvent) => {
      if (!isAllowed(event)) return;
      event.preventDefault();
      target = window.scrollY + Math.max(-260, Math.min(260, event.deltaY));
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onKeyReset = () => {
      target = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onKeyReset);
    return () => {
      window.removeEventListener("wheel", onWheel, { passive: false } as EventListenerOptions);
      window.removeEventListener("resize", onKeyReset);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active]);
}
