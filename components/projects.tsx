'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Section } from '@/components/section'
import { CASES, type CaseFile } from '@/lib/dossier-data'
import { cn } from '@/lib/utils'
import { sound } from '@/lib/audio-engine'

function Flashcard({ caseFile: c, index }: { caseFile: CaseFile, index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const router = useRouter()

  return (
    <div 
      className="group relative h-[420px] w-[300px] sm:h-[500px] sm:w-[350px] flex-shrink-0 cursor-pointer mx-3 sm:mx-5 transition-transform duration-500 hover:z-20 hover:scale-[1.03]"
      style={{ perspective: '1500px' }}
      onClick={() => { sound.playCardFlip(); setIsFlipped(!isFlipped) }}
      onMouseEnter={() => sound.playHover()}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className={cn(
          "w-full h-full transition-all duration-700 shadow-2xl rounded-2xl",
          isFlipped ? "rotate-y-180" : ""
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT SIDE (IMAGE COVER) */}
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden border border-white/15 bg-[#121214] group-hover:border-signal/30 transition-colors duration-500"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {c.image ? (
            <div className="absolute inset-0 bg-[#0a0a0d] overflow-hidden">
              <Image 
                src={c.image} 
                alt={c.title} 
                fill 
                quality={75}
                priority={index < 4}
                className="object-cover object-top opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.05]" 
                sizes="(max-width: 768px) 300px, 350px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-signal/20 to-black flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 rounded-full border border-signal/30 flex items-center justify-center animate-pulse mb-4 bg-black/50">
                <span className="font-mono text-signal text-xs tracking-widest">WIP</span>
              </div>
              <p className="font-mono text-[10px] text-white/50 tracking-widest uppercase">IMAGE ENCRYPTED</p>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-10 flex flex-col gap-2">
            <span className="font-mono text-[10px] tracking-widest text-signal drop-shadow-md">
              {c.fileNumber} // {c.status}
            </span>
            <h3 className="font-extrabold text-3xl sm:text-4xl text-white tracking-tighter drop-shadow-lg leading-none">
              {c.title}
            </h3>
            <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-300">
              <span className="w-6 h-[2px] bg-signal inline-block" />
              <p className="font-mono text-[10px] text-white tracking-widest uppercase">
                Click to flip
              </p>
            </div>
          </div>
        </div>

        {/* BACK SIDE (DETAILS) */}
        <div 
          className="absolute inset-0 rounded-2xl border-2 border-signal/40 bg-[#0a0a0d] p-6 sm:p-8 flex flex-col overflow-y-auto scrollbar-hide rotate-y-180"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex justify-between items-start mb-6 shrink-0">
            <h3 className="font-extrabold text-xl sm:text-2xl text-white tracking-tighter">
              {c.title}
            </h3>
            <span className="font-mono text-[9px] bg-signal text-signal-foreground px-2 py-1 rounded-sm uppercase font-bold tracking-wider">
              {c.status.split('·')[0]}
            </span>
          </div>

          <div className="space-y-4 flex-1">
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.25em] text-signal/70 mb-2 border-b border-white/10 pb-1">PROBLEM</h4>
              <p className="text-xs sm:text-sm leading-relaxed text-foreground/80">{c.problem}</p>
            </div>
            
            {c.challenge && (
              <div>
                <h4 className="font-mono text-[10px] tracking-[0.25em] text-signal/70 mb-2 border-b border-white/10 pb-1">CHALLENGE</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-foreground/80">{c.challenge}</p>
              </div>
            )}
            
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.25em] text-signal/70 mb-3">TECH STACK</h4>
              <div className="flex flex-wrap gap-2">
                {c.stack.map(tag => (
                  <span key={tag} className="border border-white/10 bg-white/5 px-2 py-1 font-mono text-[9px] sm:text-[10px] text-white/80 rounded-sm hover:border-signal/50 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div 
            className="mt-6 flex items-center gap-4 pt-4 border-t border-white/10 shrink-0 translate-z-10"
            onClick={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            onDoubleClick={e => e.stopPropagation()}
          >
            {c.github && (
              <a href={c.github} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-white hover:text-signal transition-colors group/link relative z-50 py-3 pr-4 -my-3">
                GitHub <span className="opacity-50 group-hover/link:opacity-100">↗</span>
              </a>
            )}
            {c.live && (
              <a href={c.live} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-signal hover:text-white transition-colors group/link relative z-50 py-3 pr-4 -my-3">
                Live <span className="opacity-50 group-hover/link:opacity-100">↗</span>
              </a>
            )}
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/projects/${c.id}`);
              }}
              onDoubleClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/projects/${c.id}`);
              }}
              className="font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors ml-auto group/link relative z-50 py-3 pl-6 -my-3 -mr-3 text-right"
            >
              Case Study <span className="opacity-50 group-hover/link:opacity-100">↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <Section id="projects" fileLabel="SECTION 03 // CASE FILES" title="Projects">
      
      <div className="w-full relative mt-16 pb-12 overflow-hidden -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20">
        
        {/* Vignette gradients for smooth fade in/out on the edges */}
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-[#0a0a0d] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-[#0a0a0d] to-transparent z-10 pointer-events-none" />
        
        {/* Marquee Track */}
        <div 
          ref={containerRef}
          className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center pt-8 pb-12"
          style={{ willChange: 'transform' }}
        >
          {/* We duplicate the cases array multiple times to ensure the marquee is long enough to loop seamlessly */}
          {[...CASES, ...CASES, ...CASES].map((c, i) => (
            <Flashcard key={`${c.id}-${i}`} caseFile={c} index={i} />
          ))}
        </div>
      </div>
      
      <div className="mt-2 text-center flex flex-col items-center justify-center gap-2">
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
          Hover to pause <span className="text-signal mx-2">•</span> Click to flip
        </p>
      </div>
      
    </Section>
  )
}
