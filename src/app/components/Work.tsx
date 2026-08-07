import { useReveal } from '../hooks/useGsap'
import { GLASS_LIGHT, PURPLE } from '../theme'

type Case = {
  slug: string
  title: string
  blurb: string
  tags: string[]
}

const CASES: Case[] = [
  {
    slug: 'mitti',
    title: 'Mitti',
    blurb:
      'Crop advisory and mandi-price intelligence for smallholder farmers across six states.',
    tags: ['Product', 'Agritech'],
  },
  {
    slug: 'safar',
    title: 'Safar',
    blurb: 'A booking super-app bringing intercity bus travel out of the WhatsApp era.',
    tags: ['Product', 'Brand', 'Mobility'],
  },
  {
    slug: 'dhaara',
    title: 'Dhaara',
    blurb: "A UPI-first savings and goals app designed for Bharat's first-time investors.",
    tags: ['Product', 'Fintech'],
  },
  {
    slug: 'utsav',
    title: 'Utsav',
    blurb: 'Festive corporate gifting, from Diwali hampers to onboarding kits, at scale.',
    tags: ['Product', 'Brand', 'Corporate gifting'],
  },
]

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Work() {
  const headRef = useReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.1 })
  const gridRef = useReveal<HTMLDivElement>({ selector: '[data-case]', stagger: 0.1, y: 48 })
  const ctaRef = useReveal<HTMLDivElement>()

  return (
    <section
      id="work"
      className="max-w-[1440px] mx-auto px-[clamp(20px,4vw,56px)] pt-[clamp(50px,7vh,84px)] pb-[clamp(56px,8.4vh,98px)] sm:pt-[clamp(72px,10vh,120px)] sm:pb-[clamp(80px,12vh,140px)]"
    >
      <div
        ref={headRef}
        className="text-center mb-[clamp(34px,4.9vh,62px)] sm:mb-[clamp(48px,7vh,88px)]"
      >
        <h2
          data-reveal
          style={{
            fontSize: 'clamp(36px, 5vw, 68px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.06,
          }}
        >
          Things we&rsquo;ve{' '}
          <span
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            shipped
          </span>
        </h2>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-y-[clamp(17px,2.1vw,34px)] sm:gap-y-[clamp(24px,3vw,48px)] gap-x-[clamp(24px,3vw,40px)]"
      >
        {CASES.map((item, i) => (
          <a
            key={item.slug}
            href="#"
            data-case
            className={`group block ${
              i % 2 === 1 ? 'md:translate-y-[clamp(40px,8vh,110px)]' : ''
            }`}
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden transition-transform duration-500 group-hover:scale-[0.985]">
              <img
                src={`${import.meta.env.BASE_URL}work/${item.slug}.jpg`}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="pt-3.5 sm:pt-5 px-1">
              <div className="flex flex-wrap gap-2 mb-2.5 sm:mb-3.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-3.5 py-1.5 font-semibold text-neutral-600 ${GLASS_LIGHT}`}
                    style={{ fontSize: 12.5 }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3
                className="mb-2"
                style={{
                  fontSize: 'clamp(24px, 2.4vw, 34px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                {item.title}
              </h3>

              <p
                className="text-neutral-600 max-w-[44ch] mb-2.5 sm:mb-3.5"
                style={{ fontSize: 16, lineHeight: 1.5 }}
              >
                {item.blurb}
              </p>

              <span
                className="inline-flex items-center gap-1.5 font-semibold"
                style={{ fontSize: 15, color: PURPLE }}
              >
                View case
                <Arrow />
              </span>
            </div>
          </a>
        ))}
      </div>

      <div
        ref={ctaRef}
        className="flex justify-center mt-[clamp(70px,11.2vh,126px)] sm:mt-[clamp(100px,16vh,180px)]"
      >
        <a
          href="#"
          className={`inline-flex items-center gap-2.5 font-semibold rounded-full px-[30px] py-4 text-[#1a0b2e] transition-colors duration-300 hover:bg-[#1a0b2e] hover:text-white ${GLASS_LIGHT}`}
          style={{ fontSize: 16 }}
        >
          View all projects
        </a>
      </div>
    </section>
  )
}
