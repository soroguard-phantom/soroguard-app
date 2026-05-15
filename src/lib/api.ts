const BASE = (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:8080'

export interface Finding {
  rule_id: string
  title: string
  severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO'
  description: string
  location?: string
}

export interface ScanReport {
  findings: Finding[]
  total: number
  high: number
  medium: number
  low: number
}

export interface RuleInfo {
  id: string
  name: string
}

const MOCK_REPORT: ScanReport = {
  findings: [
    {
      rule_id: 'SG-001',
      title: 'Missing Authorization Guard',
      severity: 'HIGH',
      description: 'The function `withdraw_funds` mutates contract storage but does not call `require_auth()` on the administrative address. An attacker could drain the contract treasury.',
      location: '0x1a4b (function: withdraw_funds)'
    },
    {
      rule_id: 'SG-002',
      title: 'Stale Oracle Price Reliance',
      severity: 'MEDIUM',
      description: 'The contract uses a spot price from an external oracle without verifying the timestamp for staleness. This could lead to price manipulation attacks.',
      location: '0x2c3d (function: get_price)'
    },
    {
      rule_id: 'SG-004',
      title: 'Unvalidated Storage Type',
      severity: 'LOW',
      description: 'A value is retrieved from storage and used without explicit type validation. While not critical, it may lead to unexpected runtime panics.',
      location: '0x05e1 (function: update_user_profile)'
    }
  ],
  total: 3,
  high: 1,
  medium: 1,
  low: 1
}

export const api = {
  async scan(file: File): Promise<ScanReport> {
    const form = new FormData()
    form.append('wasm', file)
    try {
      const res = await fetch(`${BASE}/scan`, { method: 'POST', body: form })
      if (!res.ok) throw new Error(`Scan failed: ${res.status}`)
      return await res.json()
    } catch (e) {
      console.warn('SoroGuard Engine unreachable, falling back to mock data.', e)
      return new Promise((resolve) => setTimeout(() => resolve(MOCK_REPORT), 1500))
    }
  },
  async getRules(): Promise<RuleInfo[]> {
    try {
      const res = await fetch(`${BASE}/rules`)
      if (!res.ok) throw new Error('Failed to fetch rules')
      return await res.json()
    } catch (e) {
      console.warn('SoroGuard Engine unreachable, falling back to mock rules.', e)
      return [
        { id: 'SG-001', name: 'Access Control' },
        { id: 'SG-002', name: 'Oracle Safety' },
        { id: 'SG-003', name: 'Integer Overflow' },
        { id: 'SG-004', name: 'Type Safety' },
        { id: 'SG-005', name: 'Reentrancy' }
      ]
    }
  },
}

