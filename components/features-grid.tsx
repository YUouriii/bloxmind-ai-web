'use client'

import { useRef } from 'react'
import {
  Blocks,
  MessagesSquare,
  Plug,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { SectionHeader } from '@/components/section-header'
import { staggerContainer, staggerItem } from '@/lib/motion'

type Feature = {
  icon: LucideIcon
  badge: string
  title: string
  points: string[]
}

const FEATURES: Feature[] = [
  {
    icon: MessagesSquare,
    badge: 'OpenCode SDK',
    title: 'AI Chat Workspace & Code Intelligence',
    points: [
      'Natural-language Luau/Lua scripting with streaming SSE responses.',
      'Multi-turn session retention built on the OpenCode SDK.',
      'Rich Markdown, syntax highlighting for TS, Luau, Bash & JSON.',
      'Auto-expanding reasoning accordions with live token tracking.',
    ],
  },
  {
    icon: ShieldCheck,
    badge: 'Safety Layer',
    title: 'Tool Execution Engine',
    points: [
      'In-workspace file read/write with inline diff previews.',
      'Integrated Bash/shell, glob & grep project search.',
      'Subtask orchestration via the `task` tool + TodoWrite tracking.',
      'Granular permission prompts before sensitive operations.',
    ],
  },
  {
    icon: Blocks,
    badge: 'Live Sync',
    title: 'Roblox Studio & Rojo',
    points: [
      '1-click Studio setup wizard — 4 guided steps, 15s status polling.',
      'Rojo engine: auto `rojo.exe` + plugin for real-time sync.',
      'Workspace checkpoints with pre-execution snapshots.',
      'Post-task rollback history so broken builds never persist.',
    ],
  },
  {
    icon: Plug,
    badge: 'MCP',
    title: 'Model Context Protocol',
    points: [
      'Dynamic MCP server management from the Studio Assistant.',
      'Built-in `webfetch` for live web lookups.',
      '`inspect_instance` for deep Roblox instance-tree inspection.',
      'Extensible tool surface for custom project workflows.',
    ],
  },
]

function FeatureCard({ feature }: { feature: Feature }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 20 })

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onPointerLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.article
      variants={staggerItem}
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group glass h-full rounded-2xl p-6 will-change-transform transition-colors duration-300 hover:border-primary/30 sm:p-7"
    >
      <div className="flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-shadow duration-300 group-hover:shadow-[0_0_24px_-6px_var(--primary)]">
          <feature.icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {feature.badge}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{feature.title}</h3>
      <ul className="mt-4 space-y-2.5">
        {feature.points.map((point) => (
          <li
            key={point}
            className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
            {point}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export function FeaturesGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Core capabilities"
        title="Everything an agent needs to ship a game"
        subtitle="Four tightly integrated pillars connect the model, your files, and Roblox Studio into one continuous loop."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid gap-5 md:grid-cols-2"
      >
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </motion.div>
    </section>
  )
}