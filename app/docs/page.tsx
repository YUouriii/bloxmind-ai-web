import type { Metadata } from 'next'
import { PageShell } from '@/components/page-shell'
import { Link2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'BloxMind documentation — getting started, setup, MCP servers, tool execution, and troubleshooting guides.',
}

const TOC = [
  { href: '#getting-started', label: 'Getting Started' },
  { href: '#installation', label: 'Installation' },
  { href: '#studio-setup', label: 'Roblox Studio Setup' },
  { href: '#ai-providers', label: 'AI Providers' },
  { href: '#tool-execution', label: 'Tool Execution' },
  { href: '#mcp', label: 'MCP Servers' },
  { href: '#checkpoints', label: 'Checkpoint Engine' },
  { href: '#faq', label: 'Frequently Asked Questions' },
]

const SECTIONS: { id: string; title: string; items: string[] }[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      'BloxMind is a context-aware desktop AI agent that lives inside Roblox Studio. It connects your workspace, files, and tools into one continuous AI-assisted loop.',
      'The agent works via the OpenCode SDK with tool execution, live sync to Studio through Rojo, and a checkpoint engine so you can roll back any change.',
    ],
  },
  {
    id: 'installation',
    title: 'Installation',
    items: [
      'Download the installer for your OS (Windows, macOS, or Linux) from the Downloads section.',
      'Run the installer and follow the guided setup wizard. BloxMind ships with automatic updates, so you always get the latest version.',
    ],
  },
  {
    id: 'studio-setup',
    title: 'Roblox Studio Setup',
    items: [
      'Launch BloxMind and open the Studio Assistant panel to run the 1-click Setup Wizard.',
      'Install the bundled Studio plugin and authorize the BloxMind bridge.',
      'Start the Rojo server to sync your workspace file changes both ways in real time.',
    ],
  },
  {
    id: 'ai-providers',
    title: 'AI Providers',
    items: [
      'BloxMind supports 25+ providers including OpenAI, Anthropic, Google, DeepSeek, Mistral, and more.',
      'Open the Providers panel, pick your provider, and paste your API key. The agent will use that model for all conversations and code generation.',
    ],
  },
  {
    id: 'tool-execution',
    title: 'Tool Execution',
    items: [
      'The agent can read/write files, run Bash/shell commands, glob and grep your project, and orchestrate subtasks via the `task` tool.',
      'Sensitive operations require your approval via permission prompts before executing.',
    ],
  },
  {
    id: 'mcp',
    title: 'MCP Servers',
    items: [
      'Manage MCP servers directly from the Studio Assistant to extend the model with custom tools.',
      'Built-in tools include `webfetch` for live web lookups and `inspect_instance` for detailed Roblox instance-tree inspection.',
    ],
  },
  {
    id: 'checkpoints',
    title: 'Checkpoint Engine',
    items: [
      'Before every tool run, BloxMind snapshots your workspace so you can roll back if something breaks.',
      'Review the post-task rollback history to restore any previous state with one click.',
    ],
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    items: [
      'Q: Is my code sent to a server? — No. BloxMind processes your project files locally. Only prompts are sent to the AI provider you select.',
      'Q: Does BloxMind work with Rojo? — Yes. Live sync is built-in via the Rojo engine and Studio plugin.',
      'Q: Can I use any AI model? — Yes. Connect any supported provider and keep the same agent surface.',
    ],
  },
]

export default function DocsPage() {
  return (
    <PageShell
      eyebrow="Documentation"
      title="BloxMind Documentation"
      subtitle="Everything you need to set up, configure, and get the most out of BloxMind."
    >
      {/* Table of contents */}
      <nav className="mb-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
          <Link2 className="size-4" /> On this page
        </p>
        <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4">
          {TOC.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sections */}
      <div className="grid gap-6">
        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
          >
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {section.title}
            </h2>
            <div className="mt-3 space-y-3">
              {section.items.map((item, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  )
}