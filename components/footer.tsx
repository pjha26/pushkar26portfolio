'use client'

import { SiGithub, SiLeetcode } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { LINKS } from '@/lib/dossier-data'

const NAV_ITEMS = [
  { id: 'hero-section', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const SOCIALS = [
  { href: LINKS.github, icon: SiGithub, label: 'GitHub', hoverColor: 'hover:text-white' },
  { href: LINKS.linkedin, icon: FaLinkedin, label: 'LinkedIn', hoverColor: 'hover:text-[#0A66C2]' },
  { href: LINKS.leetcode, icon: SiLeetcode, label: 'LeetCode', hoverColor: 'hover:text-[#FFA116]' },
  { href: LINKS.email, icon: MdEmail, label: 'Email', hoverColor: 'hover:text-signal' },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/10 bg-[#08080a]">
      {/* Signal accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-signal/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          
          {/* Column 1: Brand + tagline */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-lg font-bold text-white tracking-wider">
              PUSHKAR<span className="text-signal">.</span>RAJ
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full-stack developer & AI/ML engineer building resilient, data-driven systems that thrive in production.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              {SOCIALS.map(({ href, icon: Icon, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`text-muted-foreground/50 ${hoverColor} transition-all duration-300 hover:scale-110`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal/70 mb-2">
              Navigation
            </span>
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm text-muted-foreground hover:text-white transition-colors duration-200 w-fit"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Column 3: Resume + Back to Top */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal/70 mb-2">
              Resources
            </span>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-white transition-colors duration-200 w-fit"
            >
              Resume ↗
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-white transition-colors duration-200 w-fit"
            >
              GitHub ↗
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="mt-auto inline-flex items-center gap-2 text-xs font-mono text-muted-foreground/50 hover:text-signal transition-colors duration-300 uppercase tracking-widest w-fit group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform duration-300"><polyline points="18 15 12 9 6 15"/></svg>
              Back to Top
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/40 font-mono">
            © {new Date().getFullYear()} Pushkar Raj. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/30 font-mono">
            Built with Next.js, GSAP & Three.js
          </p>
        </div>
      </div>
    </footer>
  )
}
