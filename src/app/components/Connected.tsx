import { useFloat, useReveal } from '../hooks/useGsap'
import BubbleMark from './BubbleMark'
import {
  GLASS_DARK,
  GLASS_LIGHT,
  GLASS_WHITE,
  INK,
  POSTER_SRC,
  VIDEO_SRC,
  videoProps,
} from '../theme'

export default function Connected() {
  const headRef = useReveal<HTMLHeadingElement>({ y: 40 })
  const gridRef = useReveal<HTMLDivElement>({ selector: '[data-col]', stagger: 0.12, y: 48 })
  const gliderRef = useFloat<HTMLDivElement>(16, 8)

  return (
    <section className="max-w-[1440px] mx-auto px-[clamp(20px,4vw,56px)] py-[clamp(56px,8.4vh,98px)] sm:py-[clamp(80px,12vh,140px)]">
      <h2
        ref={headRef}
        className="max-w-[16ch] mb-10 sm:mb-14"
        style={{
          fontSize: 'clamp(36px, 5vw, 68px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.06,
        }}
      >
        Stay connected with updates, insights, and{' '}
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontWeight: 400,
          }}
        >
          inspiration.
        </span>
      </h2>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1.2fr] gap-[clamp(14px,1.75vw,25px)] sm:gap-[clamp(20px,2.5vw,36px)] items-end"
      >
        {/* Instagram card — the hero video again, in portrait */}
        <div data-col className="relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden" style={{ backgroundColor: INK }}>
            <video
              {...videoProps}
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
          <a
            href="#"
            className={`absolute left-5 bottom-5 rounded-full px-4.5 py-2.5 font-semibold text-[#1a0b2e] ${GLASS_WHITE}`}
            style={{ fontSize: 14, paddingLeft: 18, paddingRight: 18 }}
          >
            @bubbles.studio
          </a>
        </div>

        <div data-col>
          <div className="aspect-square rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=60"
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div data-col className="flex flex-col gap-5 sm:gap-7">
          <p className="text-neutral-600" style={{ fontSize: 17, lineHeight: 1.55 }}>
            Our monthly newsletter — a digestible selection of inspiring finds, from our
            screen to yours.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={`rounded-full px-7 py-4 text-white font-semibold transition-transform duration-300 hover:scale-105 ${GLASS_DARK}`}
              style={{ fontSize: 16 }}
            >
              Subscribe
            </button>
            <button
              type="button"
              className={`rounded-full px-7 py-4 font-semibold text-[#1a0b2e] transition-colors duration-300 hover:bg-[#1a0b2e] hover:text-white ${GLASS_LIGHT}`}
              style={{ fontSize: 16 }}
            >
              Previous issues
            </button>
          </div>

          <div ref={gliderRef} className="self-end w-[clamp(140px,16vw,240px)]">
            <BubbleMark className="w-full h-auto" opacity={0.85} />
          </div>
        </div>
      </div>
    </section>
  )
}
