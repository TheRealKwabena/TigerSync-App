import { useNavigate, useLocation } from 'react-router-dom'
import {
  Zap,
  LayoutDashboard,
  ScrollText,
  Banknote,
  MessageCircle,
  Settings,
  X,
} from 'lucide-react'
import { useUI } from '../context/UIContext'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',    path: '/' },
  { icon: ScrollText,      label: 'Degree Audit', path: '/degree-audit' },
  { icon: Banknote,        label: 'Financial Aid', path: '/financial-aid' },
  { icon: MessageCircle,   label: 'Advising',     path: '/advising' },
  { icon: Settings,        label: 'Settings',     path: '/settings' },
]

export default function Sidebar() {
  const navigate  = useNavigate()
  const { pathname } = useLocation()
  const { sidebarOpen, setSidebarOpen } = useUI()

  const handleNav = (path) => {
    navigate(path)
    setSidebarOpen(false)
  }

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={[
          'flex flex-col h-screen border-r border-ts-border z-50 transition-transform duration-300',
          /* Desktop: always visible, static */
          'lg:static lg:translate-x-0 lg:flex',
          /* Mobile: fixed drawer */
          'fixed top-0 left-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
        style={{ width: 260, minWidth: 260, background: '#141417' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg orange-gradient">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="font-mono text-xs font-semibold tracking-[4px] text-ts-primary uppercase">
              TigerSync
            </span>
          </div>
          {/* Close button — mobile only */}
          <button
            className="lg:hidden text-ts-muted hover:text-ts-primary transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="h-px bg-ts-border mx-4 mb-4" />

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <p className="px-3 mb-2 text-[11px] font-semibold tracking-[1px] text-ts-muted uppercase">
            Menu
          </p>
          <ul className="space-y-1">
            {navItems.map(({ icon: Icon, label, path }) => {
              const active = pathname === path
              return (
                <li key={path}>
                  <button
                    onClick={() => handleNav(path)}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'text-ts-orange'
                        : 'text-ts-secondary hover:text-ts-primary hover:bg-ts-surface'
                    }`}
                    style={active ? { background: 'rgba(237,171,0,0.09)' } : {}}
                  >
                    <Icon size={16} className={active ? 'text-ts-orange' : 'text-ts-tertiary'} />
                    {label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Upgrade Card */}
        <div className="m-3 p-4 rounded-xl border border-ts-border-el bg-ts-surface">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-md orange-gradient">
              <Zap size={12} className="text-white" fill="white" />
            </div>
            <span className="text-sm font-semibold text-ts-primary">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-ts-tertiary leading-relaxed mb-3">
            Unlock advanced analytics, bulk imports, and priority support.
          </p>
          <button className="w-full py-2 rounded-lg text-xs font-semibold text-white orange-gradient hover:opacity-90 transition-opacity">
            Upgrade Now
          </button>
        </div>
      </aside>
    </>
  )
}
