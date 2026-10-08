import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";

/** Frame out — 404 keeps the same language as the rest of the site. */
export default function NotFound() {
  return (
    <PageTransition>
      <section className="mx-auto flex min-h-[80svh] w-full max-w-[1680px] flex-col justify-center px-4 pt-24 pb-16 sm:px-6 lg:px-10">
        <p className="label mb-6 flex items-center gap-3 text-warm">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-warm" />
          ERROR 404 / CLIP NOT FOUND
        </p>
        <h1 className="font-display text-[clamp(2.6rem,12vw,8rem)] leading-[0.86] tracking-[-0.045em] text-ink">
          FRAME
          <br />
          <span className="text-ink-3">OUT.</span>
        </h1>
        <p className="mt-6 max-w-[44ch] text-sm leading-relaxed text-ink-2">
          This scene isn’t in the project bin. The timeline is back that way.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={13} />
            BACK TO THE HERO
          </Link>
          <Link to="/work" className="btn btn-ghost">
            VIEW THE WORK
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
