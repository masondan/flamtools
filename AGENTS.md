# AGENTS.md — FlamTools Hub

**FlamTools** is a hub connecting specialized web apps (PromptFlam, PicFlam, AudioFlam, ChartFlam, MapFlam, plus StoryFlam and FlamIt in beta).

## Project Structure

This repository (`flamtools`) is **static only**—a minimal hub at `flamtools.com` that will eventually display all apps. Individual apps live in separate repos:

- **PromptFlam** (GitHub) — SvelteKit + Svelte 5 (JS), localStorage-backed chat
- **PicFlam** (GitHub) — SvelteKit + Svelte 5 (JS), image crop/AI/design
- **AudioFlam** (GitHub) — SvelteKit + Svelte 5 (TS), reference implementation
- **ChartFlam** (GitHub) — Vanilla JS, CSV → charts
- **MapFlam** (GitHub) — Vite + Svelte 5 (TS, no SvelteKit), Leaflet maps

All apps target Cloudflare Pages for deployment.

## Key Context

### App Navigation
Apps are now connected via a shared hamburger menu Web Component: **FlamNav** (`static/flam-nav.js`).

**Usage:**
```html
<flam-nav current="promptflam"></flam-nav>
```

**How FlamNav works:**
- Custom HTMLElement that renders a left-side drawer
- Shows all 7 apps with URLs (e.g., `https://promptflam.flamtools.com`)
- Current app highlighted in purple (#5422b0)
- Training apps (StoryFlam, FlamIt) shown in gray
- Toggle with hamburger button or Escape key
- Self-positions drawer relative to app container (`.app-container`, `.app`, `.page`, or `[class*="max-w"]`)

**Attributes:**
- `current` (string) — App ID to highlight (e.g., "promptflam", "audioflam")

**Implementation details:**
- Shadow DOM for encapsulation
- Fixed positioning with overlay (z-index 9998/9999)
- Drawer slides in from left (250ms transition)
- On-the-fly positioning using `getBoundingClientRect()` to constrain to app bounds

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

## Common Tasks

### Add a new app to FlamNav
1. Open `static/flam-nav.js`
2. Add entry to `apps` array (line 74-82):
   ```javascript
   { id: 'newapp', name: 'NewApp', url: 'https://newapp.flamtools.com', training: false }
   ```
3. Test with `<flam-nav current="newapp"></flam-nav>`

### Update FlamNav styling
- Edit CSS in `render()` method (lines 87-211)
- Drawer width: `.drawer { width: 180px }`
- Accent color: `--accent-brand: #5422b0`
- Purple hover: `.menu-btn:hover { color: #5422b0 }`

### Test FlamNav in an app
1. Include `<script src="https://flamtools.com/flam-nav.js"></script>`
2. Add `<flam-nav current="appid"></flam-nav>` to layout/header
3. Verify positioning with `.closest()` selector chain

## Deployment

- **Domain:** flamtools.com (Cloudflare)
- **Subdomains:** promptflam.flamtools.com, picflam.flamtools.com, etc.
- **Build:** Static files → Cloudflare Pages
- **Static assets:** `static/` folder (includes flam-nav.js)

## References

- **CODEBASE_REVIEW.md** — Detailed analysis of all 5 main apps
- **AudioFlam AGENTS.md** — Reference implementation (well-documented)
- **Individual app repos** — See structure analysis in CODEBASE_REVIEW

---

**Last updated:** March 24, 2026
