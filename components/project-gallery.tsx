'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { CaseFile } from '@/lib/dossier-data'
import type { CSSProperties } from 'react'

type Project = Pick<CaseFile, 'id' | 'title' | 'category' | 'summary' | 'flow'> & { image: string }

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [selection, setSelection] = useState({ index: 0, previous: 0, direction: 1 })
  const active = projects[selection.index]
  function select(index: number, direction: number) {
    if (index !== selection.index) setSelection({ index, direction, previous: selection.index })
  }
  function move(direction: number) {
    select((selection.index + direction + projects.length) % projects.length, direction)
  }
  return (
    <div className="project-book">
      <div className="book-controls" onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          move(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}>
        <div className="book-index" role="group" aria-label="Choose a project">
          {projects.map((project, index) => (
            <button key={project.id} aria-pressed={selection.index === index}
              onClick={() => select(index, Math.sign(index - selection.index))}>
              <span>{String(index + 1).padStart(2, '0')}</span>{project.title}
            </button>
          ))}
        </div>
        <div className="book-arrows">
          <button onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft size={18} /></button>
          <button onClick={() => move(1)} aria-label="Next project"><ArrowRight size={18} /></button>
        </div>
      </div>
      <div className="book-spread" data-scroll-scene="project">
        <Link className="book-cover" href={`/projects/${active.id}`} aria-label={`Read the ${active.title} case study`}>
          <div className="book-sheets" data-direction={selection.direction}>
            {projects.map((project, index) => (
              <div key={project.id} className="book-sheet" data-layer={index === selection.index ? 'active' : index === selection.previous ? 'previous' : 'hidden'}>
                <Image src={project.image} alt="" width={1024} height={483} sizes="(max-width: 760px) 90vw, 54vw"
                  style={index === selection.index ? { viewTransitionName: `project-cover-${project.id}` } as CSSProperties : undefined} />
              </div>
            ))}
          </div>
        </Link>
        <div className="book-notes">
          <span className="book-category">{active.category}</span>
          <h3>{active.title}</h3>
          <p>{active.summary}</p>
          <Link className="text-link" href={`/projects/${active.id}`}>Read case study <ArrowUpRight size={16} /></Link>
        </div>
      </div>
      <div className="book-flow">
        <h4>How it works</h4>
        <ol>{active.flow.map(step => <li key={step}>{step}</li>)}</ol>
      </div>
      <p className="sr-only" role="status">{active.title}, project {selection.index + 1} of {projects.length}</p>
      <noscript><ul>{projects.map(project => <li key={project.id}><a href={`/projects/${project.id}`}>{project.title} case study</a></li>)}</ul></noscript>
    </div>
  )
}
