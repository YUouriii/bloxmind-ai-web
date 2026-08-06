'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Monitor } from 'lucide-react'
import { GithubIcon } from '@/components/github-icon'
import { AppWindow, StatusBar } from '@/components/app-window'
import { ChatMockup } from '@/components/chat-mockup'
import { REPO_URL, useLatestRelease } from '@/lib/use-latest-release'

export function Hero() {
  const { release } = useLatestRelease()

  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-emerald" />
          Now with the Checkpoint Engine · {release.tag}
        </motion.div>

        {/* Word-by-word staggered heading */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
        >
          {['Build', 'Roblox', 'Games', 'at', 'the'].map((word, i) => (
            <motion.span
              key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              className="inline-block"
            >
              {word}&nbsp;
            </motion.span>
          ))}
          <motion.span
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            className="animated-gradient bg-gradient-to-r from-primary via-[#7fefff] to-emerald bg-clip-text text-transparent"
          >
            Speed
          </motion.span>
          <motion.span
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            className="inline-block"
          >
            {' '}of Thought with AI.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          The context-aware desktop AI agent integrated directly with Roblox
          Studio and Rojo live sync. Code, debug, and orchestrate project
          mechanics using natural language.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald" />
            Trusted by Roblox builders
          </span>
          <span className="hidden sm:inline text-white/10">|</span>
          <span className="hidden sm:inline rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
            25+ providers supported
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#downloads"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-[0_0_32px_-6px_var(--primary)] transition-transform hover:scale-[1.03] sm:w-auto"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            <Monitor className="size-5" />
            Download Latest Version
            <span className="rounded-md bg-primary-foreground/15 px-1.5 py-0.5 font-mono text-xs">
              {release.tag}
            </span>
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-medium text-foreground/90 backdrop-blur-md transition-colors hover:bg-white/[0.07] sm:w-auto"
          >
            <GithubIcon className="size-5 transition-transform group-hover:-translate-y-0.5" />
            View Source on GitHub
          </a>
        </motion.div>
      </div>

      <TiltedAppWindow />
    </section>
  )
}

function TiltedAppWindow() {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 })

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(px)
    my.set(py)
  }

  const onPointerLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto mt-16 max-w-4xl [perspective:1000px]"
    >
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="will-change-transform"
      >
        <AppWindow statusBar={<StatusBar />}>
          <ChatMockup />
        </AppWindow>
      </motion.div>
    </motion.div>
  )
}