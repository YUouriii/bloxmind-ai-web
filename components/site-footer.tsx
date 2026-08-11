import { Logo } from '@/components/logo'

type FooterLink = { label: string; href: string; badge?: boolean; nofollow?: boolean }

const LINK_GROUPS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub Discussions', href: 'https://github.com/YUouriii/app-BloxMind-ai/discussions' },
      { label: 'Discord', href: 'https://discord.gg/PhcnZBWcP6', nofollow: true },
      { label: 'Releases', href: 'https://github.com/YUouriii/app-BloxMind-ai/releases' },
      { label: 'Roblox DevForum', href: 'https://devforum.roblox.com' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'GitHub Issues', href: 'https://github.com/YUouriii/app-BloxMind-ai/issues', badge: true },
      { label: 'Contact', href: 'mailto:support@bloxmind.ai', badge: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer id="docs" className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="text-lg font-semibold tracking-tight">
                BloxMind
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The context-aware desktop AI agent for Roblox Studio. Built with
              Electron, OpenCode, and Rojo.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Electron', 'auto-updater', 'code-signed'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-medium">{group.title}</p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith('/') ? undefined : '_blank'}
                rel={link.href.startsWith('/') ? undefined : (link.nofollow ? 'noopener noreferrer nofollow' : 'noopener noreferrer')}
                className={
                  link.badge
                    ? 'inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary transition-colors hover:bg-primary/20'
                    : 'text-sm text-muted-foreground transition-colors hover:text-foreground'
                }
              >
                      {link.label}
                      {link.badge && (
                        <span className="size-1.5 rounded-full bg-primary/70" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BloxMind. Not affiliated with Roblox
            Corporation.
          </p>
          
          <p className="font-mono text-xs text-muted-foreground">
            Made for builders, at the speed of thought.
          </p>
        </div>
      </div>
    </footer>
  )
}
