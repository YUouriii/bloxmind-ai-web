'use client'

import dynamic from 'next/dynamic'
import { motion } from 'motion/react'

// Code-split the physics engine + grid so matter-js only loads when needed
const PhysicsGrid = dynamic(
  () => import('@/components/physics-grid').then((m) => m.PhysicsGrid),
  { ssr: false, loading: () => <div className="h-[520px] w-full animate-pulse rounded-2xl border border-white/10 bg-black/30" /> },
)

export function ProvidersGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          Providers
        </span>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Bring your own model
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          BloxMind connects to every major provider. Plug in your API key and
          keep using the same agent surface.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-14"
      >
        <PhysicsGrid />
      </motion.div>
    </section>
  )
}