import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { SceneSound } from '@/components/scene-sound'
import { ThemedPortrait } from '@/components/themed-portrait'

export function Hero() {
  return (
    <section className="studio-hero shell" id="hero-section" aria-labelledby="hero-title">
      <div className="studio-hero-center">
        <h1 id="hero-title">Explore my<br /><span>portfolio.</span></h1>
        <span className="studio-reflection" aria-hidden="true">portfolio.</span>
        <div className="studio-portrait"><ThemedPortrait /></div>
        <p className="studio-name">Pushkar Raj</p>
        <p className="studio-role">Full-stack developer &amp; AI builder</p>
      </div>
      <div className="studio-hero-bottom">
        <p className="studio-location">Independent developer<br /><span>Bengaluru, IN</span></p>
        <div className="studio-hero-actions">
          <Link className="text-link" href="#work">Explore my work <ArrowUpRight size={16} /></Link>
          <SceneSound />
        </div>
        <p className="studio-promise">Building thoughtful websites that solve real world problems.</p>
      </div>
      <a className="studio-scroll-cue" href="#about" aria-label="Scroll to About"><ArrowDown size={17} /><span>Scroll to explore</span></a>
    </section>
  )
}
