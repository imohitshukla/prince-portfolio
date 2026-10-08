import heroPoster from "@/assets/hero-poster.jpg";

/**
 * ------------------------------------------------------------------
 *  SITE CONFIG — single source of truth for every personal detail.
 *  Nothing below should be duplicated inside components.
 * ------------------------------------------------------------------
 */

const env = import.meta.env as Record<string, string | undefined>;

export const siteConfig = {
  name: "PRINCE",
  fullName: "Prince Maurya",
  role: "Video Editor • Creative",
  age: 20,
  location: "India — working worldwide, remote-first",

  // ✅ REAL EMAIL — live
  email: "mauryaprince2171@gmail.com",

  socials: [
    {
      id: "instagram",
      label: "Instagram",
      // ✅ REAL — live. Note: the share link you sent ended in
      //   ?stkn=Zm5zZ3N1Yzhlcjc0  — that is a share-tracking token, not part of
      //   your address. The clean profile URL below is the correct one to ship:
      //   shorter, no tracking, and it can't expire the way a share token can.
      href: "https://www.instagram.com/edit.ingdesk/",
      handle: "@edit.ingdesk",
    },
    // LinkedIn removed per request.
    // YouTube removed — no real URL was provided, and shipping a link to the
    // youtube.com homepage would look broken. To add it back, uncomment:
    // {
    //   id: "youtube",
    //   label: "YouTube",
    //   href: "https://www.youtube.com/@yourchannel",
    //   handle: "@yourchannel",
    // },
  ],

  availability: {
    open: true,
    status: "Open for projects",
    note: "Currently taking 2–3 edits per month. Fastest reply inside 24 hours.",
  },

  /**
   * Contact form endpoint (optional override).
   * Leave EMPTY → form already emails mauryaprince2171@gmail.com via FormSubmit.
   * Set VITE_CONTACT_ENDPOINT in a .env file only if you want Formspree /
   * Web3Forms / Resend / EmailJS instead.
   */
  contactEndpoint: env.VITE_CONTACT_ENDPOINT ?? "",

  /** Hero media. Data-driven — swap type to "video" and drop in a file. */
  hero: {
    eyebrow: "VIDEO EDITOR • CREATIVE",
    headline: [
      { text: "Hi, I’m Prince." },
      { text: "Bringing creative concepts" },
      { text: "into timeline." },
      { text: "Helping you stand out." },
    ],
    mantra: ["EDIT", "STORY", "CREATE"],
    scrollCue: "SCROLL TO EXPLORE",
    media: {
      /**
       * DROP YOUR SHOWREEL HERE.
       *
       * Put the file in `public/media/showreel.mp4` and change the line below to:
       *     videoSrc: "/media/showreel.mp4",
       *
       * That is the only edit needed — the hero switches itself to a video
       * whenever `videoSrc` is non-empty, and falls back to `poster` if the
       * file is missing. Leave it as "" to keep the poster image.
       *
       * Spec: 6–12s seamless loop · H.264 MP4 · under 4 MB · NO audio track
       * (it always plays muted, so audio is wasted file size).
       */
      videoSrc: "",

      // REPLACE THIS WITH A FRAME FROM THE REAL SHOWREEL
      poster: heroPoster,
      alt: "Prince in a darkened edit suite, hands over a colour-grading console with a glowing timeline",
      caption: "SHOWREEL 2026 — 01:42",
    },
  },

  /** Optional Linear-style wheel easing. Off by default for native feel. */
  smoothScroll: false,

  accent: "#7C5CFF",
  copyrightYear: new Date().getFullYear(),
};

export type SiteConfig = typeof siteConfig;
