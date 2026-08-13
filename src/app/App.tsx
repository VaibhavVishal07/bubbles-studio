import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ChevronRight } from 'lucide-react'
import Navbar from './components/Navbar'
import Work from './components/Work'
import Testimonial from './components/Testimonial'
import About from './components/About'
import Connected from './components/Connected'
import Footer from './components/Footer'
import { EASE, refreshTriggersWhenSettled } from './hooks/useGsap'
import { GLASS_WHITE, HERO_BG, POSTER_SRC, PURPLE, VIDEO_SRC, videoProps } from './theme'

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => refreshTriggersWhenSettled(), [])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('[data-hero]', {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: EASE,
        stagger: 0.12,
        delay: 0.15,
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div
      className="min-h-screen w-full bg-white p-3 sm:p-4"
      style={{ fontFamily: "'Satoshi', sans-serif" }}
    >
      <div
        className="relative w-full h-[calc(100vh-24px)] sm:h-[calc(100vh-32px)] overflow-hidden rounded-2xl sm:rounded-3xl"
        style={{ backgroundColor: HERO_BG }}
      >
        <video
          {...videoProps}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
        />

        <div className="absolute inset-0 bg-white/10" />

        <div ref={heroRef} className="relative z-10">
          <Navbar />

          <div className="mt-8 sm:mt-10 flex flex-col items-center px-4 pt-8 sm:pt-16 pb-6 sm:pb-12 text-center">
            <div
              data-hero
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 ${GLASS_WHITE}`}
              style={{ fontSize: 13 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: PURPLE }}
              />
              Bubbles Design Studio
            </div>

            <h1
              data-hero
              className="mt-3.5 sm:mt-6 max-w-4xl"
              style={{
                fontSize: 'clamp(43.2px, 9.6vw, 86.4px)',
                lineHeight: 1.05,
                fontWeight: 500,
                letterSpacing: '-0.02em',
              }}
            >
              Crafting{' '}
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}
              >
                Brands
              </span>
              <br />
              that rise
            </h1>

            <p
              data-hero
              className="mt-3 sm:mt-6 text-neutral-700 px-2"
              style={{ fontSize: 'clamp(15.6px, 4.2vw, 19.2px)' }}
            >
              An Independent Design Studio Shaping Brand, Product and Digital Experiences
            </p>

            <button
              data-hero
              type="button"
              className={`mt-4 sm:mt-8 inline-flex items-center gap-[14.4px] rounded-full pl-[28.8px] sm:pl-[33.6px] pr-[9.6px] py-[9.6px] sm:py-3 font-semibold text-[#1a0b2e] transition-transform duration-300 hover:scale-105 ${GLASS_WHITE}`}
              style={{ fontSize: 16.8 }}
            >
              See our work
              <span className="w-[28.8px] h-[28.8px] sm:w-[33.6px] sm:h-[33.6px] rounded-full bg-white/45 border border-white/50 inline-flex items-center justify-center">
                <ChevronRight className="w-[19.2px] h-[19.2px]" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <Work />
      <Testimonial />
      <About />
      <Connected />
      <Footer />
    </div>
  )
}
