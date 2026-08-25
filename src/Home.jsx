import { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  // Bypass authentication: pull username/fullName from localStorage if present,
  // otherwise fall back to a default.
  const storedUser = localStorage.getItem('quisar_user')
  let username = 'Explorer'

  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser)
      username = parsed.fullName || parsed.username || 'Explorer'
    } catch {
      username = storedUser || 'Explorer'
    }
  }

  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode((prev) => !prev)
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-300 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 dark:text-gray-100 bg-gradient-to-b from-pink-50 via-white to-white text-gray-900 ${
        darkMode ? 'dark' : ''
      }`}
    >
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 border-b backdrop-blur-sm bg-white/80 border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <svg
            className="text-pink-500"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 20h9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xl font-bold text-pink-500">Quisar</span>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-pink-100 text-pink-700 hover:bg-pink-200 border border-pink-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-600"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-5 py-8 pb-28">
        {/* Greeting */}
        <section className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-1">
            Hi, {username}!
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Welcome back to your creative space.
          </p>
        </section>

        {/* Quick Access */}
        <section>
          <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-200">
            Quick Access
          </h2>

          {/* Card grid: two on top, one centered below */}
          <div className="flex flex-col items-center gap-5">
            {/* Top row: Learn + Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              {/* Learn */}
              <Link
                to="/learn"
                className="group flex flex-col items-start gap-3 p-6 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-white border-gray-200 hover:border-pink-400 hover:shadow-pink-200/50 dark:bg-gray-800/60 dark:border-gray-700 dark:hover:border-pink-500/60 dark:hover:shadow-pink-500/10"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-lg font-semibold">Learn</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Explore lessons and grow your skills.
                </span>
              </Link>

              {/* Notes */}
              <Link
                to="/notes"
                className="group flex flex-col items-start gap-3 p-6 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-white border-gray-200 hover:border-pink-400 hover:shadow-pink-200/50 dark:bg-gray-800/60 dark:border-gray-700 dark:hover:border-pink-500/70 dark:hover:shadow-pink-500/10"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-lg font-semibold">Notes</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Capture your ideas and drafts.
                </span>
              </Link>
            </div>

            {/* Bottom row: Teasers (centered) */}
            <button
              type="button"
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl border text-center w-full sm:max-w-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-white border-gray-200 hover:border-pink-400 hover:shadow-pink-200/50 dark:bg-gray-800/60 dark:border-gray-700 dark:hover:border-pink-500/70 dark:hover:shadow-pink-500/10"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-lg font-semibold">Teasers</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Fun challenges to test your knowledge.
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* Bottom navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t backdrop-blur-md bg-white/90 border-gray-200 dark:bg-gray-900/90 dark:border-gray-700">
        <div className="max-w-3xl mx-auto flex items-center justify-around px-4 py-2">
          {/* Home */}
          <Link
            to="/home"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium transition-colors text-pink-600 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-gray-800"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22V12h6v10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Home
          </Link>

          {/* Records */}
          <Link
            to="/records"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium transition-colors text-gray-500 hover:text-pink-600 hover:bg-pink-50 dark:text-gray-400 dark:hover:text-pink-400 dark:hover:bg-gray-800"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Records
          </Link>

          {/* Settings */}
          <Link
            to="/settings"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium transition-colors text-gray-500 hover:text-pink-600 hover:bg-pink-50 dark:text-gray-400 dark:hover:text-pink-400 dark:hover:bg-gray-800"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Settings
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Home