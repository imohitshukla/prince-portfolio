import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { type ReactNode } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  side?: "right" | "bottom";
  /** Tailwind width classes for the desktop sheet. */
  widthClassName?: string;
  eyebrow?: string;
  title?: ReactNode;
  meta?: ReactNode;
  className?: string;
  contentClassName?: string;
  /** Set while a higher layer (project detail) owns the Escape key. */
  disableEscape?: boolean;
}

/**
 * Shared cinematic drawer used by the work panel and the contact panel.
 * Handles: slide + spring motion, backdrop click, Escape, focus trap,
 * focus restore, body scroll lock, internal scrolling and reduced motion.
 */
export function Drawer({
  open,
  onClose,
  label,
  children,
  side = "right",
  widthClassName = "w-full sm:w-[86vw] lg:w-[80vw] xl:w-[1240px]",
  eyebrow,
  title,
  meta,
  className,
  contentClassName,
  disableEscape,
}: DrawerProps) {
  const reduced = useReducedMotion();
  const panelRef = useFocusTrap<HTMLDivElement>(open, disableEscape ? undefined : onClose);
  useLockBodyScroll(open);

  const variants = {
    enter: { opacity: 1, x: 0, y: 0 },
    initial: reduced
      ? { opacity: 0, x: 0, y: 0 }
      : side === "right"
        ? { opacity: 0.4, x: "100%", y: 0 }
        : { opacity: 0.4, x: 0, y: "100%" },
    exit: reduced
      ? { opacity: 0 }
      : side === "right"
        ? { opacity: 0.3, x: "102%", y: 0 }
        : { opacity: 0.3, x: 0, y: "102%" },
  };

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80]" role="presentation">
          <motion.div
            className="absolute inset-0 bg-black/78 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.001 : 0.32 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            initial={variants.initial}
            animate={variants.enter}
            exit={variants.exit}
            transition={
              reduced ? { duration: 0.001 } : { type: "spring", stiffness: 260, damping: 34, mass: 0.9 }
            }
            className={cn(
              "absolute inset-x-0 bottom-0 top-auto flex max-h-[94dvh] flex-col overflow-hidden",
              "rounded-t-[22px] border border-line border-b-0 bg-bg-2",
              "sm:inset-y-0 sm:right-0 sm:left-auto sm:max-h-none sm:rounded-none sm:rounded-l-[26px] sm:border-l sm:border-t-0 sm:border-b-0",
              widthClassName,
              className
            )}
            data-scroll-native
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(90% 55% at 88% 0%, rgba(124,92,255,0.16), transparent 62%)",
              }}
            />

            <header className="relative z-10 flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-8 sm:py-6">
              <div className="min-w-0">
                {eyebrow ? <p className="label mb-1.5 sm:mb-2">{eyebrow}</p> : null}
                {title ? (
                  <h2 className="text-[clamp(1.35rem,3.4vw,2.4rem)] leading-none text-ink">{title}</h2>
                ) : null}
                {meta ? <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">{meta}</div> : null}
              </div>

              <div className="flex items-center gap-2">
                <span className="label hidden sm:inline" aria-hidden="true">
                  ESC
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={`Close ${label.toLowerCase()}`}
                  className="grid size-10 place-items-center rounded-full border border-line text-ink-2 transition-all duration-300 hover:rotate-90 hover:border-accent/60 hover:text-ink focus-visible:rotate-90 focus-visible:border-accent"
                >
                  <X size={17} strokeWidth={1.5} />
                </button>
              </div>
            </header>

            <div
              className={cn(
                "relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 outline-none sm:px-8 sm:py-8",
                contentClassName
              )}
              data-scroll-native
              data-autofocus
              tabIndex={-1}
            >
              {children}
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-1.5 sm:hidden"
            >
              <span className="mx-auto mt-2 block h-1 w-10 rounded-full bg-white/25" />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
