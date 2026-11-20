import Link from 'next/link'
import Image from 'next/image'
import { ArrowDown, MapPin } from 'lucide-react'
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
        <p className="studio-promise">I build tools that help developers trace failures, teams research leads, and students practice interviews.</p>
      </div>
      <div className="studio-hero-bottom">
        <p className="studio-location"><MapPin size={15} aria-hidden="true" /> Bengaluru, IN</p>
        <Link className="studio-work-link" href="#work">
          Explore my work <ArrowDown size={16} aria-hidden="true" />
          <span className="studio-work-print" aria-hidden="true">
            <Image src="/arthai.png" alt="" width={1024} height={483} sizes="220px" />
            <span>ArthAI <i>Research workspace</i></span>
          </span>
        </Link>
        <SceneSound />
      </div>
    </section>
  )
}
