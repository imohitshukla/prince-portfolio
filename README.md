# PRINCE — Portfolio of Prince Maurya, Video Editor

Dark, cinematic, panel-driven portfolio. React + Vite + Tailwind v4 + Framer Motion + Lucide.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/index.html (single self-contained file)
```

## Where things live

| I want to… | Edit |
|------------|------|
| **change the videos** | **`docs/10_Changing_Videos.md`** ← start here |
| **add my own videos and photos** | `docs/09_Adding_Your_Media.md` |
| change name, email, socials, availability, hero media, contact endpoint | `src/data/siteConfig.ts` |
| change a project (title, copy, thumbnail, video link, tools, year) | `src/data/projects.ts` |
| change about-page copy, skills, journey, tools, stats | `src/data/content.ts` |
| change colours, type scale, buttons, 3D utilities, reduced-motion rules | `src/styles/globals.css` |

Media folders are ready for you: `public/media/` (showreel + hover loops) and `public/work/`
(thumbnails) — both have a README with the exact sizes and export settings.

Search the repo for `REPLACE THIS` for every asset and link that must be swapped before launch.

## Interaction map

* `WORK` in the nav, the hero CTA row, the home strip and `/work` all reach the same six projects.
* `?panel=work`, `?panel=contact`, `?project=<id>` are real, shareable URLs — Escape, backdrop, the
  close button and the browser Back key all behave (one press closes one layer).
* Tilt/parallax are capped at ±5°/±3° and switch off automatically on touch and reduced motion.

## Docs

`docs/01_PRD.md` · `02_TRD.md` · `03_AppFlow.md` · `04_UIUX_Design.md` ·
`05_Backend_Schema.md` · `06_Implementation_Plan.md` · `07_Content_Replacement_Guide.md` ·
`08_Testing_Checklist.md`
