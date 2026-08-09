'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Sparkles, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const LINES = [
  'Locating PlayerController module → inspecting current jump handler → adding a jump-count guard → wiring UserInputService for the second jump.',
  'I’ll patch the controller to allow a second mid-air jump and lower gravity slightly for a floatier feel.',
  'Applying edits to PlayerController.luau...',
]

export function ChatMockup() {
  const [reasoningOpen, setReasoningOpen] = useState(true)
  const [displayed, setDisplayed] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [started, setStarted] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const lineIdx = useRef(0)
  const charIdx = useRef(0)

  // Only run the typing animation once the mockup is actually on screen.
  // On tablets/phones the hero panel sits below the fold, so this avoids
  // burning CPU/battery re-rendering every 30ms while it scrolled off.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Cursor blink
  useEffect(() => {
    if (!started) return
    const id = setInterval(() => setShowCursor((c) => !c), 500)
    return () => clearInterval(id)
  }, [started])

  // Typing animation — single interval, no circular deps
  useEffect(() => {
    if (!started) return
    const id = setInterval(() => {
      const line = LINES[lineIdx.current]
      if (!line) {
        clearInterval(id)
        return
      }
      if (charIdx.current <= line.length) {
        setCurrentLine(line.slice(0, charIdx.current))
        charIdx.current += 1
      } else {
        setDisplayed((prev) => [...prev, line])
        setCurrentLine('')
        charIdx.current = 0
        lineIdx.current += 1
      }
    }, 30)
    return () => clearInterval(id)
  }, [started])

  return (
    <div
      ref={rootRef}
      className="scrollbar-thin flex h-[360px] flex-col gap-4 overflow-y-auto px-4 py-4 text-sm sm:px-5"
    >
      {/* user message */}
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-xl rounded-tr-sm border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-foreground/90">
          Add a double-jump ability to the player controller and tune the
          gravity.
        </div>
      </div>

      {/* assistant */}
      <div className="flex gap-2.5">
        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
          <Sparkles className="size-3.5" />
        </span>
        <div className="min-w-0 flex-1 space-y-2.5">
          {/* reasoning accordion */}
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
            <button
              onClick={() => setReasoningOpen((o) => !o)}
              className="flex w-full items-center gap-1.5 px-3 py-2 text-left font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronRight
                className={cn(
                  'size-3.5 transition-transform',
                  reasoningOpen && 'rotate-90',
                )}
              />
              Reasoning · 4 steps
            </button>
            {reasoningOpen && (
              <div className="border-t border-white/5 px-3 py-2.5 font-mono text-[11px] leading-relaxed text-muted-foreground/80">
                Locating <span className="text-primary">PlayerController</span>{' '}
                module → inspecting current jump handler → adding a jump-count
                guard → wiring <span className="text-primary">UserInputService</span>{' '}
                for the second jump.
              </div>
            )}
          </div>

          {/* live typing */}
          <div className="space-y-2 text-foreground/80">
            {displayed.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
            {currentLine && (
              <p>
                {currentLine}
                <span className="inline-block w-1.5 -mb-0.5 ml-0.5 h-3.5 bg-primary align-middle">
                  {showCursor && '|'}
                </span>
              </p>
            )}
          </div>

          {/* diff preview */}
          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0c0c10]">
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
              <span>PlayerController.luau</span>
              <span className="text-emerald">+6 -1</span>
            </div>
            <pre className="scrollbar-thin overflow-x-auto px-3 py-2 font-mono text-[11px] leading-relaxed">
              <code>
                <span className="block text-muted-foreground">{'  local maxJumps = 1'}</span>
                <span className="block bg-destructive/10 text-destructive">{'- if canJump then'}</span>
                <span className="block bg-emerald/10 text-emerald">{'+ local maxJumps = 2'}</span>
                <span className="block bg-emerald/10 text-emerald">{'+ if jumpCount < maxJumps then'}</span>
                <span className="block bg-emerald/10 text-emerald">{'+   jumpCount += 1'}</span>
                <span className="block text-muted-foreground">{'    humanoid.Jump = true'}</span>
                <span className="block text-muted-foreground">{'  end'}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* typing indicator */}
      <div className="flex items-center gap-2.5">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white/5 text-muted-foreground">
          <User className="size-3.5" />
        </span>
        <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
          <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </div>
  )
}