import { FormEvent, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { FormField } from "@/components/contact/FormField";
import { SuccessMessage } from "@/components/contact/SuccessMessage";
import { siteConfig } from "@/data/siteConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

export const PROJECT_TYPES = [
  "Social Media",
  "YouTube",
  "Brand",
  "Podcast",
  "Documentary",
  "Other",
] as const;

interface Values {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

const EMPTY: Values = { name: "", email: "", projectType: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function validate(values: Values) {
  const errors: Partial<Record<keyof Values, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Please add a name so I know who I’m editing for.";
  if (!values.email.trim()) errors.email = "An email address is required for my reply.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "That email doesn’t look complete — check the format.";
  if (!values.projectType) errors.projectType = "Pick the closest project type.";
  if (values.message.trim().length < 12)
    errors.message = "A line or two about the footage, length and platform helps me quote properly.";
  return errors;
}

interface ContactFormProps {
  /** Tighter spacing for the drawer. */
  compact?: boolean;
  className?: string;
}

/**
 * The single source of validation + submission logic, shared by the contact
 * page and the sliding contact panel — no duplicated rules anywhere.
 *
 * Endpoint behaviour
 *  · siteConfig.contactEndpoint set  → POSTs JSON to that endpoint
 *    (Formspree / Web3Forms / Resend / etc.).
 *  · endpoint empty (default)        → POSTs to FormSubmit.co so every
 *    enquiry lands in mauryaprince2171@gmail.com. First-ever submission
 *    triggers a one-time activation email — confirm that once, then all
 *    future forms arrive in the inbox automatically.
 */
export function ContactForm({ compact = false, className }: ContactFormProps) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  // Captured before the fields reset, so the success card can still greet them.
  const [submittedName, setSubmittedName] = useState("");
  const reduced = useReducedMotion();

  const setValue = (key: keyof Values) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validate(values);
    setErrors(found);
    const firstKey = (Object.keys(found) as (keyof Values)[])[0];
    if (firstKey) {
      const control = form.querySelector<HTMLElement>(
        `[data-field="${firstKey}"] input, [data-field="${firstKey}"] textarea, [data-field="${firstKey}"] select`
      );
      control?.focus({ preventScroll: true });
      control?.closest("[data-field]")?.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
      return;
    }

    setStatus("loading");
    // Prefer a custom endpoint (Formspree, Web3Forms, etc.) when set.
    // Otherwise send straight to the portfolio email via FormSubmit.co
    // (no backend required — first submission sends a one-time activation
    // email to mauryaprince2171@gmail.com which must be confirmed once).
    const customEndpoint = siteConfig.contactEndpoint.trim();
    const endpoint =
      customEndpoint || "https://formsubmit.co/ajax/mauryaprince2171@gmail.com";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          projectType: values.projectType,
          message: values.message.trim(),
          _subject: `Portfolio enquiry — ${values.projectType || "General"}`,
          _template: "table",
          _captcha: "false",
          source: "portfolio",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error(`Endpoint responded ${response.status}`);
      setSubmittedName(values.name.trim());
      setValues(EMPTY);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success")
    return (
      <SuccessMessage
        name={submittedName}
        onReset={() => {
          setSubmittedName("");
          setStatus("idle");
        }}
      />
    );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("space-y-5", compact ? "sm:space-y-5" : "sm:space-y-6", className)}
    >
      <div className={cn("grid gap-5", compact ? "sm:grid-cols-2" : "lg:grid-cols-2", "sm:gap-4")}>
        <FormField
          label="NAME"
          name="name"
          value={values.name}
          onChange={setValue("name")}
          error={errors.name}
          placeholder="Who’s the video for?"
          autoComplete="name"
          required
        />
        <FormField
          label="EMAIL"
          name="email"
          type="email"
          value={values.email}
          onChange={setValue("email")}
          error={errors.email}
          placeholder="you@studio.com"
          autoComplete="email"
          required
        />
      </div>

      <FormField
        label="PROJECT TYPE"
        name="projectType"
        as="select"
        options={[...PROJECT_TYPES]}
        value={values.projectType}
        onChange={setValue("projectType")}
        error={errors.projectType}
        required
      />

      <FormField
        label="MESSAGE"
        name="message"
        as="textarea"
        rows={compact ? 4 : 5}
        value={values.message}
        onChange={setValue("message")}
        error={errors.message}
        hint="Footage state, length, platform, deadline — and a link to references if you have them."
        required
      />

      {status === "error" ? (
        <p
          role="alert"
          className="rounded-xl border border-warm/45 bg-warm/[0.08] px-4 py-3 text-[0.8rem] leading-relaxed text-warm"
        >
          That didn’t send. The endpoint may be offline — email{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-2">
            {siteConfig.email}
          </a>{" "}
          and I’ll reply from there.
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn("btn btn-primary min-w-[190px] justify-center", status === "loading" && "opacity-80")}
          data-cursor="SEND"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              SENDING…
            </>
          ) : (
            <>
              SEND MESSAGE
              <Send size={13} />
            </>
          )}
        </button>
        <p className="label max-w-[26ch] text-[0.55rem] leading-relaxed">
          NO NEWSLETTER, NO CRM. THIS GOES STRAIGHT TO {siteConfig.email.toUpperCase()}.
        </p>
      </div>
    </form>
  );
}
