import { buildCards, nowCards, sideQuests } from '@/data/site'

export default function SideQuests() {
  return (
    <section className="side" aria-label="Side quests">
      <h2 className="side-heading">{sideQuests.heading}</h2>
      <p className="side-body">{sideQuests.body}</p>

      <div className="nowRow">
        {nowCards.map((c) => (
          <article key={c.id} className={`nowCard nowCard--${c.id}`}>
            <img className="nowCard-img" src={c.image} alt="" />
            <p className="nowCard-label">
              {c.label.split('\n').map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </article>
        ))}
      </div>

      {/* Only rendered on tablet / mobile, matching the original layout. */}
      <div className="buildRow">
        {buildCards.map((c) => (
          <article key={c.id} className={`buildCard buildCard--${c.id}`}>
            <img className="buildCard-back" src={c.back} alt="" />
            <img className="buildCard-front" src={c.front} alt="" />
            <p className="buildCard-label">
              {c.label.split('\n').map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
