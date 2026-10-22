import { useSyncExternalStore, useCallback } from 'react'
import type { SessionTimer } from '../domain/session-timer.js'

export function useSessionTimer(timer: SessionTimer) {
  const snapshot = useSyncExternalStore(
    useCallback((onStoreChange) => timer.subscribe(onStoreChange), [timer]),
    useCallback(() => timer.getSnapshot(), [timer])
  )

  return {
    seconds: snapshot.seconds,
    isRunning: snapshot.isRunning,
    formatted: snapshot.formatted,
    start: () => timer.start(),
    pause: () => timer.pause(),
    reset: (toSeconds = 0) => timer.reset(toSeconds),
  }
}
