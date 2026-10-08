import { useCallback, useEffect, useRef } from "react";
import { useCoarsePointer } from "./useMediaQuery";
import { useReducedMotion } from "./useReducedMotion";

export interface TiltOptions {
  /** Maximum rotation in degrees (per axis, both directions). */
  max?: number;
  /** Peak scale while hovered (keep 1 – 1.04). */
  scale?: number;
  perspective?: number;
  /** How far the inner overlay floats forward in Z (px). */
  overlayZ?: number;
  disabled?: boolean;
}

const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

/**
 * Pointer-driven 3D tilt.
 *
 * Writes only CSS custom properties (--tilt-rx / --tilt-ry / --tilt-scale /
 * --tilt-z) inside a requestAnimationFrame loop that stops as soon as the
 * motion settles. No React re-renders, no layout reads during pointer moves
 * (the bounding rect is cached on enter), and it switches itself off for
 * touch devices and reduced-motion users.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(options: TiltOptions = {}) {
  const { max = 5, scale = 1.03, perspective = 1000, overlayZ = 28, disabled = false } = options;

  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const enabled = !disabled && !reduced && !coarse;

  const target = useRef({ rx: 0, ry: 0, s: 1, z: 0 });
  const current = useRef({ rx: 0, ry: 0, s: 1, z: 0 });
  const rect = useRef<DOMRect | null>(null);
  const raf = useRef<number | null>(null);

  const write = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    const c = current.current;
    node.style.setProperty("--tilt-persp", `${perspective}px`);
    node.style.setProperty("--tilt-rx", `${c.rx.toFixed(2)}deg`);
    node.style.setProperty("--tilt-ry", `${c.ry.toFixed(2)}deg`);
    node.style.setProperty("--tilt-scale", c.s.toFixed(4));
    node.style.setProperty("--tilt-z", `${c.z.toFixed(1)}px`);
  }, [perspective]);

  const tick = useCallback(() => {
    const t = target.current;
    const c = current.current;
    c.rx = lerp(c.rx, t.rx, 0.15);
    c.ry = lerp(c.ry, t.ry, 0.15);
    c.s = lerp(c.s, t.s, 0.2);
    c.z = lerp(c.z, t.z, 0.18);

    const settled =
      Math.abs(c.rx - t.rx) < 0.01 &&
      Math.abs(c.ry - t.ry) < 0.01 &&
      Math.abs(c.s - t.s) < 0.0004 &&
      Math.abs(c.z - t.z) < 0.15;

    if (settled) {
      current.current = { ...t };
      raf.current = null;
      write();
      return;
    }
    write();
    raf.current = requestAnimationFrame(tick);
  }, [write]);

  const setTarget = useCallback(
    (next: Partial<typeof target.current>) => {
      if (!enabled) return;
      Object.assign(target.current, next);
      if (raf.current === null) raf.current = requestAnimationFrame(tick);
    },
    [enabled, tick]
  );

  const onPointerEnter = useCallback(() => {
    if (!enabled) return;
    const node = ref.current;
    if (node) rect.current = node.getBoundingClientRect();
    setTarget({ s: scale, z: overlayZ });
  }, [enabled, overlayZ, scale, setTarget]);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<T>) => {
      if (!enabled || event.pointerType === "touch") return;
      const box = rect.current;
      if (!box || box.width === 0 || box.height === 0) return;
      const px = (event.clientX - box.left) / box.width - 0.5;
      const py = (event.clientY - box.top) / box.height - 0.5;
      setTarget({ ry: px * max * 2, rx: -py * max * 2 });
    },
    [enabled, max, setTarget]
  );

  const onPointerLeave = useCallback(() => {
    if (!enabled) return;
    rect.current = null;
    setTarget({ rx: 0, ry: 0, s: 1, z: 0 });
  }, [enabled, setTarget]);

  useEffect(() => {
    if (!enabled) {
      const node = ref.current;
      if (node) {
        node.style.removeProperty("--tilt-rx");
        node.style.removeProperty("--tilt-ry");
        node.style.removeProperty("--tilt-scale");
        node.style.removeProperty("--tilt-z");
      }
    }
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, [enabled]);

  return {
    ref,
    enabled,
    bind: {
      onPointerEnter,
      onPointerMove,
      onPointerLeave,
    },
  };
}
