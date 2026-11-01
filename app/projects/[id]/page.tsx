import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { CASES } from '@/lib/dossier-data'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return CASES.map((project) => ({ id: project.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = CASES.find((item) => item.id === id)
  if (!project) notFound()
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.title} — A project by Pushkar Raj`,
      description: project.summary,
      url: `/projects/${project.id}`,
      images: project.image
        ? [{ url: project.image, alt: `${project.title} application preview` }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Pushkar Raj`,
      description: project.summary,
      images: project.image ? [project.image] : [],
    },
  }
}

export default async function CaseStudy({ params }: Props) {
  const { id } = await params
  const project = CASES.find((item) => item.id === id)
  if (!project) notFound()
  const next = CASES[(CASES.indexOf(project) + 1) % CASES.length]

  return (
    <main className="case-study shell" id="main-content">
      <Link href="/work" className="case-back" transitionTypes={['page-prev']}>
        <ArrowLeft size={14} /> Back to selected work
      </Link>
      <header className="case-heading">
        <div>
          <p className="eyebrow">{project.category} / 2026</p>
          <h1>{project.title}</h1>
        </div>
        <div>
          <p>{project.summary}</p>
          <div className="project-links">
            {project.live && (
              <a
                className="button button-primary"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live site <ArrowUpRight size={15} />
              </a>
            )}
            {project.github && (
              <a
                className="text-link"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View source <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      </header>
      {project.image && (
        <div className="case-cover">
          <Image
            src={project.image}
            alt={`${project.title} application interface`}
            width={1024}
            height={483}
            sizes="(max-width: 700px) 90vw, 1000px"
            loading="eager"
          />
        </div>
      )}
      <dl className="case-facts">
        <div>
          <dt>Project</dt>
          <dd>Independent build</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>{project.category}</dd>
        </div>
        <div>
          <dt>Built with</dt>
          <dd>{project.stack.join(' · ')}</dd>
        </div>
      </dl>
      <div className="case-body">
        <nav className="case-aside" aria-label="Case study contents">
          <a href="#overview">01 — The problem</a>
          <a href="#system">02 — How it connects</a>
          <a href="#decisions">03 — Design decisions</a>
          <a href="#implementation">04 — The implementation</a>
        </nav>
        <div className="case-content">
          <section id="overview">
            <p className="eyebrow section-kicker">01 / Context</p>
            <h2>The problem worth solving.</h2>
            <p>{project.problem}</p>
            {project.challenge && (
              <div className="case-decision" style={{ marginTop: 24 }}>
                <h3>The hard part</h3>
                <p>{project.challenge}</p>
              </div>
            )}
          </section>
          <section id="system">
            <p className="eyebrow section-kicker">02 / System at a glance</p>
            <h2>How the pieces connect.</h2>
            <div className="case-flow" role="list" aria-label="Application flow">
              {project.flow.map((step, index) => (
                <div className="flow-step" role="listitem" key={step}>
                  <span>0{index + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </section>
          <section id="decisions">
            <p className="eyebrow section-kicker">03 / Engineering choices</p>
            <h2>A few deliberate decisions.</h2>
            <div className="case-decisions">
              {project.decisions.map((decision) => (
                <div className="case-decision" key={decision.title}>
                  <h3>{decision.title}</h3>
                  <p>{decision.body}</p>
                </div>
              ))}
            </div>
          </section>
          <section id="implementation">
            <p className="eyebrow section-kicker">04 / From idea to implementation</p>
            <h2>What went into the build.</h2>
            <ul className="case-approach">
              {project.approach.map((item, index) => (
                <li key={item}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
            <div className="case-decision" style={{ marginTop: 24 }}>
              <h3>The trade-off to keep in mind</h3>
              <p>{project.tradeoff}</p>
            </div>
          </section>
          <Link href={`/projects/${next.id}`} className="next-project">
            <div>
              <p className="eyebrow">Up next</p>
              <h2>{next.title}</h2>
            </div>
            <ArrowRight />
          </Link>
        </div>
      </div>
    </main>
  )
}
