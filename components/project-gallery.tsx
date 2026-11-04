'use client'

import { useState, ViewTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'

type Project = { id: string; title: string; category: string; image: string }

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0)
  const active = projects[selected]
  const move = (direction: number) => setSelected(index => (index + direction + projects.length) % projects.length)

  return (
    <div className="reel-gallery" onKeyDown={event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault()
        move(event.key === 'ArrowRight' ? 1 : -1)
      }
    }}>
      <div className="reel-gallery-stage" aria-label="Project previews">
        {projects.map((project, index) => {
          const offset = (index - selected + projects.length) % projects.length
          const position = offset === 0 ? 'center' : offset === 1 ? 'right' : offset === projects.length - 1 ? 'left' : 'back'
          return (
            <div className={`reel-preview reel-preview-${position}`} key={project.id} aria-hidden={position === 'back' ? true : undefined}>
              {position === 'center' ? (
                <Link href={`/projects/${project.id}`} transitionTypes={['page-next']} aria-label={`Read the ${project.title} case study`}>
                  <ViewTransition name={`project-cover-${project.id}`} share="project-morph" default="none">
                    <Image src={project.image} alt={`${project.title} application preview`} width={1024} height={483} sizes="(max-width: 700px) 82vw, 52vw" />
                  </ViewTransition>
                </Link>
              ) : (
                <button onClick={() => setSelected(index)} tabIndex={position === 'back' ? -1 : 0} aria-label={`Select ${project.title}`}>
                  <Image src={project.image} alt="" width={1024} height={483} sizes="(max-width: 700px) 35vw, 30vw" />
                </button>
              )}
            </div>
          )
        })}
      </div>
      <div className="reel-gallery-caption" aria-live="polite" aria-atomic="true">
        <h2>{active.title}</h2>
        <p>{active.category}</p>
        <Link href={`/projects/${active.id}`} transitionTypes={['page-next']}>Read case study <ArrowUpRight size={17} /></Link>
      </div>
      <div className="reel-gallery-controls">
        <button className="reel-gallery-arrow" onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft size={23} /></button>
        <div className="reel-project-index" role="group" aria-label="Choose a project">
          {projects.map((project, index) => (
            <button key={project.id} aria-pressed={selected === index} onClick={() => setSelected(index)}>
              <span>0{index + 1}</span> {project.title}
            </button>
          ))}
        </div>
        <button className="reel-gallery-arrow" onClick={() => move(1)} aria-label="Next project"><ArrowRight size={23} /></button>
      </div>
      <noscript>
        <ul>{projects.map(project => <li key={project.id}><a href={`/projects/${project.id}`}>{project.title} — Read case study</a></li>)}</ul>
      </noscript>
    </div>
  )
}
