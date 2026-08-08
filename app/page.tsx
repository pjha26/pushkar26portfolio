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

import { BootManager } from '@/components/boot-manager'
import { TelemetryHUD } from '@/components/telemetry-hud'
import { RedactProvider } from '@/components/redact-context'

export default function Page() {
  return (
    <>
      <CustomCursor />
      <GridBackground />
      <SmoothScroll>
        <RedactProvider>
          <BootManager>
            <TelemetryHUD />
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
          </BootManager>
        </RedactProvider>
      </SmoothScroll>
    </>
  )
}
