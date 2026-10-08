import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { Drawer } from "@/components/ui/Drawer";
import { useUI } from "@/context/UIContext";
import { siteConfig } from "@/data/siteConfig";

/** Sliding contact drawer — same form component as /contact, zero dupes. */
export function ContactPanel() {
  const { panel, closePanel, projectId } = useUI();
  const open = panel === "contact";

  return (
    <Drawer
      open={open}
      onClose={closePanel}
      disableEscape={Boolean(projectId)}
      side="right"
      label="Contact panel"
      eyebrow="CONTACT / 1 MINUTE"
      title="LET’S CREATE SOMETHING WORTH WATCHING."
      meta={
        <span className="text-xs text-ink-3">
          Have a project, brand or idea? I’d love to hear about it.
        </span>
      }
      widthClassName="w-full sm:w-[92vw] md:max-w-[650px]"
    >
      <p className="label mb-5 flex items-center gap-2 text-[0.58rem]">
        <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" />
        {siteConfig.availability.status.toUpperCase()} — REPLIES IN ~24H
      </p>

      <ContactForm compact />

      <div className="mt-9 border-t border-line pt-7">
        <p className="label mb-5">OR GO DIRECT</p>
        <ContactDetails />
      </div>
    </Drawer>
  );
}
