import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, Sparkles, Shield, Zap, CreditCard, X, CheckCircle2, Lock } from 'lucide-react'

export interface PricingPlan {
  id: string
  name: string
  badge?: string
  description: string
  priceMonthly: number
  priceAnnualMonthly: number
  features: string[]
  isPopular?: boolean
  ctaText: string
}

export function PricingPlans({ onPlanPurchased }: { onPlanPurchased?: (planId: string) => void }) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Explorador',
      description: 'Fundamentos de preparación técnica para comenzar a estructurar respuestas.',
      priceMonthly: 0,
      priceAnnualMonthly: 0,
      features: [
        '3 simulaciones al mes',
        'Banco de preguntas fundamentales',
        'Calificación global STAR',
        'Modo texto & transcripción básica',
        'Acceso al catálogo comunitario',
      ],
      ctaText: 'Plan actual',
    },
    {
      id: 'pro',
      name: 'Candidato Pro',
      badge: 'MÁS POPULAR',
      isPopular: true,
      description: 'Preparación intensiva y adaptativa para destacar en entrevistas mid y senior.',
      priceMonthly: 19,
      priceAnnualMonthly: 15,
      features: [
        'Simulaciones ilimitadas con voz IA',
        'Desglose STAR frase a frase al milímetro',
        'Análisis de fluidez y cadencia verbal (ppm)',
        'Entrevistadores especializados (Valeria S. y Carlos M.)',
        'Buzón de ayuda de IA con prioridad 24/7',
        'Historial de evolución y curvas de aprendizaje',
        'Garantía de satisfacción de 14 días',
      ],
      ctaText: 'Comprar Plan Pro',
    },
    {
      id: 'elite',
      name: 'Big Tech Élite',
      badge: 'PARA FAANG & STARTUPS',
      description: 'El programa definitivo para ofertas de alto impacto y puestos de liderazgo técnico.',
      priceMonthly: 49,
      priceAnnualMonthly: 39,
      features: [
        'Todo lo incluido en Candidato Pro',
        'Mock interviews de Diseño de Sistemas a gran escala',
        'Simulador de negociación de ofertas y compensación',
        'Entrevistas comportamentales nivel Staff / Principal',
        'Revisión asistida de CV técnico y portafolio',
        'Soporte prioritario personalizado 1 a 1',
      ],
      ctaText: 'Comprar Plan Élite',
    },
  ]

  const handleOpenCheckout = (plan: PricingPlan) => {
    if (plan.id === 'free') return
    setSelectedPlanForCheckout(plan)
    setPaymentSuccess(false)
  }

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true)
    setTimeout(() => {
      setIsProcessingPayment(false)
      setPaymentSuccess(true)
      if (selectedPlanForCheckout) {
        onPlanPurchased?.(selectedPlanForCheckout.id)
      }
    }, 1500)
  }

  return (
    <div className="space-y-10">
      {/* Header & Billing Cycle Switcher */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INVERSIÓN EN TU CARRERA PROFESIONAL</span>
        </span>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight">
          Elige el plan ideal para asegurar tu próxima oferta
        </h2>

        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          Cancela o cambia de plan en cualquier momento. Sin compromisos forzosos ni letras pequeñas.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="pt-2 flex items-center justify-center">
          <div className="p-1 rounded-full bg-[var(--surface-subtle)] border border-[var(--line)] inline-flex items-center gap-1 shadow-xs">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-[#1E312B] text-[var(--text)] shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Facturación Mensual
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-white dark:bg-[#1E312B] text-[var(--text)] shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <span>Facturación Anual</span>
              <span className="text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-7xl mx-auto">
        {plans.map((plan) => {
          const price = billingCycle === 'annual' ? plan.priceAnnualMonthly : plan.priceMonthly
          const isPro = plan.isPopular

          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-all relative overflow-hidden ${
                isPro
                  ? 'bg-[var(--surface)] border-2 border-[var(--accent)] shadow-xl ring-4 ring-emerald-500/10'
                  : 'bg-[var(--surface)] border border-[var(--line)] shadow-xs'
              }`}
            >
              {/* Top Badge for Popular Plan */}
              {plan.badge && (
                <div className="absolute top-4 right-4">
                  <span
                    className={`text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full uppercase ${
                      isPro
                        ? 'bg-[var(--accent)] text-white shadow-xs'
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="space-y-6">
                {/* Plan Header */}
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-[var(--text)]">{plan.name}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 pb-4 border-b border-[var(--line-subtle)]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold font-mono text-[var(--text)]">
                      {price}€
                    </span>
                    <span className="text-xs font-semibold text-[var(--text-muted)]">
                      / mes
                    </span>
                  </div>
                  {billingCycle === 'annual' && plan.priceMonthly > 0 && (
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-1 block">
                      Facturado anualmente ({price * 12}€ / año)
                    </span>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--text)] leading-snug">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purchase Action Button */}
              <div className="pt-8 mt-6 border-t border-[var(--line-subtle)]">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenCheckout(plan)}
                  className={`tap-target w-full py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer ${
                    isPro
                      ? 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-md'
                      : plan.id === 'free'
                      ? 'bg-[var(--surface-subtle)] text-[var(--text-muted)] cursor-default'
                      : 'bg-[var(--surface-subtle)] hover:bg-[var(--accent)] hover:text-white text-[var(--text)]'
                  }`}
                >
                  {isPro && <Zap className="w-3.5 h-3.5 fill-current" />}
                  <span>{plan.ctaText}</span>
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Security & Guarantee Notes */}
      <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-[var(--text-muted)] pt-4">
        <span className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Garantía de reembolso de 14 días</span>
        </span>
        <span className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>Pago seguro cifrado con TLS de 256 bits</span>
        </span>
      </div>

      {/* Checkout Modal Simulation */}
      <AnimatePresence>
        {selectedPlanForCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="w-full max-w-md bg-[var(--surface)] border border-[var(--line)] rounded-[28px] shadow-2xl overflow-hidden p-6 sm:p-7 space-y-6"
            >
              {/* Checkout Header */}
              <div className="flex items-center justify-between border-b border-[var(--line-subtle)] pb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[var(--accent)]" />
                  <h3 className="text-base font-bold text-[var(--text)]">Finalizar Suscripción</h3>
                </div>
                <button
                  onClick={() => setSelectedPlanForCheckout(null)}
                  className="tap-target p-1.5 rounded-full hover:bg-[var(--surface-subtle)] text-[var(--text-muted)] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!paymentSuccess ? (
                <>
                  {/* Selected Plan Summary */}
                  <div className="p-4 rounded-[18px] bg-[var(--surface-subtle)]/60 border border-[var(--line-subtle)] flex items-center justify-between">
                    <div>
                      <strong className="text-sm font-bold text-[var(--text)] block">
                        {selectedPlanForCheckout.name}
                      </strong>
                      <span className="text-xs text-[var(--text-muted)]">
                        Facturación {billingCycle === 'annual' ? 'Anual' : 'Mensual'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold font-mono text-[var(--accent)]">
                        {billingCycle === 'annual'
                          ? selectedPlanForCheckout.priceAnnualMonthly * 12
                          : selectedPlanForCheckout.priceMonthly}€
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] block">Total a pagar</span>
                    </div>
                  </div>

                  {/* Payment Methods Simulation */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-[var(--text)] block uppercase tracking-wider">
                      Método de Pago
                    </label>

                    <div className="p-3.5 rounded-[14px] border-2 border-[var(--accent)] bg-[var(--accent-soft)] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-[var(--accent)]" />
                        <span className="text-xs font-semibold text-[var(--text)]">
                          Tarjeta bancaria terminada en •••• 4242
                        </span>
                      </div>
                      <Check className="w-4 h-4 text-[var(--accent)]" />
                    </div>

                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                      Esta es una simulación de pago seguro. Tu suscripción se activará inmediatamente en tu cuenta sin cargos reales.
                    </p>
                  </div>

                  {/* Pay Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isProcessingPayment}
                    onClick={handleSimulatePayment}
                    className="tap-target w-full py-3.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isProcessingPayment ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>Procesando pago con Stripe / Apple Pay...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Confirmar y Comprar Plan</span>
                      </>
                    )}
                  </motion.button>
                </>
              ) : (
                /* Payment Success View */
                <div className="py-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-[var(--text)]">¡Plan Activado con Éxito!</h4>
                    <p className="text-xs text-[var(--text-muted)] max-w-xs">
                      Ya tienes acceso completo e ilimitado a todas las herramientas del <strong>{selectedPlanForCheckout.name}</strong>.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanForCheckout(null)}
                    className="w-full tap-target py-2.5 rounded-full bg-[var(--accent)] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Ir al Dashboard y Disfrutar
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
