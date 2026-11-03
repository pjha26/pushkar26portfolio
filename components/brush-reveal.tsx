'use client'

import { useEffect, useId, useState, type PointerEvent, type ReactNode } from 'react'
import { Paintbrush } from 'lucide-react'

export function BrushReveal({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const detailsId = useId()

  useEffect(() => setReady(true), [])

  function moveBrush(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || open) return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--brush-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--brush-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <div className="brush-introduction" data-ready={ready} data-open={open}>
      <div className="brush-toolbar">
        <span className="brush-instruction"><Paintbrush size={13} /> Brush to discover</span>
        <div className="brush-modes" role="group" aria-label="Introduction display mode">
          <button type="button" className="brush-toggle" aria-pressed={!open} aria-controls={detailsId}
            onClick={() => setOpen(false)}>Brush</button>
          <button type="button" className="brush-toggle" aria-pressed={open} aria-controls={detailsId}
            onClick={() => setOpen(true)}>Unbrush</button>
        </div>
      </div>
      <div className="brush-surface" onPointerMove={moveBrush} onPointerEnter={moveBrush}>
        <div className="brush-hint" aria-hidden="true">A little curiosity goes a long way.<span>Move your pointer across this space.</span></div>
        <div className="brush-details" id={detailsId}>{children}</div>
        <span className="brush-tip" aria-hidden="true" />
      </div>
    </div>
  )
}
