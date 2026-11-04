'use client'

import { useState } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import { LINKS } from '@/lib/dossier-data'

const email = LINKS.email.replace('mailto:', '')

export function SecureComm({ embedded = false }: { embedded?: boolean }) {
  const Heading = embedded ? 'h2' : 'h1'
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
  }

  return (
    <section
      className="studio-contact studio-dark"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="studio-contact-content shell">
        <div className="contact-topline">
          <span className="eyebrow">04 / Let’s make something worthwhile</span>
          <span className="availability">
            <span /> Open to opportunities
          </span>
        </div>
        <Heading id="contact-title">Let’s talk<span>.</span></Heading>
        <div className="contact-bottom">
          <p>
            Have a project in mind, a role that fits, or just something interesting to share? I’d love to hear about it.
          </p>
          <div className="contact-actions">
            <a className="email-link" href={LINKS.email}>
              {email}
              <ArrowUpRight size={25} />
            </a>
            <button className="copy-email" onClick={copyEmail}>
              {copyState === 'copied' ? <Check size={14} /> : <Copy size={14} />}
              {copyState === 'copied' ? 'Email copied' : 'Copy email address'}
            </button>
            <p className="copy-status" role="status">
              {copyState === 'error'
                ? 'Please select the email address above to copy it.'
                : copyState === 'copied'
                  ? 'Ready to paste into your email app.'
                  : ''}
            </p>
          </div>
        </div>
        <nav className="studio-contact-links" aria-label="Social profiles">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} /></a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} /></a>
          <a href={LINKS.leetcode} target="_blank" rel="noopener noreferrer">LeetCode <ArrowUpRight size={14} /></a>
          <a href="#main-content">Back to top <ArrowUp size={14} /></a>
        </nav>
      </div>
    </section>
  )
}
