# Music Player Drawer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the header volume button's mute-toggle behavior with a SoundCloud music player dropdown drawer that slides down from the header.

**Architecture:** All changes are in `src/components/Header.tsx`. The volume button gains a `musicOpen` boolean state. When open, a `motion.div` drawer is rendered with `position: absolute` directly below the header's right side. A transparent fixed overlay sits behind the drawer so clicking outside closes it. The existing mute toggle moves inside the drawer.

**Tech Stack:** React, framer-motion (AnimatePresence), Tailwind CSS, lucide-react

---

### Task 1: Add `musicOpen` state and wire up the volume button

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Add `SOUNDCLOUD_URL` constant and `musicOpen` state**

  In `Header.tsx`, add the constant above the component and add `musicOpen` state alongside the existing states:

  ```tsx
  const SOUNDCLOUD_URL =
    'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/placeholder&color=%23a3e635&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false';

  const Header = () => {
    const navigate = useNavigate();
    const [muted, setMuted] = useState(false);
    const [musicOpen, setMusicOpen] = useState(false);   // ← add this
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');
  ```

- [ ] **Step 2: Update the volume button**

  Replace the existing volume button (lines 68–74 in current file) with this version that toggles `musicOpen` and highlights when open:

  ```tsx
  <button
    onClick={() => setMusicOpen((o) => !o)}
    title="Music Player"
    className={`transition-colors p-2 rounded-lg ${
      musicOpen
        ? 'text-black bg-lime-400'
        : 'text-gray-400 hover:text-lime-400 hover:bg-gray-800/50'
    }`}
  >
    {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
  </button>
  ```

- [ ] **Step 3: Make the header `relative` so the drawer can use absolute positioning**

  Change the `<motion.header>` opening className from `"w-full px-8 py-6"` to:

  ```tsx
  className="w-full px-8 py-6 relative z-40"
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/Header.tsx
  git commit -m "feat: wire volume button to musicOpen drawer state"
  ```

---

### Task 2: Add the music drawer

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Add the drawer inside `<motion.header>`, after the `<div className="flex justify-between...">` block**

  The drawer must be a direct child of `<motion.header>` (so `absolute` positions relative to it). Add this block immediately before the closing `</motion.header>` tag:

  ```tsx
  {/* Music player drawer */}
  <AnimatePresence>
    {musicOpen && (
      <motion.div
        initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
        animate={{ opacity: 1, y: 0, scaleY: 1 }}
        exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{ transformOrigin: 'top right' }}
        className="absolute right-8 top-full w-80 bg-[#1a1a1a] border border-lime-400 border-t-0 rounded-b-xl shadow-[0_8px_32px_rgba(163,230,53,0.15)] overflow-hidden z-50"
      >
        {/* Drawer header row */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
          <span className="text-lime-400 text-xs font-semibold tracking-widest">♪ NOW PLAYING</span>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-xs">Mute</span>
            <button
              onClick={() => setMuted((m) => !m)}
              className="text-gray-400 hover:text-lime-400 transition-colors"
              title={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
        {/* SoundCloud embed */}
        <div className="p-3">
          <iframe
            title="Music Player"
            width="100%"
            height="120"
            allow="autoplay"
            src={SOUNDCLOUD_URL}
            className="rounded-lg"
            style={{ border: 'none' }}
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add src/components/Header.tsx
  git commit -m "feat: add SoundCloud music player drawer to header"
  ```

---

### Task 3: Add click-outside overlay to dismiss the drawer

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Add the overlay in the fragment, after `</motion.header>` and before the search overlay**

  ```tsx
  {/* Click-outside overlay — closes music drawer */}
  {musicOpen && (
    <div
      className="fixed inset-0 z-30"
      onClick={() => setMusicOpen(false)}
    />
  )}
  ```

  The z-index stack is: overlay `z-30` → header `z-40` → drawer `z-50`. This means the overlay sits beneath the header and drawer, so clicks on the page background are caught but clicks on the header buttons still work.

- [ ] **Step 2: Commit**

  ```bash
  git add src/components/Header.tsx
  git commit -m "feat: dismiss music drawer on click-outside"
  ```

---

### Task 4: Manual verification

**Files:** none

- [ ] **Step 1: Start the dev server**

  ```bash
  npm run dev
  ```

  Open `http://localhost:5173` in a browser.

- [ ] **Step 2: Verify drawer open/close**

  Click the volume icon in the header. Expected:
  - Drawer slides down from below the header, aligned to the right
  - Volume button background turns lime-green
  - SoundCloud iframe loads inside the drawer (shows placeholder/error for placeholder URL — that's fine)

- [ ] **Step 3: Verify click-outside dismissal**

  While the drawer is open, click anywhere on the page outside the drawer. Expected: drawer closes, volume button returns to gray.

- [ ] **Step 4: Verify mute toggle inside drawer**

  Open the drawer. Click the mute button inside. Expected:
  - Icon switches between `Volume2` and `VolumeX`
  - Volume button icon in the header also reflects the mute state

- [ ] **Step 5: Verify search overlay still works**

  Click the search icon. Expected: existing search overlay opens over everything, unaffected by this change.

- [ ] **Step 6: Commit verification note**

  ```bash
  git commit --allow-empty -m "chore: verify music drawer behavior manually"
  ```
