import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Download, Mail } from 'lucide-react'
import { SiGithub, SiLeetcode } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { CASES, LINKS } from '@/lib/dossier-data'
import { SceneSound } from '@/components/scene-sound'

const technologies = ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker']

export function Hero() {
  return (
    <section className="warm-hero" aria-labelledby="hero-title">
      <div className="warm-stage shell">
        <div className="warm-intro">
          <p className="warm-kicker">Introduction</p>
          <h1 id="hero-title">
            Building thoughtful<br className="wide-break" />{' '}
            <em>websites</em> that solve<br className="wide-break" />{' '}
            real-world problems.
          </h1>
          <p className="warm-description">
            I’m Pushkar, a developer in Bengaluru. I build AI workflows, voice interfaces, and
            real-time apps — from the first interaction to the worker behind it.
          </p>
          <ul className="warm-tags" aria-label="Specialties">
            {['Next.js', 'TypeScript', 'Python', 'Applied AI'].map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
          <dl className="warm-facts">
            <div><dt>Selected projects</dt><dd>{String(CASES.length).padStart(2, '0')}</dd></div>
            <div><dt>Computer Science · JSSATE</dt><dd>2027</dd></div>
          </dl>
          <div className="warm-actions">
            <a className="button button-primary" href={LINKS.email}>
              Start a conversation <ArrowUpRight size={16} />
            </a>
            <Link className="button warm-secondary" href="/work" transitionTypes={['page-next']}>
              Explore my work <ArrowDown size={16} />
            </Link>
          </div>
          <SceneSound />
        </div>
        <aside className="profile-card" aria-label="About Pushkar Raj">
          <p className="profile-availability"><span /> Open to opportunities</p>
          <div className="profile-art">
            <Image
              src="/pushkar-3d-portrait.png"
              alt="3D-style illustrated portrait of Pushkar Raj"
              width={1223}
              height={1286}
              sizes="(max-width: 700px) 320px, 380px"
              loading="eager"
            />
          </div>
          <h2>Pushkar Raj</h2>
          <p className="profile-role">Full-stack developer & AI builder</p>
          <a className="profile-email" href={LINKS.email}><Mail size={16} /> pjha2608@gmail.com</a>
          <div className="profile-socials">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer"><SiGithub size={16} /> GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin size={16} /> LinkedIn</a>
            <a href={LINKS.leetcode} target="_blank" rel="noopener noreferrer"><SiLeetcode size={16} /> LeetCode</a>
          </div>
          <a className="button profile-resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Download size={16} /> Download résumé <ArrowUpRight size={15} />
          </a>
        </aside>
      </div>
      <div className="warm-footer shell">
        <ul aria-label="Development tools">{technologies.map((tool) => <li key={tool}>{tool}</li>)}</ul>
        <Link href="/work" className="scroll-cue" transitionTypes={['page-next']}>
          Swipe up to explore <ArrowDown size={14} />
        </Link>
      </div>
    </section>
  )
}
