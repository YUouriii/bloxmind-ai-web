import type { Metadata } from 'next'
import { MeshBackground } from '@/components/mesh-background'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ScrollProgress } from '@/components/scroll-progress'
import { CursorGlow } from '@/components/cursor-glow'
import { BackToTop } from '@/components/back-to-top'
import { Downloads } from '@/components/downloads'
import { FAQ } from '@/components/faq'

export const metadata: Metadata = {
  title: 'Create Roblox Games with AI for Free - BloxMind AI Game Generator',
  description:
    'Create Roblox games with AI for free using BloxMind. Generate Roblox maps, Luau scripts, and 3D environments with our AI Roblox game generator. No coding required.',
  keywords: [
    'create game with ai for free',
    'create roblox games with ai',
    'roblox ai game generator',
    'roblox game maker ai',
    'free ai game generator roblox',
    'roblox map creator ai',
  ],
  alternates: {
    canonical: 'https://bloxmind.ai/create-roblox-game-with-ai',
  },
  openGraph: {
    title: 'Create Roblox Games with AI for Free - BloxMind',
    description:
      'Create Roblox games with AI for free. Generate maps, scripts, and 3D environments with BloxMind AI game generator.',
    url: 'https://bloxmind.ai/create-roblox-game-with-ai',
    type: 'website',
  },
}

export default function CreateRobloxGameWithAIPage() {
  return (
    <div className="relative min-h-screen">
      <MeshBackground />
      <ScrollProgress />
      <CursorGlow />
      <SiteHeader />
      <main>
        <section className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald" />
              Free AI Game Generator for Roblox
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Create Roblox Games with{' '}
              <span className="animated-gradient bg-gradient-to-r from-primary via-[#7fefff] to-emerald bg-clip-text text-transparent">
                AI for Free
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              BloxMind is the ultimate AI Roblox game generator. Create Roblox
              maps, Luau scripts, and 3D environments using natural language —
              completely free. Built for Roblox Studio with Rojo live sync.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#downloads"
                className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-[0_0_32px_-6px_var(--primary)] transition-transform hover:scale-[1.03] sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                Start Creating for Free
              </a>
              <a
                href="https://github.com/YUouriii/app-BloxMind-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-medium text-foreground/90 backdrop-blur-md transition-colors hover:bg-white/[0.07] sm:w-auto"
              >
                View Source on GitHub
              </a>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How to Create Roblox Games with AI
            </h2>
            <div className="mt-8 space-y-6">
              {[
                {
                  step: '01',
                  title: 'Download BloxMind for free',
                  description:
                    'Get the AI Roblox game generator that integrates directly with Roblox Studio. Available for Windows, macOS, and Linux.',
                },
                {
                  step: '02',
                  title: 'Describe your Roblox game',
                  description:
                    'Type what you want to build — a map, obstacle course, tycoon, or RPG world. The AI understands natural language and generates Luau scripts instantly.',
                },
                {
                  step: '03',
                  title: 'Generate and play',
                  description:
                    'BloxMind creates your Roblox map, scripts, and game mechanics in real-time. Use Rojo live sync to see changes instantly in Roblox Studio.',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="font-mono text-sm text-primary">{item.step}</span>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Why Roblox Developers Choose BloxMind
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: 'AI Roblox Map Creator',
                  description:
                    'Generate complete Roblox maps and 3D environments with AI. Create terrain, structures, and interactive elements in seconds.',
                },
                {
                  title: 'Luau Script Generator',
                  description:
                    'The AI writes production-ready Luau scripts for game mechanics, NPCs, and interactions. No coding experience needed.',
                },
                {
                  title: '25+ AI Providers',
                  description:
                    'Use OpenAI, Anthropic, Google Gemini, and more. Switch between providers to get the best results for your Roblox game.',
                },
                {
                  title: 'Rojo Live Sync',
                  description:
                    'See your AI-generated changes instantly in Roblox Studio with 1-click Rojo setup and live sync integration.',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border bg-background/50 p-6"
                >
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Downloads />
        <FAQ />
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  )
}