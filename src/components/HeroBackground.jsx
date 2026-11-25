import { useEffect, useRef } from 'react'

const THEME_PALETTES = {
  dark: {
    node: 'rgba(96, 165, 250, 0.72)',
    nodeBright: 'rgba(147, 197, 253, 0.9)',
    line: [96, 165, 250],
    lineAlpha: 0.22,
    glow: 'rgba(59, 130, 246, 0.16)',
  },
  light: {
    node: 'rgba(37, 99, 235, 0.55)',
    nodeBright: 'rgba(29, 78, 216, 0.78)',
    line: [37, 99, 235],
    lineAlpha: 0.16,
    glow: 'rgba(37, 99, 235, 0.1)',
  },
}

function getThemeKey() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

function createParticles(width, height) {
  const area = width * height
  const count = Math.max(26, Math.min(68, Math.floor(area / 19000)))
  const particles = []

  for (let i = 0; i < count; i += 1) {
    const speed = 0.18 + Math.random() * 0.28
    const angle = Math.random() * Math.PI * 2
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 1.3 + Math.random() * 1.9,
      phase: Math.random() * Math.PI * 2,
      bright: i % 4 === 0,
    })
  }

  return particles
}

/**
 * Renders a GPU-friendly aurora glow layer and a high-DPI interactive constellation canvas.
 */
export function HeroBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = motionQuery.matches
    let palette = THEME_PALETTES[getThemeKey()]
    let width = 0
    let height = 0
    let particles = []
    let rafId = 0
    let isVisible = true
    let lastTime = performance.now()

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
    }

    function resize() {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = createParticles(width, height)
    }

    function drawFrame(now) {
      const elapsedMs = Math.min(40, Math.max(4, now - lastTime))
      const step = elapsedMs / 16.667
      lastTime = now

      ctx.clearRect(0, 0, width, height)

      // Smoothly interpolate pointer position for subtle magnetic parallax
      pointer.x += (pointer.targetX - pointer.x) * 0.08 * step
      pointer.y += (pointer.targetY - pointer.y) * 0.08 * step

      if (pointer.active) {
        const glowRadius = 210
        const gradient = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          glowRadius,
        )
        gradient.addColorStop(0, palette.glow)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      const maxDist = Math.min(155, Math.max(105, width * 0.13))
      const maxDistSq = maxDist * maxDist
      const [r, g, b] = palette.line

      if (!reducedMotion) {
        for (let i = 0; i < particles.length; i += 1) {
          const p = particles[i]
          p.x += p.vx * step
          p.y += p.vy * step
          p.phase += 0.02 * step

          if (pointer.active) {
            const dx = p.x - pointer.x
            const dy = p.y - pointer.y
            const distSq = dx * dx + dy * dy
            if (distSq > 1 && distSq < 19000) {
              const dist = Math.sqrt(distSq)
              const force = ((138 - dist) / 138) * 0.035 * step
              p.x += (dx / dist) * force * 14
              p.y += (dy / dist) * force * 14
            }
          }

          if (p.x < -20) p.x = width + 20
          else if (p.x > width + 20) p.x = -20
          if (p.y < -20) p.y = height + 20
          else if (p.y > height + 20) p.y = -20
        }
      }

      // Draw connecting lines between nearby nodes
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j += 1) {
          const bNode = particles[j]
          const dx = a.x - bNode.x
          const dy = a.y - bNode.y
          const distSq = dx * dx + dy * dy
          if (distSq < maxDistSq) {
            const alpha = (1 - Math.sqrt(distSq) / maxDist) * palette.lineAlpha
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(bNode.x, bNode.y)
            ctx.stroke()
          }
        }
      }

      // Draw particles with soft pulse
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]
        const pulse = reducedMotion ? 1 : 0.85 + Math.sin(p.phase) * 0.25
        ctx.fillStyle = p.bright ? palette.nodeBright : palette.node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reducedMotion && isVisible) {
        rafId = window.requestAnimationFrame(drawFrame)
      }
    }

    function startLoop() {
      if (rafId) window.cancelAnimationFrame(rafId)
      lastTime = performance.now()
      if (reducedMotion) {
        drawFrame(lastTime)
      } else if (isVisible) {
        rafId = window.requestAnimationFrame(drawFrame)
      }
    }

    function handlePointerMove(event) {
      const rect = canvas.getBoundingClientRect()
      pointer.targetX = event.clientX - rect.left
      pointer.targetY = event.clientY - rect.top
      if (!pointer.active) {
        pointer.x = pointer.targetX
        pointer.y = pointer.targetY
        pointer.active = true
      }
    }

    function handlePointerLeave() {
      pointer.active = false
    }

    function handleMotionChange(event) {
      reducedMotion = event.matches
      startLoop()
    }

    resize()
    startLoop()

    const host = canvas.parentElement
    host?.addEventListener('pointermove', handlePointerMove, { passive: true })
    host?.addEventListener('pointerleave', handlePointerLeave)
    motionQuery.addEventListener('change', handleMotionChange)

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reducedMotion) drawFrame(performance.now())
    })
    if (host) resizeObserver.observe(host)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting)
        if (isVisible && !reducedMotion) {
          startLoop()
        } else if (!isVisible && rafId) {
          window.cancelAnimationFrame(rafId)
          rafId = 0
        }
      },
      { threshold: 0.05 },
    )
    if (host) intersectionObserver.observe(host)

    const themeObserver = new MutationObserver(() => {
      palette = THEME_PALETTES[getThemeKey()]
      if (reducedMotion) drawFrame(performance.now())
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      host?.removeEventListener('pointermove', handlePointerMove)
      host?.removeEventListener('pointerleave', handlePointerLeave)
      motionQuery.removeEventListener('change', handleMotionChange)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
    }
  }, [])

  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg__orb hero-bg__orb--one" />
      <div className="hero-bg__orb hero-bg__orb--two" />
      <div className="hero-bg__orb hero-bg__orb--three" />
      <div className="hero-bg__grid" />
      <canvas ref={canvasRef} className="hero-bg__canvas" />
      <div className="hero-bg__fade" />
    </div>
  )
}

