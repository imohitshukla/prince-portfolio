import { useEffect, useRef, useState } from "react";
import { useCoarsePointer } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SELECTOR = 'a, button, input, textarea, select, [role="button"], [data-cursor]';

/**
 * Original status-cursor: a small dot locked to the pointer plus a lagging
 * ring that expands over anything interactive and can carry a micro-label
 * (e.g. "VIEW"). Purely decorative — pointer-events none, hidden on touch
 * devices and for reduced-motion users. Never hides the native cursor.
 */
export function CursorFollower() {
  const coarse = useCoarsePointer();
  const reduced = useReducedMotion();
  const active = !coarse && !reduced && typeof window !== "undefined";

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!active) return;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pointer.x, y: pointer.y };
    let raf = 0;
    let visible = false;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!visible) {
        visible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      ring.x += (pointer.x - ring.x) * 0.16;
      ring.y += (pointer.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x.toFixed(2)}px, ${ring.y.toFixed(2)}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>(SELECTOR);
      setHot(Boolean(interactive));
      setLabel(interactive?.dataset?.cursor ? interactive.dataset.cursor : null);
    };

    const onLeave = () => {
      visible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      setHot(false);
      setLabel(null);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="cursor-chrome pointer-events-none fixed inset-0 z-[120] hidden opacity-100 lg:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="absolute top-0 left-0 size-1.5 rounded-full bg-ink opacity-0 transition-opacity duration-300"
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 grid place-items-center rounded-full border opacity-0 transition-[opacity,width,height,background-color,border-color] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: hot ? 56 : 26,
          height: hot ? 56 : 26,
          borderColor: hot ? "rgba(124,92,255,0.75)" : "rgba(255,255,255,0.22)",
          backgroundColor: hot ? "rgba(124,92,255,0.10)" : "transparent",
        }}
      >
        {label ? (
          <span className="label text-[7px] tracking-[0.2em] text-ink whitespace-nowrap">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
