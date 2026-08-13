import { relevantLinks } from '@/data/site'

export default function RelevantLinks() {
  return (
    <section className="links" aria-label="Relevant links">
      <h2 className="links-heading">{relevantLinks.heading}</h2>

      {relevantLinks.items.map((item, i) => {
        const Row = item.href ? 'a' : 'div'
        return (
          <div key={item.label} className={`linkCol linkCol--${i + 1}`}>
            <Row className="linkRow" {...(item.href ? { href: item.href } : {})}>
              <span className="linkRow-label">{item.label}</span>
              <img className="linkRow-arrow pixel" src="/svg/arrow-up-right.svg" alt="" aria-hidden />
            </Row>
            <span className="linkRule" />
          </div>
        )
      })}
    </section>
  )
}
