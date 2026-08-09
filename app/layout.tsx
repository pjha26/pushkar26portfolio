import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Inter, IBM_Plex_Mono, Syncopate, Michroma } from 'next/font/google'
import { Preloader } from '@/components/preloader'
import { InterrogationTerminal } from '@/components/interrogation-terminal'
import { SoundToggle } from '@/components/sound-toggle'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-plex-mono',
  display: 'swap',
})

const syncopate = Syncopate({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-syncopate',
  display: 'swap',
})

const michroma = Michroma({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-michroma',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PUSHKAR RAJ — FILE PR-2027',
  description:
    'Case file: Pushkar Raj. Full-stack developer and AI/ML engineer building resilient, data-driven systems — multi-agent AI platforms, real-time infrastructure, and ML pipelines that survive contact with production.',
  generator: 'Next.js',
  keywords: ['Pushkar Raj', 'Software Engineer', 'Full-stack Developer', 'AI/ML', 'Next.js', 'React', 'TypeScript', 'PostgreSQL'],
  authors: [{ name: 'Pushkar Raj' }],
  creator: 'Pushkar Raj',
  openGraph: {
    title: 'PUSHKAR RAJ — FILE PR-2027',
    description: 'Case file: Pushkar Raj. Full-stack developer and AI/ML engineer building resilient, data-driven systems.',
    url: 'https://pushkarraj.dev',
    siteName: 'Pushkar Raj Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pushkar Raj — Dossier File PR-2027',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PUSHKAR RAJ — FILE PR-2027',
    description: 'Case file: Pushkar Raj. Full-stack developer and AI/ML engineer building resilient, data-driven systems.',
    images: ['/og-image.jpg'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' }
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-[#0a0a0d] text-foreground ${inter.variable} ${bebasNeue.variable} ${plexMono.variable} ${syncopate.variable} ${michroma.variable} dark`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans bg-[#0a0a0d] text-foreground" suppressHydrationWarning>
        <SoundToggle />
        <Preloader />
        <InterrogationTerminal />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
