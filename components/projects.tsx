import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CASES } from '@/lib/dossier-data'
import { ProjectLab } from '@/components/project-lab'
import { ProjectGallery } from '@/components/project-gallery'

export function Projects({ embedded = false }: { embedded?: boolean }) {
  const Heading = embedded ? 'h2' : 'h1'
  return (
    <section className="studio-work" id="work" aria-labelledby="work-title">
      <span id="projects" className="section-anchor" />
      <div className="shell">
        <div className="studio-section-heading" data-scroll-reveal>
          <Heading id="work-title">Selected work<span>.</span></Heading>
          <div><p>Four builds. Four different problems.</p><ProjectLab /></div>
        </div>
        <ProjectGallery projects={CASES.map(({ id, title, category, image }) => ({ id, title, category, image: image! }))} />
        <div className="work-orbit" data-scroll-scene="orbit" aria-label="Four projects, one practice">
          <div className="orbit-caption"><span>01—04 / Selected projects</span><p>Interfaces, APIs,<br />and worker queues.</p></div>
          <div className="orbit-stage" aria-hidden="true">
            <div className="orbit-center">WORK<span>2026</span></div>
            {CASES.map((project, index) => <div className={`orbit-preview orbit-preview-${index}`} key={project.id}><Image src={project.image!} alt="" width={1024} height={483} sizes="(max-width: 700px) 28vw, 230px" /></div>)}
          </div>
          <p className="orbit-note">Four builds.<br />Four different problems.</p>
        </div>
        <div className="work-detail-index">
          <h3>The work, in detail.</h3>
          {CASES.map((project, index) => (
            <article className="work-detail-row" key={project.id} data-scroll-scene="project">
              <div className="work-detail-label"><span>0{index + 1}</span><h4>{project.title}</h4><p>{project.category}</p></div>
              <Link className="work-detail-image" href={`/projects/${project.id}`} aria-label={`Read the ${project.title} case study`}><Image src={project.image!} alt={`${project.title} application preview`} width={1024} height={483} sizes="(max-width: 700px) 90vw, 45vw" /></Link>
              <div className="work-detail-copy"><p>{project.summary}</p><Link className="text-link" href={`/projects/${project.id}`}>Read case study <ArrowUpRight size={16} /></Link></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
