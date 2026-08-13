# Digital Archive — Bubbles

Landing page for **Bubbles**, a design studio in Bengaluru, India. Dark, cinematic and
editorial: a full-bleed video hero, fog transitions that overlap section boundaries, a
scroll-revealed Q&A, and a parallax quote banner.

Built with Vite, React 18, TypeScript and Tailwind CSS 3. `lucide-react` is the only UI
dependency — no component library, no animation library.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview
```

## Structure

```
index.html                    font links (Arsenica Trial Light + Inter)
tailwind.config.js            stock v3 config, no theme extensions
public/
├── fog-top.svg               local fallback: warm fog band
├── fog-bottom.svg            local fallback: dark fog band
├── dove.svg                  local fallback: dove silhouette
└── work/                     unused leftovers from the previous site
src/
├── main.tsx
├── index.css                 fonts, liquid glass, hero + reveal keyframes
├── hooks/useScrollReveal.ts  IntersectionObserver → adds .revealed
├── App.tsx                   page shell and the overlapping transition layers
└── components/
    ├── Navbar.tsx            floating liquid-glass pill
    ├── Logo.tsx              angular studio mark
    ├── Hero.tsx              full-viewport video
    ├── Showcase.tsx          full-bleed still with reveal copy
    ├── QAndA.tsx             two-column interview + parallax fog
    ├── QuoteBanner.tsx       pull quote + parallax fog
    ├── Footer.tsx            fixed bottom bar
    └── AssetImage.tsx        remote artwork with a local fallback
```

## Notes

- **Type.** Arsenica Trial Light (`db.onlinewebfonts.com`) for display, Inter (Google
  Fonts) for body and UI. Exposed as `--font-serif` / `--font-sans` and the
  `.font-arsenica` / `.font-inter` helpers.
- **Liquid glass** is declared inside `@layer components`. That matters: the rule sets
  `position: relative`, and outside a layer it would load *after* Tailwind's utilities and
  silently beat `fixed` on the navbar.
- **Three of the hosted atmosphere assets answer HTTP 401** — the Cloudinary fog, dove and
  bottom-overlay PNGs are not publicly deliverable. `AssetImage` keeps those URLs as the
  primary source and swaps in the local SVGs in `public/` on error, so the page composes
  correctly today and picks the originals back up if they are ever unblocked.
- **Seams.** The negative margins between sections open gaps whose size depends on
  viewport width, so the page shell carries a `#410C01` base colour and the hero ends in a
  gradient to the same value. Without them, wide viewports show a bare strip between the
  hero and the showcase.
- **Background stills** are requested from `images.higgs.ai` at up to 2560px wide
  (`srcSet` on the showcase, `w=1920` on the quote banner) — the spec's `w=1280` renders at
  2× upscale on large displays.
- **Parallax** is plain `scroll` listeners computing `1 - rect.bottom / (vh + rect.height)`,
  clamped to `[0, 1]`; no animation library involved.
- **Content is placeholder.** The studio, the interview with Ananya, and the projects are
  stand-ins, not real client work.
- `public/work/` holds four Unsplash JPEGs from the previous version of this site. Nothing
  references them any more — safe to delete.

## Deploying

`.github/workflows/deploy.yml` (at the repository root) builds this folder and publishes
`digital-archive/dist` to GitHub Pages. `vite.config.ts` sets `base: '/bubbles-studio/'`
for production builds only.
