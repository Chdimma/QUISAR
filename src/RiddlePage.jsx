import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, RotateCcw, Trophy } from 'lucide-react'

const RIDDLES = [
  {
    id: 1,
    riddle:
      "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    options: ['An echo', 'A shadow', 'A ghost', 'A radio'],
    answer: 'An echo',
    explanation:
      'An echo is a reflection of sound that returns to the listener after bouncing off a surface.',
  },
  {
    id: 2,
    riddle: 'The more of me you take, the more you leave behind. What am I?',
    options: ['Footsteps', 'Memories', 'Breath', 'Time'],
    answer: 'Footsteps',
    explanation:
      'Every step forward leaves prints behind — the more steps you take, the more you have left.',
  },
  {
    id: 3,
    riddle: "What has keys but can't open locks?",
    options: ['A piano', 'A map', 'A dictionary', 'A computer'],
    answer: 'A piano',
    explanation: 'A piano has keys (musical keys) but cannot open any locks.',
  },
  {
    id: 4,
    riddle: "I'm tall when I'm young, and short when I'm old. What am I?",
    options: ['A candle', 'A tree', 'A pencil', 'A person'],
    answer: 'A candle',
    explanation: 'A candle is tall when new and grows shorter as it burns down.',
  },
  {
    id: 5,
    riddle: 'What gets wetter the more it dries?',
    options: ['A towel', 'A sponge', 'Rain', 'A mop'],
    answer: 'A towel',
    explanation:
      'A towel dries things, so the more it dries, the wetter it becomes itself.',
  },
  {
    id: 6,
    riddle: 'What has a head and a tail but no body?',
    options: ['A coin', 'A snake', 'A needle', 'A kite'],
    answer: 'A coin',
    explanation: "A coin has a 'head' side and a 'tail' side, but no body.",
  },
  {
    id: 7,
    riddle: 'The more you take away from me, the bigger I get. What am I?',
    options: ['A hole', 'A shadow', 'A balloon', 'A mountain'],
    answer: 'A hole',
    explanation: 'Removing more material makes a hole larger.',
  },
  {
    id: 8,
    riddle: 'What goes up but never comes down?',
    options: ['Your age', 'A plane', 'A balloon', 'Smoke'],
    answer: 'Your age',
    explanation: 'Age only ever increases — it never comes back down.',
  },
]

function RiddlePage() {
  const navigate = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const totalRiddles = RIDDLES.length
  const currentRiddle = RIDDLES[currentIndex]

  const handleSelectOption = (option) => {
    if (isSubmitted) return

    setSelectedAnswer(option)
    setIsSubmitted(true)

    const correct = option === currentRiddle.answer
    setIsCorrect(correct)
    if (correct) {
      setScore((prev) => prev + 1)
    }
  }

  const handleTryAgain = () => {
    setSelectedAnswer(null)
    setIsSubmitted(false)
    setIsCorrect(false)
  }

  const handleNext = () => {
    if (currentIndex < totalRiddles - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsSubmitted(false)
      setIsCorrect(false)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setIsSubmitted(false)
    setIsCorrect(false)
    setShowResults(false)
  }

  // Results screen
  if (showResults) {
    const percentage = Math.round((score / totalRiddles) * 100)

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Riddle Results</h1>
        </header>

        <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-8 pb-36">
          <div className="rounded-2xl border bg-white border-gray-200 p-8 text-center shadow-sm dark:bg-gray-800/60 dark:border-gray-700">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-pink-100 text-pink-600 mb-4 dark:bg-pink-500/20 dark:text-pink-400">
              <Trophy size={32} />
            </span>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              Teasers Complete!
            </h2>
            <p className="text-gray-500 dark:text-slate-400 mb-6">
              You solved {score} out of {totalRiddles} riddles correctly.
            </p>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-[#e06691]">{score}</span>
                <span className="text-sm text-gray-500 dark:text-slate-400 mt-1">Correct</span>
              </div>
              <span className="text-3xl font-light text-gray-300 dark:text-gray-600">/</span>
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  {totalRiddles}
                </span>
                <span className="text-sm text-gray-500 dark:text-slate-400 mt-1">Riddles</span>
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
                Play Again
              </button>
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-slate-200 dark:hover:bg-gray-700/50"
              >
                Back to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Riddle screen
  return (
    <div className="min-h-screen w-full flex flex-col transition-colors duration-300 bg-gradient-to-b from-pink-50 via-white to-white text-gray-900 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 dark:text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-20 flex flex-col px-5 pt-4 pb-3 border-b backdrop-blur-sm bg-white/80 border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/home')}
            aria-label="Go back to Home"
            className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Teasers</h1>
          <span className="ml-auto text-sm font-medium text-gray-500 dark:text-slate-400">
            Score: {score}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 pl-[52px]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-gray-500 dark:text-slate-400">
              Riddle {currentIndex + 1} of {totalRiddles}
            </span>
            <span className="text-sm text-gray-500 dark:text-slate-400">
              {Math.round(((currentIndex + 1) / totalRiddles) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-[#e06691] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalRiddles) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-8 pb-36">
        <div className="rounded-2xl border bg-white border-gray-200 p-6 shadow-sm dark:bg-gray-800/60 dark:border-gray-700">
          <p className="text-sm font-medium text-[#e06691] mb-2">Riddle {currentIndex + 1}</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-relaxed mb-6">
            {currentRiddle.riddle}
          </h2>

          <div className="flex flex-col gap-3">
            {currentRiddle.options.map((option, optionIndex) => {
              const isAnswer = option === currentRiddle.answer
              const isSelected = selectedAnswer === option

              // Determine option styling: neutral before submit, green for correct
              // answer, red for wrong selection, dimmed for remaining options after submit
              const optionClass = !isSubmitted
                ? 'bg-white border-gray-200 text-gray-700 hover:border-pink-400 hover:bg-pink-50/50 dark:bg-gray-800/60 dark:border-gray-700 dark:text-slate-200 dark:hover:border-pink-500/60 dark:hover:bg-gray-700/50'
                : isAnswer
                  ? 'bg-green-50 border-green-500 text-green-900 ring-2 ring-green-500/20 dark:bg-green-500/10 dark:border-green-500 dark:text-green-100'
                  : isSelected
                    ? 'bg-red-50 border-red-500 text-red-900 ring-2 ring-red-500/20 dark:bg-red-500/10 dark:border-red-500 dark:text-red-100'
                    : 'bg-white border-gray-200 text-gray-500 opacity-60 dark:bg-gray-800/60 dark:border-gray-700 dark:text-slate-400'

              return (
                <button
                  key={optionIndex}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  disabled={isSubmitted}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${optionClass}`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-semibold shrink-0 ${
                        isSubmitted && isAnswer
                          ? 'bg-green-500 text-white'
                          : isSubmitted && isSelected
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-slate-300'
                      }`}
                    >
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span className="font-medium flex-1">{option}</span>
                    {isSubmitted && isAnswer && (
                      <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isAnswer && (
                      <XCircle size={20} className="text-red-500 shrink-0" />
                    )}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Feedback area */}
          {isSubmitted && (
            <div
              className={`mt-5 rounded-xl border p-4 ${
                isCorrect
                  ? 'bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/30'
                  : 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/30'
              }`}
            >
              <p
                className={`flex items-center gap-2 font-semibold mb-1 ${
                  isCorrect
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 size={20} />
                    Correct!
                  </>
                ) : (
                  <>
                    <XCircle size={20} />
                    Incorrect
                  </>
                )}
              </p>
              {!isCorrect && (
                <p className="text-sm text-gray-700 dark:text-slate-300">
                  Correct answer:{' '}
                  <span className="font-semibold text-green-700 dark:text-green-300">
                    {currentRiddle.answer}
                  </span>
                </p>
              )}
              <p className="flex items-start gap-2 mt-2 text-sm text-gray-600 dark:text-slate-400">
                <Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-500" />
                {currentRiddle.explanation}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Fixed action buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-20 px-5 py-4 bg-white/90 backdrop-blur-md border-t border-gray-200 dark:bg-gray-900/90 dark:border-gray-700">
        <div className="max-w-2xl mx-auto">
          {isSubmitted ? (
            <div className="flex flex-col sm:flex-row gap-3">
              {!isCorrect && (
                <button
                  type="button"
                  onClick={handleTryAgain}
                  className="flex items-center justify-center gap-2 sm:flex-1 py-4 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-slate-200 dark:hover:bg-gray-700/50"
                >
                  <RotateCcw size={18} />
                  Try Again
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 py-4 rounded-xl bg-[#e06691] text-white font-semibold text-lg shadow-lg shadow-[#e06691]/20 hover:bg-[#d87093] active:bg-[#d87093] transition-colors"
              >
                {currentIndex < totalRiddles - 1 ? 'Next Riddle' : 'See Results'}
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled
              className="w-full py-4 rounded-xl bg-[#e06691] text-white font-semibold text-lg shadow-lg shadow-[#e06691]/20 opacity-40 cursor-not-allowed"
            >
              Select an answer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default RiddlePage