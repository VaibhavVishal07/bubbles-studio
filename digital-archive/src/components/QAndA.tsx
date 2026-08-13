import { useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import AssetImage from './AssetImage'

const CLOUD_SRC =
  'https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781584857/top-bg_j88wyu.png'

type Item = { q: string; a: string }

const LEFT_COLUMN: Item[] = [
  {
    q: 'Welcome Ananya. So how did Bubbles begin its journey?',
    a: "Less than a year into opening the studio on Cunningham Road, everything shut down. I had to close our doors, cancel every show, and rethink it all. But I never stopped curating because I was so determined not to let the makers' momentum die. We hit the ground running to build a digital space, and we've been evolving since.",
  },
  {
    q: 'How did you know where to begin?',
    a: "I didn't wait until we had the perfect platform. I saw designers and karigars struggling, isolated, uninspired, overwhelmed, and set to the task of creating ways to share their work with the world as quickly as possible.",
  },
  {
    q: 'So what was the first exhibit?',
    a: 'We were one of the first studios in India to launch a virtual exhibition after the lockdown — twelve makers from Bengaluru, Jaipur and Kochi in a single room. I think they were really grateful for that, they saw how hard we worked to honour their craft, and they trusted us while we continued to refine the digital experience.',
  },
]

const RIGHT_COLUMN: Item[] = [
  {
    q: 'What was the initial reaction?',
    a: 'We had so many people writing and reaching out that the online exhibits and archived works saved them in isolation. The atmosphere was so intimate, and it was really powerful to have people connecting through design, even though we were all in our own rooms, in different cities.',
  },
  {
    q: 'Where did you evolve from there?',
    a: 'The in-person pop-ups have been really special too, recently, now that enough people feel comfortable to gather. We had our first open-air showcase in a Malleshwaram courtyard last month, and I was basically in tears it was so beautiful.',
  },
  {
    q: "Do you find there's a new appreciation for design?",
    a: "There's a feeling of urgency like — this is our one life, our one chance, we don't have time to be indifferent anymore. We're gonna make like there's no tomorrow, we're gonna make for a better world, we're gonna make to reclaim our voice in this life, and we're gonna make because we deserve to feel beauty and wonder.",
  },
]

function QAItem({ item, delay }: { item: Item; delay: number }) {
  return (
    <div className="reveal" style={{ animationDelay: `${delay}s` }}>
      <h3 className="font-arsenica text-xs uppercase tracking-wide text-white sm:text-sm lg:text-base">
        {item.q}
      </h3>
      <p className="mt-3 font-inter text-[11px] leading-relaxed text-white/60 sm:text-xs lg:text-sm">
        {item.a}
      </p>
    </div>
  )
}

export default function QAndA() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const [cloudOffset, setCloudOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const progress = 1 - rect.bottom / (window.innerHeight + rect.height)
      setCloudOffset(Math.min(Math.max(progress, 0), 1) * 30)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative w-full bg-[#410C01] px-4 pt-20 sm:px-8 sm:pt-24 md:px-16 lg:px-28 lg:pt-32"
      style={{ paddingBottom: '50vh' }}
    >
      <h2 className="reveal flex items-baseline justify-center gap-1 font-arsenica text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
        <span>Q</span>
        <span className="text-xl italic text-white/80 sm:text-2xl md:text-3xl lg:text-4xl">&amp;</span>
        <span>A</span>
      </h2>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-10 sm:gap-14 md:grid-cols-2 md:gap-16 lg:gap-20">
        <div className="flex flex-col gap-10 sm:gap-14">
          {LEFT_COLUMN.map((item, i) => (
            <QAItem key={item.q} item={item} delay={0.12 * (i + 1)} />
          ))}
        </div>

        <div className="flex flex-col gap-10 sm:gap-14 md:mt-24">
          {RIGHT_COLUMN.map((item, i) => (
            <QAItem key={item.q} item={item} delay={0.12 * (i + 1 + LEFT_COLUMN.length)} />
          ))}
        </div>
      </div>

      <AssetImage
        src={CLOUD_SRC}
        fallback="fog-top.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-64 w-full object-fill sm:h-80 md:h-96 lg:h-auto"
        style={{ transform: `translateY(${60 - cloudOffset}%)` }}
      />
    </section>
  )
}
