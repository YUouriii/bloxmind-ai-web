'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Check,
  GitBranch,
  History,
  Plug,
  RotateCcw,
  Terminal,
} from 'lucide-react'
import { AppWindow, StatusBar } from '@/components/app-window'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

const TABS = [
  { id: 'studio', label: 'Studio Integration', icon: Plug },
  { id: 'checkpoint', label: 'Checkpoint Engine', icon: History },
  { id: 'tools', label: 'Tool Orchestration', icon: Terminal },
] as const

type TabId = (typeof TABS)[number]['id']

export function Showcase() {
  const [active, setActive] = useState<TabId>('studio')

  // Auto-advance through tabs, pausing after user interaction
  useEffect(() => {
    const sequence = TABS.map((t) => t.id)
    const idx = sequence.indexOf(active)
    const id = setTimeout(() => {
      setActive(sequence[(idx + 1) % sequence.length])
    }, 4000)
    return () => clearTimeout(id)
  }, [active])

  return (
    <section
      id="integrations"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            Live system
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            See the architecture in motion
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Switch between the systems that keep your Studio session synced,
            safe, and reversible.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                'relative flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active === tab.id
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {active === tab.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-lg bg-primary"
                  transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <tab.icon className="size-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mx-auto mt-8 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {active === 'studio' && <StudioPanel />}
              {active === 'checkpoint' && <CheckpointPanel />}
              {active === 'tools' && <ToolsPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}

function StudioPanel() {
  const steps = [
    { label: 'Install Studio plugin', done: true },
    { label: 'Authorize BloxMind bridge', done: true },
    { label: 'Start Rojo server', done: true },
    { label: 'Verify live sync', done: false },
  ]
  return (
    <AppWindow title="BloxMind — Setup Wizard" statusBar={<StatusBar />}>
      <div className="grid gap-6 p-6 sm:grid-cols-2">
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground">
            Studio setup · polling every 15s
          </p>
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5"
            >
              <span
                className={cn(
                  'flex size-6 items-center justify-center rounded-full text-xs',
                  step.done
                    ? 'bg-emerald/15 text-emerald'
                    : 'border border-white/15 text-muted-foreground',
                )}
              >
                {step.done ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  'text-sm',
                  step.done ? 'text-foreground/90' : 'text-muted-foreground',
                )}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-3 rounded-xl border border-emerald/20 bg-emerald/[0.06] p-5">
          <span className="flex items-center gap-2 text-emerald">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald" />
            </span>
            Connected to Studio
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The bridge detected your open place file and established a Rojo
            session. File changes now stream both ways in real time.
          </p>
          <span className="font-mono text-xs text-emerald/80">
            rojo serve · localhost:34872
          </span>
        </div>
      </div>
    </AppWindow>
  )
}

function CheckpointPanel() {
  const timeline = [
    { title: 'Checkpoint · pre-execution snapshot', tag: 'saved', active: false },
    { title: 'Applied 3 file edits to /src/systems', tag: 'run', active: false },
    { title: 'Auto-validation failed · syntax error', tag: 'error', active: false },
    { title: 'Rolled back to checkpoint', tag: 'restored', active: true },
  ]
  return (
    <AppWindow title="BloxMind — Checkpoints" statusBar={<StatusBar />}>
      <div className="space-y-1 p-6">
        {timeline.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  'flex size-7 items-center justify-center rounded-full border',
                  item.tag === 'error'
                    ? 'border-destructive/40 bg-destructive/10 text-destructive'
                    : item.active
                      ? 'border-primary/40 bg-primary/15 text-primary'
                      : 'border-white/15 bg-white/[0.03] text-muted-foreground',
                )}
              >
                {item.tag === 'error' ? (
                  <RotateCcw className="size-3.5" />
                ) : item.active ? (
                  <History className="size-3.5" />
                ) : (
                  <GitBranch className="size-3.5" />
                )}
              </span>
              {i < timeline.length - 1 && (
                <span className="my-1 w-px flex-1 bg-white/10" />
              )}
            </div>
            <div className="pb-5">
              <p
                className={cn(
                  'text-sm',
                  item.active ? 'text-foreground' : 'text-foreground/80',
                )}
              >
                {item.title}
              </p>
              <span
                className={cn(
                  'mt-1 inline-block rounded-full px-2 py-0.5 font-mono text-[10px] uppercase',
                  item.tag === 'error'
                    ? 'bg-destructive/15 text-destructive'
                    : item.tag === 'restored'
                      ? 'bg-primary/15 text-primary'
                      : 'bg-white/[0.05] text-muted-foreground',
                )}
              >
                {item.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AppWindow>
  )
}

function ToolsPanel() {
  return (
    <AppWindow title="BloxMind — Terminal" statusBar={<StatusBar />}>
      <pre className="scrollbar-thin overflow-x-auto p-5 font-mono text-[12px] leading-relaxed">
        <code>
          <span className="block text-primary">$ bloxmind run "add a coin pickup system"</span>
          <span className="block text-muted-foreground">→ glob  src/**/*.luau            <span className="text-emerald">12 files</span></span>
          <span className="block text-muted-foreground">→ read  CoinService.luau         <span className="text-emerald">ok</span></span>
          <span className="block text-amber">? write CoinPickup.luau · confirm operation (y/n)</span>
          <span className="block text-foreground/80">  <span className="text-emerald">y</span></span>
          <span className="block text-muted-foreground">→ write CoinPickup.luau          <span className="text-emerald">+42 -0</span></span>
          <span className="block text-muted-foreground">→ task  wire pickup to leaderstats <span className="text-emerald">done</span></span>
          <span className="block text-muted-foreground">→ todo  3 completed · 0 pending</span>
          <span className="block text-emerald">✓ synced to Studio via Rojo</span>
        </code>
      </pre>
    </AppWindow>
  )
}
