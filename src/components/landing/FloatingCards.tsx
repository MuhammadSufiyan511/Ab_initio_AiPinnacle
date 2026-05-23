import React from 'react'

interface FloatingCard {
  img?: string
  icon?: string
  iconBg?: string
  iconColor?: string
  name: string
  status: string
  statusColor: string
  delay: string
  position: string
}

const CARDS: FloatingCard[] = [
  {
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    name: 'Ayesha | FIA',
    status: '✓ Passed mock 92%',
    statusColor: 'text-green-500',
    delay: '0s',
    position: 'absolute top-24 left-10 lg:left-24 animate-float opacity-80 hidden sm:block',
  },
  {
    icon: 'GK',
    iconBg: 'bg-violet-100 dark:bg-violet-950',
    iconColor: 'text-violet-600 dark:text-violet-400',
    name: 'Current Affairs Quiz',
    status: '20 new flashcards',
    statusColor: 'text-slate-400',
    delay: '2s',
    position: 'absolute bottom-20 left-6 lg:left-16 animate-float opacity-80 hidden lg:block',
  },
  {
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    name: 'Bilal | FPSC Customs',
    status: '⚡ AI study activated',
    statusColor: 'text-brand-500',
    delay: '4s',
    position: 'absolute top-24 right-10 lg:right-24 animate-float opacity-80 hidden sm:block',
  },
  {
    icon: 'chart',
    iconBg: 'bg-green-100 dark:bg-emerald-950',
    iconColor: 'text-green-600 dark:text-green-400',
    name: 'Syllabus Complete',
    status: '100% covered',
    statusColor: 'text-green-500',
    delay: '1s',
    position: 'absolute bottom-20 right-6 lg:right-16 animate-float opacity-80 hidden lg:block',
  },
]

export function FloatingCards() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {CARDS.map((card, i) => (
        <div key={i} className={card.position} style={{ animationDelay: card.delay }}>
          <div className="glass-card p-2 rounded-2xl shadow-lg flex items-center gap-3">
            {card.img ? (
              <img
                className="w-12 h-12 rounded-xl object-cover"
                src={card.img}
                alt={card.name}
                width="48"
                height="48"
                loading="lazy"
              />
            ) : (
              <div className={`w-10 h-10 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center font-bold`}>
                {card.icon === 'chart' ? <i className="fa-solid fa-chart-line"></i> : card.icon}
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{card.name}</p>
              <span className={`text-[10px] ${card.statusColor} font-bold`}>{card.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
