import React from 'react'

const CELLS = [
  { label: 'FIA Act', cls: 'bg-emerald-500 text-white' },
  { label: 'GK', cls: 'bg-emerald-500 text-white' },
  { label: 'Grammar', cls: 'bg-emerald-400 text-white' },
  { label: 'Vocab', cls: 'bg-emerald-300 text-emerald-950' },
  { label: 'Math', cls: 'bg-emerald-500 text-white' },
  { label: 'Stats', cls: 'bg-emerald-200 text-emerald-950' },
  { label: 'IT Act', cls: 'bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200' },
  { label: 'Current', cls: 'bg-emerald-500 text-white' },
]

export function HeatmapPanel() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase">Syllabus Coverage Heatmap</span>
        <span className="text-xs font-bold text-emerald-500"><i className="fa-solid fa-bolt" /> 82% Efficiency</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {CELLS.map((cell, i) => (
          <div key={i} className={`p-4 rounded-xl text-center font-bold text-xs ${cell.cls}`}>
            {cell.label}
          </div>
        ))}
      </div>
    </div>
  )
}
