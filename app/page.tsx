import { SmoothScroll } from '@/components/smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'
import { GridBackground } from '@/components/grid-background'
import { Hero } from '@/components/hero'
import { About, HowIBuild } from '@/components/about'
import { Projects } from '@/components/projects'
import {
  Skills,
  Experience,
  Achievements,
  Contact,
} from '@/components/dossier-sections'

export default function Page() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <GridBackground />
      <main className="relative z-10">
        <Hero />
        <About />
        <HowIBuild />
        <Projects />
        <Skills />
        <Experience />
        <Achievements />
        <Contact />
      </main>
    </SmoothScroll>
  )
}
