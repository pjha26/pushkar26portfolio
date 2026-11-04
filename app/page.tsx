import type { Metadata } from 'next'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { SecureComm } from '@/components/secure-comm'
import { ClosingScene } from '@/components/closing-scene'

export const metadata: Metadata = { alternates: { canonical: '/' } }

export default function Page() {
  return (
    <PageFrame ending={<ClosingScene />}>
      <Hero />
      <About embedded />
      <Projects embedded />
      <Skills embedded />
      <SecureComm embedded />
    </PageFrame>
  )
}
