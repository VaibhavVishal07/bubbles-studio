# bubbles-studio

Landing page for **Bubbles**, a fictional design studio. Built with Vite, React 18, TypeScript and Tailwind CSS 4.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Structure

```
src/
├── main.tsx
├── styles/
│   ├── fonts.css          Inter, Instrument Serif, DM Sans
│   └── index.css
└── app/
    ├── App.tsx            page shell + hero
    ├── theme.ts           shared colour tokens, video source
    ├── hooks/useGsap.ts   reveal / float / parallax hooks
    └── components/
        ├── Navbar.tsx
        ├── Work.tsx           case-study grid (GSAP)
        ├── Projects.tsx       alternative case-study grid (Framer Motion), not currently rendered
        ├── Testimonial.tsx
        ├── Help.tsx
        ├── About.tsx
        ├── Connected.tsx
        ├── Footer.tsx
        ├── SectionBadge.tsx
        └── BubbleMark.tsx
```

## Notes

- **Palette** lives in `src/app/theme.ts` — `PURPLE` (`#7c3aed`) and `INK` (`#1a0b2e`) drive every component.
- **Motion** is split by section. `Projects.tsx` uses Framer Motion (scroll parallax, pixel-dissolve hover, magnetic squares); everything else uses GSAP ScrollTrigger via `useGsap.ts`. Both respect `prefers-reduced-motion`.
- `refreshTriggersWhenSettled()` re-measures GSAP triggers after fonts load — without it, reveals below the fold strand at `opacity: 0` because the web fonts reflow the `clamp()`-scaled headings.
- **Content is placeholder.** Copy, case studies, testimonial and imagery are stand-ins, not real client work. `public/work/mitti.jpg` carries a third-party watermark and should be replaced.
