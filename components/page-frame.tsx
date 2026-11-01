'use client'

import { ViewTransition, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { PORTFOLIO_PAGES } from '@/lib/portfolio-pages'

export function PageFrame({ children }: { children: ReactNode }) {
  const path = usePathname()
  const index = PORTFOLIO_PAGES.findIndex((page) => page.href === path)
  const previous = PORTFOLIO_PAGES[index - 1]
  const next = PORTFOLIO_PAGES[index + 1]
  return (
    <ViewTransition
      enter={{ 'page-next': 'page-next', 'page-prev': 'page-prev', default: 'none' }}
      exit={{ 'page-next': 'page-next', 'page-prev': 'page-prev', default: 'none' }}
      default="none"
    >
      <main id="main-content" className={`screen-page${path === '/' ? ' home-page' : ''}`}>
        {children}
        {index > 0 && (
          <nav className="page-pager shell" aria-label="Page navigation">
            <Link href={previous.href} transitionTypes={['page-prev']}>
              <ArrowUp size={15} /> {previous.label}
            </Link>
            <span>{String(index + 1).padStart(2, '0')} / 05</span>
            {next ? (
              <Link href={next.href} transitionTypes={['page-next']}>
                {next.label} <ArrowDown size={15} />
              </Link>
            ) : (
              <Link href="/" transitionTypes={['page-prev']}>
                Home <ArrowUp size={15} />
              </Link>
            )}
          </nav>
        )}
      </main>
    </ViewTransition>
  )
}
