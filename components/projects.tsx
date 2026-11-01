import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CASES } from '@/lib/dossier-data'

export function Projects() {
  return (
    <section className="work-index shell" aria-labelledby="work-title">
      <div className="work-index-heading">
        <h1 id="work-title">
          Selected <em>work.</em>
        </h1>
        <p>Four builds. Four different problems.</p>
      </div>
      <div className="work-directory">
        {CASES.map((project, index) => (
          <article key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              transitionTypes={['page-next']}
              aria-label={`Read the ${project.title} case study`}
            >
              <Image
                src={project.image!}
                alt={`${project.title} application preview`}
                width={1024}
                height={483}
                sizes="(max-width: 700px) 44vw, 45vw"
              />
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
