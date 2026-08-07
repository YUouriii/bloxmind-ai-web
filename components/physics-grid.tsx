'use client'

import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import { PROVIDERS } from '@/lib/providers'
import { ProviderIcon } from '@/components/provider-icon'

type BodyPair = {
  body: Matter.Body
  el: HTMLDivElement
  provider: (typeof PROVIDERS)[number]
}

const CUBE_SIZE = 84
const CUBE_GAP = 12
const CHAMFER_RADIUS = 10
const RESTITUTION = 0.6
const FRICTION_AIR = 0.01
const FRICTION = 0.1
const FRICTION_STATIC = 0.3
const DENSITY = 0.002
const MAX_VELOCITY = 35

export function PhysicsGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bodiesRef = useRef<BodyPair[]>([])
  const engineRef = useRef<Matter.Engine | null>(null)
  const runnerRef = useRef<Matter.Runner | null>(null)
  const [mounted, setMounted] = useState(false)
  const [inView, setInView] = useState(false)
  const lastDraggedEl = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Detect when the container enters the viewport
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [mounted])

  useEffect(() => {
    if (!mounted || !inView || !containerRef.current) return
    const container = containerRef.current
    const engine = Matter.Engine.create({ enableSleeping: false, gravity: { x: 0, y: 1 } })
    // Increase solver precision to prevent interpenetration/overlap
    engine.constraintIterations = 6
    engine.positionIterations = 10
    engine.velocityIterations = 8
    engineRef.current = engine
    const world = engine.world

    const runner = Matter.Runner.create()
    runnerRef.current = runner
    Matter.Runner.run(runner, engine)

    const bounds = container.getBoundingClientRect()
    const width = bounds.width
    const height = bounds.height

    const wallPad = 2
    const wallThickness = 60
    const walls = [
      Matter.Bodies.rectangle(width / 2, -wallThickness / 2 + wallPad, width + wallThickness * 2, wallThickness, { isStatic: true, friction: 0.4, restitution: RESTITUTION, angle: 0 }),
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2 - wallPad, width + wallThickness * 2, wallThickness, { isStatic: true, friction: 0.4, restitution: RESTITUTION, angle: 0 }),
      Matter.Bodies.rectangle(-wallThickness / 2 + wallPad, height / 2, wallThickness, height + wallThickness * 2, { isStatic: true, friction: 0.4, restitution: RESTITUTION, angle: 0 }),
      Matter.Bodies.rectangle(width + wallThickness / 2 - wallPad, height / 2, wallThickness, height + wallThickness * 2, { isStatic: true, friction: 0.4, restitution: RESTITUTION, angle: 0 }),
    ]
    Matter.World.add(world, walls)

    const cols = Math.max(3, Math.floor((width - CUBE_GAP) / (CUBE_SIZE + CUBE_GAP)))
    const initialBodies: BodyPair[] = []

    PROVIDERS.forEach((provider, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const x = CUBE_GAP + CUBE_SIZE / 2 + col * (CUBE_SIZE + CUBE_GAP)
      const y = CUBE_GAP + CUBE_SIZE / 2 + row * (CUBE_SIZE + CUBE_GAP)
      if (y > height - CUBE_SIZE / 2) return

      const body = Matter.Bodies.rectangle(x, y, CUBE_SIZE, CUBE_SIZE, {
        density: DENSITY,
        friction: FRICTION,
        frictionStatic: FRICTION_STATIC,
        restitution: RESTITUTION,
        frictionAir: FRICTION_AIR,
        chamfer: { radius: CHAMFER_RADIUS },
        slop: 0.01, // strict body edges to prevent compression overlap
        angle: 0,
      })
      Matter.World.add(world, body)

      const el = container.querySelector<HTMLDivElement>(`[data-provider="${i}"]`)
      if (el) {
        el.style.opacity = '1'
        initialBodies.push({ body, el, provider })
      }
      bodiesRef.current = initialBodies
    })

    // Manual drag handling using Query.point for accurate hit detection from any point
    let dragging = false
    let dragBody: Matter.Body | null = null
    let dragOffset = { x: 0, y: 0 }
    let lastPointer = { x: 0, y: 0 }
    let dragTarget = { x: 0, y: 0 }

    const getPoint = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onPointerDown = (e: PointerEvent) => {
      const point = getPoint(e)
      const bodies = bodiesRef.current.map(b => b.body)
      const hits = Matter.Query.point(bodies, point)
      if (hits.length > 0) {
      const body = hits[0]
      dragging = true
      dragBody = body
      dragOffset = { x: point.x - body.position.x, y: point.y - body.position.y }
      lastPointer = point
      dragTarget = { ...body.position }
        Matter.Body.setStatic(body, false)
        body.isSleeping = false
        const el = bodiesRef.current.find(b => b.body === body)?.el
        if (el) {
          el.style.borderColor = '#fff'
          el.style.boxShadow = '0 0 0 1px #fff, 0 0 24px rgba(255,255,255,0.35)'
          el.style.zIndex = '10'
          lastDraggedEl.current = el
        }
        e.preventDefault()
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || !dragBody) return
      const point = getPoint(e)
      lastPointer = point

      // Clamp drag target to inner bounds so the cube slides along walls
      const rawX = point.x - dragOffset.x
      const rawY = point.y - dragOffset.y
      dragTarget.x = Math.max(minX, Math.min(maxX, rawX))
      dragTarget.y = Math.max(minY, Math.min(maxY, rawY))
    }

    const onPointerUp = (e: PointerEvent) => {
      if (dragging && dragBody) {
        const point = getPoint(e)
        const vx = (point.x - lastPointer.x) * 0.25
        const vy = (point.y - lastPointer.y) * 0.25
        Matter.Body.setVelocity(dragBody, { x: vx, y: vy })
        Matter.Body.setAngularVelocity(dragBody, (vx + vy) * 0.015)

        const speed = Math.sqrt(vx ** 2 + vy ** 2)
        if (speed > MAX_VELOCITY) {
          const scale = MAX_VELOCITY / speed
          Matter.Body.setVelocity(dragBody, { x: vx * scale, y: vy * scale })
        }

        const el = bodiesRef.current.find(b => b.body === dragBody)?.el
        if (el) {
          el.style.borderColor = ''
          el.style.boxShadow = ''
          el.style.zIndex = ''
          lastDraggedEl.current = null
        }
        dragging = false
        dragBody = null
      }
    }

    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)

    // Apply rotational torque on offset collision for natural tilting into gaps.
    // When a cube is falling and its horizontal velocity is offset, nudge its
    // rotation so it tilts and rolls into open spaces instead of sliding flat.
    Matter.Events.on(engine, 'beforeUpdate', () => {
      bodiesRef.current.forEach(({ body }) => {
        if (body.velocity.y > 1 && Math.abs(body.angularVelocity) < 0.5) {
          const torque = body.velocity.x * 0.0008
          Matter.Body.setAngularVelocity(body, body.angularVelocity + torque)
        }
      })
    })

    // Anti-interpenetration: when bodies overlap beyond a safety threshold,
    // eject the non-static body upward so it pops out of the stack instead
    // of clipping/ghosting through its neighbors.
    Matter.Events.on(engine, 'collisionActive', (event) => {
      event.pairs.forEach((pair) => {
        if (pair.separation < -4) {
          const bodyA = pair.bodyA
          const bodyB = pair.bodyB
          const targetBody = !bodyA.isStatic ? bodyA : !bodyB.isStatic ? bodyB : null
          if (targetBody) {
            Matter.Body.applyForce(targetBody, targetBody.position, {
              x: (Math.random() - 0.5) * 0.03,
              y: -0.12, // upward ejection force
            })
          }
        }
      })
    })

    const half = CUBE_SIZE / 2
    const minX = half
    const maxX = width - half
    const minY = half
    const maxY = height - half

    const sync = () => {
      bodiesRef.current.forEach(({ body, el }) => {
        let { x, y } = body.position

        // If dragging, continuously snap body to drag target so it never falls
        if (dragging && dragBody === body) {
          Matter.Body.setPosition(body, dragTarget)
          Matter.Body.setVelocity(body, { x: 0, y: 0 })
          Matter.Body.setAngularVelocity(body, body.angularVelocity * 0.9)
        }

        const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2)

        // Only clamp position to prevent escaping walls — let Matter handle
        // the natural bouncing, tilting, and rolling via chamfered corners.
        if (x < minX) {
          x = minX
          Matter.Body.setPosition(body, { x, y })
          Matter.Body.setVelocity(body, { x: Math.abs(body.velocity.x) * RESTITUTION, y: body.velocity.y })
        } else if (x > maxX) {
          x = maxX
          Matter.Body.setPosition(body, { x, y })
          Matter.Body.setVelocity(body, { x: -Math.abs(body.velocity.x) * RESTITUTION, y: body.velocity.y })
        }
        if (y < minY) {
          y = minY
          Matter.Body.setPosition(body, { x, y })
          Matter.Body.setVelocity(body, { x: body.velocity.x, y: Math.abs(body.velocity.y) * RESTITUTION })
        } else if (y > maxY) {
          y = maxY
          Matter.Body.setPosition(body, { x, y })
          Matter.Body.setVelocity(body, { x: body.velocity.x, y: -Math.abs(body.velocity.y) * RESTITUTION })
        }

        // Cap runaway velocity only — don't zero out momentum
        if (speed > MAX_VELOCITY) {
          const scale = MAX_VELOCITY / speed
          Matter.Body.setVelocity(body, { x: body.velocity.x * scale, y: body.velocity.y * scale })
        }

        // Light angular decay so cubes keep rotating naturally but settle over time
        Matter.Body.setAngularVelocity(body, body.angularVelocity * 0.995)

        el.style.transform = `translate(${x - half}px, ${y - half}px) rotate(${body.angle}rad)`
      })
    }

    Matter.Events.on(engine, 'afterUpdate', sync)

    return () => {
      Matter.Events.off(engine, 'afterUpdate', sync)
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      Matter.Runner.stop(runner)
      Matter.World.clear(world, false)
      Matter.Engine.clear(engine)
    }
  }, [mounted, inView])

  return (
    <div
      ref={containerRef}
      className="relative h-[520px] w-full touch-none select-none overflow-hidden rounded-2xl border border-border bg-background/80"
    >
      {PROVIDERS.map((provider, i) => (
        <div
          key={provider.name}
          data-provider={i}
          className="absolute left-0 top-0 flex aspect-square w-[84px] cursor-grab items-center justify-center rounded-xl border border-border bg-background/50 opacity-0 transition-opacity duration-500 hover:border-foreground/40 hover:bg-foreground/5"
          style={{ transform: 'translate(-9999px, -9999px)' }}
        >
          <div className="pointer-events-none flex flex-col items-center justify-center gap-1.5 p-2 text-center">
            <ProviderIcon name={provider.name} slug={provider.slug} favicon={provider.favicon} />
            <span className="max-w-[68px] truncate text-[10px] font-medium leading-tight text-foreground/90">
              {provider.name}
            </span>
          </div>
        </div>
      ))}
        <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background/70 px-3 py-1.5 font-mono text-[11px] text-foreground/70 backdrop-blur">
          Drag & flick the cubes — they collide and rotate naturally
        </div>
    </div>
  )
}