import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  index?: string;
  label: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "left" | "between";
  action?: React.ReactNode;
}

/** Editorial section header: index number, uppercase label, hairline rule. */
export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
  align = "between",
  action,
}: SectionHeadingProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-4">
        {index ? (
          <span className="label text-accent/90 tabular-nums" aria-hidden="true">
            {index}
          </span>
        ) : null}
        <span className="label label-live">{label}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        {align === "between" && action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {title || description ? (
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          {title ? (
            <h2 className="max-w-[16ch] text-[clamp(1.9rem,5.4vw,3.9rem)] text-ink text-balance">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="max-w-[46ch] text-sm leading-relaxed text-ink-2 lg:text-[0.95rem]">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
