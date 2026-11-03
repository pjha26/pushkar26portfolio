import type { Metadata } from 'next'
import { PageFrame } from '@/components/page-frame'
import { SecureComm } from '@/components/secure-comm'
import { ClosingScene } from '@/components/closing-scene'
export const metadata: Metadata = {
  title: 'Contact',
  alternates: { canonical: '/contact' },
}
export default function ContactPage() {
  return (
    <PageFrame ending={<ClosingScene />}>
      <SecureComm />
    </PageFrame>
  )
}
