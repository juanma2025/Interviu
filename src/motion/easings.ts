/**
 * Curvas de animación y duraciones basadas en Apple Human Interface Guidelines
 */

export const easings = {
  standard: [0.25, 0.1, 0.25, 1] as const,
  ios: [0.32, 0.72, 0, 1] as const,
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
}

export const durations = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.6,
}

export const springConfig = {
  tabIndicator: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
  dialog: {
    type: 'spring' as const,
    stiffness: 350,
    damping: 28,
  },
}
