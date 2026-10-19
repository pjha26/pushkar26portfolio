import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { LINKS } from '@/lib/dossier-data'

export function Hero() {
  return (
    <section className="hero shell" id="hero-section" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span className="eyebrow">Bengaluru, India · Building for the web</span>
        <span className="availability">
          <span /> Open to opportunities
        </span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="intro-line">
            Hello, I’m Pushkar{' '}
            <span className="little-wave" aria-hidden="true">
              ↗
            </span>
          </p>
          <h1 id="hero-title">
            Thoughtful code.
            <br />
            <em>Useful things.</em>
          </h1>
          <p className="hero-description">
            A full-stack developer with a curiosity for AI.
            <br className="desktop-break" /> I turn complicated problems into things that
            <br className="desktop-break" /> feel simple to use.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my work <ArrowDown size={17} />
            </a>
            <a className="text-link" href={LINKS.email}>
              Let’s talk <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="hero-person">
            <Image src="/PRF1.jpeg" width={42} height={42} alt="Pushkar Raj" />
            <p>
              Currently studying Computer Science<span>JSSATE, Bengaluru · Class of 2027</span>
            </p>
          </div>
        </div>
        <div className="hero-art" aria-label="A look at my work and approach">
          <div className="art-grid" aria-hidden="true" />
          <div className="art-caption">
            <span className="tiny-star" aria-hidden="true">
              ✳
            </span>
            <span>
              A LITTLE CURIOSITY.
              <br />A LOT OF BUILDING.
            </span>
          </div>
          <Link
            href="/projects/arth-ai"
            className="workbench-card"
            aria-label="Explore ArthAI, my multi-agent AI project"
          >
            <div className="workbench-heading">
              <span>FROM THE WORKBENCH</span>
              <ArrowUpRight size={13} />
            </div>
            <Image
              src="/arthai.png"
              alt="ArthAI application"
              width={1024}
              height={483}
              sizes="(max-width: 700px) 78vw, 360px"
              loading="eager"
            />
            <div className="workbench-foot">
              <strong>ArthAI</strong>
              <span>Multi-agent AI / 2026</span>
            </div>
          </Link>
          <div className="art-scribble" aria-hidden="true">
            <svg viewBox="0 0 110 70" fill="none">
              <path
                d="M9 18C40 0 94 17 78 40C65 59 31 40 49 28C67 16 89 34 90 57M79 50l12 11 8-14"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            <span>
              the good part
              <br />
              is figuring it out.
            </span>
          </div>
          <span className="art-index">PERSONAL PORTFOLIO / 2026</span>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#projects" className="scroll-cue">
          <span className="scroll-line" /> A few things I’ve made <ArrowDown size={14} />
        </a>
        <div className="social-inline">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
            <SiGithub size={16} /> GitHub <ArrowUpRight size={12} />
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={16} /> LinkedIn <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </section>
  )
}
