import { useLocation, useNavigate } from 'react-router'
import { PricingPlans } from '../../features/pricing/components/PricingPlans.js'
import { PublicNavbar } from '../../components/layout/PublicNavbar.js'
import { PublicFooter } from '../../components/layout/PublicFooter.js'

export function PricingPlansPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const isInsideApp = location.pathname.startsWith('/app')

  if (isInsideApp) {
    return (
      <div className="space-y-6 pb-12">
        <PricingPlans onPlanPurchased={() => navigate('/app/dashboard')} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] dark:bg-black text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200 flex flex-col justify-between">
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-12 flex-1 w-full">
        <PricingPlans onPlanPurchased={() => navigate('/registro')} />
      </main>

      <PublicFooter />
    </div>
  )
}
