import { useState } from 'react'
import ScanDropzone from '../components/ScanDropzone'
import FindingCard from '../components/FindingCard'
import { api, ScanReport } from '../lib/api'

export default function ScanPage() {
  const [report, setReport]   = useState<ScanReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const [filename, setFilename] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    setFilename(file.name); setLoading(true); setError(null); setReport(null)
    try {
      const r = await api.scan(file)
      setReport(r)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const high   = report?.findings.filter(f => f.severity === 'HIGH')   ?? []
  const medium = report?.findings.filter(f => f.severity === 'MEDIUM') ?? []
  const low    = report?.findings.filter(f => f.severity === 'LOW')    ?? []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          Contract Scanner
        </h1>
        <p className="text-slate-400 text-sm">Upload a compiled Soroban WASM binary to detect security vulnerabilities.</p>
      </div>

      <ScanDropzone onFile={handleFile} />

      {loading && (
        <div className="text-center py-8 text-slate-400">
          <div className="text-3xl mb-2 animate-spin inline-block">⚙️</div>
          <p>Scanning {filename}…</p>
        </div>
      )}

      {error && <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300">{error}</div>}

      {report && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {[['HIGH', report.high, 'text-red-400'], ['MEDIUM', report.medium, 'text-yellow-400'], ['LOW', report.low, 'text-blue-400']].map(([label, count, cls]) => (
              <div key={label as string} className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center ring-1 ring-white/5 shadow-inner">
                <p className={`text-2xl font-bold ${cls}`}>{count}</p>
                <p className="text-xs text-gray-400 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {report.total === 0 && (
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 text-green-300 text-center">
              ✅ No vulnerabilities detected. Always pair with a formal audit before mainnet.
            </div>
          )}

          {[['🔴 High Severity', high], ['🟡 Medium Severity', medium], ['🔵 Low Severity', low]].map(([label, findings]) =>
            (findings as any[]).length > 0 && (
              <div key={label as string}>
                <h2 className="text-sm font-semibold text-slate-300 mb-3">{label as string}</h2>
                <div className="space-y-3">
                  {(findings as any[]).map((f, i) => <FindingCard key={i} finding={f} />)}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
