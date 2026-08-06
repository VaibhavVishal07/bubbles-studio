import { useReveal } from '../hooks/useGsap'
import SectionBadge from './SectionBadge'
import { INK } from '../theme'

const CARDS = [
  'Our product needs to be more intuitive',
  'We need a consistent look and feel across our products',
  'Our product needs a new UX/UI design',
  'Our brand needs to reflect who we are',
  'We need compelling visuals to bring our brand to life',
  'We need a new website',
]

export default function Help() {
  const headRef = useReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.1 })
  const gridRef = useReveal<HTMLDivElement>({ selector: '[data-card]', stagger: 0.08, y: 44 })

  return (
    <section className="max-w-[1240px] mx-auto px-[clamp(20px,4vw,56px)] py-[clamp(80px,12vh,140px)] text-center">
      <div ref={headRef}>
        <div data-reveal>
          <SectionBadge>Services</SectionBadge>
        </div>

        <h2
          data-reveal
          className="mt-6"
          style={{
            fontSize: 'clamp(40px, 6vw, 84px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
          }}
        >
          How can we{' '}
          <span
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            help
          </span>{' '}
          you?
        </h2>

        <p data-reveal className="mt-3.5 text-neutral-600" style={{ fontSize: 17 }}>
          Choose what fits your needs
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
      >
        {CARDS.map((card) => (
          <button
            key={card}
            data-card
            type="button"
            className="group rounded-3xl border border-black/10 bg-[#f7f5fb] px-7 py-11 min-h-[170px] flex items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:text-white"
            style={{
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = INK)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f7f5fb')}
          >
            {card}
          </button>
        ))}
      </div>
    </section>
  )
}
