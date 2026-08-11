import { MeshBackground } from '@/components/mesh-background'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { FeaturesGrid } from '@/components/features-grid'
import { ProvidersGrid } from '@/components/providers-grid'
import { Showcase } from '@/components/showcase'
import { Downloads } from '@/components/downloads'
import { FAQ } from '@/components/faq'
import { SiteFooter } from '@/components/site-footer'
import { ScrollProgress } from '@/components/scroll-progress'
import { CursorGlow } from '@/components/cursor-glow'
import { BackToTop } from '@/components/back-to-top'

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': 'https://bloxmindai.netlify.app/#webpage',
            url: 'https://bloxmindai.netlify.app',
            name: 'BloxMind - Create Roblox Games with AI for Free | AI Game Generator',
            description:
              'Create Roblox games with AI for free using BloxMind. Generate Roblox maps, scripts, and 3D environments effortlessly with our AI Roblox game generator. Built for Roblox Studio.',
            isPartOf: {
              '@id': 'https://bloxmindai.netlify.app/#website',
            },
            about: {
              '@id': 'https://bloxmindai.netlify.app/#organization',
            },
          }),
        }}
      />
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
        <FAQ />
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  )
}
