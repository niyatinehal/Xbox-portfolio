# Projects Screenshot Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the colored gradient "cover art" on the Projects detail panel with a real browser-chrome-framed screenshot of each live project.

**Architecture:** Playwright captures 1280×720 PNGs of each live URL into `public/previews/`. The project data gains a `preview` field. The cover area in `src/projects/page.tsx` is rebuilt as a flex column: translucent chrome bar on top, screenshot filling the rest, gradient staying as CSS background fallback. Title/subtitle move from the cover into the body section.

**Tech Stack:** React, TypeScript, Tailwind CSS, framer-motion, Playwright MCP (for capture)

---

### Task 1: Capture screenshots into `public/previews/`

**Files:**
- Create: `public/previews/creo.png`
- Create: `public/previews/coach.png`
- Create: `public/previews/dsa-tracker.png`
- Create: `public/previews/youtube.png`

- [ ] **Step 1: Create the output directory**

```bash
mkdir -p public/previews
```

- [ ] **Step 2: Screenshot Creo**

Using the Playwright MCP browser tools:
1. Navigate to `https://creo-whiteboard.vercel.app`
2. Resize viewport to 1280×720
3. Wait 3 seconds for page to settle
4. Take screenshot and save as `public/previews/creo.png`

- [ ] **Step 3: Screenshot Coach Platform**

1. Navigate to `https://coach-platform-template.vercel.app`
2. Resize viewport to 1280×720
3. Wait 3 seconds
4. Save as `public/previews/coach.png`

- [ ] **Step 4: Screenshot DSA Tracker**

1. Navigate to `https://dsa-tracker-gamified.vercel.app`
2. Resize viewport to 1280×720
3. Wait 3 seconds
4. Save as `public/previews/dsa-tracker.png`

- [ ] **Step 5: Screenshot YouTube Analysis**

1. Navigate to `https://cactro-youtube-analysis.vercel.app`
2. Resize viewport to 1280×720
3. Wait 3 seconds
4. Save as `public/previews/youtube.png`

- [ ] **Step 6: Verify all four files exist**

```bash
ls -lh public/previews/
```
Expected: four `.png` files, each > 50KB.

- [ ] **Step 7: Commit**

```bash
git add public/previews/
git commit -m "feat: add project preview screenshots"
```

---

### Task 2: Update project data and rebuild cover area

**Files:**
- Modify: `src/projects/page.tsx`

- [ ] **Step 1: Add `preview` field to each project in the data array**

Replace the existing `projects` array (lines 5–54) with:

```tsx
const projects = [
  {
    title: 'Creo — Collaborative Whiteboard',
    subtitle: 'Real-time distributed whiteboard',
    description:
      'Full-stack distributed system with WebSocket-powered real-time sync, allowing remote teams to draw and collaborate concurrently. Built with a Next.js 15 frontend, Express backend, PostgreSQL persistence, all wired together in a Turborepo monorepo.',
    tags: ['Next.js 15', 'TypeScript', 'WebSocket', 'PostgreSQL', 'Drizzle ORM', 'Turborepo'],
    link: 'https://creo-whiteboard.vercel.app',
    githubLink: 'https://github.com/niyatinehal/whiteboard',
    gradient: 'from-purple-700 via-blue-700 to-indigo-800',
    accentColor: 'bg-purple-500',
    rating: 5,
    preview: '/previews/creo.png',
  },
  {
    title: 'Coach Platform Template',
    subtitle: 'Course management & client portal',
    description:
      'Comprehensive coaching platform built for coaches who need to manage courses, interact with clients, and track analytics — all in one place. Features a polished client portal and analytics dashboard built with Next.js and TypeScript.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React.js'],
    link: 'https://coach-platform-template.vercel.app',
    githubLink: 'https://github.com/niyatinehal/coach-platform-template',
    gradient: 'from-emerald-700 via-teal-700 to-green-800',
    accentColor: 'bg-emerald-500',
    rating: 5,
    preview: '/previews/coach.png',
  },
  {
    title: 'DSA Tracker Gamified',
    subtitle: 'Gamified interview prep with 3D visuals',
    description:
      'Developers had no engaging way to track DSA interview prep. This gamified tracker adds 3D visualizations powered by Three.js, an integrated code editor, and a progress system that keeps you coming back — built with React, TypeScript, and Redux.',
    tags: ['React.js', 'TypeScript', 'Three.js', 'Redux'],
    link: 'https://dsa-tracker-gamified.vercel.app',
    githubLink: 'https://github.com/niyatinehal/DSA_tracker_gamified',
    gradient: 'from-orange-700 via-red-700 to-rose-800',
    accentColor: 'bg-orange-500',
    rating: 5,
    preview: '/previews/dsa-tracker.png',
  },
  {
    title: 'YouTube Analysis Tool',
    subtitle: 'Channel analytics for content creators',
    description:
      'Full-stack analytics platform that fetches YouTube channel data via API and surfaces it through interactive Recharts visualisations. Helps content creators understand their performance trends at a glance without leaving the browser.',
    tags: ['React.js', 'Node.js', 'TypeScript', 'Recharts'],
    link: 'https://cactro-youtube-analysis.vercel.app',
    githubLink: 'https://github.com/niyatinehal/cactro-youtube-analysis',
    gradient: 'from-red-700 via-pink-700 to-rose-800',
    accentColor: 'bg-red-500',
    rating: 4,
    preview: '/previews/youtube.png',
  },
];
```

- [ ] **Step 2: Replace the cover area**

Find the current cover area block (starts at `{/* Cover art */}` and ends at its closing `</div>` before `{/* Body */}`). Replace the entire cover area div with:

```tsx
{/* Cover area — browser chrome + screenshot */}
<div className={`relative h-72 bg-gradient-to-br ${project.gradient} flex-shrink-0 flex flex-col`}>
  {/* Browser chrome bar */}
  <div className="flex items-center gap-2 px-4 py-2.5 bg-black/50 backdrop-blur-sm border-b border-white/[0.08] flex-shrink-0 z-10">
    <div className="flex gap-1.5">
      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
    </div>
    <div className="flex-1 bg-white/[0.08] rounded px-3 py-1 text-gray-400 font-mono text-[11px] truncate">
      {project.link.replace('https://', '')}
    </div>
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-lime-400 text-xs font-semibold hover:text-lime-300 transition-colors flex-shrink-0"
    >
      ↗ Live
    </a>
  </div>

  {/* Screenshot */}
  <div className="flex-1 overflow-hidden relative">
    <img
      src={project.preview}
      alt={project.title}
      className="w-full h-full object-cover object-top"
    />
    {/* Bottom fade into body */}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
  </div>

  {/* Stars */}
  <div className="absolute top-12 right-6 flex items-center gap-1 z-10">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < project.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
      />
    ))}
  </div>
</div>
```

- [ ] **Step 3: Move title/subtitle into the body section**

Find the `{/* Body */}` section. Replace the opening of its content div with:

```tsx
{/* Body */}
<div className="flex-1 px-8 py-8 max-w-3xl">
  {/* Project number + title (moved from cover) */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-6"
  >
    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
      Project {selected + 1} of {projects.length}
    </p>
    <h1 className="text-3xl font-bold text-white leading-tight mb-1">{project.title}</h1>
    <p className="text-lime-300 text-sm">{project.subtitle}</p>
  </motion.div>

  {/* Description */}
  <motion.p
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="text-gray-300 text-base leading-relaxed mb-8"
  >
    {project.description}
  </motion.p>
  {/* Keep tech stack and action buttons exactly as they are in the current file — no changes needed there */}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add src/projects/page.tsx
git commit -m "feat: project detail panel with screenshot preview and browser chrome"
```

---

### Task 3: Manual verification

**Files:** none

- [ ] **Step 1: Build and preview**

```bash
npm run build && npx vite preview --port 4178
```

- [ ] **Step 2: Navigate to Projects page**

Open `http://localhost:4178/projects`.

Expected:
- Creo selected by default — browser chrome bar shows `creo-whiteboard.vercel.app`
- Screenshot fills the area below the chrome bar
- Stars appear top-right
- Title "Creo — Collaborative Whiteboard" appears in the body below the screenshot

- [ ] **Step 3: Click each project in the sidebar**

Expected for each: screenshot changes, chrome URL bar updates, gradient fallback shows only if screenshot fails to load.

- [ ] **Step 4: Click ↗ Live in the chrome bar**

Expected: opens the live site in a new tab.

- [ ] **Step 5: Commit**

```bash
git commit --allow-empty -m "chore: verify projects screenshot preview"
```
