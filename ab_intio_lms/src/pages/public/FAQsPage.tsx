import React, { useState } from 'react'
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  AlertCircle,
  RefreshCw,
  Cpu,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { useTranslation } from 'react-i18next'

const MotionDiv = motion.div

const FAQS_DATA = [
  { id: 1, icon: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />, key: 'f1', category: 'marking' },
  { id: 2, icon: <RefreshCw className="w-5 h-5 text-yellow-400 shrink-0" />, key: 'f2', category: 'simulator' },
  { id: 3, icon: <Cpu className="w-5 h-5 text-blue-400 shrink-0" />, key: 'f3', category: 'syllabus' },
  { id: 4, icon: <BookOpen className="w-5 h-5 text-green-400 shrink-0" />, key: 'f4', category: 'general' },
  { id: 5, icon: <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />, key: 'f5', category: 'results' },
] as const

export default function FAQsPage() {
  const { t } = useTranslation()
  const [openId, setOpenId] = useState<number | null>(null)
  const [selectedCat] = useState<string>('all')

  const filteredFaqs = FAQS_DATA.filter((faq) => selectedCat === 'all' || faq.category === selectedCat)

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="py-12 md:py-20 flex flex-col gap-12 relative overflow-hidden max-w-4xl mx-auto px-6 w-full">
      {/* Title */}
      <MotionDiv
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center flex flex-col gap-4"
      >
        <MotionDiv
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-black tracking-tight leading-none"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('public.faqs.title1')} <span className="gradient-text">{t('public.faqs.highlight')}</span>
        </MotionDiv>
        <MotionDiv
          variants={fadeInUp}
          className="text-xs md:text-sm mt-1 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('public.faqs.subtitle')}
        </MotionDiv>
      </MotionDiv>

      {/* Accordions */}
      <MotionDiv layout className="flex flex-col gap-4 mt-4 w-full">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id
          return (
            <MotionDiv
              layout
              key={faq.id}
              className="card border rounded-2xl p-5 md:p-6 transition-all duration-300 relative overflow-hidden bg-[var(--bg-surface)] hover:border-[var(--color-primary)] cursor-pointer"
              style={{ borderColor: isOpen ? 'var(--color-primary)' : 'var(--border-color)' }}
              onClick={() => toggleFaq(faq.id)}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    {faq.icon}
                  </div>
                  <h3 className="font-extrabold text-sm md:text-base leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {t(`public.faqs.items.${faq.key}.question`)}
                  </h3>
                </div>
                <div style={{ color: 'var(--text-primary)' }}>{isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="pt-4 border-t text-xs md:text-sm leading-relaxed"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                    >
                      {t(`public.faqs.items.${faq.key}.answer`)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </MotionDiv>
          )
        })}
      </MotionDiv>

      {/* Contact notice */}
      <div
        className="card p-6 border text-center flex flex-col items-center gap-3 relative overflow-hidden bg-[var(--bg-elevated)]"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-blue-500/5 blur-xl" />
        <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
          {t('public.faqs.contactTitle')}
        </h4>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {t('public.faqs.contactSubtitle')}
        </p>
      </div>
    </div>
  )
}
