import { useReveal } from '../hooks/useGsap'
import { INK, PURPLE } from '../theme'

export default function Testimonial() {
  const ref = useReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.12 })

  return (
    <section className="px-3 sm:px-4">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-3xl max-w-[1440px] mx-auto text-center text-white px-[clamp(24px,5vw,80px)] py-[clamp(80px,15vh,170px)]"
        style={{ backgroundColor: INK }}
      >
        {/* purple bloom, echoing the hero's tinted video */}
        <div
          className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[120%] aspect-square rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${PURPLE}55 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 max-w-[1000px] mx-auto">
          <span
            data-reveal
            className="block leading-none"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(56px, 8vw, 96px)',
              color: PURPLE,
            }}
          >
            &rdquo;
          </span>

          <blockquote
            data-reveal
            className="mt-2"
            style={{
              fontSize: 'clamp(26px, 3.4vw, 44px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
            }}
          >
            They embedded with us like co-founders — from Delhi standups to launch night,
            the pace and the polish never dropped.
          </blockquote>

          <div data-reveal className="flex flex-col items-center gap-3.5 mt-11">
            <span
              className="w-16 h-16 rounded-full inline-flex items-center justify-center font-semibold"
              style={{
                background: `linear-gradient(140deg, ${PURPLE}, #c4b5fd)`,
                fontSize: 20,
              }}
            >
              AK
            </span>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700 }}>Ananya Krishnan</div>
              <div className="text-white/60 mt-0.5" style={{ fontSize: 15 }}>
                Head of Product, Dhaara
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
