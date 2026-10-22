import React, { useState } from 'react'
import { Tabs } from '../../features/tabs/components/Tabs.js'
import { Reveal } from '../../motion/Reveal.js'
import { PinnedStory } from '../../motion/PinnedStory.js'
import { Button } from '../../components/ui/Button.js'

export function MotionCatalog() {
  const [activeTabVariant, setActiveTabVariant] = useState<'horizontal' | 'vertical' | 'tabbar'>('horizontal')

  const sampleTabs = [
    { id: 'practicar', label: 'Practicar', badge: '6' },
    { id: 'resultados', label: 'Resultados' },
    { id: 'progreso', label: 'Progreso', badge: 'Nuevo' },
    { id: 'perfil', label: 'Perfil' },
  ]

  const samplePanels = [
    {
      id: 'practicar',
      content: (
        <div className="p-6 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
          <h3 className="text-lg font-bold text-[var(--text)] mb-2">Simulación de Entrevista</h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Cola activa con 6 preguntas personalizadas para tu rol objetivo. Desliza horizontalmente para navegar entre pestañas.
          </p>
        </div>
      ),
    },
    {
      id: 'resultados',
      content: (
        <div className="p-6 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
          <h3 className="text-lg font-bold text-[var(--text)] mb-2">Retroalimentación con Claude</h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Evaluación detallada bajo la rúbrica STAR con desglose de criterios y sugerencias accionables.
          </p>
        </div>
      ),
    },
    {
      id: 'progreso',
      content: (
        <div className="p-6 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
          <h3 className="text-lg font-bold text-[var(--text)] mb-2">Métricas de Rendimiento</h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Seguimiento de racha, serie de las últimas 6 semanas y dominio por categorías.
          </p>
        </div>
      ),
    },
    {
      id: 'perfil',
      content: (
        <div className="p-6 rounded-[20px] bg-[var(--surface)] border border-[var(--line)] shadow-xs">
          <h3 className="text-lg font-bold text-[var(--text)] mb-2">Ajustes y Seguridad 2FA</h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Configuración de rol objetivo, preferencias de recordatorios y autenticación en dos factores con aplicación autenticadora.
          </p>
        </div>
      ),
    },
  ]

  const storySteps = [
    {
      id: 'step1',
      badge: 'Paso 1',
      title: 'Practica preguntas reales',
      description: 'Preguntas seleccionadas y balanceadas para tu rol y nivel de seniority con límite de tiempo realista.',
    },
    {
      id: 'step2',
      badge: 'Paso 2',
      title: 'Retroalimentación STAR inmediata',
      description: 'El modelo Claude analiza tu estructura y detecta la presencia de Situación, Tarea, Acción y Resultado.',
    },
    {
      id: 'step3',
      badge: 'Paso 3',
      title: 'Mide y proyecta tu dominio',
      description: 'Visualiza tu serie semanal, mantén tu racha diaria y fortalece tus áreas más débiles antes de la entrevista real.',
    },
  ]

  return (
    <div className="space-y-16 pb-28">
      {/* Encabezado */}
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
          Catálogo de Movimiento
        </span>
        <h1 className="text-fluid-title font-bold text-[var(--text)] mt-1">
          Pestañas Dinámicas y Scrollytelling
        </h1>
        <p className="text-[var(--text-muted)] mt-2 text-base max-w-2xl">
          Transiciones físicas fluidas (curva iOS cubic-bezier(0.32, 0.72, 0, 1), resortes con stiffness 300 y damping 30), soporte para gestos táctiles y respeto automático a prefers-reduced-motion.
        </p>
      </div>

      {/* 1. DEMO DE PESTAÑAS (TabsModel + Tabs) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-[var(--text)]">1. Sistema de Pestañas con Transición Direccional</h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={activeTabVariant === 'horizontal' ? 'primary' : 'secondary'}
              onClick={() => setActiveTabVariant('horizontal')}
            >
              Horizontal
            </Button>
            <Button
              size="sm"
              variant={activeTabVariant === 'vertical' ? 'primary' : 'secondary'}
              onClick={() => setActiveTabVariant('vertical')}
            >
              Lateral Vertical
            </Button>
            <Button
              size="sm"
              variant={activeTabVariant === 'tabbar' ? 'primary' : 'secondary'}
              onClick={() => setActiveTabVariant('tabbar')}
            >
              TabBar Móvil
            </Button>
          </div>
        </div>

        <div className="p-6 rounded-[24px] bg-[var(--surface-subtle)]/50 border border-[var(--line)]">
          <Tabs
            tabs={sampleTabs}
            panels={samplePanels}
            variant={activeTabVariant}
            syncUrlParam="tab"
            layoutId="motion-catalog-tabs"
          />
        </div>
      </section>

      {/* 2. REVEAL AL HACER SCROLL */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[var(--text)]">2. Aparición Escalonada (Reveal)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal delay={0.1}>
            <div className="p-6 rounded-[20px] bg-[var(--surface)] border border-[var(--line)]">
              <span className="text-2xl mb-2 block">🎯</span>
              <h3 className="font-semibold text-base mb-1">Enfoque Deliberado</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Aparece suavemente con traslación sutil de 16 px y fundido al entrar al campo de visión.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="p-6 rounded-[20px] bg-[var(--surface)] border border-[var(--line)]">
              <span className="text-2xl mb-2 block">⚡</span>
              <h3 className="font-semibold text-base mb-1">Rendimiento 60 fps</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Anima exclusivamente las propiedades compuestas por GPU (transform y opacity).
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="p-6 rounded-[20px] bg-[var(--surface)] border border-[var(--line)]">
              <span className="text-2xl mb-2 block">♿</span>
              <h3 className="font-semibold text-base mb-1">Accesibilidad Plena</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Desactivación instantánea al detectar la preferencia de reducción de movimiento.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. PINNED STORY (SCROLLYTELLING) */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[var(--text)]">3. Narrativa Pegada (PinnedStory)</h2>
        <PinnedStory
          steps={storySteps}
          renderVisual={(activeIdx) => (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-3xl flex items-center justify-center font-bold font-mono">
                {activeIdx + 1}
              </div>
              <h4 className="text-lg font-bold text-[var(--text)]">
                {storySteps[activeIdx]?.title || 'Paso completado'}
              </h4>
              <p className="text-xs text-[var(--text-muted)]">
                El panel derecho permanece pegado y sincronizado con tu desplazamiento vertical.
              </p>
            </div>
          )}
        />
      </section>
    </div>
  )
}
