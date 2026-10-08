import { useEffect, useRef } from "react";

/**
 * One shared, ref-counted pointer listener for the whole page.
 * Callbacks receive normalised values in the range -0.5 … 0.5 so that
 * parallax, tilt and the cursor follower never stack window listeners.
 */
type PointerListener = (x: number, y: number) => void;

const listeners = new Set<PointerListener>();
const pointer = { x: 0, y: 0 };
let attached = false;

function onPointerMove(event: PointerEvent) {
  const w = window.innerWidth || 1;
  const h = window.innerHeight || 1;
  pointer.x = event.clientX / w - 0.5;
  pointer.y = event.clientY / h - 0.5;
  listeners.forEach((listener) => listener(pointer.x, pointer.y));
}

function attach() {
  if (attached || typeof window === "undefined") return;
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  attached = true;
}

function maybeDetach() {
  if (!attached) return;
  if (listeners.size > 0) return;
  window.removeEventListener("pointermove", onPointerMove);
  attached = false;
}

export function usePointerListener(callback: PointerListener): void {
  const saved = useRef(callback);
  saved.current = callback;

  useEffect(() => {
    const listener: PointerListener = (x, y) => saved.current(x, y);
    listeners.add(listener);
    attach();
    return () => {
      listeners.delete(listener);
      maybeDetach();
    };
  }, []);
}

/** Latest raw pointer position, for components that sample inside rAF. */
export function getPointer() {
  return pointer;
}
