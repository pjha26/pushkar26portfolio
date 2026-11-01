import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { CASES } from '@/lib/dossier-data'
import { ProjectJourney } from '@/components/project-journey'

export function Projects() {
  return (
    <section className="work-section section-space" id="projects" aria-labelledby="work-title">
      <div className="work-transition" aria-hidden="true">
        <div className="work-transition-line" />
      </div>
      <div className="shell">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow section-kicker">01 / Selected work</p>
            <h2 id="work-title">
              Selected <em>work.</em>
            </h2>
          </div>
          <p>
            Research, conversation, reservations.
            <br />
            Different problems. Decisions behind each one.
          </p>
        </div>
        <ProjectJourney>
          <nav className="project-tabs" aria-label="Project chapters">
            {CASES.map((project, index) => (
              <a
                key={project.id}
                href={`#work-${project.id}`}
                aria-current={index === 0 ? 'location' : undefined}
              >
                <span>0{index + 1}</span> {project.title}
              </a>
            ))}
          </nav>
          <div className="project-grid">
            {CASES.map((project, index) => (
              <article
                className={`project-card project-${project.id}`}
                id={`work-${project.id}`}
                key={project.id}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="project-visual"
                  aria-label={`Read the ${project.title} case study`}
                >
                  <div className="project-visual-top">
                    <span>
                      {index === 0 ? 'Featured build / ' : ''}
                      {project.category}
                    </span>
                    <span className="project-year">
                      2026 <ArrowUpRight size={14} />
                    </span>
                  </div>
                  <div className="project-reveal">
                    <div className="browser-frame">
                      <div className="browser-chrome" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                        <span>{project.title.toLowerCase()}</span>
                      </div>
                      <Image
                        src={project.image!}
                        alt={`${project.title} application preview`}
                        width={1024}
                        height={483}
                        sizes="(max-width: 850px) 92vw, 60vw"
                        className="project-screenshot"
                      />
                    </div>
                  </div>
                  <span className="project-open">
                    <ArrowUpRight size={20} />
                  </span>
                </Link>
                <div className="project-info">
                  <span className="project-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div className="project-title-row">
                    <h3>
                      <Link href={`/projects/${project.id}`}>{project.title}</Link>
                    </h3>
                  </div>
                  <p>{project.summary}</p>
                  <p className="project-build-note">
                    <span>Build note</span>
                    {project.decisions[0].title}
                  </p>
                  <div className="project-tags">
                    {project.stack.slice(0, 4).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <Link href={`/projects/${project.id}`} className="text-link">
                      Open case study <ArrowRight size={15} />
                    </Link>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-live"
                      >
                        Live site <ArrowUpRight size={14} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-live"
                      >
                        Code <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                  {index < CASES.length - 1 && (
                    <p className="project-scroll-hint">↓ Scroll to unfold the next build</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </ProjectJourney>
      </div>
    </section>
  )
}
