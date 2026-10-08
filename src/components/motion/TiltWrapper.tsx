import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/utils/cn";

interface TiltWrapperProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  children: ReactNode;
  max?: number;
  scale?: number;
  perspective?: number;
  overlayZ?: number;
  /** Soft purple sheen that tracks nothing but depth — purely additive. */
  glare?: boolean;
  disabled?: boolean;
}

/**
 * Generic 3D surface. Children can float forward with the `tilt-z` class
 * (translateZ driven by the shared --tilt-z custom property).
 */
export function TiltWrapper({
  children,
  className,
  max = 5,
  scale = 1.03,
  perspective = 1000,
  overlayZ = 28,
  glare = true,
  disabled,
  ...rest
}: TiltWrapperProps) {
  const { ref, bind, enabled } = useTilt<HTMLDivElement>({
    max,
    scale,
    perspective,
    overlayZ,
    disabled,
  });

  return (
    <div
      ref={ref}
      {...bind}
      className={cn("tilt group/tilt relative", enabled && "transition-shadow duration-500", className)}
      data-tilt={enabled ? "on" : "off"}
      {...rest}
    >
      {children}
      {glare ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100 group-focus-within/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(120% 80% at 50% -20%, rgba(124,92,255,0.20), transparent 60%)",
          }}
        />
      ) : null}
    </div>
  );
}
