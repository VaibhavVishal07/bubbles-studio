export const PURPLE = '#7c3aed'
export const INK = '#1a0b2e'
export const HERO_BG = '#d5cfe3'

/**
 * Glass tokens. Every pill, badge and CTA on the page uses one of these, picked
 * by what sits *behind* it — a blur only reads as glass when there is something
 * to refract, so the tint and border alpha change with the backdrop.
 *
 * Written as literal strings so Tailwind's scanner still sees the class names.
 */

/** Over imagery or video — hero badge, the Instagram tag. Ink text. */
export const GLASS_WHITE =
  'backdrop-blur-xl backdrop-saturate-150 bg-white/30 border border-white/45 shadow-[0_8px_32px_rgba(26,11,46,0.14)]'

/** On the white page — secondary pills, tags, service cards. Ink text. */
export const GLASS_LIGHT =
  'backdrop-blur-xl backdrop-saturate-150 bg-[#1a0b2e]/[0.06] border border-[#1a0b2e]/15 shadow-[0_6px_24px_rgba(26,11,46,0.08)]'

/** Primary CTA on the white page — frosted ink, keeps its weight. White text. */
export const GLASS_DARK =
  'backdrop-blur-xl backdrop-saturate-150 bg-[#1a0b2e]/85 border border-white/20 shadow-[0_8px_28px_rgba(26,11,46,0.28)]'

/** On the purple footer / ink testimonial. White text. */
export const GLASS_ON_DARK =
  'backdrop-blur-xl backdrop-saturate-150 bg-white/20 border border-white/35 shadow-[0_8px_28px_rgba(0,0,0,0.16)]'

/** The navbar CTA — brand purple, frosted rather than flat. White text. */
export const GLASS_PURPLE =
  'backdrop-blur-xl backdrop-saturate-150 bg-[#7c3aed]/75 border border-white/30 shadow-[0_8px_28px_rgba(124,58,237,0.35)]'

export const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4'

export const POSTER_SRC =
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=60'

/** Shared with the hero video so later sections echo the first fold. */
export const videoProps = {
  autoPlay: true,
  loop: true,
  muted: true,
  playsInline: true,
  preload: 'auto',
  disableRemotePlayback: true,
  'webkit-playsinline': 'true',
  'x5-playsinline': 'true',
} as const
