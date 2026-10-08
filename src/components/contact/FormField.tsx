import { useId } from "react";
import { cn } from "@/utils/cn";

interface BaseProps {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}

interface InputProps extends BaseProps {
  as?: "input";
  type?: "text" | "email";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
}

interface TextareaProps extends BaseProps {
  as: "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

interface SelectProps extends BaseProps {
  as: "select";
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

type FormFieldProps = InputProps | TextareaProps | SelectProps;

const fieldClasses =
  "peer w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3.5 font-sans text-[0.92rem] text-ink outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-ink-3 hover:border-white/20 focus:border-accent focus:bg-accent/[0.06] focus:shadow-[0_0_0_3px_rgba(124,92,255,0.16)] aria-[invalid=true]:border-warm/70";

/** Labelled, keyboard-friendly field with inline errors and a live region. */
export function FormField(props: FormFieldProps) {
  const generated = useId();
  const id = `f-${props.name}-${generated}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [props.error ? errorId : null, props.hint ? hintId : null].filter(Boolean).join(" ");

  const control =
    props.as === "textarea" ? (
      <textarea
        id={id}
        name={props.name}
        rows={props.rows ?? 4}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(event) => props.onChange(event.target.value)}
        required={props.required}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(fieldClasses, "resize-y min-h-[120px]")}
      />
    ) : props.as === "select" ? (
      <div className="relative">
        <select
          id={id}
          name={props.name}
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
          required={props.required}
          aria-invalid={props.error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(fieldClasses, "appearance-none pr-11", !props.value && "text-ink-3")}
        >
          <option value="" disabled>
            Choose a project type
          </option>
          {props.options.map((option) => (
            <option key={option} value={option} className="bg-elevated text-ink">
              {option}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-3 transition-colors peer-hover:text-ink"
        >
          ▾
        </span>
      </div>
    ) : (
      <input
        id={id}
        name={props.name}
        type={props.type ?? "text"}
        value={props.value}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        onChange={(event) => props.onChange(event.target.value)}
        required={props.required}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={fieldClasses}
      />
    );

  return (
    <div className={cn("space-y-2", props.className)} data-field={props.name}>
      <label htmlFor={id} className="label flex items-center gap-2">
        {props.label}
        {props.required ? <span className="text-accent">*</span> : <span className="text-ink-3/70">OPTIONAL</span>}
      </label>
      {control}
      {props.error ? (
        <p id={errorId} role="alert" className="flex items-start gap-1.5 text-[0.72rem] text-warm">
          <span aria-hidden="true" className="mt-[3px] size-1.5 shrink-0 rounded-full bg-warm" />
          {props.error}
        </p>
      ) : props.hint ? (
        <p id={hintId} className="text-[0.72rem] text-ink-3">
          {props.hint}
        </p>
      ) : null}
    </div>
  );
}
