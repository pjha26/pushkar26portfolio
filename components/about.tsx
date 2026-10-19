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
            Curiosity is
            <br />
            the <em>starting point.</em>
          </h2>
          <p>
            I’m Pushkar, a Computer Science student at JSS Academy of Technical Education,
            Bengaluru, specializing in AI & Machine Learning.
          </p>
          <p>
            I like building across the whole stack: the interface someone touches, the API behind
            it, and the data that makes it useful. Recently, that’s meant voice interviews,
            multi-agent workflows, and real-time booking systems.
          </p>
          <p>
            My favorite part is connecting the pieces—and staying with a problem until the result
            feels right.
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
