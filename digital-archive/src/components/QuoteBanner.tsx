import { useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import AssetImage from './AssetImage'

// Rendered edge-to-edge, so it is requested at a width wide screens can use.
const BACKGROUND_SRC =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260616_042421_41f4fa0b-770c-4545-a416-73a809366e49.png&w=1920&q=85'

const BOTTOM_SRC =
  'https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781584854/bottom_bg_liw6lc.png'

export default function QuoteBanner() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const progress = 1 - rect.bottom / (window.innerHeight + rect.height)
      setOffset(Math.min(Math.max(progress, 0), 1) * 80)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionRef])

  return (
    <section
      id="journal"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url("${BACKGROUND_SRC}")` }}
    >
      <div className="flex h-full w-full items-center justify-center px-6 text-center lg:items-start lg:pt-[25vh]">
        <p className="reveal-scale max-w-xs font-arsenica text-xl leading-snug text-white sm:max-w-md sm:text-2xl md:max-w-lg md:text-3xl lg:max-w-xl lg:text-4xl lg:leading-tight xl:max-w-2xl xl:text-5xl">
          Design, resilience and craft{' '}
          <span className="font-light italic">are more important than ever.</span>
        </p>
      </div>

      <AssetImage
        src={BOTTOM_SRC}
        fallback="fog-bottom.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 left-0 z-10 h-56 w-full object-fill sm:h-72 md:h-80 lg:h-auto"
        style={{ transform: `translateY(${-offset}px)` }}
      />
    </section>
  )
}
