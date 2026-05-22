import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { SYLLABUS_DATA } from '@/data/syllabusData'
import { SyllabusSpecsSidebar } from './components/SyllabusSpecsSidebar'
import { SyllabusPartsList } from './components/SyllabusPartsList'
import { SimulatorRulesBanner } from './components/SimulatorRulesBanner'
import { useTranslation } from 'react-i18next'

const MotionDiv = motion.div

export default function MockTestDetailsPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<string>('FPSC')
  const currentSyllabus = SYLLABUS_DATA[activeTab]

  return (
    <div className="py-12 md:py-20 flex flex-col gap-12 relative overflow-hidden">
      
      {/* Hero Header */}
      <MotionDiv 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto flex flex-col gap-4 px-6"
      >
        <MotionDiv variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tight leading-none" style={{ color: 'var(--text-primary)' }}>
          {t('public.mockDetails.title1')} <span className="gradient-text">{t('public.mockDetails.highlight')}</span>
        </MotionDiv>
        <MotionDiv variants={fadeInUp} className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>
          {t('public.mockDetails.subtitle')}
        </MotionDiv>
      </MotionDiv>

      {/* Tabs Navigation */}
      <div className="max-w-4xl mx-auto px-6 w-full flex justify-center">
        <div className="flex flex-wrap items-center justify-center p-1.5 rounded-2xl border bg-[var(--bg-surface)] backdrop-blur-md gap-1 md:gap-2 w-full sm:w-auto" style={{ borderColor: 'var(--border-color)' }}>
          {Object.keys(SYLLABUS_DATA).map((tabKey) => {
            const isActive = activeTab === tabKey
            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className="relative px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-300 select-none flex-1 sm:flex-none text-center"
                style={{ 
                  color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSyllabusTab"
                    className="absolute inset-0 rounded-xl bg-[var(--bg-elevated)] border shadow-sm"
                    style={{ borderColor: 'var(--border-color)' }}
                  />
                )}
                <span className="relative z-10">{tabKey}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Commission Information Panel */}
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="card p-5 border rounded-2xl bg-[var(--bg-surface)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
              {t(`public.syllabus.${activeTab}.subName`, { defaultValue: currentSyllabus.subName })}
            </span>
            <h2 className="text-xl md:text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
              {t(`public.syllabus.${activeTab}.fullName`, { defaultValue: currentSyllabus.fullName })}
            </h2>
          </div>
          <div className="px-4 py-2 rounded-xl bg-[var(--bg-elevated)] border text-[10px] font-bold uppercase tracking-wide" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            {t('public.mockDetails.simulatorRegistered')}
          </div>
        </div>
      </div>

      {/* Main Focus Component Grid */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="max-w-6xl mx-auto px-6 w-full flex flex-col lg:flex-row gap-12 items-start"
        >
          {/* Specifications Sidebar subcomponent */}
          <SyllabusSpecsSidebar activeTab={activeTab} currentSyllabus={currentSyllabus} />

          {/* Parts List subcomponent */}
          <SyllabusPartsList currentSyllabus={currentSyllabus} />
        </motion.section>
      </AnimatePresence>

      {/* Simulator Rules Showcase Banner subcomponent */}
      <SimulatorRulesBanner />

    </div>
  )
}
