import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MeshBackground } from '@/components/mesh-background'
import { ScrollProgress } from '@/components/scroll-progress'

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <MeshBackground />
      <ScrollProgress />
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <header className="border-b border-white/10 pb-8 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              {subtitle}
            </p>
          )}
        </header>
        <div className="mt-10">{children}</div>
      </main>
      <SiteFooter />
    </div>
  )
}