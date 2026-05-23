import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import { HeroContent } from "./hero/HeroContent";
import { HeroFloatingShapes } from "./hero/HeroFloatingShapes";
import { HeroVisual } from "./hero/HeroVisual";
import { useHeroScroll } from "../hooks/useHeroScroll";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const scrollY = useHeroScroll();

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden hero-gradient">
      <HeroFloatingShapes />

      <div
        className="absolute inset-0"
      >
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663199288815/nhwaeXz8c43eDkcUDqr6vj/hero-bg-floating-shapes-kdNhTqiXErxxvziT3JELvS.webp"
          alt="Hero Background"
          className="h-full w-full object-cover dark:invert dark:hue-rotate-180 dark:opacity-15"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-6 xl:gap-20">
            <HeroContent
              title1={t('public.welcome.hero.title1')}
              title2={t('public.welcome.hero.title2')}
              subtitle={t('public.welcome.hero.subtitle')}
              primaryCta={t('public.welcome.hero.ctaPrimary')}
              secondaryCta={t('public.welcome.hero.ctaSecondary')}
              satisfactionValue={t('public.welcome.hero.stats.satisfactionValue')}
              satisfactionLabel={t('public.welcome.hero.stats.satisfactionLabel')}
              studentsValue={t('public.welcome.hero.stats.studentsValue')}
              studentsLabel={t('public.welcome.hero.stats.studentsLabel')}
              supportValue={t('public.welcome.hero.stats.supportValue')}
              supportLabel={t('public.welcome.hero.stats.supportLabel')}
            />

            <HeroVisual
              videoTitle={t('public.welcome.hero.videoTitle')}
              videoSubtitle={t('public.welcome.hero.videoSubtitle')}
            />
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 transform sm:block sm:bottom-8"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="font-medium text-sm" style={{ color: 'var(--text-secondary)' }}>{t('public.welcome.hero.scrollHint')}</p>
          <svg
            className="h-6 w-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
