'use client'

import { useEffect } from 'react'
import type { Project } from '@/data/site'

export default function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const cs = project.caseStudy

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={cs.title}>
      <div className="modal-backdrop" onClick={onClose} />

      <button type="button" className="modal-close" onClick={onClose} aria-label="Close case study">
        <span className="modal-closeIcon" />
      </button>

      <div className="modal-sheet">
        <div className="modal-inner">
          <p className="modal-eyebrow">{project.number}</p>
          <h2 className="modal-title">{cs.title}</h2>

          {cs.nda && <p className="modal-nda">{cs.ndaNote}</p>}

          <p className="modal-body">{cs.context}</p>

          {cs.role && (
            <div className="modal-block">
              <h3 className="modal-blockHeading">MY ROLE</h3>
              {cs.role.map((line) => (
                <p key={line} className="modal-blockBody">
                  {line}
                </p>
              ))}
            </div>
          )}

          <div className="modal-block">
            <h3 className="modal-blockHeading">THE TEAM</h3>
            <p className="modal-blockBody">{cs.team}</p>
          </div>

          {cs.sections?.map((s) => (
            <div key={s.heading} className="modal-block">
              <h3 className="modal-blockHeading">{s.heading.toUpperCase()}</h3>
              <p className="modal-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
