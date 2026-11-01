import type { Metadata } from 'next'
import { PageFrame } from '@/components/page-frame'
import { About } from '@/components/about'
export const metadata: Metadata = {
  title: 'About',
  alternates: { canonical: '/about' },
}
export default function AboutPage() {
  return (
    <PageFrame>
      <About />
    </PageFrame>
  )
}
