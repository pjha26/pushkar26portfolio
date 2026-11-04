import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export function About() {
  return (
    <section className="reel-about shell" id="about" aria-labelledby="about-title">
      <div className="reel-about-heading">
        <span className="reel-build-word" aria-hidden="true">BUILD</span>
        <h1 id="about-title">Between the<br /><span>UI /</span> and the<br /><em>worker queue.</em></h1>
      </div>
      <div className="reel-about-grid">
        <div className="reel-about-photo">
            <Image
              src="/PRF1.jpeg"
              alt="Pushkar Raj"
              width={768}
              height={812}
              sizes="(max-width: 700px) 90vw, 42vw"
            />
        </div>
        <div className="reel-about-copy">
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
            className="text-link"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
      <div className="reel-foundation">
        <span className="eyebrow">2023–2027 / JSSATE, Bengaluru</span>
        <p>B.E. Computer Science · AI &amp; Machine Learning</p>
      </div>
    </section>
  )
}
