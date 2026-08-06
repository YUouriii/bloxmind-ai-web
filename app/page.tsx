import { MeshBackground } from '@/components/mesh-background'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { FeaturesGrid } from '@/components/features-grid'
import { ProvidersGrid } from '@/components/providers-grid'
import { Showcase } from '@/components/showcase'
import { Downloads } from '@/components/downloads'
import { SiteFooter } from '@/components/site-footer'
import { ScrollProgress } from '@/components/scroll-progress'
import { CursorGlow } from '@/components/cursor-glow'
import { BackToTop } from '@/components/back-to-top'

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <MeshBackground />
      <ScrollProgress />
      <CursorGlow />
      <SiteHeader />
      <main>
        <Hero />
        <FeaturesGrid />
        <ProvidersGrid />
        <Showcase />
        <Downloads />
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  )
}
