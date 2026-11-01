import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export function About() {
  return (
    <section className="about-section section-space shell" id="about" aria-labelledby="about-title">
      <div className="about-grid">
        <div className="about-portrait" data-reveal>
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
        <div className="about-copy" data-reveal>
          <p className="eyebrow section-kicker">02 / The person behind the code</p>
          <h1 id="about-title">
            Between the UI
            <br />
            and the <em>worker queue.</em>
          </h1>
          <p>
            I’m Pushkar, a Computer Science student at JSS Academy of Technical Education,
            Bengaluru, specializing in AI & Machine Learning.
          </p>
          <p>
            I build across interfaces, APIs, and worker queues. My projects explore AI research,
            voice interviews, reliable bookings, and live traffic visibility. The case studies share
            the decisions behind each build.
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
      <div className="about-foundation">
        <span className="eyebrow">2023–2027 / JSSATE, Bengaluru</span>
        <p>B.E. Computer Science · AI &amp; Machine Learning</p>
      </div>
    </section>
  )
}
