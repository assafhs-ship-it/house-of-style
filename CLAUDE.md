# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static website for **House of Style** — a two-location clothing store (men's/women's) at 5620 Bergenline Ave, West New York, NJ 07093. Phone: +1 201-766-2211. Single-page, no build step, no framework.

Deployed via GitHub Pages: https://assafhs-ship-it.github.io/house-of-style/
Remote: https://github.com/assafhs-ship-it/house-of-style.git

To publish changes: `git push origin main` (GitHub Pages serves from main branch root).

## Files

- `index.html` — entire page (one HTML file)
- `styles.css` — all styles
- `script.js` — all JS
- `HOS logo 3.png` — nav logo (active); `HOS logo.png` — hero watermark source
- `Images/brands/` — brand logo assets (mix of SVG and PNG)

## Page sections (in order)

`#navbar` → `#hero` → `.brands-section` → `.collections-section` → `#gallery` → `#about` → `#stores` → `.coming-soon-section` → `footer`

## Architecture notes

**Nav** — fixed, transparent by default (white text/hamburger), gains `.scrolled` class (white background, dark text) when `window.scrollY > 60`. Nav logo uses `mix-blend-mode: multiply` so its white PNG background disappears against the white navbar. `--nav-h` CSS variable (`110px` desktop, `62px` mobile) drives scroll-offset calculations in JS.

**Hero** — `100vh`, dark background. The `.hero-bg` div provides the gradient; `#hero` itself provides the fallback black. The watermark logo (`filter: brightness(0) invert(1); mix-blend-mode: screen`) sits behind hero content at z-index 1.

**Brands grid** — flex row, fixed-size cells (`.brand-item`: `160px × 72px`). Logos default to `filter: grayscale(1) opacity(0.45)`, full color on hover. Special-case classes: `.brand-ralph-lauren` (taller cell for portrait logo), `.brand-diesel` / `.brand-puma` (reduced `max-height` on the `img`).

**Scroll reveal** — `script.js` adds `.reveal` to targeted elements, then an `IntersectionObserver` adds `.in-view` to trigger CSS transitions. Siblings stagger by 80ms.

**Current-day hours** — JS highlights today's `.hours-row` in `--red` at page load.

## Design tokens (CSS custom properties)

```
--black: #000000    --white: #ffffff
--red: #c8102e      --off-white: #f8f7f4
--gray-light: #ebebeb
--font-display: 'Cormorant Garamond'   (headings, editorial)
--font-ui: 'Montserrat'                (nav, buttons, labels)
--ease: cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

## Button variants

`.btn-primary` / `.btn-outline` — white-on-dark (for dark hero/collection backgrounds).  
`.btn-dark` / `.btn-dark-outline` — dark-on-light (for white/off-white sections).  
`.btn-white` / `.btn-block` — additional variants.

## Aesthetic direction

Inspired by Ralph Lauren / Tommy Hilfiger. Prefer: editorial whitespace, Cormorant Garamond for display text, uppercase Montserrat at wide letter-spacing for labels, `--red` as the single accent color. Avoid adding colors outside the token set.
