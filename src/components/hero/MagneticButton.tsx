import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

const EASE = "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  /** Internal route. */
  to?: string;
  /** External URL (opens in a new tab). */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Micro-label shown inside the custom cursor ring. */
  cursor?: string;
  /** Max magnetic pull in px. */
  strength?: number;
  ariaLabel?: string;
}

/**
 * Pill CTA with a gentle magnetic pull toward the pointer (max ~12px) while the
 * label travels a little further. Written with direct style writes inside the
 * pointer handler — no React state, so hovering never re-renders. Touch devices
 * get a normal button; the transform simply never applies.
 */
export function MagneticButton({
  children,
  variant = "primary",
  className,
  to,
  href,
  onClick,
  type = "button",
  disabled,
  cursor,
  strength = 12,
  ariaLabel,
}: MagneticButtonProps) {
  const frameRef = useRef<HTMLElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  const handleMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const node = frameRef.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    if (box.width === 0 || box.height === 0) return;
    const px = (event.clientX - (box.left + box.width / 2)) / (box.width / 2);
    const py = (event.clientY - (box.top + box.height / 2)) / (box.height / 2);
    node.style.transition = "none";
    node.style.transform = `translate3d(${(px * strength).toFixed(2)}px, ${(py * strength).toFixed(2)}px, 0)`;
    if (labelRef.current) {
      labelRef.current.style.transition = "none";
      labelRef.current.style.transform = `translate3d(${(px * strength * 0.5).toFixed(2)}px, ${(py * strength * 0.5).toFixed(2)}px, 0)`;
    }
  };

  const reset = () => {
    for (const node of [frameRef.current, labelRef.current]) {
      if (!node) continue;
      node.style.transition = EASE;
      node.style.transform = "translate3d(0, 0, 0)";
    }
  };

  const classes = cn("btn", variant === "primary" ? "btn-primary" : "btn-ghost", "touch-manipulation", className);
  const handlers = { onPointerMove: handleMove, onPointerLeave: reset, onBlur: reset };

  const inner = (
    <span ref={labelRef} className="relative inline-flex items-center gap-2">
      {children}
    </span>
  );

  if (to) {
    return (
      <Link
        to={to}
        aria-label={ariaLabel}
        data-cursor={cursor}
        {...handlers}
        className={classes}
        ref={(node: HTMLAnchorElement | null) => {
          frameRef.current = node;
        }}
      >
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={ariaLabel}
        data-cursor={cursor}
        {...handlers}
        className={classes}
        ref={(node: HTMLAnchorElement | null) => {
          frameRef.current = node;
        }}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      data-cursor={cursor}
      {...handlers}
      className={cn(classes, disabled && "pointer-events-none opacity-45")}
      ref={(node: HTMLButtonElement | null) => {
        frameRef.current = node;
      }}
    >
      {inner}
    </button>
  );
}
