import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { CASES } from '@/lib/dossier-data'

export function Projects() {
  return (
    <section className="work-section section-space" id="projects" aria-labelledby="work-title">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow section-kicker">01 / Selected work</p>
            <h2 id="work-title">
              Ideas, made <em>real.</em>
            </h2>
          </div>
          <p>
            Research, conversation, reservations.
            <br />
            Different problems. Decisions behind each one.
          </p>
        </div>
        <div className="project-grid">
          {CASES.map((project, index) => (
            <article
              className={`project-card project-${project.id}${index === 0 ? ' project-featured' : ''}`}
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
                    sizes={
                      index === 0
                        ? '(max-width: 700px) 92vw, 60vw'
                        : '(max-width: 700px) 92vw, (max-width: 1000px) 44vw, 28vw'
                    }
                    className="project-screenshot"
                  />
                </div>
                <span className="project-open">
                  <ArrowUpRight size={20} />
                </span>
              </Link>
              <div className="project-info">
                <div className="project-title-row">
                  <h3>
                    <Link href={`/projects/${project.id}`}>{project.title}</Link>
                  </h3>
                  <span className="project-number">0{index + 1}</span>
                </div>
                <p>{project.summary}</p>
                {index === 0 && (
                  <div className="project-workflow">
                    <p className="eyebrow">From request to result</p>
                    <ol>
                      {project.flow.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
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
                    Behind the build <ArrowRight size={15} />
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
