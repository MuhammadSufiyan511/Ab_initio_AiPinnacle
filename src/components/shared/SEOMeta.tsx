import React from 'react'

interface SEOMetaProps {
  title?: string
  description?: string
  canonical?: string
  ogType?: string
  ogImage?: string
  noIndex?: boolean
  keywords?: string
}

const DEFAULT_TITLE = 'PrepPro Academy | AI-Powered Study, Tests & Flashcard Generator for FPSC, PPSC, CSS'
const DEFAULT_DESC = 'Turn your FPSC, FIA, PPSC, SPSC, BPSC & CSS syllabus into interactive quizzes, mock tests, and smart flashcards instantly. Pakistan\'s leading AI exam prep platform.'
const DEFAULT_IMAGE = 'https://preppro.academy/og-image.png'
const SITE_URL = 'https://preppro.academy'

export function SEOMeta({
  title,
  description = DEFAULT_DESC,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  noIndex = false,
  keywords,
}: SEOMetaProps) {
  const fullTitle = title ? `${title} | PrepPro Academy` : DEFAULT_TITLE
  const fullCanonical = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content="PrepPro Academy" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* hreflang */}
      <link rel="alternate" hrefLang="en" href={fullCanonical} />
      <link rel="alternate" hrefLang="ur" href={`${fullCanonical}?lang=ur`} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonical} />
    </>
  )
}
