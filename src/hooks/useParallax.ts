import { useCallback, useEffect, useRef } from "react";
import { useCoarsePointer } from "./useMediaQuery";
import { usePointerListener } from "./usePointer";
import { useReducedMotion } from "./useReducedMotion";

export interface ParallaxOptions {
  /** px of travel at the pointer extremes */
  x?: number;
  y?: number;
  /** px of travel across one viewport of scroll */
  scroll?: number;
  /** 0 – 1, higher = tighter follow */
  smoothing?: number;
  disabled?: boolean;
}

/**
 * Pointer + scroll parallax driven by a single rAF loop that only runs while
 * the element is on screen. Writes `transform: translate3d()` only — never
 * top/left/width — and caches its geometry so nothing is measured per frame.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(options: ParallaxOptions = {}) {
  const { x = 0, y = 0, scroll = 0, smoothing = 0.09, disabled = false } = options;

  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const active = !disabled && !reduced && !coarse && (x !== 0 || y !== 0 || scroll !== 0);

  const current = useRef({ tx: 0, ty: 0 });
  const target = useRef({ tx: 0, ty: 0 });
  const inView = useRef(true);
  const geometry = useRef({ centerY: 0 });
  const raf = useRef<number | null>(null);
  const scrollTracked = useRef(scroll !== 0);
  scrollTracked.current = scroll !== 0;

  const measure = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    geometry.current.centerY = box.top + window.scrollY + box.height / 2;
  }, []);

  const tick = useCallback(() => {
    const node = ref.current;
    if (!node) {
      raf.current = null;
      return;
    }
    const t = target.current;
    const c = current.current;
    c.tx += (t.tx - c.tx) * smoothing;
    c.ty += (t.ty - c.ty) * smoothing;

    const done = Math.abs(t.tx - c.tx) < 0.05 && Math.abs(t.ty - c.ty) < 0.05;
    if (done) {
      current.current = { ...t };
      node.style.transform = `translate3d(${t.tx.toFixed(2)}px, ${t.ty.toFixed(2)}px, 0)`;
      raf.current = null;
      return;
    }

    node.style.transform = `translate3d(${c.tx.toFixed(2)}px, ${c.ty.toFixed(2)}px, 0)`;
    raf.current = requestAnimationFrame(tick);
  }, [smoothing]);

  const kick = useCallback(() => {
    if (raf.current === null && inView.current) raf.current = requestAnimationFrame(tick);
  }, [tick]);

  const applyScroll = useCallback(() => {
    if (!scrollTracked.current) return 0;
    const progress = (window.innerHeight / 2 + window.scrollY - geometry.current.centerY) / 1;
    return Math.max(-1, Math.min(1, progress / (window.innerHeight / 2))) * scroll;
  }, [scroll]);

  const push = useCallback(() => {
    target.current.ty = applyScroll();
    kick();
  }, [applyScroll, kick]);

  usePointerListener(
    useCallback(
      (px: number, py: number) => {
        if (!active) return;
        target.current.tx = px * x * -2;
        target.current.ty = py * y * -2 + applyScroll();
        kick();
      },
      [active, applyScroll, kick, x, y]
    )
  );

  useEffect(() => {
    if (!active) {
      const node = ref.current;
      if (node) node.style.transform = "";
      return;
    }
    measure();

    const onScroll = () => push();
    const onResize = () => {
      measure();
      push();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const node = ref.current;
    let observer: IntersectionObserver | undefined;
    if (node && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          inView.current = entry.isIntersecting;
          if (inView.current) kick();
        },
        { rootMargin: "120px" }
      );
      observer.observe(node);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, [active, kick, measure, push]);

  return { ref, active };
}
