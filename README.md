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
│   ├── fonts.css          Satoshi, Instrument Serif, DM Sans
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
        ├── SectionBadge.tsx   no longer rendered — the section eyebrows were removed
        └── BubbleMark.tsx
```

## Notes

- **Palette** lives in `src/app/theme.ts` — `PURPLE` (`#7c3aed`) and `INK` (`#1a0b2e`) drive every component.
- **Type.** The sans face is **Satoshi**, loaded from `api.fontshare.com` — Satoshi is an Indian Type Foundry release and is *not* on Google Fonts, so it cannot be served from there. Headline accents use Instrument Serif (Google Fonts).
- **Glass.** The navbar, its mobile dropdown, and the hero CTA are glassmorphic (`bg-white/25–30` + `backdrop-blur-xl` + `backdrop-saturate-150` + a white hairline border). They sit over the hero video, which is what gives the blur something to refract.
- **Mobile rhythm.** Every vertical spacing token is authored twice: a base value at ~70% for phones, restored to full at `sm:`. The clamps scale all three terms together (`clamp(56px,8.4vh,98px)` → `sm:clamp(80px,12vh,140px)`) so the reduction holds across viewport heights rather than only at the clamp floor.
- **Motion** is split by section. `Projects.tsx` uses Framer Motion (scroll parallax, pixel-dissolve hover, magnetic squares); everything else uses GSAP ScrollTrigger via `useGsap.ts`. Both respect `prefers-reduced-motion`.
- `refreshTriggersWhenSettled()` re-measures GSAP triggers after fonts load — without it, reveals below the fold strand at `opacity: 0` because the web fonts reflow the `clamp()`-scaled headings.
- **Content is placeholder.** Copy, case studies and the testimonial are stand-ins, not real client work.
- **Case-study imagery** in `public/work/` is from [Unsplash](https://unsplash.com/license) (1600×2000, ~2× the rendered tile). The Unsplash licence permits commercial use without attribution; credits are listed below as a courtesy.

  | File | Unsplash photo |
  | --- | --- |
  | `mitti.jpg` | `photo-1614036634955-ae5e90f9b9eb` |
  | `safar.jpg` | `photo-1633533447057-56ccf997f4fe` |
  | `dhaara.jpg` | `photo-1656618724305-a4257e46e847` |
  | `utsav.jpg` | `photo-1647427854253-b92bb40c9330` |
