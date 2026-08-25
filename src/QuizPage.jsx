import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, HelpCircle } from 'lucide-react'

function QuizPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const { questions, topic } = location.state || { questions: null, topic: '' }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="min-h-screen w-full flex flex-col transition-colors duration-300 bg-gradient-to-b from-pink-50 via-white to-white text-gray-900 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 dark:text-gray-100">
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center gap-3 px-5 pt-4 pb-3 border-b backdrop-blur-sm bg-white/80 border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
          <button
            type="button"
            onClick={() => navigate('/learn')}
            aria-label="Go back to Learn"
            className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz</h1>
        </header>

        {/* No questions state */}
        <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-16 flex flex-col items-center justify-center text-center gap-4">
          <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400">
            <HelpCircle size={32} />
          </span>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            No questions available
          </h2>
          <p className="text-gray-500 dark:text-slate-400">
            Please go back to the Learn page and start a new quiz.
          </p>
          <button
            type="button"
            onClick={() => navigate('/learn')}
            className="mt-2 px-6 py-3 rounded-xl bg-[#e06691] text-white font-semibold shadow-lg shadow-[#e06691]/20 hover:bg-[#d87093] active:bg-[#d87093] transition-colors"
          >
            Back to Learn
          </button>
        </main>
      </div>
    )
  }

  const totalQuestions = questions.length
  const currentQuestion = questions[currentIndex]

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }))
  }

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedAnswers({})
    setShowResults(false)
  }

  const calculateScore = () => {
    let score = 0
    questions.forEach((question, index) => {
      if (
        selectedAnswers[index] !== undefined &&
        question.options[selectedAnswers[index]] === question.answer
      ) {
        score += 1
      }
    })
    return score
  }

  const score = calculateScore()

  // Results view
  if (showResults) {
    const percentage = Math.round((score / totalQuestions) * 100)

    return (
      <div className="min-h-screen w-full flex flex-col transition-colors duration-300 bg-gradient-to-b from-pink-50 via-white to-white text-gray-900 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 dark:text-gray-100">
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center gap-3 px-5 pt-4 pb-3 border-b backdrop-blur-sm bg-white/80 border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
          <button
            type="button"
            onClick={() => navigate('/home')}
            aria-label="Go back to Home"
            className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Results</h1>
        </header>

        <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-8 pb-36">
          {/* Score card */}
          <div className="rounded-2xl border bg-white border-gray-200 p-8 text-center shadow-sm dark:bg-gray-800/60 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {topic ? `${topic} Quiz` : 'Quiz Results'}
            </h2>
            <p className="text-gray-500 dark:text-slate-400 mb-6">
              You answered {score} out of {totalQuestions} questions correctly.
            </p>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-[#e06691]">{score}</span>
                <span className="text-sm text-gray-500 dark:text-slate-400 mt-1">Correct</span>
              </div>
              <span className="text-3xl font-light text-gray-300 dark:text-gray-600">/</span>
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  {totalQuestions}
                </span>
                <span className="text-sm text-gray-500 dark:text-slate-400 mt-1">Questions</span>
              </div>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-3 mb-2 dark:bg-gray-700">
              <div
                className="bg-[#e06691] h-3 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-slate-300 mb-6">
              {percentage}% Score
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#e06691] text-white font-semibold shadow-lg shadow-[#e06691]/20 hover:bg-[#d87093] active:bg-[#d87093] transition-colors"
              >
                <RotateCcw size={18} />
                Retry Quiz
              </button>
              <button
                type="button"
                onClick={() => navigate('/learn')}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-slate-200 dark:hover:bg-gray-700/50"
              >
                New Quiz
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Quiz interface view
  return (
    <div className="min-h-screen w-full flex flex-col transition-colors duration-300 bg-gradient-to-b from-pink-50 via-white to-white text-gray-900 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 dark:text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-20 flex flex-col px-5 pt-4 pb-3 border-b backdrop-blur-sm bg-white/80 border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/learn')}
            aria-label="Go back to Learn"
            className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {topic ? topic : 'Quiz'}
          </h1>
        </div>

        {/* Progress bar */}
        <div className="mt-3 pl-[52px]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-gray-500 dark:text-slate-400">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-gray-500 dark:text-slate-400">
              {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-[#e06691] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-8 pb-36">
        <div className="rounded-2xl border bg-white border-gray-200 p-6 shadow-sm dark:bg-gray-800/60 dark:border-gray-700">
          <p className="text-sm font-medium text-[#e06691] mb-2">Question {currentIndex + 1}</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-relaxed mb-6">
            {currentQuestion.question}
          </h2>

          <div className="flex flex-col gap-3">
            {Array.isArray(currentQuestion.options) &&
              currentQuestion.options.map((option, optionIndex) => {
                const isSelected = selectedAnswers[currentIndex] === optionIndex
                return (
                  <button
                    key={optionIndex}
                    type="button"
                    onClick={() => handleSelectOption(optionIndex)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#e06691]/10 border-[#e06691] text-gray-900 dark:text-white ring-2 ring-[#e06691]/20'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-pink-400 hover:bg-pink-50/50 dark:bg-gray-800/60 dark:border-gray-700 dark:text-slate-200 dark:hover:border-pink-500/60 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-semibold shrink-0 ${
                          isSelected
                            ? 'bg-[#e06691] text-white'
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-slate-300'
                        }`}
                      >
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span className="font-medium">{option}</span>
                    </span>
                  </button>
                )
              })}
          </div>
        </div>
      </main>

      {/* Fixed Next Button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 px-5 py-4 bg-white/90 backdrop-blur-md border-t border-gray-200 dark:bg-gray-900/90 dark:border-gray-700">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={handleNext}
            disabled={selectedAnswers[currentIndex] === undefined}
            className="w-full py-4 rounded-xl bg-[#e06691] text-white font-semibold text-lg shadow-lg shadow-[#e06691]/20 hover:bg-[#d87093] active:bg-[#d87093] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {currentIndex < totalQuestions - 1 ? 'Next Question' : 'Show Results'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizPage