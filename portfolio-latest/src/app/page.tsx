import Hero from '@/components/Hero'
import MainQuests from '@/components/MainQuests'
import SideQuests from '@/components/SideQuests'
import RelevantLinks from '@/components/RelevantLinks'

export default function Home() {
  return (
    <main className="canvas">
      <div className="sheet">
        <Hero />
        <MainQuests />
        <SideQuests />
        <RelevantLinks />
      </div>

      <img className="footerArt pixel" src="/img/footer-landscape.svg" alt="" aria-hidden />
    </main>
  )
}
