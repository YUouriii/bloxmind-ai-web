'use client'

import { useEffect, useState } from 'react'
import { Download, Menu, Star, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { GithubIcon } from '@/components/github-icon'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { REPO_URL, useLatestRelease, useRepoStars } from '@/lib/use-latest-release'

function formatStars(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return `${n}`
}

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Integrations', href: '/#integrations' },
  { label: 'Changelog', href: '/#downloads' },
  { label: 'Docs', href: '/docs' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const stars = useRepoStars()
  const { release } = useLatestRelease()

  // Detect scroll to intensify header background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        scrolled ? 'border-white/10 bg-background/90' : 'border-white/5 bg-background/60'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex"
          >
            <Logo size={30} />
          </motion.span>
          <span className="font-serif text-2xl italic leading-none tracking-tight">
            BloxMind
          </span>
          <span className="rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            {release.tag}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-foreground/90 transition-colors hover:bg-white/[0.07]"
            >
            <GithubIcon className="size-4" />
            GitHub
            {stars !== null && (
              <span className="flex items-center gap-1 border-l border-white/10 pl-2 text-xs text-muted-foreground">
                <Star className="size-3 fill-amber text-amber" />
                {formatStars(stars)}
              </span>
            )}
          </a>
            <a
              href="/#downloads"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:scale-105 hover:opacity-90 active:scale-95"
            >
            <Download className="size-4" />
            Download for Windows
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex size-10 items-center justify-center rounded-lg border border-white/10 text-foreground md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/5 bg-background/95 px-4 py-4 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] py-2 pl-3 pr-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <a
                href="/#downloads"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                <Download className="size-4" />
                Download for Windows
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
