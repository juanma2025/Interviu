import { useState } from 'react'
import { Button } from '../../components/ui/Button.js'
import { Input } from '../../components/ui/Input.js'
import { Textarea } from '../../components/ui/Textarea.js'
import { Badge } from '../../components/ui/Badge.js'
import { SegmentedControl } from '../../components/ui/SegmentedControl.js'
import { Sheet } from '../../components/ui/Sheet.js'
import { Toast } from '../../components/ui/Toast.js'
import { Skeleton } from '../../components/ui/Skeleton.js'
import { Tooltip } from '../../components/ui/Tooltip.js'
import { QuestionCard } from '../../components/patterns/QuestionCard.js'
import { Timer } from '../../components/patterns/Timer.js'
import { StatCard } from '../../components/patterns/StatCard.js'
import { EmptyState } from '../../components/patterns/EmptyState.js'

export function DesignCatalog() {
  const [segmentedVal, setSegmentedVal] = useState<'dia' | 'semana' | 'mes'>('semana')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isToastOpen, setIsToastOpen] = useState(false)
  const [textareaText, setTextareaText] = useState('Esta es una respuesta de prueba con suficientes palabras.')

  return (
    <div className="space-y-12 pb-20">
      {/* Encabezado */}
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
          Catálogo de Diseño
        </span>
        <h1 className="text-fluid-title font-bold text-[var(--text)] mt-1">
          Tokens, Primitivos y Patrones
        </h1>
        <p className="text-[var(--text-muted)] mt-2 text-base max-w-2xl">
          Sistema de diseño para Interviu inspirado en Apple Human Interface Guidelines: minimalismo, áreas táctiles mínimas de 44 px, retícula de 8 pt y paleta semántica.
        </p>
      </div>

      {/* 1. PALETA DE COLORES SEMÁNTICA */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text)]">1. Paleta Semántica</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { name: 'Fondo (bg)', var: 'var(--bg)', hex: '#f6f4ee' },
            { name: 'Superficie (surface)', var: 'var(--surface)', hex: '#ffffff' },
            { name: 'Acento (accent)', var: 'var(--accent)', hex: '#3b6e64' },
            { name: 'Acento Fuerte', var: 'var(--accent-strong)', hex: '#274b44' },
            { name: 'Destacado (highlight)', var: 'var(--highlight)', hex: '#c97a2b' },
            { name: 'Peligro (danger)', var: 'var(--danger)', hex: '#b5482f' },
            { name: 'Texto Principal', var: 'var(--text)', hex: '#1c2b2d' },
            { name: 'Texto Atenuado', var: 'var(--text-muted)', hex: '#67716f' },
            { name: 'Línea / Borde', var: 'var(--line)', hex: '#dcd7c8' },
            { name: 'Superficie Suave', var: 'var(--surface-subtle)', hex: '#f0ece1' },
          ].map((c) => (
            <div
              key={c.name}
              className="p-4 rounded-[16px] border border-[var(--line)] bg-[var(--surface)] flex flex-col gap-2 shadow-xs"
            >
              <div
                className="w-full h-12 rounded-[10px] border border-black/10 shadow-inner"
                style={{ backgroundColor: c.var }}
              />
              <span className="text-xs font-semibold text-[var(--text)]">{c.name}</span>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">{c.hex}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. BOTONES */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text)]">2. Botones (Área táctil ≥ 44 px)</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primario</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="ghost">Fantasma</Button>
          <Button variant="danger">Peligro</Button>
          <Button variant="primary" isLoading>
            Cargando
          </Button>
          <Button variant="primary" disabled>
            Deshabilitado
          </Button>
          <Button variant="primary" size="lg">
            Tamaño Grande
          </Button>
        </div>
      </section>

      {/* 3. CAMPOS DE FORMULARIO */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text)]">3. Entradas de Texto y Contador de Palabras</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Correo electrónico"
            placeholder="ejemplo@intervu.app"
            helperText="Usaremos este correo para enviarte tu código de acceso."
          />
          <Input
            label="Contraseña"
            type="password"
            error="La contraseña debe tener al menos 8 caracteres."
            defaultValue="123"
          />
        </div>

        <div className="mt-4">
          <Textarea
            label="Respuesta estructurada a la pregunta"
            placeholder="Describe la situación, tarea, acción y resultado..."
            value={textareaText}
            onChange={(e) => setTextareaText(e.target.value)}
            minWords={3}
          />
        </div>
      </section>

      {/* 4. BADGES Y SEGMENTED CONTROL */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text)]">4. Badges y Control Segmentado</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Badge category="comportamiento">Comportamiento</Badge>
          <Badge category="tecnica">Técnica</Badge>
          <Badge category="sistemas">Diseño de Sistemas</Badge>
          <Badge category="cierre">Cierre</Badge>
          <Badge variant="accent">Acento</Badge>
          <Badge variant="highlight">Atención</Badge>
          <Badge variant="danger">Fallo</Badge>
        </div>

        <div className="pt-2">
          <SegmentedControl
            options={[
              { value: 'dia', label: 'Diario' },
              { value: 'semana', label: 'Semanal' },
              { value: 'mes', label: 'Mensual' },
            ]}
            value={segmentedVal}
            onChange={setSegmentedVal}
          />
        </div>
      </section>

      {/* 5. TOOLTIPS, SKELETONS Y TOAST */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text)]">5. Notificaciones, Tooltips y Skeleton</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Tooltip content="Métrica calculada sobre las últimas 6 semanas">
            <Button variant="secondary">Pasa el cursor / Enfoca con Tab</Button>
          </Tooltip>

          <Button variant="primary" onClick={() => setIsToastOpen(true)}>
            Mostrar Notificación Toast
          </Button>

          <Button variant="secondary" onClick={() => setIsSheetOpen(true)}>
            Abrir Hoja Inferior (Sheet)
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </section>

      {/* 6. PATRONES */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text)]">6. Patrones de Dominio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Sesiones Completadas" value={14} unit="sesiones" trend={{ value: '18%', isPositive: true }} />
          <StatCard label="Puntaje Promedio" value="8.4" unit="/ 10" trend={{ value: '0.6 pts', isPositive: true }} />
          <StatCard label="Racha Actual" value={5} unit="días" trend={{ value: 'Récord personal', isPositive: true }} />
        </div>

        <div className="flex items-center gap-4 py-2">
          <span className="text-sm font-semibold">Cronómetro de sesión:</span>
          <Timer formattedTime="02:45" isRunning={true} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <QuestionCard
            id="q_demo"
            text="Describe una ocasión en la que tuviste que optimizar una consulta de base de datos de alta latencia."
            category="tecnica"
            estimatedSeconds={180}
            tip="Explica el plan de ejecución (EXPLAIN ANALYZE), la indexación y la reducción de I/O."
          />
          <EmptyState
            title="Sin historial de prácticas"
            description="Aún no has completado tu primera sesión de simulación técnica."
            actionLabel="Comenzar Simulación"
            onAction={() => alert('Iniciar sesión')}
          />
        </div>
      </section>

      {/* Componentes modales */}
      <Sheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} title="Hoja de Detalles">
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          Esta es una hoja deslizable hacia arriba diseñada específicamente para móviles y tabletas, con soporte de arrastre para cerrar, fondo desenfocado y área de toques de alta precisión.
        </p>
      </Sheet>

      <Toast
        message="¡Cambios guardados con éxito!"
        type="success"
        isVisible={isToastOpen}
        onClose={() => setIsToastOpen(false)}
      />
    </div>
  )
}
