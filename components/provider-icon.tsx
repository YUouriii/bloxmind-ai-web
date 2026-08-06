import {
  SiAnthropic,
  SiGoogle,
  SiGooglecloud,
  SiCloudflare,
  SiNvidia,
  SiMeta,
  SiPerplexity,
  SiX,
  SiGithub,
  SiHuggingface,
  SiOllama,
  SiVercel,
  SiOpenrouter,
} from '@icons-pack/react-simple-icons'

const ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>> = {
  anthropic: SiAnthropic,
  'github copilot': SiGithub,
  github: SiGithub,
  google: SiGoogle,
  'google cloud': SiGooglecloud,
  openrouter: SiOpenrouter,
  'vercel ai gateway': SiVercel,
  vercel: SiVercel,
  meta: SiMeta,
  nvidia: SiNvidia,
  perplexity: SiPerplexity,
  xai: SiX,
  x: SiX,
  'cloudflare ai': SiCloudflare,
  cloudflare: SiCloudflare,
  'hugging face': SiHuggingface,
  huggingface: SiHuggingface,
  ollama: SiOllama,
}

interface ProviderIconProps {
  name: string
  slug?: string
  favicon?: string
  className?: string
}

/**
 * Render a provider icon preserving its official brand color.
 * Resolution order:
 *  1. Bundled React simple-icon (color="default" → official brand color).
 *  2. Simple Icons CDN (brand color, no `/FFFFFF` override).
 *  3. Direct favicon URL (rendered as-is, full color).
 *  4. Colored letter badge (last resort).
 */
export function ProviderIcon({
  name,
  slug,
  favicon,
  className = 'size-6',
}: ProviderIconProps) {
  const searchKey = (slug || name).toLowerCase()
  const matchedKey = Object.keys(ICON_MAP).find((k) => searchKey.includes(k))

  // 1. Bundled React simple-icon with official brand color
  if (matchedKey) {
    const Icon = ICON_MAP[matchedKey]
    return (
      <span className="inline-flex items-center justify-center">
        <Icon className={className} color="default" />
      </span>
    )
  }

  // Letter badge with brand-ish color
  const letterBadge = (
    <span
      className={`inline-flex items-center justify-center rounded border border-white/25 bg-white/5 font-mono font-bold uppercase text-white ${className}`}
      aria-hidden
    >
      {name.charAt(0)}
    </span>
  )

  // 2. Verified slug → try CDN first (brand color), fall back to favicon
  if (slug) {
    const cdnUrl = `https://cdn.simpleicons.org/${slug}`
    return (
      <span className="inline-flex items-center justify-center">
        <img
          src={cdnUrl}
          alt={name}
          className={className}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            if (favicon) {
              target.src = favicon
            } else {
              target.style.display = 'none'
              target.insertAdjacentHTML(
                'afterend',
                `<span class="inline-flex items-center justify-center rounded border border-white/25 bg-white/5 font-mono font-bold uppercase text-white ${className}">${name
                  .charAt(0)
                  .toUpperCase()}</span>`,
              )
            }
          }}
        />
      </span>
    )
  }

  // 3. No slug → go straight to favicon (full color)
  if (favicon) {
    return (
      <span className="inline-flex items-center justify-center">
        <img
          src={favicon}
          alt={name}
          className={className}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            target.insertAdjacentHTML(
              'afterend',
              `<span class="inline-flex items-center justify-center rounded border border-white/25 bg-white/5 font-mono font-bold uppercase text-white ${className}">${name
                .charAt(0)
                .toUpperCase()}</span>`,
            )
          }}
        />
      </span>
    )
  }

  // 4. No icon source — letter badge
  return letterBadge
}