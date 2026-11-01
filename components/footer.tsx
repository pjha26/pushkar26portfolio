'use client'

import { usePathname } from 'next/navigation'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { LINKS } from '@/lib/dossier-data'

export function Footer() {
  const pathname = usePathname()
  if (!pathname.startsWith('/projects/')) return null
  return (
    <footer className="site-footer shell">
      <div className="footer-top">
        <a className="footer-signature" href="/">
          Pushkar Raj<span>A little thought in every line.</span>
        </a>
        <div className="footer-links">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight size={13} />
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight size={13} />
          </a>
          <a href={LINKS.leetcode} target="_blank" rel="noopener noreferrer">
            LeetCode <ArrowUpRight size={13} />
          </a>
        </div>
        <a className="back-top" href="#main-content">
          Back to top <ArrowUp size={14} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Pushkar Raj</span>
        <span>Made with intention. Built with Next.js.</span>
      </div>
    </footer>
  )
}
