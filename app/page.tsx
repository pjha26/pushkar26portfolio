import { CustomCursor } from '@/components/custom-cursor'
import { SmoothScroll } from '@/components/smooth-scroll'
import { GridBackground } from '@/components/grid-background'
import { Hero } from '@/components/hero'
import { About, HowIBuild } from '@/components/about'
import { Projects } from '@/components/projects'
import {
  Skills,
  Experience,
  Achievements,
  Resume,
  Contact,
} from '@/components/dossier-sections'

export default function Page() {
  return (
    <>
      <CustomCursor />
      <GridBackground />
      <SmoothScroll>
        <main className="relative z-10 text-foreground">
          <Hero />
          <About />
          <HowIBuild />
          <Projects />
          <Skills />
          <Experience />
          <Achievements />
          <Resume />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  )
}
