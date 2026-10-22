import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { TabsModel } from '../domain/tabs-model.js'
import { useTabs } from '../hooks/useTabs.js'
import { tabVariants, tabReducedVariants } from '../../../motion/variants.js'
import { springConfig } from '../../../motion/easings.js'

export interface TabContentPanel {
  id: string
  content: React.ReactNode
}

export interface TabsProps {
  model?: TabsModel
  tabs?: { id: string; label: string; badge?: string | number; disabled?: boolean; icon?: React.ReactNode }[]
  initialId?: string
  syncUrlParam?: string
  variant?: 'horizontal' | 'vertical' | 'tabbar'
  panels: TabContentPanel[]
  keepMounted?: boolean
  className?: string
  layoutId?: string
}

export function Tabs({
  model: externalModel,
  tabs: tabItems,
  initialId,
  syncUrlParam,
  variant = 'horizontal',
  panels,
  keepMounted = false,
  className = '',
  layoutId = 'tab-active-indicator',
}: TabsProps) {
  // Inicializar modelo interno si no se pasa uno externamente
  const [model] = useState(() => {
    if (externalModel) return externalModel
    if (!tabItems || tabItems.length === 0) {
      throw new Error('Tabs requiere la propiedad model o tabs')
    }
    return new TabsModel(tabItems, initialId)
  })

  const {
    tabs,
    activeId,
    direction,
    select,
    next,
    prev,
    handleKeyDown,
  } = useTabs(model, syncUrlParam)

  const shouldReduceMotion = useReducedMotion()

  // Manejo de gesto de deslizamiento horizontal táctil (Swipe)
  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const threshold = 60
    const velocityThreshold = 400

    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      next()
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      prev()
    }
  }

  // Clases por variante
  const isTabBar = variant === 'tabbar'
  const isVertical = variant === 'vertical'

  const tabListClass = isTabBar
    ? 'fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom)] px-4 py-2 glass-panel border-t border-[var(--line)] flex justify-around items-center'
    : isVertical
    ? 'flex flex-col space-y-1 border-r border-[var(--line)] pr-4 min-w-[200px]'
    : 'flex space-x-1 p-1 bg-[var(--surface-subtle)] rounded-[14px] border border-[var(--line)] w-fit'

  return (
    <div className={`flex ${isVertical ? 'flex-row gap-6' : 'flex-col gap-4'} ${className}`}>
      {/* Barra de pestañas con accesibilidad */}
      <div
        role="tablist"
        aria-orientation={isVertical ? 'vertical' : 'horizontal'}
        className={tabListClass}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => select(tab.id)}
              className={`relative tap-target px-4 py-2 rounded-[12px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                tab.disabled
                  ? 'opacity-40 cursor-not-allowed'
                  : isActive
                  ? isTabBar
                    ? 'text-[var(--accent)] font-semibold'
                    : 'text-[var(--text)] font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {/* Indicador deslizante animado con layoutId */}
              {isActive && (
                <motion.div
                  layoutId={layoutId}
                  transition={shouldReduceMotion ? { duration: 0.1 } : springConfig.tabIndicator}
                  className={
                    isTabBar
                      ? 'absolute inset-0 bg-[var(--accent-soft)] rounded-[16px] -z-10'
                      : 'absolute inset-0 bg-[var(--surface)] rounded-[10px] shadow-xs -z-10'
                  }
                />
              )}

              <span className="relative z-10 flex items-center justify-center gap-2">
                {tab.label}
                {tab.badge !== undefined && (
                  <span className="px-1.5 py-0.5 text-xs rounded-full bg-[var(--line)] text-[var(--text)] font-mono">
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>

      {/* Contenido con transición direccional y gesto táctil */}
      <div className="relative overflow-hidden w-full flex-1 min-h-[160px]">
        {keepMounted ? (
          <div>
            {panels.map((panel) => {
              const isSelected = panel.id === activeId
              return (
                <div
                  key={panel.id}
                  id={`tabpanel-${panel.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${panel.id}`}
                  style={{ display: isSelected ? 'block' : 'none' }}
                >
                  {panel.content}
                </div>
              )
            })}
          </div>
        ) : (
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {panels
              .filter((p) => p.id === activeId)
              .map((panel) => (
                <motion.div
                  key={panel.id}
                  id={`tabpanel-${panel.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${panel.id}`}
                  custom={direction}
                  variants={shouldReduceMotion ? tabReducedVariants : tabVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="w-full focus:outline-none"
                >
                  {panel.content}
                </motion.div>
              ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
