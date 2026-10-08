import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AboutIntro } from "@/components/about/AboutIntro";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { SkillCard } from "@/components/about/SkillCard";
import { ToolsList } from "@/components/about/ToolsList";
import { PageTransition } from "@/components/layout/PageTransition";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/data/content";
import { siteConfig } from "@/data/siteConfig";
import { useUI } from "@/context/UIContext";

export default function About() {
  const { openPanel } = useUI();

  return (
    <PageTransition>
      <div className="mx-auto w-full max-w-[1680px] px-4 pt-28 pb-20 sm:px-6 sm:pt-36 lg:px-10 lg:pt-44 lg:pb-28">
        <AboutIntro />
      </div>

      {/* ---------- three disciplines ---------- */}
      <section aria-labelledby="skills-heading" className="border-t border-line-soft py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              index="01"
              label="WHAT I ACTUALLY DO"
              title={<span id="skills-heading">Three disciplines, one cut.</span>}
              description="Editing is the middle layer. Above it is the story decision; below it is how the platform behaves."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 [perspective:1400px] lg:grid-cols-3 lg:gap-6">
            {skills.map((skill, index) => (
              <Reveal key={skill.id} delay={index * 0.08} y={28} z={index === 1 ? 18 : 0} className="h-full">
                <SkillCard
                  number={skill.number}
                  title={skill.title}
                  body={skill.body}
                  details={skill.details}
                  icon={skill.icon}
                  className={index === 1 ? "lg:-mt-6" : index === 2 ? "lg:mt-6" : ""}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- journey ---------- */}
      <div className="border-t border-line-soft py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10">
          <JourneyTimeline />
        </div>
      </div>

      {/* ---------- tools ---------- */}
      <div className="border-t border-line-soft py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10">
          <ToolsList />
        </div>
      </div>

      {/* ---------- statement + CTA ---------- */}
      <section className="relative overflow-hidden border-t border-line py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 100% at 20% 110%, rgba(124,92,255,0.14), transparent 62%)" }}
        />
        <div className="relative mx-auto grid w-full max-w-[1680px] gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-10">
          <Reveal>
            <blockquote className="max-w-[22ch] font-display text-[clamp(1.8rem,5.6vw,3.6rem)] leading-[0.98] tracking-[-0.035em] text-ink">
              “Every second has to justify the next one.”
            </blockquote>
            <p className="label mt-6">{siteConfig.fullName} — {siteConfig.role}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[22px] border border-line bg-bg-2 p-6 sm:p-7">
              <p className="text-sm leading-relaxed text-ink-2">
                Working with a client I’ve never met? Start with one test edit. Send 10 minutes of footage, get a
                cut back that shows you exactly how I think about pacing.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="btn btn-primary" onClick={() => openPanel("contact")}>
                  START A TEST EDIT
                </button>
                <Link to="/work" className="btn btn-ghost">
                  SEE THE WORK
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
