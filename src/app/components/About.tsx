import { ChevronRight } from 'lucide-react'
import { useFloat, useParallax, useReveal } from '../hooks/useGsap'
import BubbleMark from './BubbleMark'
import SectionBadge from './SectionBadge'
import { INK, POSTER_SRC, VIDEO_SRC, videoProps } from '../theme'

function Float({
  children,
  className,
  style,
  drift = 50,
  bob = 14,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  drift?: number
  bob?: number
}) {
  const parallaxRef = useParallax<HTMLDivElement>(drift)
  const floatRef = useFloat<HTMLDivElement>(bob)

  return (
    <div className={`absolute z-[1] hidden md:block ${className ?? ''}`} style={style}>
      <div ref={parallaxRef}>
        <div ref={floatRef}>{children}</div>
      </div>
    </div>
  )
}

export default function About() {
  const ref = useReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.12 })

  return (
    <section
      id="about"
      className="relative overflow-hidden px-[clamp(20px,4vw,56px)] py-[clamp(140px,22vh,260px)] text-center"
    >
      {/* the hero video returns, cropped into a floating card */}
      <Float
        className="w-[clamp(90px,11vw,170px)]"
        style={{ top: '16%', left: '4%' }}
        drift={70}
      >
        <div className="rounded-2xl overflow-hidden aspect-[1040/1440] shadow-lg">
          <video
            {...videoProps}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
      </Float>

      <Float
        className="w-[clamp(110px,13vw,210px)]"
        style={{ bottom: '18%', right: '3%' }}
        drift={40}
        bob={18}
      >
        <div className="rounded-2xl overflow-hidden aspect-[1580/1200] shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=60"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </Float>

      <Float
        className="w-[clamp(70px,8vw,110px)]"
        style={{ top: '6%', right: '10%' }}
        drift={90}
        bob={10}
      >
        <BubbleMark className="w-full h-auto" opacity={0.9} />
      </Float>

      <div ref={ref} className="relative z-10">
        <div data-reveal>
          <SectionBadge>The studio</SectionBadge>
        </div>

        <h2
          data-reveal
          className="max-w-[18ch] mx-auto mt-6"
          style={{
            fontSize: 'clamp(40px, 5.6vw, 80px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.06,
          }}
        >
          We&rsquo;re a small team of versatile creatives in Delhi,{' '}
          <span className="text-neutral-500">
            committed to doing good work while having fun.
          </span>
        </h2>

        <button
          data-reveal
          type="button"
          className="mt-11 inline-flex items-center gap-3 text-white rounded-full pl-7 pr-2 py-2.5 transition-transform duration-300 hover:scale-105"
          style={{ backgroundColor: INK, fontSize: 16, fontWeight: 600 }}
        >
          Get to know us
          <span className="w-7 h-7 rounded-full bg-white/15 inline-flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </section>
  )
}
