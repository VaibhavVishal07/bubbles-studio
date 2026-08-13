import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const EASE = 'power3.out'

/**
 * Trigger positions are measured at mount, but the Google fonts land later and
 * reflow these clamp()-scaled headings — which strands reveals at opacity 0.
 * Re-measure once everything that affects layout has settled.
 */
export function refreshTriggersWhenSettled() {
  const refresh = () => ScrollTrigger.refresh()

  if (document.readyState === 'complete') refresh()
  else window.addEventListener('load', refresh, { once: true })

  document.fonts?.ready.then(refresh)

  return () => window.removeEventListener('load', refresh)
}

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

type RevealOpts = {
  /** Animate matching descendants instead of the element itself. */
  selector?: string
  stagger?: number
  y?: number
  start?: string
  duration?: number
  delay?: number
}

/** Fade + rise into view once, on scroll. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(opts: RevealOpts = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return

    const ctx = gsap.context(() => {
      const targets: Element[] = opts.selector
        ? Array.from(el.querySelectorAll(opts.selector))
        : [el]
      if (!targets.length) return

      gsap.from(targets, {
        opacity: 0,
        y: opts.y ?? 36,
        duration: opts.duration ?? 0.9,
        delay: opts.delay ?? 0,
        ease: EASE,
        stagger: opts.stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? 'top 85%',
          once: true,
          invalidateOnRefresh: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}

/** Endless gentle bob — replaces the source's `floaty` keyframes. */
export function useFloat<T extends HTMLElement = HTMLDivElement>(
  distance = 14,
  duration = 7,
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return

    const tween = gsap.to(el, {
      y: -distance,
      duration: duration / 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    return () => {
      tween.kill()
    }
  }, [distance, duration])

  return ref
}

/** Scrub-linked drift, for depth against the page scroll. */
export function useParallax<T extends HTMLElement = HTMLDivElement>(amount = 60) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: amount },
        {
          y: -amount,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [amount])

  return ref
}
