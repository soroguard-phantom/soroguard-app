import { useCallback, useState } from 'react'

interface Props { onFile: (f: File) => void }

export default function ScanDropzone({ onFile }: Props) {
  const [dragging, setDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onFile(file)
  }, [onFile])

  return (
    <label
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all duration-200 shadow-inner
        ${dragging ? 'border-red-400 bg-red-500/10 ring-2 ring-red-400/30 scale-[1.01]' : 'border-white/15 bg-slate-900/30 hover:border-red-400/50 hover:bg-slate-900/50'}`}
    >
      <div className="text-4xl mb-3 drop-shadow-lg">🛡️</div>
      <p className="text-slate-200 font-semibold mb-1">Drop your .wasm file here</p>
      <p className="text-slate-500 text-sm">or click to browse</p>
      <input type="file" accept=".wasm" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f) }} />
    </label>
  )
}
