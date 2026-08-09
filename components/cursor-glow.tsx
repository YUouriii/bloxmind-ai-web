'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Cursor glow is a desktop/mouse nicety — skip it entirely on touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return
    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!raf) {
        raf = requestAnimationFrame(loop)
      }
    }

    const loop = () => {
      // Smooth follow
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate(${x - 300}px, ${y - 300}px)`
      raf = 0
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden size-[600px] rounded-full bg-[radial-gradient(circle,rgba(46,230,255,0.06),transparent_60%)] blur-2xl lg:block"
    />
  )
}