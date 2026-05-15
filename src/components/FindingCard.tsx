import { Finding } from '../lib/api'

const SEV_STYLES: Record<string, string> = {
  HIGH:   'bg-red-500/10 border-red-500/30 text-red-200 shadow-red-900/20',
  MEDIUM: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200 shadow-yellow-900/20',
  LOW:    'bg-blue-500/10 border-blue-500/30 text-blue-200 shadow-blue-900/20',
  INFO:   'bg-slate-500/10 border-slate-500/30 text-slate-200 shadow-slate-900/20',
}

export default function FindingCard({ finding }: { finding: Finding }) {
  const style = SEV_STYLES[finding.severity] ?? SEV_STYLES.INFO
  return (
    <div className={`group border rounded-xl p-5 backdrop-blur-sm transition-all hover:scale-[1.01] hover:bg-white/5 ring-1 ring-white/5 shadow-2xl ${style}`}>
      <div className="flex items-center gap-4 mb-3">
        <div className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase ring-1 ring-inset ${
          finding.severity === 'HIGH' ? 'bg-red-500/20 ring-red-400/50' : 
          finding.severity === 'MEDIUM' ? 'bg-yellow-500/20 ring-yellow-400/50' : 
          'bg-blue-500/20 ring-blue-400/50'
        }`}>
          {finding.severity}
        </div>
        <div className="h-4 w-px bg-white/10" />
        <span className="font-bold text-base tracking-tight">{finding.title}</span>
        <span className="ml-auto text-[10px] font-mono opacity-50">{finding.rule_id}</span>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">{finding.description}</p>
      {finding.location && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-white/20" />
          <p className="text-[11px] font-mono opacity-40 truncate">
            {finding.location}
          </p>
        </div>
      )}
    </div>
  )
}

