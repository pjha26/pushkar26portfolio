import type { Metadata } from 'next'
import { PageFrame } from '@/components/page-frame'
import { SecureComm } from '@/components/secure-comm'
export const metadata: Metadata = {
  title: 'Contact',
  alternates: { canonical: '/contact' },
}
export default function ContactPage() {
  return (
    <PageFrame>
      <SecureComm />
    </PageFrame>
  )
}
