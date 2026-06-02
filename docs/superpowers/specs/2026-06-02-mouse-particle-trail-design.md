# Mouse Particle Trail — Design Spec

**Date:** 2026-06-02  
**Status:** Approved

---

## Overview

Add a lime-green particle trail that follows the mouse cursor across the portfolio. Particles spawn at the cursor position, drift slightly, shrink, and fade out over 500ms. Implemented entirely in `src/components/BackgroundEffects.tsx` using a `<canvas>` element and `requestAnimationFrame` — zero React re-renders.

---

## Architecture

All changes are confined to `src/components/BackgroundEffects.tsx`.

- A `<canvas>` element is added inside the existing `fixed inset-0 pointer-events-none` wrapper, covering the full viewport.
- A single `useEffect` sets up:
  - A `mousemove` event listener that records the cursor position
  - A `resize` event listener that keeps the canvas sized to the viewport
  - A `requestAnimationFrame` draw loop
  - Cleanup: `removeEventListener` + `cancelAnimationFrame` on unmount

No new files, no new components, no React state for particles.

---

## Particle Spec

| Property | Value |
|---|---|
| Spawn position | Cursor `(x, y)` at `mousemove` |
| Initial size | `3px` radius |
| Initial opacity | `0.8` |
| Color | `rgba(163, 230, 53, opacity)` — lime-green |
| Glow | `shadowBlur: 6`, `shadowColor: rgba(163, 230, 53, 0.6)` |
| Velocity drift | `vx`, `vy` each random in `[-0.3, +0.3]` px/frame |
| Lifetime | `500ms` (age goes `0 → 1` over 500ms) |
| Age step per frame | `1 / (500 / 16)` ≈ `0.032` per frame at 60fps |
| Size per frame | `3 * (1 - age)` |
| Opacity per frame | `0.8 * (1 - age)` |
| Max active particles | `50` — oldest removed when cap is reached |
| Death condition | `age >= 1` |

---

## Draw Loop (per frame)

1. Clear canvas (`clearRect`)
2. For each particle:
   - Increment `age`
   - Update `x += vx`, `y += vy`
   - Compute `size = 3 * (1 - age)`, `opacity = 0.8 * (1 - age)`
   - Set `ctx.shadowBlur`, `ctx.shadowColor`, `ctx.fillStyle`
   - Draw filled circle
3. Remove particles where `age >= 1`
4. Schedule next frame with `requestAnimationFrame`

---

## Layering

The canvas is inside the existing `BackgroundEffects` wrapper (`fixed inset-0 pointer-events-none`). It renders above the gradient blobs and grid but below all page content — no z-index changes needed to any other component.

---

## Cleanup

On unmount:
```ts
document.removeEventListener('mousemove', handleMouseMove);
window.removeEventListener('resize', handleResize);
cancelAnimationFrame(rafId);
```

---

## Files Changed

| File | Change |
|---|---|
| `src/components/BackgroundEffects.tsx` | Add canvas ref, useEffect with mousemove + resize listeners, rAF draw loop |

---

## Out of Scope

- Touch/pointer events (mouse only)
- Particle color variation
- Particle count configuration UI
