# Music Player Drawer — Design Spec

**Date:** 2026-06-02  
**Status:** Approved

---

## Overview

The volume button in the header (`Header.tsx`) currently toggles a mute state. It will be replaced with a trigger that opens a dropdown music player drawer. The drawer slides down from the header's right side, contains a SoundCloud embed iframe and a mute toggle, and can be dismissed by clicking outside.

---

## Architecture

All changes are confined to `src/components/Header.tsx`. No new files or routes are needed.

**State changes:**
- `musicOpen: boolean` — replaces the current `muted` toggle as the primary volume button action. Controls drawer open/close.
- `muted: boolean` — retained, but used only inside the drawer's mute toggle.

**Component structure inside `Header`:**
```
<Header>
  <motion.header>          ← existing, unchanged
    ...
    <VolumeButton>         ← click toggles musicOpen, highlighted when open
  </motion.header>

  <AnimatePresence>
    {musicOpen && (
      <MusicDrawer>        ← fixed-positioned dropdown, aligned under volume button
        <DrawerHeader>     ← "NOW PLAYING" label + mute toggle
        <SoundCloudEmbed>  ← <iframe> with placeholder URL
      </MusicDrawer>
    )}
  </AnimatePresence>

  <ClickOutsideOverlay>    ← transparent fixed div, closes drawer on click
  <SearchOverlay>          ← existing, unchanged
</Header>
```

---

## Behaviour

| Trigger | Result |
|---|---|
| Click volume button (drawer closed) | Opens drawer, volume icon highlights lime-green |
| Click volume button (drawer open) | Closes drawer, icon returns to gray |
| Click outside the drawer | Closes drawer |
| Click mute toggle inside drawer | Flips `muted` state, icon inside drawer changes between Volume2 / VolumeX |
| Drawer opens | SoundCloud iframe loads (autoplay controlled by SoundCloud embed params) |

---

## Visual Design

- Drawer drops from the header, flush with the bottom edge, aligned to the right
- Width: `320px`
- Background: `#1a1a1a`, border: `1px solid #a3e635` (lime), top border removed so it merges with header
- Border-radius: `0 0 12px 12px`
- Box shadow: `0 8px 32px rgba(163,230,53,0.15)`
- Drawer header row: `"♪ NOW PLAYING"` label (lime, 12px) + mute toggle on the right
- SoundCloud iframe: `height: 120px`, full width, `border-radius: 8px`

---

## Animation

Uses `framer-motion` (already in project). Drawer animates:
- `initial`: `{ opacity: 0, y: -8, scaleY: 0.95 }`
- `animate`: `{ opacity: 1, y: 0, scaleY: 1 }`
- `exit`: `{ opacity: 0, y: -8, scaleY: 0.95 }`
- `transition`: `{ type: 'spring', stiffness: 300, damping: 28 }`
- `transformOrigin`: `top right`

---

## SoundCloud Embed

Placeholder iframe URL (to be replaced with real playlist URL):

```
https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/placeholder&color=%23a3e635&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false
```

The `color` param is set to lime-green (`#a3e635`) to match the portfolio theme. `auto_play=false` keeps it quiet until the user interacts.

---

## Files Changed

| File | Change |
|---|---|
| `src/components/Header.tsx` | Replace mute-only volume button with drawer trigger; add drawer, mute toggle inside drawer, and click-outside overlay |

---

## Out of Scope

- Playlist management UI
- Track metadata display beyond what SoundCloud's embed provides
- Mobile drawer behaviour (SoundCloud iframe is responsive by default)
