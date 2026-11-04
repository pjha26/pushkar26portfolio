import { CASES } from '@/lib/dossier-data'
import { ProjectLab } from '@/components/project-lab'
import { ProjectGallery } from '@/components/project-gallery'

export function Projects() {
  return (
    <section className="reel-work shell" aria-labelledby="work-title">
      <div className="reel-work-heading">
        <h1 id="work-title"><span>Selected</span><br />work.</h1>
        <div>
          <p>Four builds. Four different problems.</p>
          <ProjectLab />
        </div>
      </div>
      <ProjectGallery projects={CASES.map(({ id, title, category, image }) => ({ id, title, category, image: image! }))} />
    </section>
  )
}
