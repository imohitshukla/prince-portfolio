/**
 * Page copy that isn’t personal-contact data. Kept out of the JSX so Prince
 * can rewrite sentences without touching components.
 */

export const skills = [
  {
    id: "storytelling",
    number: "01",
    title: "Storytelling",
    icon: "clapperboard",
    body: "Turning raw footage into a clear and engaging story.",
    details: ["Selects and string-outs", "Narrative order over chronology", "Emphasis on the turn"],
  },
  {
    id: "editing",
    number: "02",
    title: "Editing",
    icon: "scissors",
    body: "Clean cuts, pacing, captions, sound design, transitions and visual storytelling.",
    details: ["J-cut / L-cut rhythm", "Speed ramps & matched cuts", "Sound design and mix pass"],
  },
  {
    id: "content",
    number: "03",
    title: "Content",
    icon: "eye",
    body: "Understanding hooks, retention and how content works on social platforms.",
    details: ["3-second hook testing", "Retention dips re-timed", "Platform-safe crops & captions"],
  },
] as const;

export const journey = [
  {
    id: "learning",
    stage: "Learning",
    year: "2021",
    note: "Started on a phone — CapCut, free LUTs, copying edits frame by frame to understand why they worked.",
  },
  {
    id: "creating",
    stage: "Creating",
    year: "2022",
    note: "Shot and cut shorts for friends and local brands. Learned what footage is easy to edit and what isn’t.",
  },
  {
    id: "editing",
    stage: "Editing",
    year: "2023 — 2024",
    note: "Moved into Premiere and After Effects properly: multicam, sound design, colour, delivery specs.",
  },
  {
    id: "improving",
    stage: "Improving",
    year: "2025 — NOW",
    note: "Studying retention analytics on every publish, then rebuilding the structure of the next one around it.",
  },
] as const;

export const tools = [
  { name: "Adobe Premiere Pro", level: 95, use: "Assembly, multicam, pacing, sound", icon: "video" },
  { name: "After Effects", level: 82, use: "Motion graphics, tracking, compositing", icon: "sparkles" },
  { name: "Photoshop", level: 78, use: "Thumbnails, clean plates, key art", icon: "palette" },
  { name: "CapCut", level: 90, use: "Native-caption-first vertical edits", icon: "smartphone" },
] as const;

export const capabilities = [
  "Short-form reels",
  "YouTube retention edits",
  "Podcast clips",
  "Brand films",
  "Sound design",
  "Motion graphics",
  "Captions & subtitles",
  "Colour grading",
  "Thumbnail systems",
  "Long-form docs",
] as const;

export const workflow = [
  { step: "01", title: "Brief & footage", body: "You send the raw files, references and the outcome you want. I confirm scope in a day." },
  { step: "02", title: "Selects & story", body: "Everything is logged, the strongest beats are pulled, then the structure is agreed before any polish." },
  { step: "03", title: "Cut & sound", body: "Pacing pass, motion, captions, sound design and a mix that survives phone speakers." },
  { step: "04", title: "Deliver & iterate", body: "Two revision rounds included. Masters in every ratio and format you need." },
] as const;

export const stats = [
  { value: "300+", label: "EDITS DELIVERED" },
  { value: "4.2×", label: "AVG. RETENTION LIFT" },
  { value: "24h", label: "FIRST REPLY" },
  { value: "2", label: "REVISION ROUNDS" },
] as const;
