import { cn } from "@/utils/cn";

interface CategoryLabelProps {
  label: string;
  accent?: string;
  className?: string;
}

export function CategoryLabel({ label, accent = "#7C5CFF", className }: CategoryLabelProps) {
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line px-2.5 py-1 text-[0.58rem] text-ink-2",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full"
        style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}55` }}
      />
      {label}
    </span>
  );
}
