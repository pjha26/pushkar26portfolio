import type { Metadata } from 'next'
import { PageFrame } from '@/components/page-frame'
import { Projects } from '@/components/projects'
export const metadata: Metadata = {
  title: 'Selected work',
  alternates: { canonical: '/work' },
}
export default function WorkPage() {
  return (
    <PageFrame>
      <Projects />
    </PageFrame>
  )
}
