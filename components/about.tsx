import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { LINKS } from '@/lib/dossier-data'

export function About() {
  return (
    <section className="about-section section-space shell" id="about" aria-labelledby="about-title">
      <div className="about-grid">
        <div className="about-portrait">
          <div className="portrait-frame">
            <Image
              src="/PRF1.jpeg"
              alt="Pushkar Raj"
              width={768}
              height={812}
              sizes="(max-width: 700px) 80vw, 320px"
            />
            <span className="portrait-mark" aria-hidden="true">
              pr.
            </span>
          </div>
          <div className="portrait-caption">
            <span>Pushkar Raj</span>
            <span>Bengaluru, IN ↗</span>
          </div>
        </div>
        <div className="about-copy">
          <p className="eyebrow section-kicker">02 / The person behind the code</p>
          <h2 id="about-title">
            Between the UI
            <br />
            and the <em>worker queue.</em>
          </h2>
          <p>
            I’m Pushkar, a Computer Science student at JSS Academy of Technical Education,
            Bengaluru, specializing in AI & Machine Learning.
          </p>
          <p>
            My projects take me across the stack. In ArthAI, the interface starts a research job,
            a background worker coordinates the agents, and the results become a report you can
            ask questions about.
          </p>
          <p>
            That work comes with decisions I’m still exploring: how to keep a long-running job
            out of a request, when a voice interview should ask a follow-up, and how to keep a
            booking dashboard current. The case studies share those decisions and their limits.
          </p>
          <a
            className="text-link about-resume"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            A little more about my background <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="background-notes" id="experience">
        <div>
          <span className="eyebrow">The foundation</span>
          <h3>Learning by doing.</h3>
        </div>
        <div className="background-note">
          <span className="note-date">2023 — 2027</span>
          <h4>B.E. Computer Science</h4>
          <p>
            AI & Machine Learning
            <br />
            JSSATE, Bengaluru
          </p>
        </div>
        <div className="background-note">
          <span className="note-date">2026 — Ongoing</span>
          <h4>Independent projects</h4>
          <p>
            Building full-stack applications,
            <br />
            AI workflows, and real-time systems.
          </p>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="small-link">
            Follow along on GitHub <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  )
}
