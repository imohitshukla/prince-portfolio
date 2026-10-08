import { useEffect, useRef } from "react";

let lockCount = 0;
let storedOverflow = "";
let storedPadding = "";

/**
 * Locks page scroll while a drawer / detail overlay is open.
 * Ref-counted so an overlapping panel + detail never unlocks the page early,
 * and the scrollbar width is compensated to avoid layout shift.
 */
export function useLockBodyScroll(locked: boolean) {
  const previous = useRef<{ overflow: string; padding: string } | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;

    if (locked) {
      if (lockCount === 0) {
        const scrollbar = window.innerWidth - document.documentElement.clientWidth;
        previous.current = { overflow: body.style.overflow, padding: body.style.paddingRight };
        storedOverflow = body.style.overflow;
        storedPadding = body.style.paddingRight;
        body.style.overflow = "hidden";
        if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
      }
      lockCount += 1;
    }

    return () => {
      if (!locked) return;
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        body.style.overflow = storedOverflow || previous.current?.overflow || "";
        body.style.paddingRight = storedPadding || previous.current?.padding || "";
      }
    };
  }, [locked]);
}
