import { Sparkles, Bell, Menu } from 'lucide-react'
import { useUI } from '../context/UIContext'

export default function Header({ title }) {
  const { setChatOpen, setSidebarOpen } = useUI()

  return (
    <header
      className="flex items-center px-4 sm:px-8 border-b border-ts-border shrink-0"
      style={{ height: 72, background: '#111113' }}
    >
      {/* Hamburger — mobile only */}
      <button
        className="flex lg:hidden items-center justify-center w-9 h-9 rounded-lg border border-ts-border bg-ts-surface hover:bg-ts-border transition-colors mr-3"
        onClick={() => setSidebarOpen((v) => !v)}
      >
        <Menu size={16} className="text-ts-secondary" />
      </button>

      <h1 className="font-serif text-xl sm:text-[28px] tracking-[-1px] text-ts-primary leading-none">
        {title}
      </h1>

      <div className="flex-1" />

      {/* Ask TigerAI */}
      <button
        onClick={() => setChatOpen((v) => !v)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white orange-gradient hover:opacity-90 transition-opacity mr-3"
      >
        <Sparkles size={15} />
        <span className="hidden sm:inline">Ask TigerAI</span>
      </button>

      {/* Bell */}
      <button className="flex items-center justify-center w-9 h-9 rounded-lg border border-ts-border bg-ts-surface hover:bg-ts-border transition-colors">
        <Bell size={16} className="text-ts-secondary" />
      </button>

      <div className="w-px h-6 bg-ts-border mx-3" />

      {/* User */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-full orange-gradient text-white text-xs font-bold shrink-0">
          JD
        </div>
        <div className="leading-tight hidden sm:block">
          <p className="text-sm font-semibold text-ts-primary">Jordan</p>
          <p className="text-xs text-ts-tertiary">Student</p>
        </div>
      </div>
    </header>
  )
}
