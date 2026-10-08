# public/media/ — drop your videos here

Two kinds of file belong here.

## 1. The hero showreel

| File | Spec |
|------|------|
| `showreel.mp4` | 6–12 s loop, H.264 MP4, **≤ 4 MB**, 1920 × 1080 (or 1080 × 1920 if vertical) |
| `showreel-poster.jpg` | the first frame, ≤ 250 KB |

Then in `src/data/siteConfig.ts`:

```ts
hero: {
  media: {
    type: "video",                        // ← was "image"
    videoSrc: "/media/showreel.mp4",      // ← your file
    poster: showreelPoster,               // see note below
    alt: "Describe the shot for screen readers",
    caption: "SHOWREEL 2026 — 01:42",
  },
}
```

**Poster note:** files in `public/` cannot be `import`ed. Use a plain string for the poster:

```ts
poster: "/media/showreel-poster.jpg",
```

(Or keep the bundled `heroPoster` import from `src/assets/` — that also works, and is what
ships today.)

The video is always `muted · playsInline · loop · preload="metadata"` and gets a real
PLAY / PAUSE button. If the file 404s the hero silently falls back to the poster, so the page
never breaks.

Export settings that work well: H.264, yuv420p, no audio track, 24–30 fps, ~6 Mbps,
`-movflags +faststart` so it starts playing before it finishes downloading.

## 2. Project hover loops

Short clips (1–3 s, ≤ 2 MB, audio removed) that play muted while a card is hovered:

```ts
// src/data/projects.ts
{
  id: "social-media-reel",
  …
  localVideo: "/media/reel-01-loop.mp4",
}
```

Leave the field out entirely and the card just uses the still.
