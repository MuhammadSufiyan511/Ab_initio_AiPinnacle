import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, ShieldAlert, CheckCircle, ArrowRight, Sparkles, Cpu, ShieldCheck } from 'lucide-react'

interface OnboardingModalProps {
  onComplete: (preferences: {
    commission: string
    cadre: string
    autoHonor: boolean
  }) => void
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1)
  const [commission, setCommission] = useState('FPSC')
  const [cadre, setCadre] = useState('System Analyst (BS-18)')
  const [autoHonor, setAutoHonor] = useState(true)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      localStorage.setItem('ab_initio_onboarded', 'true')
      onComplete({ commission, cadre, autoHonor })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg card p-6 md:p-8 border flex flex-col gap-6 relative overflow-hidden bg-[var(--bg-surface)] shadow-2xl"
        style={{ borderColor: 'var(--border-color)' }}
      >
        {/* Glow Effects */}
        <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
        
        {/* Step Indicator Header */}
        <div className="flex justify-between items-center border-b pb-3" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Candidate Onboarding</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>Step {step} of 3</span>
        </div>

        {/* Step Content Area */}
        <div className="min-h-[220px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-extrabold text-base" style={{ color: 'var(--text-primary)' }}>Choose Your Target Commission</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Select the primary public service commission you are currently preparing for.</p>
                </div>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {['FPSC', 'SPSC', 'PPSC', 'KPPSC', 'BPSC'].map((c) => {
                    const selected = commission === c
                    return (
                      <button
                        key={c}
                        onClick={() => setCommission(c)}
                        className="py-3.5 rounded-xl border text-xs font-black tracking-wider transition-all"
                        style={{ 
                          borderColor: selected ? 'var(--color-primary)' : 'var(--border-color)',
                          background: selected ? 'var(--bg-elevated)' : 'transparent',
                          color: selected ? 'var(--color-primary)' : 'var(--text-secondary)'
                        }}
                      >
                        {c}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-extrabold text-base" style={{ color: 'var(--text-primary)' }}>Select Your IT Target Cadre</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>We will prioritize this syllabus and official exam preparations on your landing feeds.</p>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {[
                    "System Analyst (BS-18)",
                    "Software Developer (BS-17)",
                    "IT Officer (BS-17)",
                    "Network Administrator (BS-17)"
                  ].map((cad) => {
                    const selected = cadre === cad
                    return (
                      <button
                        key={cad}
                        onClick={() => setCadre(cad)}
                        className="p-3.5 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between"
                        style={{ 
                          borderColor: selected ? 'var(--color-primary)' : 'var(--border-color)',
                          background: selected ? 'var(--bg-elevated)' : 'transparent',
                          color: selected ? 'var(--text-primary)' : 'var(--text-secondary)'
                        }}
                      >
                        <span>{cad}</span>
                        {selected && <CheckCircle size={14} className="text-blue-400" />}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-extrabold text-base" style={{ color: 'var(--text-primary)' }}>Examination Preferences</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Customize how you experience official proctored examination modules.</p>
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <label className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer hover:bg-[var(--bg-elevated)] transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                    <input 
                      type="checkbox" 
                      checked={autoHonor}
                      onChange={(e) => setAutoHonor(e.target.checked)}
                      className="mt-0.5" 
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Pre-Check Honor Declaration</span>
                      <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Launch official government exams instantly without manual honor agreement checks.</span>
                    </div>
                  </label>
                  <div className="flex items-center gap-3 p-4 rounded-xl border bg-[var(--bg-elevated)]/50" style={{ borderColor: 'var(--border-color)' }}>
                    <ShieldCheck size={18} className="text-blue-400 shrink-0" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Custom Frosted Overlays Active</span>
                      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Proctored window warning prompts will render in full screen frosted overlays.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stepper Dots & Action Buttons */}
        <div className="flex justify-between items-center border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{ 
                  background: step === s ? 'var(--color-primary)' : 'var(--border-color)',
                  width: step === s ? '12px' : '6px'
                }}
              />
            ))}
          </div>
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-brand shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <span>{step === 3 ? 'Get Started' : 'Next Step'}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
