import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { LINKS } from '@/lib/dossier-data'
import { SceneSound } from '@/components/scene-sound'
import { BrushReveal } from '@/components/brush-reveal'
import { ThemedPortrait } from '@/components/themed-portrait'

export function Hero() {
  return (
    <section className="poster-hero" aria-labelledby="hero-title">
      <div className="poster-scene">
        <div className="poster-copy">
          <p className="poster-kicker">Independent developer<br />Bengaluru, IN</p>
          <BrushReveal>
            <h1 id="hero-title" className="poster-title">
              <span>Pushkar</span>{' '}<span className="poster-name-end">Raj</span>
            </h1>
            <p className="poster-role">Full stack developer &amp; AI builder</p>
            <p className="poster-description">Building thoughtful websites that solve real world problems.</p>
          </BrushReveal>
          <div className="poster-actions">
            <Link className="poster-primary" href="/work" transitionTypes={['page-next']}>
              Explore my work <ArrowDown size={18} />
            </Link>
            <a href={LINKS.email}>Start a conversation <ArrowUpRight size={18} /></a>
          </div>
          <SceneSound />
        </div>
        <div className="poster-portrait">
          <ThemedPortrait />
        </div>
      </div>
      <div className="poster-footer shell">
        <div className="poster-contact">
          <a href={LINKS.email}>pjha2608@gmail.com</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={13} /></a>
        </div>
        <nav className="poster-socials" aria-label="Social profiles">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={LINKS.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a>
        </nav>
        <Link href="/work" className="poster-scroll" transitionTypes={['page-next']}>
          Swipe up to explore <ArrowDown size={14} />
        </Link>
      </div>
    </section>
  )
}
