import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MotionPage } from '@/animations/MotionWrapper'
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner'
import { PageHeader } from '@/components/shared/PageHeader'
import { OnboardingModal } from '@/components/dashboard/OnboardingModal'
import { useTranslation } from 'react-i18next'
import { useDashboardData } from '@/hooks/useDashboardData'

import { ProgressStats } from '@/components/specific/dashboard/ProgressStats'
import { ActiveSessions } from '@/components/specific/dashboard/ActiveSessions'

/**
 * StudentDashboard Component
 * Main landing view for students.
 * 
 * Complies with codemanagement.md:
 * - Decoupled logic using useDashboardData hook
 * - Modular components (ProgressStats, ActiveSessions)
 * - File count < 200 lines
 */
export default function StudentDashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { activeAttempts, stats, loading, error } = useDashboardData()
  
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const onboarded = localStorage.getItem('ab_initio_onboarded')
    if (!onboarded) {
      setShowOnboarding(true)
    }
  }, [])

  const handleOnboardingComplete = (prefs: { commission: string; cadre: string; autoHonor: boolean }) => {
    // Save onboarding preferences
    localStorage.setItem('ab_initio_onboard_commission', prefs.commission)
    localStorage.setItem('ab_initio_onboard_cadre', prefs.cadre)
    localStorage.setItem('ab_initio_onboard_autohonor', String(prefs.autoHonor))
    localStorage.setItem('ab_initio_onboarded', 'true')
    
    setShowOnboarding(false)
    
    // Redirect to default recommended exam
    navigate('/test-preparations/exam/fpsc-system-analyst')
  }

  // Error boundary state
  if (error) {
    return (
      <div className="p-8 text-center bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 rounded-2xl text-rose-600 dark:text-rose-400 font-bold">
        {error}
      </div>
    )
  }

  return (
    <MotionPage className="flex flex-col gap-8">
      <PageHeader 
        title={t('dashboard.student.title')} 
        subtitle={t('dashboard.student.subtitle')} 
      />

      <ProgressStats stats={stats} />

      <WelcomeBanner />

      <ActiveSessions attempts={activeAttempts} loading={loading} />

      {showOnboarding && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}
    </MotionPage>
  )
}
