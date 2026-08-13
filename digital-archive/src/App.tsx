import AssetImage from './components/AssetImage'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import QAndA from './components/QAndA'
import QuoteBanner from './components/QuoteBanner'
import Showcase from './components/Showcase'

const CLOUD_SRC =
  'https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781584857/top-bg_j88wyu.png'

const DOVE_SRC =
  'https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781584853/dove_xpaeub.png'

export default function App() {
  // Sections supply their own art; the base colour only shows through the
  // seams the negative margins open up on very wide viewports.
  return (
    <div className="relative w-full overflow-x-hidden bg-[#410C01]">
      <Navbar />
      <Hero />

      {/*
        Fog layer that pulls up over the hero and hands off to the showcase.
        Its height is pinned on small screens so the fog stays a band rather
        than a smear; wide viewports get its natural proportions.
      */}
      <div className="relative z-20 -mt-64 sm:-mt-72 md:-mt-80 lg:-mt-96">
        <AssetImage
          src={CLOUD_SRC}
          fallback="fog-top.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none h-64 w-full object-fill sm:h-80 md:h-96 lg:h-auto"
        />
      </div>

      <div id="talents" className="relative -mt-40 sm:-mt-48 md:-mt-56 lg:-mt-64">
        <Showcase />
        <AssetImage
          src={DOVE_SRC}
          fallback="dove.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 right-4 z-20 w-24 sm:-bottom-14 sm:right-8 sm:w-32 md:w-40 lg:right-16 lg:w-52 xl:w-64"
        />
      </div>

      <QAndA />
      <QuoteBanner />
      <Footer />
    </div>
  )
}
