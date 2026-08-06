export const PURPLE = '#7c3aed'
export const INK = '#1a0b2e'
export const HERO_BG = '#d5cfe3'

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
