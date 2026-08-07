'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const FAQ_ITEMS = [
  {
    question: 'Can I create Roblox games with AI for free?',
    answer:
      'Yes! BloxMind is completely free to use. You can create Roblox games with AI, generate maps, scripts, and 3D environments without any cost. Download the app and start building with AI today.',
  },
  {
    question: 'How does the AI Roblox game generator work?',
    answer:
      'BloxMind integrates directly with Roblox Studio and Rojo live sync. Simply describe what you want to build in natural language, and the AI generates Luau scripts, maps, and game mechanics in real-time. It supports 25+ AI providers including OpenAI, Anthropic, and Google.',
  },
  {
    question: 'Do I need coding experience to use BloxMind?',
    answer:
      'No coding experience is required. BloxMind is designed for both beginners and experienced developers. The AI handles the complex Luau scripting and game logic, while you focus on the creative vision of your Roblox game.',
  },
  {
    question: 'What can I build with the AI Roblox map creator?',
    answer:
      'You can create complete Roblox maps, obstacle courses, tycoons, RPG worlds, and more. The AI generates terrain, structures, and interactive elements. With the Checkpoint Engine, you can even save and restore different versions of your game.',
  },
  {
    question: 'Is BloxMind compatible with Roblox Studio?',
    answer:
      'Yes, BloxMind is built specifically for Roblox Studio. It features 1-click Roblox Studio and Rojo setup, live sync for instant updates, and full integration with your existing Roblox projects.',
  },
  {
    question: 'Which AI providers does BloxMind support?',
    answer:
      'BloxMind supports 25+ AI providers including OpenAI, Anthropic, Google Gemini, and more. You can use your preferred AI provider or switch between them to get the best results for your Roblox game development.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">FAQ</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about creating Roblox games with AI using BloxMind.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <Reveal key={item.question} delay={i * 0.05}>
            <div className="overflow-hidden rounded-xl border border-border bg-background/50">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-medium">{item.question}</span>
                <ChevronDown
                  className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  )
}