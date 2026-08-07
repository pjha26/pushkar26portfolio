import { Scene } from '@/components/scene'
import { CustomCursor } from '@/components/custom-cursor'
import { SmoothScroll } from '@/components/smooth-scroll'
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
    <>
      <CustomCursor />
      <Scene />
      <SmoothScroll>
        <main className="relative z-10 text-foreground">
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
    </>
  )
}
