# public/work/ — drop your project thumbnails here

Put stills in this folder and reference them **by path** (no import needed):

```ts
// src/data/projects.ts
thumbnail: "/work/reel-01.jpg",
```

## Recommended exports

| Project type | File | Size |
|--------------|------|------|
| Short-form (01–04) | `reel-01.jpg` … `reel-04.jpg` | **1080 × 1920** (9:16) |
| Long-form (05–06) | `long-01.jpg`, `long-02.jpg` | **1920 × 1080** (16:9) |

JPG or WebP, quality ~80, **under 400 KB each**. No baked-in text — the UI adds its own labels.

## File names are yours to choose

Rename freely, just keep the path in `projects.ts` matching exactly (case-sensitive).
If a file is missing you get the labelled "MEDIA PLACEHOLDER" panel instead of a broken
image icon, so you can ship before every asset is ready.

## `public/` vs `src/assets/`

| | `public/work/` | `src/assets/` |
|---|---|---|
| How to reference | path string `"/work/reel-01.jpg"` | `import reel01 from "@/assets/work/reel-01.jpg"` |
| Build output | separate files, **smaller HTML** | inlined into the single HTML, **larger HTML** |
| Works when opened as a bare `file://` page | ❌ needs a web server | ✅ |
| Best for | real deployment | this preview / offline sharing |

Current build is a single self-contained `index.html`, which is why the shipped placeholders live
in `src/assets/work/`. Move them here once you deploy to Netlify/Vercel/Pages to keep the page light.

## Also add here (optional)

- `reel-01.mp4` … — 1–3 s hover loops, then set `localVideo: "/work/reel-01.mp4"` in `projects.ts`
