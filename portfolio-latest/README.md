# portfolio-latest

A native rebuild of the Framer site at `high-interaction-916423.framer.app`, so it can be
hosted anywhere and edited directly in code.

Stack: **Next.js 16 + React 19 + TypeScript**, plain CSS, no runtime dependencies beyond React.
It builds to a folder of static files, so it will run on GitHub Pages, Netlify, Vercel, S3,
Cloudflare Pages — anything that serves HTML.

## Fonts

Loaded through `next/font/google` in `src/app/layout.tsx` and exposed as CSS variables:

| Import | CSS variable | Used for |
| --- | --- | --- |
| `Geist_Pixel` | `--font-geist-pixel` | All pixel display type (headings, badge, buttons, card titles) |
| `Geist` | `--font-geist` | Wired up, not currently applied |
| `Geist_Mono` | `--font-geist-mono` | Wired up as `--font-mono`, not currently applied |

`Geist_Pixel` requires **Next 16** — it is not exported by any 15.x release, which is why the
framework was upgraded.

Body copy still uses **Satoshi**, self-hosted from `public/fonts`, as in the original. The
original's pixel face (**Pixelon**) is still self-hosted too and remains the fallback behind
Geist Pixel; to go back to it, change `--font-pixel` in `globals.css`.

`next/font` self-hosts the woff2 files into the build, so the published site makes no request
to Google at runtime.

> **Known inconsistency:** on desktop (≥1440px) the four project cards are the PNG artwork
> exported from Framer, with the old Pixelon lettering baked into the image — so their titles
> do *not* pick up Geist Pixel, while every other heading does. Below 1440px the cards are drawn
> in CSS with live text and render correctly in Geist Pixel. To make desktop consistent, switch
> the desktop cards to the drawn markup (already implemented as `.questCard-draw`) and size it
> for the 810×323 desktop card.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site written to ./out
```

`npm run build` produces `./out`. Upload that folder, or point a host at it.

## Where things live

```
src/
  data/site.ts          All copy, links, and project content. Edit here first.
  app/
    page.tsx            Page composition
    layout.tsx          <head>, fonts, metadata
    globals.css         Design tokens (colours, fonts) + reset
    home.css            Layout — desktop, then tablet, then mobile
  components/
    Hero.tsx            Avatar, speech bubble, intro, buttons, ground strip
    MainQuests.tsx      The four project cards + modal state
    CaseStudyModal.tsx  The overlay that opens when a card is clicked
    SideQuests.tsx      "Currently reading/playing/watching" + build cards
    RelevantLinks.tsx   Footer link grid
public/
  img/                  Photos, card artwork, ground strip, footer landscape
  svg/                  Pixel-art sprites (avatar, briefcase, icons, arrows)
  fonts/                Pixelon + Satoshi woff2
```

**To change text**, edit `src/data/site.ts` — nothing else needs touching.
**To change colours or type**, edit the token block at the top of `globals.css`.
**To move things**, edit `home.css`; each element has one rule, grouped by section.

## How the layout works

The original is authored on a fixed **1440px canvas** that is centred in the viewport, with
everything absolutely positioned. That is reproduced here: `.canvas` is the full-width stage,
`.sheet` is the centred 1440px design area, and section elements are placed against it at the
same coordinates as the original.

There are three breakpoints, matching the original exactly:

| Range | Design width | Page height | Notes |
| --- | --- | --- | --- |
| ≥ 1440px | 1440 | 3511px | Left-aligned hero, speech bubble, card artwork |
| 1086–1439px | 1086 | 4001px | Centred hero, flat badge, card artwork, 5 side-quest cards |
| ≤ 1085px | 390 | 3883px | Centred hero, cards drawn in CSS, 2 side-quest cards |

The three layouts are genuinely different compositions in the original — not one layout that
reflows — so they are implemented as three sets of rules rather than fluid CSS.

## Quirks reproduced from the original

These looked like mistakes, so they are called out rather than silently "fixed". Each is a
one-line change if you'd rather correct it:

- **Side-quest card labels on desktop render in Arial, not the pixel font.** The original asks
  for a font family (`Pixelon`, without `Regular`) that it never declares, so it falls back.
  See the note above `.nowCard-label` in `home.css`.
- **The links are not linked.** `Resume`, `Mini Portfolio`, `LinkedIn`, `Dribbble`, both hero
  buttons, and the inline `mini portfolio` link have no `href` in the published Framer site.
  Add URLs in `src/data/site.ts` and they become real anchors automatically.
- **Only two "currently" cards show below 1085px**, and they hug the left edge of the viewport
  rather than the design canvas. Both match the original.
- **The heading reads "Main Quest" on desktop and "Main Quests" on smaller screens.**

## Not yet ported

- **Case-study modal interiors.** Clicking a project card opens the overlay with the correct
  behaviour (backdrop, sheet, close button, scroll lock) and the real copy pulled from the
  original, but the interior is laid out as clean typography rather than a pixel copy of the
  original's screenshot-heavy layout. The source images for those screens are already in
  `public/img/`.
- **The `/banners` route.** The original site has a second page at `/banners`; it is not built
  here yet.
