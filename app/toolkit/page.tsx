import type { Metadata } from 'next'
import { PageFrame } from '@/components/page-frame'
import { Skills } from '@/components/skills'
export const metadata: Metadata = {
  title: 'Toolkit',
  alternates: { canonical: '/toolkit' },
}
export default function ToolkitPage() {
  return (
    <PageFrame>
      <Skills />
    </PageFrame>
  )
}
