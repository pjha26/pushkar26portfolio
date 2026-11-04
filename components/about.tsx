import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { BrushReveal } from '@/components/brush-reveal'

export function About({ embedded = false }: { embedded?: boolean }) {
  const Heading = embedded ? 'h2' : 'h1'
  return (
    <section className="studio-about studio-dark" id="about" aria-labelledby="about-title">
      <div className="about-cinema" data-scroll-scene="art">
        <Image className="about-ink" src="/art/about-ink.png" alt="" fill sizes="100vw" />
        <Heading id="about-title">About me<span>.</span></Heading>
      </div>
      <div className="studio-about-body shell">
        <div className="studio-biography" data-scroll-reveal>
          <div className="studio-bio-intro">
            <Image src="/PRF1.jpeg" alt="Pushkar Raj" width={768} height={812} sizes="(max-width: 700px) 150px, 200px" />
            <h3>Where code<br />meets <em>curiosity.</em></h3>
          </div>
          <BrushReveal>
            <p>I’m Pushkar, a Computer Science student at JSS Academy of Technical Education, Bengaluru, specializing in AI &amp; Machine Learning.</p>
            <p>I build across interfaces, APIs, and worker queues. My projects explore AI research, voice interviews, reliable bookings, and live traffic visibility. The case studies share the decisions behind each build.</p>
            <a className="text-link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={16} /></a>
          </BrushReveal>
        </div>
        <div className="studio-expertise" data-scroll-reveal>
          <div><span>01 / Interfaces</span><h3>From the first<br />interaction.</h3><p>Responsive interfaces with React, Next.js, and TypeScript.</p></div>
          <div><span>02 / Intelligence</span><h3>AI with a<br />practical purpose.</h3><p>Research workflows, retrieval, and voice conversations.</p></div>
          <div><span>03 / Infrastructure</span><h3>To the worker<br />running behind it.</h3><p>APIs, data, queues, and real-time systems.</p></div>
        </div>
        <p className="studio-education">2023–2027 / JSSATE, Bengaluru <span>B.E. Computer Science · AI &amp; Machine Learning</span></p>
      </div>
    </section>
  )
}
