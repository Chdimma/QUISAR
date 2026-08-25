import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Trophy,
} from 'lucide-react'

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

function RecordDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  const record = HISTORY_RECORDS.find((r) => String(r.id) === id)

  if (!record) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-[#0E0F17] text-white">
        <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-4 border-b border-slate-700/60 bg-[#0E0F17]/90 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => navigate('/records')}
            aria-label="Go back to Records"
            className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-bold text-slate-100 truncate">
            Record Not Found
          </h1>
        </header>
        <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-6">
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <p className="text-slate-400">
              This quiz record could not be found.
            </p>
            <button
              type="button"
              onClick={() => navigate('/records')}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#e06691] hover:bg-[#d87093] transition-colors"
            >
              Back to Records
            </button>
          </div>
        </main>
      </div>
    )
  }

  const percentage = Math.round((record.correct / record.total) * 100)

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0E0F17] text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-4 border-b border-slate-700/60 bg-[#0E0F17]/90 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => navigate('/records')}
          aria-label="Go back to Records"
          className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-slate-100 truncate">
            Quiz Review
          </h1>
          <p className="text-xs text-slate-400 truncate">
            {record.title}
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-6 pb-28">
        <div className="flex flex-col gap-5">
          {/* Summary card */}
          <section className="rounded-xl bg-slate-900/80 border border-slate-700/60 p-6">
            <h2 className="text-lg font-semibold text-slate-100 mb-1">
              {record.title}
            </h2>
            <p className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
              <Clock size={14} />
              {formatTimestamp(record.timestamp)}
            </p>

            {/* Score ring */}
            <div className="flex items-center justify-center mb-5">
              <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-4 border-[#e06691]/30">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-slate-100">
                    {percentage}%
                  </span>
                  <span className="text-xs text-slate-400">Score</span>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <CheckCircle2 size={22} className="text-green-400" />
                <span className="text-2xl font-bold text-slate-100">
                  {record.correct}
                </span>
                <span className="text-xs text-slate-400">Correct</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <XCircle size={22} className="text-red-400" />
                <span className="text-2xl font-bold text-slate-100">
                  {record.failed}
                </span>
                <span className="text-xs text-slate-400">Failed</span>
              </div>
            </div>
          </section>

          {/* Feedback */}
          <section className="rounded-xl bg-slate-900/80 border border-slate-700/60 p-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e06691]/10 text-[#e06691] border border-[#e06691]/30">
                <Trophy size={20} />
              </span>
              <div>
                <p className="text-base font-semibold text-slate-100">
                  {percentage >= 80
                    ? 'Great job!'
                    : percentage >= 50
                      ? 'Keep practicing!'
                      : 'Review the material and try again.'}
                </p>
                <p className="text-sm text-slate-400">
                  You answered {record.correct} out of {record.total} questions
                  correctly.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default RecordDetail