import { useEffect, useRef } from 'react'

type Options = {
  threshold?: number
  rootMargin?: string
}

/**
 * Watches every `.reveal` / `.reveal-scale` descendant of the returned ref and
 * adds `.revealed` as each one enters the viewport. Elements are unobserved
 * once revealed, so the animation plays exactly once.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
}: Options = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.querySelectorAll<HTMLElement>('.reveal, .reveal-scale')
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        })
      },
      { threshold, rootMargin },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}
