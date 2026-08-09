'use client'

import { motion } from 'motion/react'

export function MeshBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      {/* static glow base — rendered once, cheap on phones */}
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      <div className="absolute bottom-0 -left-40 h-[420px] w-[520px] rounded-full bg-emerald/10 blur-[150px]" />
      <div className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-[#1b6fd8]/10 blur-[150px]" />

      {/* animated drift — desktop only, keeps phones off the continuous-GPU-rewrite path */}
      <div className="absolute inset-0 hidden lg:block">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, 20, -10, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]"
        />
        <motion.div
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 -left-40 h-[420px] w-[520px] rounded-full bg-emerald/10 blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-[#1b6fd8]/10 blur-[150px]"
        />
      </div>
    </div>
  )
}