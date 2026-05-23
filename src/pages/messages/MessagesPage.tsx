import { useState } from 'react'
import { Send, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { MotionPage } from '@/animations/MotionWrapper'

/**
 * MessagesPage Component:
 * - Implements a premium full-height dual-column instant messaging workspace.
 * - Left pane displays conversation lists with active/online indicators and unread message counters.
 * - Right pane renders message streams dynamically, styled as custom chat bubbles.
 * - Includes text sending logic that updates the state array and animates incoming bubbles.
 */
import { Avatar } from '@/components/shared/Badge'
import { mockConversations, mockMessages, type Message } from '@/data/mockMessages'
import { cn, timeAgo } from '@/lib/utils'

function ConversationItem({ conv, active, onClick }: { conv: typeof mockConversations[0]; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn('flex items-center gap-3 w-full px-4 py-3 text-left transition-colors', active ? '' : 'hover:bg-[var(--sidebar-hover)]')}
      style={active ? { background: 'var(--bg-elevated)' } : {}}>
      <div className="relative flex-shrink-0">
        <Avatar name={conv.participantName} size="md" />
        {conv.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[var(--sidebar-bg)]" style={{ background: 'var(--color-success)' }} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{conv.participantName}</p>
          <span className="text-[10px] flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{conv.lastTime}</span>
        </div>
        <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{conv.lastMessage}</p>
      </div>
      {conv.unread > 0 && <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ background: 'var(--color-primary)' }}>{conv.unread}</span>}
    </button>
  )
}

function ChatBubble({ msg }: { msg: Message }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} gap-2`}>
      {!msg.isOwn && <Avatar name={msg.senderName} size="sm" className="flex-shrink-0 self-end" />}
      <div className="max-w-[70%]">
        <div className="px-4 py-2.5 text-sm leading-relaxed" style={{
          background: msg.isOwn ? 'var(--color-primary)' : 'var(--bg-elevated)',
          color: msg.isOwn ? '#fff' : 'var(--text-primary)',
          borderRadius: msg.isOwn ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        }}>{msg.text}</div>
        <p className={cn('text-[10px] mt-1 px-1', msg.isOwn ? 'text-right' : '')} style={{ color: 'var(--text-muted)' }}>{msg.timestamp}</p>
      </div>
    </motion.div>
  )
}

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState(mockConversations[0])
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(mockMessages)
  const [searchQuery, setSearchQuery] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages(m => [...m, { id: String(Date.now()), senderId: 'usr-001', senderName: 'Alex Johnson', senderAvatar: '', text: input, timestamp: 'Just now', isOwn: true }])
    setInput('')
  }

  const filteredConversations = mockConversations.filter(c =>
    c.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <MotionPage className="-m-6 -mt-0 flex" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Conversations list */}
      <div className="w-72 flex-shrink-0 border-r flex flex-col" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
        <div className="p-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search conversations…" 
              className="w-full pl-8 pr-3 py-2 rounded-lg text-xs outline-none border"
              style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} 
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(c => <ConversationItem key={c.id} conv={c} active={c.id === activeConv.id} onClick={() => setActiveConv(c)} />)}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b flex-shrink-0" style={{ borderColor: 'var(--border-color)' }}>
          <div className="relative">
            <Avatar name={activeConv.participantName} size="sm" />
            {activeConv.online && <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-[var(--bg-base)]" style={{ background: 'var(--color-success)' }} />}
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{activeConv.participantName}</p>
            <p className="text-[10px]" style={{ color: activeConv.online ? 'var(--color-success)' : 'var(--text-muted)' }}>
              {activeConv.online ? 'Online' : 'Offline'} · {activeConv.participantRole}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {messages.map(m => <ChatBubble key={m.id} msg={m} />)}
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <input id="msg-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={`Message ${activeConv.participantName}…`}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm border outline-none"
            style={{ background: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
          <button id="send-msg" onClick={send} disabled={!input.trim()} className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center disabled:opacity-40">
            <Send size={14} className="text-white" />
          </button>
        </div>
      </div>
    </MotionPage>
  )
}
