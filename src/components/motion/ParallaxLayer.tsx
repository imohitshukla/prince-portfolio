import type { CSSProperties, ReactNode } from "react";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/utils/cn";

interface ParallaxLayerProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  x?: number;
  y?: number;
  scroll?: number;
  smoothing?: number;
  disabled?: boolean;
  "aria-hidden"?: boolean;
}

/**
 * A layer that drifts against pointer movement and/or page scroll.
 * Different `x`/`y`/`scroll` values per layer is what creates depth in the
 * hero — the hook itself never re-renders React.
 */
export function ParallaxLayer({
  children,
  className,
  style,
  x = 0,
  y = 0,
  scroll = 0,
  smoothing = 0.09,
  disabled,
  ...rest
}: ParallaxLayerProps) {
  const { ref } = useParallax<HTMLDivElement>({ x, y, scroll, smoothing, disabled });

  return (
    <div ref={ref} className={cn("will-change-transform", className)} style={style} {...rest}>
      {children}
    </div>
  );
}
