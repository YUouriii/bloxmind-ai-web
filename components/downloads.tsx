'use client'

import { Apple, Download, Monitor, Terminal, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useLatestRelease } from '@/lib/use-latest-release'

type Platform = {
  icon: LucideIcon
  os: string
  format: string
  file: string
}

const PLATFORMS: Platform[] = [
  { icon: Monitor, os: 'Windows', format: 'NSIS Installer', file: 'BloxMind-Setup.exe' },
  { icon: Apple, os: 'macOS', format: 'Apple Silicon & Intel', file: '.dmg / .zip' },
  { icon: Terminal, os: 'Linux', format: 'Debian Package', file: '.deb' },
]

export function Downloads() {
  const { release } = useLatestRelease()

  const published = release.publishedAt
    ? new Date(release.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <section id="downloads" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            Get BloxMind
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Cross-Platform Support & Automatic Updates
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Download the desktop app for your OS. Every build ships with
            delta auto-updates baked in.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* platform cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {PLATFORMS.map((platform, i) => (
            <Reveal key={platform.os} delay={i * 0.08}>
              <a
                href={release.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass flex h-full flex-col items-start gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_32px_-8px_var(--primary)]"
              >
                <span className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-primary">
                  <platform.icon className="size-5" />
                </span>
                <div className="flex-1">
                  <p className="font-medium">{platform.os}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {platform.format}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground/70">
                    {platform.file}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                  <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
                  {release.tag}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* changelog card */}
        <Reveal delay={0.1}>
          <div className="glass flex h-full flex-col rounded-2xl p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-muted-foreground">Latest release</p>
                <p className="mt-0.5 font-semibold">
                  {release.name ?? release.tag}
                </p>
              </div>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
                {release.tag}
              </span>
            </div>
            {published && (
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                Published {published}
              </p>
            )}
            <div className="scrollbar-thin mt-4 max-h-56 flex-1 space-y-2 overflow-y-auto pr-1">
              {(release.body ?? '')
                .split('\n')
                .filter((line) => line.trim().length > 0)
                .map((line, i) => (
                  <p
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald/70" />
                    {line.replace(/^[-*]\s*/, '')}
                  </p>
                ))}
            </div>
            <a
              href={release.htmlUrl}
              className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] py-2.5 text-sm font-medium transition-colors hover:bg-white/[0.07]"
            >
              View full changelog on GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
