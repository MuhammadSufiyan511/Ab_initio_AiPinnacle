import React from 'react'

interface FlashPanelProps {
  flipped: boolean
  onFlip: () => void
}

export function FlashPanel({ flipped, onFlip }: FlashPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase">Flashcard Active Session</span>
        <span className="text-xs font-bold text-violet-500">SRS Level 3</span>
      </div>
      <div
        className="border-2 border-dashed border-violet-200 dark:border-violet-800/50 rounded-2xl bg-violet-50/20 dark:bg-violet-950/10 cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={onFlip}
      >
        <div className={`flashcard-inner p-10 text-center ${flipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <p className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-3">Front of Card</p>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white font-academic mb-6">
              What is the capital of Pakistan and when was it established?
            </h3>
            <button
              onClick={(e) => { e.stopPropagation(); onFlip() }}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-all"
            >
              <i className="fa-solid fa-rotate me-2" />Flip Flashcard
            </button>
          </div>
          <div className="flashcard-back flex flex-col items-center justify-center">
            <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3">Answer</p>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white font-academic mb-3">Islamabad</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
              Islamabad was officially declared the capital of Pakistan in 1967, replacing Karachi. Construction began in the 1960s under President Ayub Khan.
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); onFlip() }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-all"
            >
              <i className="fa-solid fa-rotate me-2" />Show Question
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
