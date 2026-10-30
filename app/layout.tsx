import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { FloatingNav } from '@/components/floating-nav'
import { Footer } from '@/components/footer'
import './globals.css'

const inter = localFont({
  src: '../public/fonts/inter-latin.woff2',
  variable: '--font-inter',
  weight: '100 900',
  display: 'swap',
})
const description =
  'I’m Pushkar Raj, a full-stack developer and computer science student in Bengaluru. Explore my work in AI applications, real-time systems, and the web.'

export const metadata: Metadata = {
  metadataBase: new URL('https://pushkar26portfolio.vercel.app'),
  title: { default: 'Pushkar Raj — Software developer', template: '%s — Pushkar Raj' },
  description,
  authors: [{ name: 'Pushkar Raj' }],
  openGraph: {
    title: 'Pushkar Raj — Software developer',
    description,
    url: '/',
    siteName: 'Pushkar Raj',
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Pushkar Raj — Software developer', description },
  manifest: '/manifest.json',
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eef1f5' },
    { media: '(prefers-color-scheme: dark)', color: '#08090c' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-color-mode')==='light'?'light':'dark'}catch{}",
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <FloatingNav />
        {children}
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
