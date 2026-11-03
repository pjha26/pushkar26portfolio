'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, FlaskConical, RotateCcw, X } from 'lucide-react'

const stages = [
  {
    label: 'Request', component: 'Next.js interface', title: 'A company URL becomes a research request.',
    why: 'The interface collects the input and starts a job. It does not wait for every research agent to finish.',
    detail: 'A short request starts the workflow while the interface remains available.',
    next: 'Queue the sample job',
  },
  {
    label: 'Queue', component: 'BullMQ · Redis', title: 'Long work moves into a background queue.',
    why: 'A worker picks up the job independently of the page request. Research can continue without holding the browser connection open.',
    detail: 'The queued job gives the worker a separate place to coordinate research.',
    next: 'Inspect the sample research',
  },
  {
    label: 'Research', component: 'Parallel AI agents', title: 'Separate agents examine different questions.',
    why: 'The research pipeline gathers company context and combines findings. This guided example uses prepared findings, not a live model call.',
    detail: 'Each research branch contributes context before the report is assembled.',
    next: 'Open the sample report',
  },
  {
    label: 'Report', component: 'PostgreSQL · pgvector', title: 'Findings become a report you can ask about.',
    why: 'Structured records and vector retrieval support the report and its follow-up conversation. The case study explains the implementation and tradeoffs.',
    detail: 'The result connects the research workflow back to a usable interface.',
    next: 'Replay the workflow',
  },
] as const

export function ProjectLab() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [step, setStep] = useState(0)
  const [view, setView] = useState<'sample' | 'system'>('sample')
  const active = stages[step]

  function open() {
    setStep(0)
    setView('sample')
    dialog.current?.showModal()
  }

  return (
    <>
      <button className="lab-launch" onClick={open} aria-haspopup="dialog">
        <FlaskConical size={15} /> Explore ArthAI <ArrowUpRight size={14} />
      </button>
      <dialog ref={dialog} className="project-lab" aria-labelledby="lab-title" data-no-swipe>
        <header className="lab-header">
          <div>
            <p className="eyebrow">Inside the build / 01</p>
            <h2 id="lab-title">ArthAI, from the inside.</h2>
          </div>
          <button className="icon-button" aria-label="Close project workbench" onClick={() => dialog.current?.close()} autoFocus>
            <X size={20} />
          </button>
        </header>
        <div className="lab-toolbar">
          <div className="lab-view" role="group" aria-label="Workbench view">
            <button aria-pressed={view === 'sample'} onClick={() => setView('sample')}>Sample workflow</button>
            <button aria-pressed={view === 'system'} onClick={() => setView('system')}>Under the hood</button>
          </div>
          <span className="lab-disclosure">Guided demo · prepared sample data</span>
        </div>
        <p className="lab-intro">Follow one research request from the interface to the worker and back. No live research runs here.</p>
        <ol className="lab-pipeline" aria-label="Research workflow">
          {stages.map((stage, index) => (
            <li key={stage.label}>
              <button onClick={() => setStep(index)} aria-current={step === index ? 'step' : undefined}>
                <span>0{index + 1}</span><strong>{stage.label}</strong>
                <small>{stage.component}</small>
              </button>
            </li>
          ))}
        </ol>
        <div className="lab-content" aria-live="polite" aria-atomic="true">
          <div className="lab-story" key={`${view}-${step}-story`}>
            <p className="eyebrow">0{step + 1} / {view === 'system' ? active.component : active.label}</p>
            <h3>{active.title}</h3>
            <p>{view === 'system' ? active.why : active.detail}</p>
          </div>
          <div className="lab-sample" key={`${view}-${step}-sample`}>
            {view === 'system' ? (
              <>
                <span className="lab-caption">Engineering decision</span>
                <strong>{step === 1 ? 'Keep long jobs off the request path.' : step === 3 ? 'Keep structured data and retrieval together.' : step === 2 ? 'Split the work before combining the findings.' : 'Keep the first interaction responsive.'}</strong>
                <p>{step === 1 ? 'Queue → worker → research. The browser is not responsible for keeping the job alive.' : step === 3 ? 'PostgreSQL stores the records; pgvector supports semantic retrieval for follow-up questions.' : step === 2 ? 'Different research branches contribute to one report rather than one oversized page request.' : 'The UI starts a request and presents its progress while the worker handles the longer task.'}</p>
              </>
            ) : step === 0 ? (
              <>
                <span className="lab-caption">Example research brief</span>
                <strong>Northstar Studio</strong>
                <code>northstar.example</code>
                <p>Fictional company. Research its product, audience, and potential fit.</p>
              </>
            ) : step === 1 ? (
              <>
                <span className="lab-caption">Example job / demo-001</span>
                <strong>Ready for a worker</strong>
                <ul><li>Input: company URL</li><li>Task: company research</li><li>Output: structured findings</li></ul>
              </>
            ) : step === 2 ? (
              <>
                <span className="lab-caption">Prepared findings</span>
                <ul className="lab-findings"><li><strong>Product</strong> A scheduling tool for small studios.</li><li><strong>Audience</strong> Independent service businesses.</li><li><strong>Question to verify</strong> How does the team handle missed bookings?</li></ul>
              </>
            ) : (
              <>
                <span className="lab-caption">Sample report excerpt</span>
                <strong>Start with the booking workflow.</strong>
                <p>Northstar’s example product serves small studios. A useful first conversation would explore scheduling friction and missed bookings.</p>
                <small>Illustrative output, not verified company research.</small>
              </>
            )}
          </div>
        </div>
        <footer className="lab-footer">
          <button className="button button-primary" onClick={() => setStep((step + 1) % stages.length)}>
            {view === 'sample' ? active.next : `Next: ${stages[(step + 1) % stages.length].label}`} {step === stages.length - 1 ? <RotateCcw size={15} /> : <ArrowRight size={15} />}
          </button>
          <Link href="/projects/arth-ai" className="text-link" onClick={() => dialog.current?.close()}>
            Read the case study <ArrowUpRight size={15} />
          </Link>
        </footer>
      </dialog>
    </>
  )
}
