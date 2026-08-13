import { ChevronDown, ChevronRight } from 'lucide-react'
import { GLASS_PURPLE, GLASS_WHITE, PURPLE } from '../theme'

function Logo() {
  // 8-petal flower: 8 circles at radius 10 around center (16,16) + a center circle
  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    return {
      cx: 16 + 10 * Math.cos(angle),
      cy: 16 + 10 * Math.sin(angle),
    }
  })

  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" aria-label="Bubbles">
      {petals.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={3.5} fill={PURPLE} />
      ))}
      <circle cx={16} cy={16} r={3.5} fill={PURPLE} />
    </svg>
  )
}

type NavItem = { label: string; dot?: boolean; accent?: boolean }

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', dot: true },
  { label: 'Work' },
  { label: 'Studio' },
  { label: 'Services', accent: true },
]

/** Desktop only — the hero carries the whole first fold on phones. */
export default function Navbar() {
  return (
    <div className="hidden md:flex justify-center pt-6 px-4">
      <nav
        className={`rounded-full pl-2 pr-2 py-2 w-full max-w-[760px] flex items-center text-neutral-900 ${GLASS_WHITE}`}
      >
        <div className="shrink-0">
          <Logo />
        </div>

        <div className="flex items-center gap-6 ml-6" style={{ fontSize: 14 }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              className="inline-flex items-center gap-1.5"
              style={item.accent ? { color: PURPLE } : undefined}
            >
              {item.dot && (
                <span
                  className="rounded-full bg-black"
                  style={{ width: 1.5, height: 1.5 }}
                />
              )}
              {item.label}
              {item.accent && <ChevronDown className="w-3.5 h-3.5" />}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center">
          <button
            type="button"
            className={`inline-flex items-center gap-2 text-white rounded-full pl-4 pr-1.5 py-1.5 transition-transform duration-300 hover:scale-105 ${GLASS_PURPLE}`}
            style={{ fontSize: 14 }}
          >
            Start a project
            <span className="w-6 h-6 rounded-full bg-white/25 border border-white/30 inline-flex items-center justify-center">
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </nav>
    </div>
  )
}
