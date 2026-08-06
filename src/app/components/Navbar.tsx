import { useState } from 'react'
import { ChevronDown, ChevronRight, Menu, ShoppingCart } from 'lucide-react'

const PURPLE = '#7c3aed'

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

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex justify-center pt-4 sm:pt-6 px-3 sm:px-4">
      <nav className="bg-white rounded-full shadow-sm border border-neutral-200 pl-2 pr-2 py-2 w-full max-w-[760px] relative flex items-center">
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 ml-6" style={{ fontSize: 14 }}>
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

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <ShoppingCart className="hidden sm:block w-5 h-5 text-neutral-800" />

          <button
            type="button"
            className="inline-flex items-center gap-2 text-white rounded-full pl-4 pr-1.5 py-1.5"
            style={{ backgroundColor: PURPLE, fontSize: 14 }}
          >
            <span className="hidden sm:inline">Start a project</span>
            <span className="sm:hidden">Start</span>
            <span className="w-6 h-6 rounded-full bg-white/20 inline-flex items-center justify-center">
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden w-9 h-9 inline-flex items-center justify-center rounded-full text-neutral-800"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden absolute top-full left-2 right-2 mt-2 bg-white rounded-2xl shadow-lg border border-neutral-200 p-3 z-20">
            <div className="flex flex-col" style={{ fontSize: 14 }}>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className="inline-flex items-center gap-1.5 px-2 py-2 rounded-lg hover:bg-neutral-50"
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
          </div>
        )}
      </nav>
    </div>
  )
}
