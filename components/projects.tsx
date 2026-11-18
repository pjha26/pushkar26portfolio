import { CASES } from '@/lib/dossier-data'
import { ProjectLab } from '@/components/project-lab'
import { ProjectGallery } from '@/components/project-gallery'

export function Projects({ embedded = false }: { embedded?: boolean }) {
  const Heading = embedded ? 'h2' : 'h1'
  return (
    <section className="studio-work" id="work" aria-labelledby="work-title">
      <span id="projects" className="section-anchor" />
      <div className="shell">
        <div className="studio-section-heading">
          <Heading id="work-title">Selected work<span>.</span></Heading>
          <ProjectLab />
        </div>
        <ProjectGallery projects={CASES.map(({ id, title, category, image, summary, flow }) => ({
          id, title, category, image: image!, summary, flow,
        }))} />
      </div>
    </section>
  )
}
