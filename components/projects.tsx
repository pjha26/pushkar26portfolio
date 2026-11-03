import Image from 'next/image'
import { ViewTransition } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CASES } from '@/lib/dossier-data'
import { ProjectLab } from '@/components/project-lab'

export function Projects() {
  return (
    <section className="work-index shell" aria-labelledby="work-title">
      <div className="work-index-heading">
        <h1 id="work-title">
          Selected <em>work.</em>
        </h1>
        <div className="work-index-tools">
          <p>Four builds. Four different problems.</p>
          <ProjectLab />
        </div>
      </div>
      <div className="work-directory">
        {CASES.map((project, index) => (
          <article key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              transitionTypes={['page-next']}
              aria-label={`Read the ${project.title} case study`}
            >
              <ViewTransition name={`project-cover-${project.id}`} share="project-morph" default="none">
                <Image
                  src={project.image!}
                  alt={`${project.title} application preview`}
                  width={1024}
                  height={483}
                  sizes="(max-width: 700px) 44vw, 45vw"
                />
              </ViewTransition>
              <div className="work-directory-title">
                <span>0{index + 1}</span>
                <h2>{project.title}</h2>
                <ArrowUpRight size={18} />
              </div>
              <p>{project.category}</p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
