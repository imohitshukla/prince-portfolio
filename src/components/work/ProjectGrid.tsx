import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { shortFormProjects } from "@/data/projects";

/**
 * /work layout — short-form cards staggered on a 12-column grid at different
 * widths. Rhythm and scale variation instead of an even card grid.
 * Long-form section removed per request.
 */
export function ProjectGrid() {
  return (
    <div className="space-y-20 lg:space-y-32">
      <section aria-labelledby="short-form-heading">
        <SectionHeading
          index="A"
          label="SHORT-FORM / VERTICAL"
          title={<span id="short-form-heading">Five ways to hold a thumb.</span>}
          description="Vertical cuts engineered for the feed: hook, beat, payoff. Every frame earns the next one."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-12 lg:gap-8">
          {shortFormProjects.map((project, i) => {
            const spans = [
              "sm:col-span-7",
              "sm:col-span-5 sm:mt-12",
              "sm:col-span-5 sm:col-start-2",
              "sm:col-span-7 sm:col-start-7 sm:-mt-10",
              "sm:col-span-6 sm:col-start-4",
            ];
            const widths = [
              "max-w-[560px]",
              "max-w-[430px]",
              "max-w-[430px]",
              "max-w-[560px]",
              "max-w-[480px]",
            ];
            return (
              <Reveal
                key={project.id}
                delay={i * 0.06}
                y={30}
                className={`${spans[i] ?? "sm:col-span-6"} ${i > 1 ? "sm:mt-0" : ""}`}
              >
                <ProjectCard
                  project={project}
                  variant="short"
                  eager={i < 2}
                  className={`${widths[i] ?? "max-w-[480px]"} mx-auto w-full lg:mx-0`}
                />
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
