# Projects Page — Screenshot Preview Design Spec

**Date:** 2026-06-02
**Status:** Approved

---

## Overview

Replace the colored gradient "cover art" area on the Projects detail panel with a real screenshot of the live project, wrapped in a minimal browser chrome (macOS dots + URL bar). The existing gradient stays as a CSS fallback behind the image. Project title/subtitle move below the screenshot into the body.

---

## Architecture

**Two parts:**

1. **Screenshot capture** — Playwright navigates to each project's live URL, waits for the page to settle, and saves a 1280×720 PNG to `public/previews/<slug>.png`. Run once; images are committed to the repo.

2. **UI update** — `src/projects/page.tsx` gains a `preview` field per project, and the cover area is rebuilt to show the browser chrome + `<img>` over the gradient fallback.

No new files beyond the four PNGs and the one `.tsx` edit.

---

## Screenshot Files

| Project | URL | Output file |
|---|---|---|
| Creo | `https://creo-whiteboard.vercel.app` | `public/previews/creo.png` |
| Coach Platform | `https://coach-platform-template.vercel.app` | `public/previews/coach.png` |
| DSA Tracker | `https://dsa-tracker-gamified.vercel.app` | `public/previews/dsa-tracker.png` |
| YouTube Analysis | `https://cactro-youtube-analysis.vercel.app` | `public/previews/youtube.png` |

Capture spec: viewport `1280×720`, wait for `networkidle`, full-page `false`.

---

## Project Data Changes

Add a `preview` field to each project object in `src/projects/page.tsx`:

```ts
{
  title: 'Creo — Collaborative Whiteboard',
  ...
  preview: '/previews/creo.png',
  gradient: 'from-purple-700 via-blue-700 to-indigo-800', // kept as fallback
}
```

---

## Cover Area Redesign

The current `<div className="relative h-72 bg-gradient-to-br ...">` is replaced with:

```
┌─────────────────────────────────────────────────┐
│ [●][●][●]  creo-whiteboard.vercel.app  [↗ Live] │  ← chrome bar (translucent)
│                                                  │
│           <img src="/previews/creo.png" />       │  ← screenshot fills remaining height
│           (gradient behind as CSS fallback)      │
│                                                  │
│████████████████████████████████████████████████  ← bottom fade overlay
└─────────────────────────────────────────────────┘
```

**Height:** remains `h-72` (288px total — chrome bar ~36px + image fills the rest).

**Chrome bar:**
- Background: `bg-black/50 backdrop-blur-sm`
- Left: three colored dots (red `#ff5f57`, yellow `#febc2e`, green `#28c840`), 8px each
- Center: URL pill (`bg-white/8 rounded text-gray-400 font-mono text-xs`) showing the live URL
- Right: `↗ Live Demo` link (lime-green, opens in new tab)

**Screenshot image:**
- `<img src={project.preview} alt={project.title} className="w-full h-full object-cover object-top" />`
- Wrapped in a flex-1 div that fills remaining height after chrome bar
- Gradient div stays as absolute background behind the img (CSS fallback if image fails)

**Bottom fade:** `absolute bottom-0 h-16 bg-gradient-to-t from-gray-950` — same as current.

**Stars:** remain top-right `absolute top-4 right-6`.

---

## Title/Subtitle Location

Project title and subtitle move **out of the cover area** and into the body section, appearing above the description:

```
[body padding area]
  Project N of 4          ← small label
  Creo — Collaborative…   ← h1 (existing, just moved)
  Real-time distributed…  ← subtitle (existing, just moved)
  [description]
  [tech stack]
  [buttons]
```

This keeps the screenshot clean (not obscured by text) and lets the title breathe in the body.

---

## Files Changed

| File | Change |
|---|---|
| `public/previews/creo.png` | New — Playwright screenshot |
| `public/previews/coach.png` | New — Playwright screenshot |
| `public/previews/dsa-tracker.png` | New — Playwright screenshot |
| `public/previews/youtube.png` | New — Playwright screenshot |
| `src/projects/page.tsx` | Add `preview` field to data; rebuild cover area; move title to body |

---

## Out of Scope

- Auto-refreshing screenshots on deploy
- Hover zoom on the screenshot
- Video previews
