import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Rajdhani, Space_Mono, Syncopate, Michroma } from 'next/font/google'
import { Preloader } from '@/components/preloader'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const rajdhani = Rajdhani({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
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
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
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
      className={`bg-[#0a0a0d] text-foreground ${rajdhani.variable} ${bebasNeue.variable} ${spaceMono.variable} ${syncopate.variable} ${michroma.variable} dark`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans bg-[#0a0a0d] text-foreground" suppressHydrationWarning>
        <Preloader />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
