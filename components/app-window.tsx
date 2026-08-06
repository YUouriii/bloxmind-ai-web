import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function AppWindow({
  title = 'BloxMind',
  children,
  className,
  statusBar,
}: {
  title?: string
  children: ReactNode
  className?: string
  statusBar?: ReactNode
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-white/10 bg-card shadow-[0_40px_120px_-30px_rgba(46,230,255,0.25)]',
        className,
      )}
    >
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-1 font-mono text-xs text-muted-foreground">
          {title}
        </span>
      </div>
      {children}
      {statusBar}
    </div>
  )
}

export function StatusBar() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-white/10 bg-white/[0.02] px-4 py-2 font-mono text-[11px]">
      <span className="flex items-center gap-1.5 text-emerald">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald" />
        </span>
        Connected to Studio
      </span>
      <span className="flex items-center gap-1.5 text-emerald">
        <span className="size-2 rounded-full bg-emerald" />
        Rojo Sync Active
      </span>
      <span className="ml-auto text-muted-foreground">2,481 tokens</span>
    </div>
  )
}
