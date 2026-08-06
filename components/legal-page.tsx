import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MeshBackground } from '@/components/mesh-background'
import { ScrollProgress } from '@/components/scroll-progress'

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <MeshBackground />
      <ScrollProgress />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <header className="border-b border-white/10 pb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            BloxMind Legal
          </span>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            Last updated: {updated}
          </p>
        </header>
        <div className="prose prose-invert prose-sm mt-10 max-w-none space-y-6 text-muted-foreground">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}