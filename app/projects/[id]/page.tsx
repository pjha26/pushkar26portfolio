import { CASES } from '@/lib/dossier-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CustomCursor } from '@/components/custom-cursor'
import { GridBackground } from '@/components/grid-background'
import { SmoothScroll } from '@/components/smooth-scroll'

export async function generateStaticParams() {
  return CASES.map((c) => ({
    id: c.id,
  }))
}

export default async function CaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const caseFile = CASES.find(c => c.id === resolvedParams.id)
  
  if (!caseFile) {
    notFound()
  }

  return (
    <>
      <CustomCursor />
      <GridBackground />
      <SmoothScroll>
        <main className="relative z-10 min-h-screen text-foreground px-6 py-24 md:px-12 lg:px-20 max-w-5xl mx-auto selection:bg-signal selection:text-black">
          {/* Back button */}
          <Link href="/#projects" className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground hover:text-signal transition-colors mb-16">
            <span className="transition-transform group-hover:-translate-x-1">←</span> RETURN TO HQ
          </Link>

          {/* Header */}
          <header className="mb-16 border-b border-signal/20 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-signal/70 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-signal animate-pulse" />
                  {caseFile.fileNumber} // {caseFile.status}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold uppercase drop-shadow-[0_0_15px_rgba(245,196,0,0.1)]">
                  {caseFile.title}
                </h1>
              </div>
              
              <div className="flex gap-4">
                {caseFile.github && (
                  <a href={caseFile.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-white/10 hover:border-signal hover:bg-signal hover:text-black transition-all font-mono text-xs uppercase tracking-widest">
                    Source Code ↗
                  </a>
                )}
                {caseFile.live && (
                  <a href={caseFile.live} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-signal text-black hover:bg-signal/80 transition-colors font-mono text-xs uppercase tracking-widest font-bold">
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Content Grid */}
          <div className="grid gap-16 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-16">
              
              <section>
                <h2 className="font-mono text-[10px] tracking-[0.3em] text-signal mb-6 uppercase flex items-center gap-3">
                  <span className="h-px w-8 bg-signal/50" />
                  01 // The Problem
                </h2>
                <p className="text-lg leading-relaxed text-foreground/90 text-pretty">
                  {caseFile.problem}
                </p>
              </section>

              {caseFile.challenge && (
                <section className="p-8 border border-red-500/20 bg-red-500/5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50" />
                  <h2 className="font-mono text-[10px] tracking-[0.3em] text-red-400 mb-4 uppercase">
                    CRITICAL CHALLENGE DETECTED
                  </h2>
                  <p className="text-base leading-relaxed text-foreground/85">
                    {caseFile.challenge}
                  </p>
                </section>
              )}

              <section>
                <h2 className="font-mono text-[10px] tracking-[0.3em] text-signal mb-6 uppercase flex items-center gap-3">
                  <span className="h-px w-8 bg-signal/50" />
                  02 // Tactical Approach
                </h2>
                <ul className="space-y-4">
                  {caseFile.approach.map((item, i) => (
                    <li key={i} className="flex gap-4 p-4 border border-white/5 bg-card hover:bg-white/5 transition-colors">
                      <span className="font-mono text-signal text-xs mt-1 block">0{i+1}</span>
                      <p className="text-base leading-relaxed text-foreground/90">{item}</p>
                    </li>
                  ))}
                </ul>
              </section>

            </div>

            {/* Sidebar */}
            <div className="space-y-12">
              <aside className="p-6 border border-signal/20 bg-signal/5">
                <h3 className="font-mono text-[10px] tracking-[0.3em] text-signal/70 mb-4 uppercase">
                  TECHNOLOGY STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseFile.stack.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-black border border-white/10 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </aside>

              <div className="p-6 border border-white/5 bg-card/30 flex flex-col items-center justify-center text-center">
                 <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-4">END OF REPORT</p>
                 <div className="w-12 h-[1px] bg-white/20" />
              </div>
            </div>
          </div>
        </main>
      </SmoothScroll>
    </>
  )
}
