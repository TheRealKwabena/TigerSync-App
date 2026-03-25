import { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles, Zap, RotateCcw } from 'lucide-react'
import { useUI } from '../context/UIContext'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

const SUGGESTIONS = [
  'What courses should I take next semester?',
  'How can I improve my GPA?',
  'What is my financial aid status?',
  'When can I graduate?',
  'Do I have any account holds?',
]

/* Render **bold** markdown inline */
function RenderContent({ content }) {
  const parts = content.split(/(\*\*[^*]+\*\*|\n)/g)
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-ts-primary">{part.slice(2, -2)}</strong>
        }
        if (part === '\n') return <br key={i} />
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

export default function TigerAI() {
  const { chatOpen, setChatOpen, messages, sendMessage, typing } = useUI()
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (chatOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [chatOpen])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    sendMessage(text)
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Backdrop on mobile */}
      {chatOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setChatOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          'fixed z-50 flex flex-col bg-ts-card border border-ts-border-el card-shadow transition-all duration-300',
          /* mobile: full-screen bottom sheet */
          'bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh]',
          /* desktop: floating panel */
          'sm:bottom-6 sm:right-6 sm:left-auto sm:w-[380px] sm:rounded-2xl sm:max-h-[600px]',
          chatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-ts-border shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg orange-gradient shrink-0">
            <Zap size={15} className="text-white" fill="white" />
          </div>
          <div className="flex-1">
            <p className="font-serif text-base text-ts-primary leading-tight">TigerAI</p>
            <p className="text-[11px] text-ts-muted">Academic assistant · always on</p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              title="Clear conversation"
              onClick={() => window.location.reload()}
            >
              <RotateCcw size={13} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setChatOpen(false)}>
              <X size={14} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn('flex gap-2.5', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center justify-center w-7 h-7 rounded-full orange-gradient shrink-0 mt-0.5">
                  <Sparkles size={12} className="text-white" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-[rgba(237,171,0,0.12)] text-ts-primary rounded-tr-sm'
                    : 'bg-ts-surface text-ts-secondary rounded-tl-sm'
                )}
              >
                <RenderContent content={msg.content} />
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-full orange-gradient shrink-0 mt-0.5">
                <Sparkles size={12} className="text-white" />
              </div>
              <div className="bg-ts-surface rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-ts-muted animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggestions — show only when 1 message (initial state) */}
        {messages.length === 1 && !typing && (
          <div className="px-4 pb-3 flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-[11px] px-2.5 py-1.5 rounded-full border border-ts-border text-ts-secondary hover:border-ts-orange hover:text-ts-orange transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 pb-4 pt-2 shrink-0 border-t border-ts-border">
          <div className="flex items-end gap-2 bg-ts-surface rounded-xl border border-ts-border px-3 py-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask TigerAI anything…"
              rows={1}
              className="flex-1 bg-transparent text-sm text-ts-primary placeholder:text-ts-muted resize-none outline-none max-h-24 leading-relaxed"
              style={{ fieldSizing: 'content' }}
            />
            <Button
              size="icon"
              className="h-7 w-7 shrink-0"
              disabled={!input.trim() || typing}
              onClick={handleSend}
            >
              <Send size={13} />
            </Button>
          </div>
          <p className="text-[10px] text-ts-disabled mt-1.5 text-center">
            TigerAI can make mistakes. Verify important info with your advisor.
          </p>
        </div>
      </div>
    </>
  )
}
