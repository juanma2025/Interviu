export interface TabItem {
  id: string
  label: string
  badge?: string | number
  disabled?: boolean
}

export type TabDirection = -1 | 0 | 1

export type TabListener = () => void

export interface TabsSnapshot {
  readonly activeId: string
  readonly activeIndex: number
  readonly direction: TabDirection
}

/**
 * TabsModel: Modelo de estado de pestañas basado en el patrón Observer.
 * Desacoplado al 100% de React, con gestión precisa de dirección de movimiento (-1, 0, 1),
 * navegación por teclado cíclica/restringida y soporte para useSyncExternalStore.
 */
export class TabsModel {
  readonly #tabs: readonly TabItem[]
  #activeId: string
  #activeIndex: number
  #direction: TabDirection = 0
  readonly #listeners: Set<TabListener> = new Set()
  #snapshot: TabsSnapshot

  constructor(tabs: TabItem[], initialId?: string) {
    if (!tabs || tabs.length === 0) {
      throw new Error('TabsModel requiere al menos una pestaña')
    }
    this.#tabs = Object.freeze([...tabs])

    const foundIndex = initialId ? this.#tabs.findIndex((t) => t.id === initialId) : 0
    this.#activeIndex = foundIndex >= 0 ? foundIndex : 0
    this.#activeId = this.#tabs[this.#activeIndex].id
    this.#snapshot = Object.freeze({
      activeId: this.#activeId,
      activeIndex: this.#activeIndex,
      direction: this.#direction,
    })
  }

  get tabs(): readonly TabItem[] {
    return this.#tabs
  }

  get activeId(): string {
    return this.#activeId
  }

  get activeIndex(): number {
    return this.#activeIndex
  }

  get direction(): TabDirection {
    return this.#direction
  }

  public select(id: string): void {
    if (id === this.#activeId) return

    const newIndex = this.#tabs.findIndex((t) => t.id === id)
    if (newIndex === -1) return
    if (this.#tabs[newIndex].disabled) return

    this.#direction = newIndex > this.#activeIndex ? 1 : -1
    this.#activeIndex = newIndex
    this.#activeId = id
    this.#updateSnapshotAndNotify()
  }

  public next(): void {
    for (let i = this.#activeIndex + 1; i < this.#tabs.length; i++) {
      if (!this.#tabs[i].disabled) {
        this.#direction = 1
        this.#activeIndex = i
        this.#activeId = this.#tabs[i].id
        this.#updateSnapshotAndNotify()
        return
      }
    }
  }

  public prev(): void {
    for (let i = this.#activeIndex - 1; i >= 0; i--) {
      if (!this.#tabs[i].disabled) {
        this.#direction = -1
        this.#activeIndex = i
        this.#activeId = this.#tabs[i].id
        this.#updateSnapshotAndNotify()
        return
      }
    }
  }

  public first(): void {
    for (let i = 0; i < this.#tabs.length; i++) {
      if (!this.#tabs[i].disabled) {
        if (i !== this.#activeIndex) {
          this.#direction = i > this.#activeIndex ? 1 : -1
          this.#activeIndex = i
          this.#activeId = this.#tabs[i].id
          this.#updateSnapshotAndNotify()
        }
        return
      }
    }
  }

  public last(): void {
    for (let i = this.#tabs.length - 1; i >= 0; i--) {
      if (!this.#tabs[i].disabled) {
        if (i !== this.#activeIndex) {
          this.#direction = i > this.#activeIndex ? 1 : -1
          this.#activeIndex = i
          this.#activeId = this.#tabs[i].id
          this.#updateSnapshotAndNotify()
        }
        return
      }
    }
  }

  public subscribe(listener: TabListener): () => void {
    this.#listeners.add(listener)
    return () => {
      this.#listeners.delete(listener)
    }
  }

  public getSnapshot(): TabsSnapshot {
    return this.#snapshot
  }

  #updateSnapshotAndNotify(): void {
    this.#snapshot = Object.freeze({
      activeId: this.#activeId,
      activeIndex: this.#activeIndex,
      direction: this.#direction,
    })
    for (const listener of this.#listeners) {
      listener()
    }
  }
}
