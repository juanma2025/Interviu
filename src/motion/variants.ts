import { easings, durations } from './easings.js'

export const tabVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 24 : direction < 0 ? -24 : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.ios,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -24 : direction < 0 ? 24 : 0,
    opacity: 0,
    transition: {
      duration: durations.fast,
      ease: easings.ios,
    },
  }),
}

export const tabReducedVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.08 } },
}

export const revealVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.out,
    },
  },
}

export const pageTransitionVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.out,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: durations.fast,
      ease: easings.ios,
    },
  },
}
