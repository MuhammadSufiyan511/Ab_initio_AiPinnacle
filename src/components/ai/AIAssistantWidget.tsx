import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Sparkles } from 'lucide-react'
import { slideUp } from '@/animations/variants'

/**
 * AIAssistantWidget Component:
 * - Implements a premium floating AI Study Assistant chat drawer.
 * - Utilizes framer-motion slide-up transitions to animate the toggle status of the chat drawer.
 * - Provides preset chat suggestions for quick student engagement.
 * - Features realistic asynchronous mock typing delays with a CSS bounce indicator.
 */

interface ChatMsg { id: number; from: 'ai' | 'user'; text: string }

const SUGGESTIONS = ['Explain React hooks', 'Study plan for ML', 'Best practices for CSS']
const AI_REPLIES = [
  "Great question! Let me break that down for you in a clear, structured way…",
  "Based on your learning progress, I recommend focusing on fundamentals first.",
  "Here's a concise summary tailored to your current course level.",
]

export function AIAssistantWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: 0, from: 'ai', text: 'Hi! I\'m your PrepPro AI assistant 👋 How can I help you learn today?' }
  ])
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text: string) => {
    if (!text.trim()) return
    const userMsg: ChatMsg = { id: Date.now(), from: 'user', text }
    setMessages(m => [...m, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const reply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)]
      setMessages(m => [...m, { id: Date.now() + 1, from: 'ai', text: reply }])
      setTyping(false)
    }, 1200)
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        id="ai-widget-btn"
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center shadow-lg"
        aria-label="AI Assistant"
      >
        <motion.div key={open ? 'close' : 'open'} initial={{ rotate: -20, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
          {open ? <X size={18} className="text-white" /> : <Bot size={20} className="text-white" />}
        </motion.div>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={slideUp} initial="hidden" animate="visible" exit="hidden"
            className="fixed bottom-36 md:bottom-20 right-4 md:right-6 z-50 w-80 card flex flex-col overflow-hidden"
            style={{ height: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b gradient-brand">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">AI Study Assistant</p>
                <p className="text-white/60 text-[10px]">Always here to help</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[85%] text-xs px-3 py-2 rounded-xl leading-relaxed"
                    style={msg.from === 'user'
                      ? { background: 'var(--color-primary)', color: '#fff', borderRadius: '16px 16px 4px 16px' }
                      : { background: 'var(--bg-elevated)', color: 'var(--text-primary)', borderRadius: '16px 16px 16px 4px' }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-xl" style={{ background: 'var(--bg-elevated)' }}>
                    <span className="flex gap-1">{[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--text-muted)', animationDelay: `${i * 150}ms` }} />)}</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length < 2 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)} className="text-[10px] px-2.5 py-1 rounded-full border transition-colors hover:bg-[var(--bg-elevated)]"
                    style={{ borderColor: 'var(--border-accent)', color: 'var(--color-primary)' }}>{s}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <input id="ai-input" value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                placeholder="Ask anything…" className="flex-1 bg-transparent outline-none text-xs" style={{ color: 'var(--text-primary)' }} />
              <button onClick={() => send(input)} disabled={!input.trim()} className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center disabled:opacity-40">
                <Send size={12} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
