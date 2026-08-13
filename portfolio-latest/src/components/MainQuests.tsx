'use client'

import { useState } from 'react'
import { mainQuests, projects } from '@/data/site'
import CaseStudyModal from './CaseStudyModal'

export default function MainQuests() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = projects.find((p) => p.id === openId) ?? null

  return (
    <section className="quests" aria-label="Main quests">
      <h2 className="quests-heading">
        <span className="onlyWide">{mainQuests.heading}</span>
        <span className="onlyNarrow">{mainQuests.headingNarrow}</span>
      </h2>

      <p className="quests-sub">
        {mainQuests.subtitleBefore}
        <a className="quests-subLink" href={mainQuests.subtitleLink.href || undefined}>
          {mainQuests.subtitleLink.label}
        </a>
      </p>

      {projects.map((p, i) => (
        <button
          key={p.id}
          type="button"
          className={`questCard questCard--${i + 1}`}
          onClick={() => setOpenId(p.id)}
          aria-label={`${p.title} — ${p.blurb}`}
          style={
            {
              '--accent-number': p.accent.number,
              '--accent-blurb': p.accent.blurb,
              '--accent-border': p.accent.border,
              '--accent-gradient': p.accent.gradient,
              '--accent-glow': p.accent.glow,
              '--accent-title': p.accent.title,
            } as React.CSSProperties
          }
        >
          {/* Desktop shows the prepared artwork; narrow screens draw the card. */}
          <img className="questCard-img" src={p.image} alt="" />

          <span className="questCard-draw" aria-hidden>
            <span className="questCard-glow" />
            <span className="questCard-frame" />
            <span className="questCard-gridV questCard-gridV--1" />
            <span className="questCard-gridV questCard-gridV--2" />
            <span className="questCard-gridV questCard-gridV--3" />
            <span className="questCard-gridH questCard-gridH--1" />
            <span className="questCard-gridH questCard-gridH--2" />
            <span className="questCard-num">{p.number}</span>
            <span
              className={`questCard-title${p.accent.title.startsWith('linear-gradient') ? ' is-gradient' : ''}`}
            >
              {p.title}
            </span>
            <span
              className={`questCard-blurb${p.accent.blurb.startsWith('linear-gradient') ? ' is-gradient' : ''}`}
            >
              {p.blurb}
            </span>
          </span>
        </button>
      ))}

      {open && <CaseStudyModal project={open} onClose={() => setOpenId(null)} />}
    </section>
  )
}
