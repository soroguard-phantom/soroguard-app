import { useEffect, useState } from 'react'
import { api, RuleInfo } from '../lib/api'

const SEV_BADGE: Record<string, string> = {
  'SG-001': 'bg-red-900/40 text-red-300 ring-1 ring-red-500/30',
  'SG-002': 'bg-red-900/40 text-red-300 ring-1 ring-red-500/30',
  'SG-003': 'bg-red-900/40 text-red-300 ring-1 ring-red-500/30',
  'SG-004': 'bg-red-900/40 text-red-300 ring-1 ring-red-500/30',
  'SG-005': 'bg-red-900/40 text-red-300 ring-1 ring-red-500/30',
}

export default function RulesPage() {
  const [rules, setRules] = useState<RuleInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getRules().then(setRules).finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-white via-red-100 to-slate-400 bg-clip-text text-transparent">
          Detection Rules
        </h1>
        <p className="text-slate-400 text-sm">All active SoroGuard detectors and their severity ratings.</p>
      </div>
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-800/80 rounded-xl animate-pulse ring-1 ring-white/5" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {rules.map(rule => (
            <div
              key={rule.id}
              className="rounded-xl border border-white/10 bg-slate-900/40 p-4 flex flex-wrap items-center gap-4 ring-1 ring-white/5 hover:border-red-500/20 transition-colors"
            >
              <span
                className={`font-mono text-sm font-bold px-3 py-1 rounded-lg ${SEV_BADGE[rule.id] ?? 'bg-slate-800 text-slate-300 ring-1 ring-white/10'}`}
              >
                {rule.id}
              </span>
              <span className="text-sm text-slate-200">{rule.name}</span>
              <span className="ml-auto text-xs text-red-400 font-semibold uppercase tracking-wide">High</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
