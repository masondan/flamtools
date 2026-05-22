# AGENTS.md — FlamTools Hub

**FlamTools** is a hub connecting specialized web apps (PromptFlam, PicFlam, AudioFlam, ChartFlam, MapFlam, VideoFlam, plus StoryFlam and FlamIt as training apps).

## Project Structure

This repository (`flamtools`) is a **SvelteKit app** deployed at `flamtools.com`. It serves as the central hub listing all apps. Individual apps live in separate repos:

- **PromptFlam** (GitHub) — SvelteKit + Svelte 5 (JS), localStorage-backed chat
- **PicFlam** (GitHub) — SvelteKit + Svelte 5 (JS), image crop/AI/design
- **AudioFlam** (GitHub) — SvelteKit + Svelte 5 (TS), reference implementation
- **ChartFlam** (GitHub) — Vanilla JS, CSV → charts
- **MapFlam** (GitHub) — Vite + Svelte 5 (TS, no SvelteKit), Leaflet maps
- **VideoFlam** (GitHub) — SvelteKit + Svelte 5, video tools

All apps target Cloudflare Pages for deployment.

## Hub Architecture

```
src/
├── routes/
│   ├── +page.svelte       # Hub homepage — lists all apps
│   └── +layout.svelte     # Root layout
├── lib/
│   ├── data/
│   │   └── links.json     # App registry (apps, toolkit, training)
│   └── assets/fonts/      # Inter + Saira fonts
static/
├── flam-nav.js            # FlamNav Web Component (served to all apps)
├── icons/                 # Per-app SVG icons
└── logos/                 # FlamTools brand assets
```

### App Registry (`links.json`)
Three categories:
- **`apps`** — 6 main apps (PromptFlam, PicFlam, AudioFlam, ChartFlam, MapFlam, VideoFlam)
- **`toolkit`** — External tools (Pixabay, NotebookLM, Converter, PDF tools, Subtitles, Multi-tool)
- **`training`** — 2 training apps (StoryFlam, FlamIt)

To add a new app, add an entry to the relevant array in [`src/lib/data/links.json`](src/lib/data/links.json) and add its icon to `static/icons/`.

## Key Context

### App Navigation
Apps are connected via a shared hamburger menu Web Component: **FlamNav** (`static/flam-nav.js`), served from `https://flamtools.com/flam-nav.js`.

**Usage:**
```html
<script src="https://flamtools.com/flam-nav.js"></script>
<flam-nav current="promptflam"></flam-nav>
```

**How FlamNav works:**
- Custom HTMLElement with Shadow DOM for encapsulation
- Renders a left-side drawer listing all 8 apps
- Current app highlighted in purple (`#5422b0`)
- Training apps (StoryFlam, FlamIt) shown in gray, separated by a divider
- Toggle with hamburger button or Escape key
- Self-positions drawer relative to app container using `getBoundingClientRect()`
- Overlay + drawer use `z-index: 9998/9999`; 250ms opacity transition

**Attributes:**
- `current` (string) — App ID to highlight (e.g., `"promptflam"`, `"audioflam"`)

**Container detection** (tried in order):
```javascript
this.closest('.app-container, .app, .page, .header, [class*="max-w"]')
// fallback:
this.closest('[style*="max-width"]')
```

### Add a new app to FlamNav
1. Open [`static/flam-nav.js`](static/flam-nav.js)
2. Add entry to the `apps` array inside `render()`:
   ```javascript
   { id: 'newapp', name: 'NewApp', url: 'https://newapp.flamtools.com' }
   // training apps add: training: true
   ```
3. The separator before training apps is inserted at index 6 (`i === 6`); adjust if adding non-training apps after VideoFlam
4. Also add to [`src/lib/data/links.json`](src/lib/data/links.json) and add icon to `static/icons/`

### Update FlamNav styling
Edit CSS inside the `render()` method in [`static/flam-nav.js`](static/flam-nav.js):
- Drawer width: `.drawer { width: 180px }`
- Accent color: `#5422b0`
- Hover background: `#f5f0fa`
- Current item background: `#f0e6f7`

### Design System
All apps use **CSS custom properties** (no Tailwind):
```css
--accent-brand: #5422b0     /* Primary UI color */
--text-primary: #1f1f1f     /* Body text */
--bg-main: #ffffff          /* App background */
--spacing-md: 16px          /* 4px base unit */
--radius: 12px              /* Border radius */
--app-max-width: 480px      /* Mobile-optimized */
```

The hub itself uses inline CSS vars (no shared token file) — fonts are Inter and Saira.

### Code Duplication
Expected duplications across apps (by design):
- Image utilities (crop, resize, export)
- localStorage patterns (persistence with prefix)
- Form validation
- CSV parsing (ChartFlam)

**Shared code:** None currently. Plan to extract into `@flamtools/design` and `@flamtools/utils` packages (future phases).

## Coding Standards

- **Framework:** SvelteKit preferred; Vite+Svelte acceptable
- **Language:** JavaScript or TypeScript (both used)
- **CSS:** Custom properties only; no inline styles in templates
- **State:** localStorage for client-side persistence
- **Components:** Atomic, single-responsibility design
- **Icons:** SVG inline or sprite-based

## Deployment

- **Domain:** flamtools.com (Cloudflare Pages)
- **Subdomains:** promptflam.flamtools.com, picflam.flamtools.com, etc.
- **Adapter:** `@sveltejs/adapter-cloudflare`
- **Static assets:** `static/` folder — `flam-nav.js` is served publicly to all apps

## References

- **CODEBASE_REVIEW.md** — Detailed analysis of all main apps
- **AudioFlam AGENTS.md** — Reference implementation (well-documented)
- **Individual app repos** — See structure analysis in CODEBASE_REVIEW

---

**Last updated:** May 2026
