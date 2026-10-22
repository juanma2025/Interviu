import { describe, it, expect, vi } from 'vitest'
import { TabsModel } from '../src/features/tabs/domain/tabs-model.js'

describe('TabsModel (Observer Pattern)', () => {
  const tabs = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
    { id: 'tab4', label: 'Tab 4', disabled: true },
    { id: 'tab5', label: 'Tab 5' },
  ]

  it('inicia con la primera pestaña por defecto o con la indicada', () => {
    const modelDefault = new TabsModel(tabs)
    expect(modelDefault.activeId).toBe('tab1')
    expect(modelDefault.activeIndex).toBe(0)
    expect(modelDefault.direction).toBe(0)

    const modelCustom = new TabsModel(tabs, 'tab3')
    expect(modelCustom.activeId).toBe('tab3')
    expect(modelCustom.activeIndex).toBe(2)
  })

  it('calcula la dirección de desplazamiento (+1 hacia adelante, -1 hacia atrás)', () => {
    const model = new TabsModel(tabs, 'tab2')

    model.select('tab3')
    expect(model.activeId).toBe('tab3')
    expect(model.direction).toBe(1)

    model.select('tab1')
    expect(model.activeId).toBe('tab1')
    expect(model.direction).toBe(-1)
  })

  it('no cambia dirección ni estado al seleccionar la misma pestaña activa', () => {
    const model = new TabsModel(tabs, 'tab2')
    const listener = vi.fn()
    model.subscribe(listener)

    model.select('tab2')
    expect(model.activeId).toBe('tab2')
    expect(listener).not.toHaveBeenCalled()
  })

  it('navega con next() y prev() respetando pestañas deshabilitadas y límites', () => {
    const model = new TabsModel(tabs, 'tab3')

    // Siguiente desde tab3 debe saltar tab4 (deshabilitada) y llegar a tab5
    model.next()
    expect(model.activeId).toBe('tab5')
    expect(model.direction).toBe(1)

    // Siguiente desde tab5 no debe desbordar
    model.next()
    expect(model.activeId).toBe('tab5')

    // Anterior desde tab5 salta tab4 y llega a tab3
    model.prev()
    expect(model.activeId).toBe('tab3')
    expect(model.direction).toBe(-1)

    model.prev()
    expect(model.activeId).toBe('tab2')

    model.prev()
    expect(model.activeId).toBe('tab1')

    // Anterior desde tab1 no desborda
    model.prev()
    expect(model.activeId).toBe('tab1')
  })

  it('first() y last() saltan a los extremos válidos', () => {
    const model = new TabsModel(tabs, 'tab2')

    model.last()
    expect(model.activeId).toBe('tab5')
    expect(model.direction).toBe(1)

    model.first()
    expect(model.activeId).toBe('tab1')
    expect(model.direction).toBe(-1)
  })

  it('notifica a los observadores mediante subscribe y permite cancelar la suscripción', () => {
    const model = new TabsModel(tabs, 'tab1')
    const listener = vi.fn()

    const unsubscribe = model.subscribe(listener)
    model.select('tab2')

    expect(listener).toHaveBeenCalledTimes(1)
    expect(model.getSnapshot().activeId).toBe('tab2')

    // Cancelar suscripción
    unsubscribe()
    model.select('tab3')
    expect(listener).toHaveBeenCalledTimes(1) // No vuelve a ser llamado
    expect(model.activeId).toBe('tab3')
  })
})
