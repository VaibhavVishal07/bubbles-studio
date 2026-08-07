import { useFloat, useReveal } from '../hooks/useGsap'
import BubbleMark from './BubbleMark'
import { GLASS_ON_DARK, PURPLE } from '../theme'

const LINKS = ['Work', 'Services', 'About', 'Contact', 'FAQ', 'Playground', 'Shop']
const SOCIALS = ['Instagram', 'Behance', 'LinkedIn']

function FootLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="uppercase font-bold opacity-60 mt-5 sm:mt-7 mb-2.5"
      style={{ fontSize: 12, letterSpacing: '0.14em' }}
    >
      {children}
    </div>
  )
}

export default function Footer() {
  const ctaRef = useReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.12, y: 44 })
  const gridRef = useReveal<HTMLDivElement>({ selector: '[data-col]', stagger: 0.1 })
  const illoRef = useFloat<HTMLDivElement>(18, 9)

  return (
    <footer id="contact" className="px-3 sm:px-4">
      <div
        className="relative overflow-hidden rounded-3xl max-w-[1440px] mx-auto text-white px-[clamp(20px,4vw,56px)] pt-[clamp(56px,8.4vh,98px)] sm:pt-[clamp(80px,12vh,140px)] pb-8 sm:pb-10 mt-[clamp(42px,7vh,84px)] sm:mt-[clamp(60px,10vh,120px)]"
        style={{ backgroundColor: PURPLE }}
      >
        <div
          ref={ctaRef}
          className="text-center mb-[clamp(70px,10.5vh,112px)] sm:mb-[clamp(100px,15vh,160px)]"
        >
          <h2
            data-reveal
            style={{
              fontSize: 'clamp(44px, 7vw, 104px)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.02,
            }}
          >
            Ready to move forward?
            <br />
            Let&rsquo;s{' '}
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              work together!
            </span>
          </h2>

          <button
            data-reveal
            type="button"
            className={`mt-8 sm:mt-11 rounded-full px-8 py-4 font-semibold text-white transition-transform duration-300 hover:scale-105 ${GLASS_ON_DARK}`}
            style={{ fontSize: 16 }}
          >
            Contact us
          </button>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr] gap-[clamp(22px,2.8vw,45px)] sm:gap-[clamp(32px,4vw,64px)] pb-[clamp(42px,6.3vh,77px)] sm:pb-[clamp(60px,9vh,110px)] border-b border-white/25"
        >
          <div data-col>
            <ul className="flex flex-col gap-3">
              {LINKS.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:opacity-70 transition-opacity">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-col>
            <FootLabel>Studio</FootLabel>
            <a href="#" className="hover:opacity-70 transition-opacity">
              4B Hauz Khas Village
              <br />
              New Delhi 110016, India
            </a>

            <FootLabel>New business</FootLabel>
            <a
              href="mailto:namaste@bubbles.studio"
              className="hover:opacity-70 transition-opacity"
            >
              namaste@bubbles.studio
            </a>

            <FootLabel>Connect</FootLabel>
            <ul className="flex flex-col gap-3">
              {SOCIALS.map((social) => (
                <li key={social}>
                  <a href="#" className="hover:opacity-70 transition-opacity">
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-col>
            <h4 style={{ fontSize: 22, fontWeight: 700 }} className="mb-2.5">
              Subscribe to our newsletter
            </h4>
            <p className="text-white/75" style={{ lineHeight: 1.55 }}>
              A digestible selection of inspiring finds. Sent monthly, from our screen to
              yours.
            </p>

            <form
              className="flex gap-2.5 max-w-[420px] mt-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
                className={`flex-1 min-w-0 rounded-full px-5 py-3 placeholder:text-white/60 outline-none focus:border-white/70 transition-colors ${GLASS_ON_DARK}`}
              />
              <button
                type="submit"
                className={`rounded-full px-6 py-3 font-semibold text-white shrink-0 transition-transform duration-300 hover:scale-105 ${GLASS_ON_DARK}`}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div
          ref={illoRef}
          className="absolute right-[clamp(20px,4vw,56px)] bottom-32 w-[clamp(120px,14vw,220px)] hidden lg:block pointer-events-none"
        >
          <BubbleMark className="w-full h-auto" color="#ffffff" opacity={0.25} />
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 sm:pt-8"
          style={{ fontSize: 15 }}
        >
          <span className="font-black" style={{ letterSpacing: '-0.02em' }}>
            ./
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-70 transition-opacity">
              Terms &amp; Conditions
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              Privacy
            </a>
          </div>
          <span>&copy; 2026 bubbles</span>
        </div>
      </div>
    </footer>
  )
}
