import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, History } from 'lucide-react'

const HISTORY_RECORDS = [
  {
    id: 1,
    title: 'Quantum Physics Basics',
    timestamp: '2026-08-25T14:30:00',
    correct: 8,
    failed: 2,
    total: 10,
  },
  {
    id: 2,
    title: 'French Vocabulary',
    timestamp: '2026-08-24T09:15:00',
    correct: 6,
    failed: 4,
    total: 10,
  },
  {
    id: 3,
    title: 'Calculus Review',
    timestamp: '2026-08-22T18:45:00',
    correct: 9,
    failed: 1,
    total: 10,
  },
  {
    id: 4,
    title: 'World History Timeline',
    timestamp: '2026-08-20T11:00:00',
    correct: 5,
    failed: 5,
    total: 10,
  },
  {
    id: 5,
    title: 'Organic Chemistry',
    timestamp: '2026-08-18T16:20:00',
    correct: 7,
    failed: 3,
    total: 10,
  },
]

function formatTimestamp(isoString) {
  const date = new Date(isoString)
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function Records() {
  const navigate = useNavigate()

  const handleOpenRecord = (record) => {
    navigate(`/records/${record.id}`)
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0E0F17] text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-4 border-b border-slate-700/60 bg-[#0E0F17]/90 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => navigate('/home')}
          aria-label="Go back to Home"
          className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-slate-100 truncate">Records</h1>
          <p className="text-xs text-slate-400 truncate">
            Review your past quiz attempts.
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-6 pb-28">
        {HISTORY_RECORDS.length > 0 ? (
          <div className="flex flex-col gap-4">
            {HISTORY_RECORDS.map((record) => {
              const percentage = Math.round((record.correct / record.total) * 100)
              return (
                <button
                  key={record.id}
                  type="button"
                  onClick={() => handleOpenRecord(record)}
                  className="group flex flex-col gap-3 p-5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-left hover:border-[#e06691]/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold text-slate-100 leading-snug break-words min-w-0">
                      {record.title}
                    </h2>
                    <ChevronRight
                      size={20}
                      className="shrink-0 text-slate-500 group-hover:text-[#e06691] transition-colors"
                    />
                  </div>

                  <p className="text-xs text-slate-400">
                    {formatTimestamp(record.timestamp)}
                  </p>

                  {/* Performance breakdown */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/30">
                      <CheckCircle2 size={14} />
                      {record.correct} Correct
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/30">
                      <XCircle size={14} />
                      {record.failed} Failed
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#e06691]/10 text-[#e06691] border border-[#e06691]/30">
                      {percentage}%
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-700/60">
              <History size={32} className="text-[#e06691]" />
            </span>
            <p className="text-slate-400">
              No quiz attempts yet. Take a quiz to see your records here!
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default Records