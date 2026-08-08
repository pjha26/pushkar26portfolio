'use client'

import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react'
import { cn } from '@/lib/utils'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_PROMPTS = [
  "What's his strongest project?",
  "Tell me about his AI experience.",
  "Does he know real-time systems?",
]

function getMessageText(content: string): string {
  // The AI SDK data stream uses lines like `0:"text"\n` for text chunks.
  // We parse those out and reassemble.
  try {
    const lines = content.split('\n').filter(Boolean)
    let text = ''
    for (const line of lines) {
      const match = line.match(/^0:"(.*)"\s*$/)
      if (match) {
        text += match[1]
          .replace(/\\n/g, '\n')
          .replace(/\\"/g, '"')
          .replace(/\\\\/g, '\\')
      }
    }
    return text || content
  } catch {
    return content
  }
}

export function InterrogationTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    setError(null)
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
    }
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
    }

    setMessages(prev => [...prev, userMessage, assistantMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/interrogate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        setError(errorText || 'ACCESS TEMPORARILY RESTRICTED — TRY AGAIN SHORTLY')
        setMessages(prev => prev.filter(m => m.id !== assistantMessage.id))
        setIsLoading(false)
        return
      }

      const reader = response.body?.getReader()
      if (!reader) {
        setError('STREAM UNAVAILABLE — TRY AGAIN SHORTLY')
        setIsLoading(false)
        return
      }

      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        accumulated += decoder.decode(value, { stream: true })
        const parsed = getMessageText(accumulated)

        setMessages(prev =>
          prev.map(m =>
            m.id === assistantMessage.id ? { ...m, content: parsed } : m
          )
        )
      }

      // Final parse
      const finalText = getMessageText(accumulated)
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantMessage.id ? { ...m, content: finalText } : m
        )
      )
    } catch (err) {
      console.error('Interrogate error:', err)
      setError('CRITICAL SYSTEM FAILURE — UNABLE TO PROCESS TRANSMISSION.')
      setMessages(prev => prev.filter(m => m.id !== assistantMessage.id))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt)
    // We need to trigger submit after state update, so use a microtask
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as FormEvent
      // Re-read latest input via closure won't work; set and submit manually
    }, 0)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 border border-signal/50 bg-card hover:bg-[var(--card-hover)] px-4 py-3 font-mono text-xs text-signal shadow-lg transition-all hover:shadow-[0_0_15px_rgba(245,196,0,0.2)]"
        aria-label="Open Interrogation Terminal"
      >
        <span className="animate-pulse">●</span> INTERROGATE FILE
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[600px] max-h-[80vh] w-[400px] max-w-[calc(100vw-3rem)] flex-col border border-border bg-[#141417] shadow-2xl font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-[#0d0d10] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-signal text-[10px] animate-pulse">●</span>
          <span className="text-xs tracking-widest text-muted-foreground uppercase">Interrogation Terminal</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-signal transition-colors p-1"
          aria-label="Close terminal"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-xs text-muted-foreground/60 mb-6">
            <p className="mb-4">CONNECTION ESTABLISHED. WAITING FOR QUERY...</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    setInput(prompt)
                    // Focus input so user can just hit Enter
                    inputRef.current?.focus()
                  }}
                  className="border border-white/10 bg-black/20 px-2 py-1 text-[10px] text-muted-foreground hover:border-signal/50 hover:text-signal transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex flex-col gap-1 text-sm",
              m.role === 'user' ? "items-end" : "items-start"
            )}
          >
            <span className={cn(
              "text-[10px] tracking-widest",
              m.role === 'user' ? "text-muted-foreground" : "text-signal"
            )}>
              {m.role === 'user' ? '[USER INPUT]' : '[FILE RESPONSE]'}
            </span>
            <div className={cn(
              "max-w-[90%] whitespace-pre-wrap leading-relaxed text-xs",
              m.role === 'user' ? "text-foreground text-right" : "text-foreground/90"
            )}>
              {m.content || (m.role === 'assistant' && isLoading ? '' : m.content)}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.content === '' && (
          <div className="flex items-center gap-2 text-muted-foreground/80 text-xs">
            ANALYZING FILE<span className="animate-pulse">...</span>
          </div>
        )}

        {error && (
          <div className="flex flex-col gap-1 items-start text-sm">
            <span className="text-[10px] tracking-widest text-destructive">[SYSTEM ERROR]</span>
            <div className="text-destructive whitespace-pre-wrap border border-destructive/30 bg-destructive/10 p-2 text-xs">
              {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t border-border bg-[#0d0d10] p-4 flex gap-3 items-center">
        <span className="font-mono text-sm text-signal shrink-0" aria-hidden="true">
          {'>'}
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your query..."
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
          autoComplete="off"
          spellCheck={false}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="shrink-0 text-muted-foreground hover:text-signal disabled:opacity-50 disabled:hover:text-muted-foreground transition-colors p-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  )
}
