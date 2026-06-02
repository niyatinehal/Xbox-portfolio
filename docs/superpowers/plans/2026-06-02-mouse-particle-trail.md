# Mouse Particle Trail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a lime-green particle trail that follows the mouse cursor, implemented as a canvas overlay inside `BackgroundEffects.tsx`.

**Architecture:** A `<canvas>` element covers the full viewport inside the existing `fixed inset-0 pointer-events-none` wrapper. Two `useEffect` calls handle (1) canvas sizing and (2) the particle system — a `mousemove` listener spawns particles and a `requestAnimationFrame` loop ages, moves, and draws them each frame. No React state is used for particles; everything lives in refs and closures.

**Tech Stack:** React (`useEffect`, `useRef`), HTML Canvas API, `requestAnimationFrame`

---

### Task 1: Add canvas element and resize handler

**Files:**
- Modify: `src/components/BackgroundEffects.tsx`

- [ ] **Step 1: Add imports and canvas ref**

  Replace the current import line:
  ```tsx
  import React from 'react';
  ```
  with:
  ```tsx
  import React, { useEffect, useRef } from 'react';
  ```

  Then add the canvas ref inside the component, before the `return`:
  ```tsx
  const canvasRef = useRef<HTMLCanvasElement>(null);
  ```

- [ ] **Step 2: Add resize effect**

  Add this `useEffect` inside the component, after the `canvasRef` declaration:
  ```tsx
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  ```

- [ ] **Step 3: Add canvas element to JSX**

  Inside the returned `<div className="fixed inset-0 overflow-hidden pointer-events-none">`, add the canvas as the last child (after the grid `<div>`):
  ```tsx
  <canvas
    ref={canvasRef}
    className="absolute inset-0 pointer-events-none"
    style={{ zIndex: 1 }}
  />
  ```

- [ ] **Step 4: Verify TypeScript compiles**

  ```bash
  npx tsc --noEmit
  ```
  Expected: no output (zero errors).

- [ ] **Step 5: Commit**

  ```bash
  git add src/components/BackgroundEffects.tsx
  git commit -m "feat: add canvas overlay to BackgroundEffects for particle trail"
  ```

---

### Task 2: Add particle system

**Files:**
- Modify: `src/components/BackgroundEffects.tsx`

- [ ] **Step 1: Add Particle type and constants above the component**

  Add these above the `const BackgroundEffects = () => {` line:
  ```tsx
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    age: number;
  }

  const AGE_STEP = 1 / (500 / 16); // ~0.032 per frame at 60fps
  const MAX_PARTICLES = 50;
  ```

- [ ] **Step 2: Add particle system useEffect**

  Add this `useEffect` inside the component, after the resize effect:
  ```tsx
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    let rafId = 0;

    const spawnParticle = (x: number, y: number) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        age: 0,
      });
    };

    const handleMouseMove = (e: MouseEvent) => spawnParticle(e.clientX, e.clientY);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += AGE_STEP;
        p.x += p.vx;
        p.y += p.vy;

        if (p.age >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const size = 3 * (1 - p.age);
        const opacity = 0.8 * (1 - p.age);

        ctx.save();
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(163, 230, 53, 0.6)';
        ctx.fillStyle = `rgba(163, 230, 53, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    document.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(draw);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
  ```

- [ ] **Step 3: Verify TypeScript compiles**

  ```bash
  npx tsc --noEmit
  ```
  Expected: no output (zero errors).

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/BackgroundEffects.tsx
  git commit -m "feat: add mouse particle trail to background"
  ```

---

### Task 3: Manual verification

**Files:** none

- [ ] **Step 1: Build and preview**

  ```bash
  npm run build && npx vite preview --port 4173
  ```
  Open `http://localhost:4173`.

- [ ] **Step 2: Verify particle trail appears**

  Move the mouse across the page. Expected:
  - Tiny lime-green dots appear at the cursor position
  - Each dot fades out and shrinks over ~500ms
  - Trail disperses slightly (random drift visible on fast swipes)
  - No visible jank at normal mouse speed

- [ ] **Step 3: Verify particles don't block clicks**

  Click buttons (Settings, Search, Ready to Explore). Expected: all clicks register normally — canvas is `pointer-events-none`.

- [ ] **Step 4: Verify resize**

  Resize the browser window. Expected: particle trail continues working edge-to-edge with no blank strips.

- [ ] **Step 5: Commit**

  ```bash
  git commit --allow-empty -m "chore: verify mouse particle trail manually"
  ```
