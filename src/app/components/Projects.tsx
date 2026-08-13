import { useCallback, useRef, useState } from 'react'
import type { MotionValue } from 'framer-motion'
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { INK, PURPLE } from '../theme'

const EASE = [0.22, 1, 0.36, 1] as const

/* Site palette in place of the spec's flat black. */
const INK_10 = 'rgba(26, 11, 46, 0.10)'
const INK_20 = 'rgba(26, 11, 46, 0.20)'
const INK_40 = 'rgba(26, 11, 46, 0.40)'
const INK_60 = 'rgba(26, 11, 46, 0.60)'
const INK_80 = 'rgba(26, 11, 46, 0.80)'

const COLS = 12
const ROWS = 8

type Square = { x: number; y: number; size: number }

const FLOATING_SQUARES: Square[] = [
  { x: 6, y: 20, size: 12 },
  { x: 12, y: 32, size: 8 },
  { x: 8, y: 44, size: 6 },
  { x: 88, y: 18, size: 10 },
  { x: 92, y: 30, size: 14 },
  { x: 85, y: 42, size: 7 },
  { x: 90, y: 52, size: 5 },
  { x: 14, y: 56, size: 5 },
]

type CaseStudy = {
  id: string
  title: string
  category: string
  year: string
  image: string
  squares: Square[]
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'heartx',
    title: 'HeartX',
    category: 'Brand Strategy & Product Design',
    year: '2026',
    image:
      'https://images.pexels.com/photos/7691249/pexels-photo-7691249.jpeg?auto=compress&cs=tinysrgb&w=800',
    squares: [
      { x: 5, y: 30, size: 16 },
      { x: 10, y: 42, size: 10 },
      { x: 3, y: 52, size: 7 },
      { x: 80, y: 70, size: 14 },
      { x: 85, y: 82, size: 9 },
      { x: 78, y: 60, size: 6 },
    ],
  },
  {
    id: 'swave',
    title: 'Swave®',
    category: 'Web Design & Identity',
    year: '2025',
    image:
      'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800',
    squares: [
      { x: 82, y: 55, size: 16 },
      { x: 88, y: 68, size: 10 },
      { x: 78, y: 72, size: 7 },
      { x: 85, y: 42, size: 6 },
      { x: 90, y: 80, size: 8 },
    ],
  },
  {
    id: 'eduspark',
    title: 'EduSpark',
    category: 'Brand Strategy & Web Design',
    year: '2023',
    image:
      'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=800',
    squares: [
      { x: 4, y: 24, size: 16 },
      { x: 10, y: 36, size: 10 },
      { x: 2, y: 44, size: 7 },
      { x: 78, y: 78, size: 14 },
      { x: 84, y: 88, size: 8 },
    ],
  },
  {
    id: 'greenergy',
    title: 'Greenergy',
    category: 'Brand Strategy & Web Design',
    year: '2022',
    image:
      'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800',
    squares: [
      { x: 82, y: 26, size: 14 },
      { x: 88, y: 38, size: 10 },
      { x: 78, y: 44, size: 7 },
      { x: 84, y: 54, size: 5 },
      { x: 90, y: 60, size: 8 },
    ],
  },
]

/* ---------------------------------------------------------------- header */

function FloatingSquare({
  square,
  index,
  progress,
}: {
  square: Square
  index: number
  progress: MotionValue<number>
}) {
  const raw = useTransform(progress, [0, 1], [0, -(80 + index * 30)])
  const y = useSpring(raw, { stiffness: 40, damping: 20 })

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${square.x}%`,
        top: `${square.y}%`,
        width: square.size,
        height: square.size,
        y,
      }}
    >
      <motion.div
        className="h-full w-full"
        style={{ backgroundColor: PURPLE }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3 + index * 0.4,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: index * 0.3,
        }}
      />
    </motion.div>
  )
}

/* ----------------------------------------------------------------- cards */

function MagneticSquare({
  square,
  pointerX,
  pointerY,
}: {
  square: Square
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
}) {
  const rawX = useTransform(pointerX, (p) => (p - square.x / 100) * 40)
  const rawY = useTransform(pointerY, (p) => (p - square.y / 100) * 40)

  const spring = { stiffness: 80, damping: 18, mass: 0.6 }
  const x = useSpring(rawX, spring)
  const y = useSpring(rawY, spring)

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${square.x}%`,
        top: `${square.y}%`,
        width: square.size,
        height: square.size,
        backgroundColor: PURPLE,
        x,
        y,
      }}
    />
  )
}

function PixelOverlay({ hovered }: { hovered: boolean }) {
  const blocks = []

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const delayIn = (row + col) * 0.018
      const delayOut = (ROWS - row + (COLS - col)) * 0.012

      blocks.push(
        <motion.div
          key={`${row}-${col}`}
          className="absolute"
          style={{
            left: `${(col * 100) / COLS}%`,
            top: `${(row * 100) / ROWS}%`,
            width: `${100 / COLS}%`,
            height: `${100 / ROWS}%`,
            backgroundColor: INK_80,
          }}
          initial={false}
          animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{
            duration: 0.25,
            delay: hovered ? delayIn : delayOut,
            ease: EASE,
          }}
        />,
      )
    }
  }

  return <div className="pointer-events-none absolute inset-0">{blocks}</div>
}

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      pointerX.set((e.clientX - rect.left) / rect.width)
      pointerY.set((e.clientY - rect.top) / rect.height)
    },
    [pointerX, pointerY],
  )

  const handlePointerLeave = useCallback(() => {
    setHovered(false)
    pointerX.set(0.5)
    pointerY.set(0.5)
  }, [pointerX, pointerY])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className="group relative overflow-hidden"
      style={{ aspectRatio: '4 / 3' }}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <img
        src={study.image}
        alt={study.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <PixelOverlay hovered={hovered} />

      <div className="pointer-events-none absolute inset-0">
        {study.squares.map((square, i) => (
          <MagneticSquare
            key={i}
            square={square}
            pointerX={pointerX}
            pointerY={pointerY}
          />
        ))}
      </div>

      <div
        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center border border-white/30 text-xs text-white"
        style={{ zIndex: 10 }}
      >
        +
      </div>

      <div
        className="absolute bottom-0 left-0 bg-white px-4 pb-3 pt-2.5"
        style={{ zIndex: 20, maxWidth: '70%' }}
      >
        <h3
          className="text-[clamp(1.4rem,2.2vw,2rem)] font-normal leading-tight"
          style={{ color: INK }}
        >
          {study.title}
        </h3>
        <div className="mt-1.5 flex gap-4">
          <span className="text-[12px]" style={{ color: INK_60 }}>
            {study.category}
          </span>
          <span className="text-[12px] font-medium" style={{ color: INK }}>
            {study.year}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ----------------------------------------------------------------- icons */

type IconType =
  | 'code'
  | 'dots'
  | 'circle-ring'
  | 'arrow'
  | 'wave-circle'
  | 'lines'
  | 'bolt'
  | 'plus'

function LogoIcon({ type }: { type: IconType }) {
  const stroke = { stroke: INK, fill: 'none' } as const

  switch (type) {
    case 'code':
      return (
        <svg width="22" height="18" viewBox="0 0 22 18" {...stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6,4 1,9 6,14" />
          <polyline points="16,4 21,9 16,14" />
          <line x1="13" y1="2" x2="9" y2="16" />
        </svg>
      )
    case 'dots':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill={INK}>
          {[3, 10, 17].map((cx) =>
            [3, 10, 17].map((cy) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.2} />),
          )}
        </svg>
      )
    case 'circle-ring':
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" {...stroke} strokeWidth={2}>
          <circle cx="11" cy="11" r="9" />
          <circle cx="11" cy="11" r="4" />
        </svg>
      )
    case 'arrow':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" {...stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="16" x2="16" y2="2" />
          <polyline points="7,2 16,2 16,11" />
        </svg>
      )
    case 'wave-circle':
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" {...stroke} strokeWidth={1.5}>
          <circle cx="11" cy="11" r="9" />
          <path d="M5 11Q8 7 11 11Q14 15 17 11" />
        </svg>
      )
    case 'lines':
      return (
        <svg width="24" height="18" viewBox="0 0 24 18" {...stroke} strokeWidth={2.2} strokeLinecap="round">
          <line x1="0" y1="3" x2="24" y2="3" />
          <line x1="6" y1="9" x2="24" y2="9" />
          <line x1="0" y1="15" x2="18" y2="15" />
        </svg>
      )
    case 'bolt':
      return (
        <svg width="14" height="20" viewBox="0 0 14 20" fill={INK}>
          <polygon points="8,0 0,11 6,11 6,20 14,9 8,9" />
        </svg>
      )
    case 'plus':
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill={INK}>
          <rect x="7.5" y="0" width="3" height="18" />
          <rect x="0" y="7.5" width="18" height="3" />
        </svg>
      )
  }
}

const LOGOS: { name: string; icon: IconType }[] = [
  { name: 'Codecraft_', icon: 'code' },
  { name: 'ennLabs', icon: 'dots' },
  { name: 'GlobalBank', icon: 'circle-ring' },
  { name: '45 Degrees°', icon: 'arrow' },
  { name: 'AlphaWave', icon: 'wave-circle' },
  { name: 'Biosynthesis', icon: 'lines' },
  { name: 'Boltshift', icon: 'bolt' },
  { name: 'Clandestine', icon: 'plus' },
]

/* --------------------------------------------------------------- section */

const MARQUEE_CSS = `
@keyframes marqueeProjects {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-projects {
  animation: marqueeProjects 28s linear infinite;
}
.marquee-projects:hover {
  animation-play-state: paused;
}
`

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif", color: INK }}
    >
      <style>{MARQUEE_CSS}</style>

      {/* ---------------------------------------------------------- header */}
      <div className="relative px-6 pb-10 pt-32 sm:px-10 lg:px-16 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {FLOATING_SQUARES.map((square, i) => (
            <FloatingSquare
              key={i}
              square={square}
              index={i}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto max-w-7xl text-center"
        >
          <span
            className="mb-5 inline-block px-4 py-1.5 text-[13px] font-medium tracking-wide text-white"
            style={{ backgroundColor: PURPLE }}
          >
            Projects
          </span>

          <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-[1.25] tracking-tight">
            <span style={{ color: INK }}>Insights from </span>
            <span style={{ color: INK_40 }}>Our</span>
            <br />
            <span style={{ color: INK_40 }}>Case Studies</span>
          </h2>
        </motion.div>
      </div>

      {/* ----------------------------------------------------------- cards */}
      <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-16">
        <div className="grid gap-4 md:grid-cols-2">
          {CASE_STUDIES.map((study, i) => (
            <CaseCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------- footer */}
      <div className="mx-auto flex max-w-7xl flex-col px-6 pb-6 sm:px-10 md:flex-row md:items-end md:justify-between lg:px-16">
        <div className="max-w-md">
          <div
            className="mb-4 flex h-7 w-7 items-center justify-center border text-xs"
            style={{ borderColor: INK_20, color: INK }}
          >
            +
          </div>

          <p className="text-[14px] leading-[1.7]" style={{ color: INK_60 }}>
            We partner with ambitious brands that are ready to move beyond fragmented
            visuals and shallow quick fixes -- turning their identity, website, and
            messaging into one focused engine for growth.
          </p>

          <button type="button" className="group mt-6 flex items-end">
            <span
              className="inline-flex items-center gap-[10px] border px-3 py-2 text-base font-medium text-white transition-colors"
              style={{ backgroundColor: INK, borderColor: INK_20 }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(26,11,46,0.85)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
            >
              Let&rsquo;s work together
            </span>

            <span
              className="mb-6 flex h-6 w-6 items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mb-9"
              style={{ backgroundColor: PURPLE }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                <path d="M18.75 6V15.75C18.75 15.949 18.671 16.14 18.53 16.28C18.39 16.421 18.199 16.5 18 16.5C17.801 16.5 17.61 16.421 17.47 16.28C17.329 16.14 17.25 15.949 17.25 15.75V7.81L6.53 18.53C6.39 18.671 6.199 18.75 6 18.75C5.801 18.75 5.61 18.671 5.47 18.53C5.329 18.39 5.25 18.199 5.25 18C5.25 17.801 5.329 17.61 5.47 17.47L16.19 6.75H8.25C8.051 6.75 7.86 6.671 7.72 6.53C7.579 6.39 7.5 6.199 7.5 6C7.5 5.801 7.579 5.61 7.72 5.47C7.86 5.329 8.051 5.25 8.25 5.25H18C18.199 5.25 18.39 5.329 18.53 5.47C18.671 5.61 18.75 5.801 18.75 6Z" />
              </svg>
            </span>
          </button>
        </div>

        <div
          className="mt-10 flex-1 overflow-hidden border-t md:ml-12 md:mt-0 md:border-t-0"
          style={{ borderColor: INK_10 }}
        >
          <div className="overflow-hidden py-5">
            <div className="marquee-projects flex w-max">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <div key={i} className="flex shrink-0 items-center gap-2.5 px-8">
                  <LogoIcon type={logo.icon} />
                  <span
                    className="whitespace-nowrap text-sm font-medium tracking-wide"
                    style={{ color: INK_80 }}
                  >
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-12" />
    </section>
  )
}
