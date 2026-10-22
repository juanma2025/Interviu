import { useSyncExternalStore, useEffect, useCallback } from 'react'
import type { TabsModel, TabItem } from '../domain/tabs-model.js'

export function useTabs(model: TabsModel, syncUrlParam?: string) {
  const snapshot = useSyncExternalStore(
    useCallback((onStoreChange) => model.subscribe(onStoreChange), [model]),
    useCallback(() => model.getSnapshot(), [model])
  )

  // Sincronización inicial desde la URL (?tab=...)
  useEffect(() => {
    if (!syncUrlParam || typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const paramVal = params.get(syncUrlParam)
    if (paramVal && paramVal !== snapshot.activeId) {
      model.select(paramVal)
    }
  }, [model, syncUrlParam, snapshot.activeId])

  // Actualizar la URL cuando cambia la pestaña activa
  const select = useCallback(
    (id: string) => {
      model.select(id)
      if (syncUrlParam && typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        url.searchParams.set(syncUrlParam, id)
        window.history.replaceState({}, '', url.toString())
      }
    },
    [model, syncUrlParam]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        model.next()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        model.prev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        model.first()
      } else if (e.key === 'End') {
        e.preventDefault()
        model.last()
      }
    },
    [model]
  )

  return {
    tabs: model.tabs as readonly TabItem[],
    activeId: snapshot.activeId,
    activeIndex: snapshot.activeIndex,
    direction: snapshot.direction,
    select,
    next: () => model.next(),
    prev: () => model.prev(),
    first: () => model.first(),
    last: () => model.last(),
    handleKeyDown,
  }
}
