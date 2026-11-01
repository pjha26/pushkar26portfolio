import type { Metadata } from 'next'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'

export const metadata: Metadata = { alternates: { canonical: '/' } }

export default function Page() {
  return (
    <PageFrame>
      <Hero />
    </PageFrame>
  )
}
