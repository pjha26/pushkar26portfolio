'use client'

import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Music2, Play, X } from 'lucide-react'

export function EntryMusic() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  function closePlayer() {
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div className="entry-music">
      <button
        ref={triggerRef}
        className="music-trigger"
        aria-expanded={open}
        aria-controls="entry-music-player"
        onClick={() => setOpen(!open)}
      >
        <span className="music-disc" aria-hidden="true">
          <Music2 size={16} />
        </span>
        <span>
          <small>Entry soundtrack</small>
          <strong>
            MY EYES <span>/ Travis Scott</span>
          </strong>
        </span>
        {open ? <X size={15} /> : <Play size={13} />}
        <span className="sr-only">{open ? 'Close music player' : 'Play entry music preview'}</span>
      </button>
      {open &&
        createPortal(
          <section
            id="entry-music-player"
            className="music-player"
            aria-label="Entry music player"
            onKeyDown={(event) => {
              if (event.key === 'Escape') closePlayer()
            }}
          >
            <div className="music-player-heading">
              <span>
                <small>Entry soundtrack</small>
                <strong>MY EYES — Travis Scott</strong>
              </span>
              <button
                className="icon-button"
                onClick={closePlayer}
                aria-label="Stop and close music"
              >
                <X size={18} />
              </button>
            </div>
            <iframe
              title="MY EYES by Travis Scott — Spotify preview player"
              src="https://open.spotify.com/embed/track/4kjI1gwQZRKNDkw1nI475M?theme=0"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <p>Press play for the Spotify preview. Open Spotify for the full track.</p>
            <a
              href="https://open.spotify.com/track/4kjI1gwQZRKNDkw1nI475M"
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen on Spotify <ArrowUpRight size={13} />
            </a>
          </section>,
          document.body
        )}
    </div>
  )
}
