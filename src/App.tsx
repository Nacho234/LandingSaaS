import { AppProvider } from './app/providers'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { FloatingActions } from './components/layout/FloatingActions'
import { ScrollProgress } from './components/effects/ScrollProgress'
import { Toaster } from './components/ui/Toaster'
import { ModalRoot } from './components/modals/ModalRoot'

import { HeroSection } from './components/landing/HeroSection'
import { TrustBar } from './components/landing/TrustBar'
import { ProblemSection } from './components/landing/ProblemSection'
import { SolutionSection } from './components/landing/SolutionSection'
import { MultitenantSection } from './components/landing/MultitenantSection'
import { FeaturesSection } from './components/landing/FeaturesSection'
import { InteractiveDashboardSection } from './components/landing/InteractiveDashboardSection'
import { BusinessSimulationSection } from './components/landing/BusinessSimulationSection'
import { ModulesSection } from './components/landing/ModulesSection'
import { MetricsSection } from './components/landing/MetricsSection'
import { OnboardingSection } from './components/landing/OnboardingSection'
import { BeforeAfterSection } from './components/landing/BeforeAfterSection'
import { PricingSection } from './components/landing/PricingSection'
import { PlanCalculator } from './components/landing/PlanCalculator'
import { SecuritySection } from './components/landing/SecuritySection'
import { PWASection } from './components/landing/PWASection'
import { IntegrationsSection } from './components/landing/IntegrationsSection'
import { IndustriesSection } from './components/landing/IndustriesSection'
import { BenefitsSection } from './components/landing/BenefitsSection'
import { TestimonialsSection } from './components/landing/TestimonialsSection'
import { FAQSection } from './components/landing/FAQSection'
import { FormsSection } from './components/landing/FormsSection'
import { FinalCTASection } from './components/landing/FinalCTASection'

function App() {
  return (
    <AppProvider>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <ProblemSection />
        <SolutionSection />
        <MultitenantSection />
        <FeaturesSection />
        <InteractiveDashboardSection />
        <BusinessSimulationSection />
        <ModulesSection />
        <MetricsSection />
        <OnboardingSection />
        <BeforeAfterSection />
        <PricingSection />
        <PlanCalculator />
        <SecuritySection />
        <PWASection />
        <IntegrationsSection />
        <IndustriesSection />
        <BenefitsSection />
        <TestimonialsSection />
        <FAQSection />
        <FormsSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingActions />
      <Toaster />
      <ModalRoot />
    </AppProvider>
  )
}

export default App
