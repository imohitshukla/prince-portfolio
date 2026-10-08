import reel01 from "@/assets/work/reel-01.jpg";
import reel02 from "@/assets/work/reel-02.jpg";
import reel03 from "@/assets/work/reel-03.jpg";
import reel04 from "@/assets/work/reel-04.jpg";
import reel05 from "@/assets/work/reel-05.jpg";

/**
 * ------------------------------------------------------------------
 *  PROJECTS — every card, panel row and detail view is rendered from
 *  this array. Add / remove entries freely; nothing is hardcoded in
 *  JSX. Replace each `thumbnail` and `videoUrl` with real assets.
 * ------------------------------------------------------------------
 */

export type ProjectType = "short" | "long";

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  type: ProjectType;
  description: string;
  role: string;
  tools: string[];
  /** Import a local file (bundled) or use a public URL. */
  thumbnail: string;
  /** REPLACE THIS WITH THE REAL VIDEO URL (YouTube / Vimeo / Drive). */
  videoUrl: string;
  year: number;
  featured: boolean;
  /** CSS aspect-ratio string used by the media frame. */
  aspectRatio: string;
  accentColor: string;
  duration: string;
  deliverables: string[];
  /** true = file is bundled by Vite, so no broken-image fallback is needed. */
  hasLocalPoster: true;

  /**
   * OPTIONAL — short local clip shown muted + looping on hover.
   * Put the file in `public/media/` and reference it by path, e.g.
   *   localVideo: "/media/reel-01.mp4"
   * Leave `undefined` to keep the thumbnail as a plain poster frame.
   * Keep clips under ~2 MB and TRIM THE AUDIO — it is always muted anyway.
   */
  localVideo?: string;
}

export const projects: Project[] = [
  {
    id: "documentary-short",
    number: "01",
    title: "IT Layoffs Documentary",
    category: "Short-form / Documentary",
    type: "short",
    description:
      "A hard-hitting 32-second vertical doc on the Indian IT job market. TCS, Infosys and Tech Mahindra layoffs framed with urgency, kinetic text and a clear narrative arc that lands the stakes in under half a minute.",
    role: "Editor • Story structure • Captions",
    tools: ["Premiere Pro", "After Effects", "CapCut"],
    thumbnail: reel01,
    videoUrl: "/media/doc-reel.mp4",
    year: 2026,
    featured: true,
    aspectRatio: "9 / 16",
    accentColor: "#7C5CFF",
    duration: "0:32",
    deliverables: ["9:16 master", "Captions burned + SRT", "Thumbnail still"],
    hasLocalPoster: true,
    localVideo: "/media/doc-reel.mp4",
  },
  {
    id: "motivational-short",
    number: "02",
    title: "Peter Dinklage — Bumblebee",
    category: "Short-form / Motivational",
    type: "short",
    description:
      "A 11-second power cut of Peter Dinklage’s aerodynamic bumblebee monologue. Tight close-ups, punch-in rhythm and text that lands exactly on the beat so the idea sticks after one watch.",
    role: "Editor • Pacing • Type",
    tools: ["Premiere Pro", "After Effects"],
    thumbnail: reel02,
    videoUrl: "/media/peter-reel.mp4",
    year: 2026,
    featured: true,
    aspectRatio: "9 / 16",
    accentColor: "#E2A679",
    duration: "0:11",
    deliverables: ["9:16 master", "Caption track", "Hook variant"],
    hasLocalPoster: true,
    localVideo: "/media/peter-reel.mp4",
  },
  {
    id: "podcast-short",
    number: "03",
    title: "Podcast Clip — Awareness",
    category: "Short-form / Clip mining",
    type: "short",
    description:
      "Pulled the strongest 34 seconds from a longer conversation on self-realization and constant awareness. Multi-cam energy, punch-ins on every idea change, and captions that keep the talk alive even on mute.",
    role: "Editor • Clip selection • Captions",
    tools: ["Premiere Pro", "Descript", "CapCut"],
    thumbnail: reel03,
    videoUrl: "/media/podcast-reel.mp4",
    year: 2026,
    featured: false,
    aspectRatio: "9 / 16",
    accentColor: "#9E8BFF",
    duration: "0:34",
    deliverables: ["3 clip variants", "Speaker labels", "Thumbnail still"],
    hasLocalPoster: true,
    localVideo: "/media/podcast-reel.mp4",
  },
  {
    id: "real-estate-reel",
    number: "04",
    title: "Real Estate Intro — Gabe",
    category: "Short-form / Commercial",
    type: "short",
    description:
      "A 24-second vertical brand intro for a Cleveland real-estate expert. Clean text animations, property overlays and a confident delivery cut that sells expertise in the first three seconds.",
    role: "Editor • Motion • Text design",
    tools: ["Premiere Pro", "After Effects", "Photoshop"],
    thumbnail: reel04,
    videoUrl: "/media/realestate-reel.mp4",
    year: 2026,
    featured: true,
    aspectRatio: "9 / 16",
    accentColor: "#6FD3C8",
    duration: "0:24",
    deliverables: ["Hero 9:16", "Paid-social 4:5", "Clean end card"],
    hasLocalPoster: true,
    localVideo: "/media/realestate-reel.mp4",
  },
  {
    id: "vito-godfather",
    number: "05",
    title: "Vito Corleone — Legacy",
    category: "Short-form / Cinematic",
    type: "short",
    description:
      "A 13-second black-and-white cinematic piece on Vito Corleone. Minimal type, elegant transitions and a measured pace that lets the legend speak without noise.",
    role: "Editor • Colour • Type animation",
    tools: ["Premiere Pro", "After Effects", "Photoshop"],
    thumbnail: reel05,
    videoUrl: "/media/vito-reel.mp4",
    year: 2026,
    featured: false,
    aspectRatio: "9 / 16",
    accentColor: "#B9C4FF",
    duration: "0:13",
    deliverables: ["9:16 master", "Type system", "Still frames"],
    hasLocalPoster: true,
    localVideo: "/media/vito-reel.mp4",
  },
];

export const shortFormProjects = projects.filter((p) => p.type === "short");
export const longFormProjects = projects.filter((p) => p.type === "long");

export const projectCount = projects.length;

export function getProjectById(id: string | null | undefined): Project | undefined {
  if (!id) return undefined;
  return projects.find((p) => p.id === id);
}
