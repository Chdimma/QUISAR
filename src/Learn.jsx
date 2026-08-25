import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Play } from 'lucide-react'

function Learn() {
  const [topic, setTopic] = useState('')
  const [questionCount, setQuestionCount] = useState('')
  const navigate = useNavigate()

  const handleStartQuiz = (e) => {
    e.preventDefault()
    const payload = {
      topic,
      questionCount: Number(questionCount),
    }
    // Ready for future backend API integration
    console.log(payload)
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0E0F17] text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 flex flex-col px-5 pt-4 pb-3 border-b border-slate-700/60 bg-[#0E0F17]/90 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/home')}
            aria-label="Go back to Home"
            className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-bold text-white">Learn</h1>
        </div>
        <p className="text-slate-400 mt-1 pl-[52px]">What are we learning today?</p>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-8 pb-36">
        <form onSubmit={handleStartQuiz} className="flex flex-col gap-6">
          {/* Search / Topic Input */}
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Topic
            </label>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a study topic or subject"
                autoComplete="off"
                inputMode="text"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#e06691] focus:ring-2 focus:ring-[#e06691]/20 transition-colors"
              />
            </div>
          </div>

          {/* Number of Questions Input */}
          <div>
            <label
              htmlFor="questionCount"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Number of Questions
            </label>
            <input
              id="questionCount"
              type="number"
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              placeholder="e.g. 10"
              min="1"
              max="50"
              inputMode="numeric"
              className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#e06691] focus:ring-2 focus:ring-[#e06691]/20 transition-colors"
            />
          </div>
        </form>
      </main>

      {/* Fixed Start Button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 px-5 py-4 bg-[#0E0F17]/95 backdrop-blur-sm border-t border-slate-700/60">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={handleStartQuiz}
            className="w-full py-4 rounded-xl bg-[#e06691] text-white font-semibold text-lg shadow-lg shadow-[#e06691]/20 hover:bg-[#d87093] active:bg-[#d87093] transition-colors"
          >
            <span className="flex items-center justify-center gap-2">
              <Play size={20} />
              Start
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Learn