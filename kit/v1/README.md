# CODEX Polish Kit v1

Shared design layer for every CODEX template. Goal: calm, modern, beautiful. No heavy animation.

## Files
- `open-props.css`: Open Props subset (shadows, easings, durations, sizes, borders, animations). MIT, see `LICENSE-open-props`.
- `kit.css`: our component layer (buttons, cards, media, hero, header, menu rows, reviews, mobile action bar, effects, reveal).
- `kit.js`: small enhancements (reveal with 900 ms safety net, glass header, broken-image fallback, menu tabs, action bar spacing). The page must work without it.
- `palettes.json`: 12 contrast-checked palettes. `fonts.json`: 8 Google Font pairs. `effects.json`: 4 signature effects.

## How a template uses the kit
In `<head>`, in this order:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="FONT PAIR google_fonts_href">
<link rel="stylesheet" href="kit/open-props.css">
<link rel="stylesheet" href="kit/kit.css">
<link rel="stylesheet" href="style.css">
<style>:root{ /* palette colors as --bg --surface --ink --muted --line --primary --on-primary --accent, fonts as --font-heading --font-body, then */ --primary: {{primary_color}}; --accent: {{accent_color}}; }</style>
<script src="kit/kit.js" defer></script>
<script src="script.js" defer></script>
```
`kit/` files are copied next to the template by code; never edit or inline them in the template. They do not count toward the 60 KB budget.

## Character switches (on <html>)
- Palette: CSS variables from palettes.json (+ data-theme="dark" for dark palettes)
- `data-shape`: sharp | soft (default) | round | arch (arch = Mediterranean arched photos, pill buttons)
- `data-depth`: flat (lines, no shadows) | soft (default) | lifted (coloured floating shadows) | paper (bold offset shadow, casual)

## Classes
Layout: `kit-container`, `kit-section`, `kit-section--tint`, `kit-section--dark`, `kit-grid kit-grid--2|--3`
Type: `kit-display`, `kit-h2`, `kit-h3`, `kit-lead`, `kit-muted`, `kit-eyebrow` (+ `--caps`), `kit-rule`, `kit-measure`, `kit-break`, `kit-number` (+ `data-count="35"` to count up)
Buttons: `kit-btn` + one of `--primary` (solid lift) | `--accent` | `--light` | `--ghost` (outline fill) | `--slide` (colour sweeps in) | `--rise` (fill rises) | `--chip` (with `<span class="kit-btn__chip"><svg/></span>`) | `--paper` (offset, presses) | `--glass` (over photos) | `--shine` (light sweep) | `--text` (growing underline). Sizes `--sm`, `--lg`, `--block`. Use max 2 button styles per site.
Links: `kit-link` (sliding underline), `kit-link--marker` (highlighter sweep)
Cards: `kit-card`
Hover effects (pick 1-2 per site): `kit-hover-lift`, `kit-hover-glow`, `kit-hover-border` (draws accent border), `kit-zoom` (photo zoom), `kit-hover-tint` (muted photo turns to colour), `kit-hover-caption` (with `.kit-caption` inside `.kit-media`), `kit-hover-shine`
Media: `kit-media` (set `--kit-ratio`), always wrap photos in it: a branded gradient shows if the photo fails. `.kit-caption` for overlay text.
Hero: `kit-hero` > `img.kit-hero__img` (+ `kit-slowzoom`) + `.kit-hero__content`
Header: `header.kit-header` (glass on scroll)
Menu: `.kit-menu-item` > `.kit-menu-item__name`, `.kit-menu-item__price`, `p.kit-menu-item__desc`
Reviews: `.kit-quote`, `.kit-stars`, `.kit-source` ("Google review")
Mobile: `.kit-actionbar` with 2-3 `.kit-btn--sm`
Reveal on scroll: `data-reveal="up|fade|left|right|zoom|blur|clip|down"`; `data-reveal-group` on a parent staggers its children. Use 2-3 reveal types per site, consistently (e.g. headings fade, images clip, cards up).

## Rules
1. One palette, one font pair, at most one signature effect.
2. Template CSS handles layout and personality; use kit tokens (`var(--shadow-2)`, `var(--ease-out-3)`, `var(--radius-2)`) instead of new values.
3. Restraint: no parallax stacks, no autoplay sliders, no text animations, no custom cursors.
4. Big food photography, the restaurant name and a Call button do more than any animation.
