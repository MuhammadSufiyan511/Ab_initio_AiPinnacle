import fpscLogo from '@/assets/fpsc.webp'
import ppscLogo from '@/assets/ppsc.webp'
import spscLogo from '@/assets/spsc.webp'
import bpscLogo from '@/assets/bpsc.webp'
import kppscLogo from '@/assets/kppsc.webp'

export const logoMap: Record<string, string> = {
  fpsc: fpscLogo,
  ppsc: ppscLogo,
  spsc: spscLogo,
  bpsc: bpscLogo,
  kppsc: kppscLogo,
}

export function normalizeMockExamTitle(value?: string) {
  return (value || 'System Analyst')
    .replace(/Mock Exam/gi, '')
    .replace(/Proctored Simulation/gi, '')
    .replace(/Simulation/gi, '')
    .replace(/Mock/gi, '')
    .trim()
}

export function getLogoKey(value?: string | null) {
  return (value || '').toLowerCase()
}
