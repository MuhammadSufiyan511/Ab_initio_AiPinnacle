import React from 'react'
import { useTranslation } from 'react-i18next'

interface Block {
  value: string
  valueColorLight: string
  valueColorDark: string
  titleKey: string
  titleColorLight: string
  titleColorDark: string
  descKey: string
  descColorLight: string
  descColorDark: string
  bgLight: string
  bgDark: string
  borderLight: string
  borderDark: string
  icon: string
  iconColorLight: string
  iconColorDark: string
}

const BLOCKS: Block[] = [
  {
    value: '2.3x',
    valueColorLight: 'text-orange-600',
    valueColorDark: 'text-orange-400',
    titleKey: 'public.landing.f5Title',
    titleColorLight: 'text-orange-950',
    titleColorDark: 'text-orange-300',
    descKey: 'public.landing.f5Desc',
    descColorLight: 'text-orange-800/80',
    descColorDark: 'text-orange-400/80',
    bgLight: 'bg-[#fff0e5]',
    bgDark: 'dark:bg-orange-950/20',
    borderLight: 'border-orange-200',
    borderDark: 'dark:border-orange-900/30',
    icon: 'fa-arrow-trend-up',
    iconColorLight: 'text-orange-200/30',
    iconColorDark: 'dark:text-orange-800/10',
  },
  {
    value: '3x',
    valueColorLight: 'text-amber-600',
    valueColorDark: 'text-amber-400',
    titleKey: 'public.landing.f6Title',
    titleColorLight: 'text-amber-950',
    titleColorDark: 'text-amber-300',
    descKey: 'public.landing.f6Desc',
    descColorLight: 'text-amber-800/80',
    descColorDark: 'text-amber-400/80',
    bgLight: 'bg-[#fefce8]',
    bgDark: 'dark:bg-amber-950/20',
    borderLight: 'border-amber-200',
    borderDark: 'dark:border-amber-900/30',
    icon: 'fa-bolt',
    iconColorLight: 'text-amber-200/30',
    iconColorDark: 'dark:text-amber-800/10',
  },
]

export function AsymmetricBlocks() {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-slate-50/50 dark:bg-darkbase-950 cv-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOCKS.map((block, i) => (
            <div
              key={i}
              className={`${block.bgLight} ${block.bgDark} border ${block.borderLight} ${block.borderDark} p-8 sm:p-12 rounded-3xl flex flex-col justify-between relative overflow-hidden group`}
            >
              <div>
                <p className={`text-5xl sm:text-6xl font-black ${block.valueColorLight} ${block.valueColorDark} mb-4`}>
                  {block.value}
                </p>
                <h3 className={`text-2xl font-bold ${block.titleColorLight} ${block.titleColorDark} font-academic mb-3`}>
                  {t(block.titleKey)}
                </h3>
                <p className={`${block.descColorLight} ${block.descColorDark} leading-relaxed font-light mb-8`}>
                  {t(block.descKey)}
                </p>
              </div>
              <span className={`text-8xl absolute -bottom-6 -right-6 ${block.iconColorLight} ${block.iconColorDark} pointer-events-none font-black`}>
                <i className={`fa-solid ${block.icon}`} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
