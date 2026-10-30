'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { LINKS } from '@/lib/dossier-data'

const email = LINKS.email.replace('mailto:', '')

export function SecureComm() {
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
      className="contact-section section-space shell"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-panel" data-reveal>
        <div className="contact-topline">
          <span className="eyebrow">04 / Let’s make something worthwhile</span>
          <span className="availability">
            <span /> Open to opportunities
          </span>
        </div>
        <h2 id="contact-title">
          Got something
          <br />
          <em>in mind?</em>
        </h2>
        <div className="contact-bottom">
          <p>
            Have a project in mind, a role that fits,
            <br />
            or just something interesting to share?
            <br />
            I’d love to hear about it.
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
      </div>
    </section>
  )
}
