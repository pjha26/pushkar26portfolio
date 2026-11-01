import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { LINKS } from '@/lib/dossier-data'
import { SceneSound } from '@/components/scene-sound'

export function Hero() {
  return (
    <section className="hero shell" id="hero-section" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span className="eyebrow">Independent developer · Bengaluru, IN</span>
        <span className="availability">
          <span /> Open to opportunities
        </span>
      </div>
      <div className="hero-stage">
        <div className="hero-copy">
          <p className="intro-line" data-hero-reveal>
            <span className="crosshair" aria-hidden="true">
              ✳
            </span>{' '}
            Code meets curiosity.
          </p>
          <h1 id="hero-title">
            <span className="hero-name" data-hero-reveal>
              Pushkar
            </span>
            <span className="hero-name hero-name-last" data-hero-reveal>
              Raj
              <span className="hero-role">
                Full-stack
                <br />
                developer &<br />
                AI builder.
              </span>
            </span>
          </h1>
          <p className="hero-description" data-hero-reveal>
            I build AI workflows, voice interfaces, and real-time apps. From the first interaction
            to the worker running behind it.
          </p>
          <div className="hero-actions" data-hero-reveal>
            <a className="button button-primary" href="#projects">
              Explore my work <ArrowDown size={17} />
            </a>
            <a className="text-link" href={LINKS.email}>
              Let’s talk <ArrowUpRight size={18} />
            </a>
          </div>
          <SceneSound />
        </div>
        <div className="hero-art">
          <div className="orbital-art portrait-stage">
            <span className="orbital-coordinate orbital-coordinate-top" aria-hidden="true">
              01 / THE PERSON BEHIND THE CODE
            </span>
            <svg className="orbital-sculpture" viewBox="0 0 420 420" fill="none" aria-hidden="true">
              <circle className="orbit-guide" cx="210" cy="210" r="190" strokeDasharray="2 12" />
              <g className="orbital-rings">
                {Array.from({ length: 18 }, (_, index) => (
                  <ellipse
                    key={index}
                    cx="210"
                    cy="210"
                    rx="152"
                    ry="68"
                    transform={`rotate(${index * 10} 210 210)`}
                  />
                ))}
              </g>
              <circle className="orbit-satellite" cx="210" cy="20" r="6" />
            </svg>
            <Image
              className="hero-portrait"
              src="/pushkar-3d-portrait.png"
              alt="3D-style illustrated portrait of Pushkar Raj"
              width={1223}
              height={1286}
              sizes="(max-width: 700px) 80vw, 440px"
              loading="eager"
            />
            <span className="orbital-coordinate orbital-coordinate-bottom" aria-hidden="true">
              PUSHKAR RAJ / ALWAYS BUILDING
            </span>
          </div>
          <Link
            className="hero-feature"
            href="/projects/arth-ai"
            aria-label="Explore ArthAI, my multi-agent AI project"
          >
            <Image
              src="/arthai.png"
              alt="ArthAI website preview"
              width={1024}
              height={483}
              sizes="88px"
              loading="eager"
            />
            <span>
              <small>On the workbench</small>
              <strong>ArthAI / Multi-agent research</strong>
            </span>
            <ArrowUpRight size={22} />
          </Link>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="hero-person">
          <Image src="/PRF1.jpeg" width={42} height={42} alt="Pushkar Raj" />
          <p>
            JSSATE, Bengaluru<span>Computer Science · Class of 2027</span>
          </p>
        </div>
        <div className="social-inline">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
            <SiGithub size={16} /> GitHub <ArrowUpRight size={12} />
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={16} /> LinkedIn <ArrowUpRight size={12} />
          </a>
        </div>
        <a href="#projects" className="scroll-cue">
          Scroll to explore <ArrowDown size={14} />
        </a>
      </div>
    </section>
  )
}
