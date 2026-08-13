import { useScrollReveal } from '../hooks/useScrollReveal'

const backgroundAt = (width: number) =>
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260616_040223_98d314e9-b8b4-4218-bcbd-18ffc38032ac.png&w=${width}&q=85`

const BACKGROUND_SRC = backgroundAt(1280)
const BACKGROUND_SRCSET = [1280, 1920, 2560].map((w) => `${backgroundAt(w)} ${w}w`).join(', ')

export default function Showcase() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="gallery" ref={ref} className="relative min-h-screen w-full overflow-hidden">
      <img
        src={BACKGROUND_SRC}
        srcSet={BACKGROUND_SRCSET}
        sizes="100vw"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center text-white">
        <h2 className="reveal font-arsenica text-4xl tracking-wide drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)] sm:text-5xl md:text-6xl lg:text-7xl">
          Bubbles
        </h2>

        <p
          className="reveal mt-8 font-arsenica text-xl tracking-wide text-white/90 drop-shadow-[0_2px_16px_rgba(0,0,0,0.25)] sm:text-2xl md:text-3xl lg:text-4xl"
          style={{ animationDelay: '0.15s' }}
        >
          <span className="block">gave the world beauty</span>
          <span className="block">born from the stillness</span>
          <span className="block">of a shuttered Bengaluru.</span>
        </p>

        <button
          type="button"
          className="reveal mt-12 rounded-[50%] border border-white/50 bg-transparent px-10 py-4 font-inter text-[10px] uppercase tracking-[0.25em] text-white transition-all duration-500 hover:scale-[1.03] hover:border-white hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] sm:px-12 sm:py-5 sm:text-xs"
          style={{ animationDelay: '0.3s' }}
        >
          View Their Archive
        </button>
      </div>

      <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent to-[#410C01]" />
    </section>
  )
}
