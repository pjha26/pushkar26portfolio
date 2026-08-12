import { CustomCursor } from '@/components/custom-cursor'
import { SmoothScroll } from '@/components/smooth-scroll'
import { GridBackground } from '@/components/grid-background'
import { Hero } from '@/components/hero'
import { About, HowIBuild } from '@/components/about'
import { Projects } from '@/components/projects'
import {
  Skills,
} from '@/components/dossier-sections'
import { EvidenceBoard } from '@/components/evidence-board'
import { FieldReports } from '@/components/field-reports'
import { SecureComm } from '@/components/secure-comm'

import { BootManager } from '@/components/boot-manager'
import { TelemetryHUD } from '@/components/telemetry-hud'
import { RedactProvider } from '@/components/redact-context'
import { InterrogationTerminal } from '@/components/interrogation-terminal'
import { ThemeSwitcher } from '@/components/theme-switcher'

export default function Page() {
  return (
    <>
      <CustomCursor />
      <GridBackground />
      <SmoothScroll>
        <RedactProvider>
          <BootManager>
            <TelemetryHUD />
            <ThemeSwitcher />
            <main className="relative z-10 text-foreground">
            <Hero />
            <About />
            <HowIBuild />
            <Projects />
            <Skills />
            <EvidenceBoard />
            <FieldReports />
            <SecureComm />
          </main>
          <InterrogationTerminal />
          </BootManager>
        </RedactProvider>
      </SmoothScroll>
    </>
  )
}
