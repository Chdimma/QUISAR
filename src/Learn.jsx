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
    console.log(JSON.stringify(payload))
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-4 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => navigate('/home')}
          aria-label="Go back to Home"
          className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-2xl font-bold text-white">Learn</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-8 pb-32">
        <p className="text-slate-400 mb-8">What are we learning today?</p>

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
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-colors"
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
              className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-colors"
            />
          </div>

          {/* Start Button */}
          <button
            type="submit"
            className="mt-4 w-full py-4 rounded-xl bg-purple-600 text-white font-semibold text-lg shadow-lg shadow-purple-600/20 hover:bg-purple-500 active:bg-purple-700 transition-colors"
          >
            <span className="flex items-center justify-center gap-2">
              <Play size={20} />
              Start
            </span>
          </button>
        </form>
      </main>
    </div>
  )
}

export default Learn