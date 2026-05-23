import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Target, Users, BookOpen, ArrowRight, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { useTranslation } from 'react-i18next'

const MotionDiv = motion.div

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <div className="py-12 md:py-20 flex flex-col gap-16 md:gap-24 relative overflow-hidden">
      
      {/* Hero Header */}
      <MotionDiv 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto flex flex-col gap-4 px-6"
      >
        <MotionDiv variants={fadeInUp} className="text-4xl md:text-5xl font-black tracking-tight leading-none" style={{ color: 'var(--text-primary)' }}>
          {t('public.about.title1')} <span className="gradient-text">{t('public.about.highlight')}</span>
        </MotionDiv>
        <MotionDiv variants={fadeInUp} className="text-base md:text-lg leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>
          {t('public.about.subtitle')}
        </MotionDiv>
      </MotionDiv>

      {/* The Core Pillar Cards */}
      <MotionDiv
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 w-full"
      >
        {[
          {
            icon: <ShieldCheck className="w-8 h-8 text-blue-400 shrink-0" />,
            title: t('public.about.pillars.precision.title'),
            desc: t('public.about.pillars.precision.desc')
          },
          {
            icon: <Target className="w-8 h-8 text-yellow-400 shrink-0" />,
            title: t('public.about.pillars.seeding.title'),
            desc: t('public.about.pillars.seeding.desc')
          },
          {
            icon: <Users className="w-8 h-8 text-green-400 shrink-0" />,
            title: t('public.about.pillars.candidate.title'),
            desc: t('public.about.pillars.candidate.desc')
          }
        ].map((pillar, idx) => (
          <MotionDiv 
            key={idx}
            variants={fadeInUp}
            className="card p-6 md:p-8 border flex flex-col gap-4 relative overflow-hidden transition-all duration-300 hover:border-[var(--color-primary)] bg-[var(--bg-surface)]"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <div className="p-3.5 rounded-2xl bg-[var(--bg-elevated)] w-fit border border-[var(--border-color)]">
              {pillar.icon}
            </div>
            <h3 className="font-extrabold text-lg mt-2" style={{ color: 'var(--text-primary)' }}>{pillar.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{pillar.desc}</p>
          </MotionDiv>
        ))}
      </MotionDiv>

      {/* Sincere Origin Story Section */}
      <section className="max-w-6xl mx-auto px-6 w-full flex flex-col lg:flex-row gap-12 items-center">
        <MotionDiv 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col gap-6"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: 'var(--text-primary)' }}>
            {t('public.about.originTitle1')} <br/>
            {t('public.about.originTitle2')}
          </h2>
          <div className="text-xs leading-relaxed flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
            <p>{t('public.about.originParas.p1')}</p>
            <p>{t('public.about.originParas.p2')}</p>
            <p>{t('public.about.originParas.p3')}</p>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-12 h-12 rounded-full gradient-brand border flex items-center justify-center font-bold text-white shadow-md">
              MS
            </div>
            <div>
              <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{t('public.about.founder.name')}</h4>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{t('public.about.founder.title')}</p>
            </div>
          </div>
        </MotionDiv>

        {/* Dynamic Interactive Stats Dashboard Showcase */}
        <MotionDiv 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 w-full"
        >
          <div className="card p-6 md:p-8 border flex flex-col gap-6 relative overflow-hidden shadow-lg bg-[var(--bg-surface)]" style={{ borderColor: 'var(--border-color)' }}>
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-blue-500/5 blur-2xl" />
            
            <h3 className="font-bold text-sm border-b pb-3" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>{t('public.about.milestonesTitle')}</h3>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { val: "4,000+", label: t('public.about.milestones.s1') },
                { val: "15,000+", label: t('public.about.milestones.s2') },
                { val: "200+", label: t('public.about.milestones.s3') },
                { val: "94.6%", label: t('public.about.milestones.s4') }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1 p-4 rounded-2xl bg-[var(--bg-elevated)] border" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-2xl md:text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{stat.val}</span>
                  <span className="text-[10px] font-bold tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-3">
              <Award className="w-5 h-5 text-blue-400 shrink-0" />
              <p className="text-[10px] font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t('public.about.awardNote')}
              </p>
            </div>
          </div>
        </MotionDiv>
      </section>

      {/* CTA Box */}
      <MotionDiv 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 w-full mb-8"
      >
        <div className="p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left relative overflow-hidden shadow-xl"
          style={{ background: 'linear-gradient(135deg, var(--card-bg), var(--bg-elevated))', borderColor: 'var(--color-primary)' }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[80px] rounded-full" />
          <div className="flex flex-col gap-2 max-w-md">
            <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{t('public.about.ctaTitle')}</h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t('public.about.ctaSubtitle')}</p>
          </div>
          <Link to="/signup" className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-bold text-white gradient-brand shadow-md hover:shadow-lg transition-all shrink-0">
            <span>{t('public.about.ctaButton')}</span> <ArrowRight size={14} />
          </Link>
        </div>
      </MotionDiv>
      
    </div>
  )
}
