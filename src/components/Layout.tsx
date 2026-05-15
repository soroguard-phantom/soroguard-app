import { Link, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen flex flex-col relative">
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(248,113,113,0.15) 0%, transparent 35%), radial-gradient(circle at 80% 70%, rgba(139,92,246,0.12) 0%, transparent 40%)',
        }}
      />
      <header className="relative z-10 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl px-4 sm:px-8 py-4 flex flex-wrap items-center gap-6 shadow-lg shadow-black/20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-rose-600 text-white text-sm font-bold shadow-glow ring-1 ring-white/20">
            SG
          </span>
          <span className="font-bold text-lg text-white tracking-tight group-hover:text-red-200 transition-colors">
            SoroGuard
          </span>
        </Link>
        <nav className="flex gap-1 text-sm">
          {[
            ['/', 'Scanner'],
            ['/rules', 'Rules'],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-2 rounded-lg transition-all ${
                pathname === to
                  ? 'bg-white/10 text-white font-medium ring-1 ring-red-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto text-xs text-slate-500 hidden sm:block">
          Soroban security scanner
        </div>
      </header>
      <main className="relative z-10 flex-1 px-4 sm:px-8 py-8 max-w-4xl mx-auto w-full">
        <div className="app-content">{children}</div>
      </main>
      <footer className="relative z-10 mt-auto border-t border-white/5 py-4 text-center text-xs text-slate-600">
        Wave 5 · Pre-audit tooling — not a substitute for a professional audit
      </footer>
    </div>
  )
}
