import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageTransition } from "@/components/layout/PageTransition";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/data/siteConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Contact() {
  const reduced = useReducedMotion();

  return (
    <PageTransition>
      <div className="relative overflow-hidden">
        <ParallaxLayer
          scroll={reduced ? 0 : 80}
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[560px] opacity-80 blur-[140px]"
          style={{ background: "radial-gradient(45% 55% at 78% 30%, rgba(124,92,255,0.24), transparent 70%)" }}
        />

        <div className="mx-auto w-full max-w-[1680px] px-4 pt-28 pb-16 sm:px-6 sm:pt-36 lg:px-10 lg:pt-44">
          <Reveal>
            <p className="label mb-6 flex items-center gap-3 text-accent">
              <span aria-hidden="true" className="h-px w-10 bg-accent/70" />
              CONTACT / {siteConfig.availability.status.toUpperCase()}
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <Reveal y={26}>
              <h1 className="font-display text-[clamp(2.1rem,6.6vw,5.2rem)] leading-[0.9] tracking-[-0.04em] text-ink">
                LET’S CREATE
                <br />
                SOMETHING
                <br />
                <span className="text-ink-3">
                  WORTH WATCHING<span className="text-accent">.</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-[36ch] text-sm leading-relaxed text-ink-2 lg:pb-3">
                Have a project, brand or idea? I’d love to hear about it. Reels, YouTube, podcasts, brand films,
                documentary — or a raw folder you can’t make sense of yet.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-[1680px] gap-10 border-t border-line px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-10 lg:py-20">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <p className="label shrink-0">01 / BRIEF</p>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </div>
            <ContactForm />
          </div>

          <aside aria-label="Contact details">
            <div className="mb-8 flex items-center gap-4">
              <p className="label shrink-0">02 / DIRECT</p>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </div>
            <ContactDetails variant="page" />
          </aside>
        </div>

        <div className="border-t border-line-soft">
          <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
            <p className="label text-[0.55rem]">
              FORM GOES STRAIGHT TO {siteConfig.email.toUpperCase()}
            </p>
            <p className="text-xs text-ink-3">
              Prefer video? Record a 60-second brief and send it to{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-ink underline decoration-accent/60 underline-offset-4">
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
