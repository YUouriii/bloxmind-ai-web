'use client'

import { useEffect, useState } from 'react'

export const REPO = 'YUouriii/app-BloxMind-ai'
export const REPO_URL = `https://github.com/${REPO}`

export type ReleaseAsset = {
  name: string
  browser_download_url: string
  size: number
}

export type LatestRelease = {
  tag: string
  name: string | null
  body: string | null
  publishedAt: string | null
  htmlUrl: string
  assets: ReleaseAsset[]
}

// Fallback data so the UI is never empty (e.g. placeholder repo / rate limits).
const FALLBACK: LatestRelease = {
  tag: 'v0.8.1',
  name: 'BloxMind 0.8.1',
  body: '- Initial public release\n- AI Chat Workspace with streaming responses\n- Tool Execution Engine (file, Bash, glob, grep)\n- 1-click Roblox Studio + Rojo setup\n- 25+ AI provider support',
  publishedAt: new Date().toISOString(),
  htmlUrl: `https://github.com/${REPO}/releases/latest`,
  assets: [],
}

export function useLatestRelease() {
  const [release, setRelease] = useState<LatestRelease>(FALLBACK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${REPO}/releases/latest`,
          { headers: { Accept: 'application/vnd.github+json' } },
        )
        if (!res.ok) throw new Error(`GitHub API ${res.status}`)
        const data = await res.json()
        if (!active) return
        setRelease({
          tag: data.tag_name ?? FALLBACK.tag,
          name: data.name ?? null,
          body: data.body ?? null,
          publishedAt: data.published_at ?? null,
          htmlUrl: data.html_url ?? FALLBACK.htmlUrl,
          assets: Array.isArray(data.assets)
            ? data.assets.map((a: ReleaseAsset) => ({
                name: a.name,
                browser_download_url: a.browser_download_url,
                size: a.size,
              }))
            : [],
        })
      } catch {
        // keep fallback — placeholder repo or rate limit
        if (active) setRelease(FALLBACK)
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  return { release, loading }
}

export function useRepoStars() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    let active = true
    fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data && typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  return stars
}
