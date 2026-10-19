import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main id="main-content" className="shell not-found">
      <span className="eyebrow">404 / A small detour</span>
      <h1>This page wandered off.</h1>
      <p>The project or page you’re looking for isn’t here. There’s more to explore back home.</p>
      <Link className="button button-primary" href="/">
        <ArrowLeft size={15} /> Back to the portfolio
      </Link>
    </main>
  )
}
