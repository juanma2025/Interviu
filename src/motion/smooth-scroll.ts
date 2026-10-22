import Lenis from 'lenis'

export function initSmoothScroll(): { destroy: () => void } {
  // Respetar prefers-reduced-motion
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { destroy: () => {} }
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  let rafId: number

  function raf(time: number) {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }

  rafId = requestAnimationFrame(raf)

  return {
    destroy: () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    },
  }
}
