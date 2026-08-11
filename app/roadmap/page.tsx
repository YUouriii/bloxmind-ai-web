import type { Metadata } from 'next'
import { PageShell } from '@/components/page-shell'
import { CheckCircle2, Circle, Flag, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'The BloxMind roadmap — current progress, in-progress work, and planned features for the AI-powered Roblox Studio agent.',
  alternates: {
    canonical: 'https://bloxmindai.netlify.app/roadmap',
  },
}

type Phase = {
  title: string
  status: 'shipped' | 'in-progress' | 'planned'
  summary: string
  items: string[]
}

const PHASES: Phase[] = [
  {
    title: 'Phase 1 — Foundation',
    status: 'shipped',
    summary: 'The core agent surface, Studio integration, and tool execution.',
    items: [
      'AI Chat Workspace with streaming responses',
      'Tool Execution Engine (file, Bash, glob, grep)',
      '1-click Roblox Studio + Rojo setup',
      'MCP server management',
    ],
  },
  {
    title: 'Phase 2 — Reliability',
    status: 'shipped',
    summary: 'Safety, checkpoints, and provider breadth.',
    items: [
      'Workspace Checkpoint Engine with rollback history',
      '25+ AI provider support',
      'Granular permission prompts',
      'Auto-updates with delta diffs',
    ],
  },
  {
    title: 'Phase 3 — In Progress',
    status: 'in-progress',
    summary: 'Performance, regeneration, animation polish, and deep optimizations.',
    items: [
      'Regenerate & animation improvements',
      'Faster agent response pipeline',
      'Core performance optimizations',
      'Studio-native error parser & auto-fix loop',
    ],
  },
  {
    title: 'Phase 4 — Planned',
    status: 'planned',
    summary: 'Bringing advanced capabilities and deeper integration.',
    items: [
      'Real-time multiplayer co-authoring sessions',
      'Vision-based Studio UI automation',
      'Team workspaces & shared checkpoints',
      'Plugin marketplace for custom tools',
    ],
  },
]

const STATUS_CONFIG = {
  shipped: { label: 'Shipped', icon: CheckCircle2, className: 'text-emerald border-emerald/30 bg-emerald/10' },
  'in-progress': { label: 'In Progress', icon: Sparkles, className: 'text-primary border-primary/30 bg-primary/10' },
  planned: { label: 'Planned', icon: Circle, className: 'text-muted-foreground border-white/15 bg-white/5' },
}

export default function RoadmapPage() {
  return (
    <PageShell
      eyebrow="Roadmap"
      title="Product Roadmap"
      subtitle="Where BloxMind is today, what we're building right now, and what comes next."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              '@id': 'https://bloxmindai.netlify.app/roadmap/#webpage',
              url: 'https://bloxmindai.netlify.app/roadmap',
              name: 'Roadmap - BloxMind',
              description:
                'The BloxMind roadmap — current progress, in-progress work, and planned features for the AI-powered Roblox Studio agent.',
              isPartOf: {
                '@id': 'https://bloxmindai.netlify.app/#website',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              '@id': 'https://bloxmindai.netlify.app/roadmap/#breadcrumb',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://bloxmindai.netlify.app',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Roadmap',
                  item: 'https://bloxmindai.netlify.app/roadmap',
                },
              ],
            },
          ]),
        }}
      />
      <div className="relative mx-auto max-w-4xl">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 sm:left-1/2" />

        <div className="space-y-10">
          {PHASES.map((phase) => {
            const config = STATUS_CONFIG[phase.status]
            const StatusIcon = config.icon
            return (
              <div key={phase.title} className="relative flex items-start gap-6 pl-12 sm:w-1/2 sm:odd:pr-12 sm:odd:pl-0 sm:even:ml-auto sm:even:pl-12">
                <div className={`absolute left-4 -translate-x-1/2 top-1 flex size-8 items-center justify-center rounded-full border sm:left-1/2 ${config.className}`}>
                  <StatusIcon className="size-4" />
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold tracking-tight text-foreground">
                      {phase.title}
                    </h2>
                    <span className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${config.className}`}>
                      <StatusIcon className="size-3" />
                      {config.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{phase.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${phase.status === 'shipped' ? 'bg-emerald/70' : phase.status === 'in-progress' ? 'bg-primary/70' : 'bg-muted-foreground/50'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-4xl items-center justify-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <Flag className="size-5 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          Have an idea for the roadmap? Let us know via the{' '}
          <a
            href="https://github.com/YUouriii/app-BloxMind-ai/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            GitHub Discussions
          </a>{' '}
          page.
        </p>
      </div>
    </PageShell>
  )
}