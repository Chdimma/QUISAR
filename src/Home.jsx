import { useState } from 'react'

function Home() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode((prev) => !prev)
  }

  return (
    <div className={`app-body ${darkMode ? 'dark' : 'light'}`}>
      <header className="app-header">
        <div className="app-brand">
          <svg
            className="pen-logo"
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
          <span className="app-name">Quisar</span>
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <main className="app-main">
        <h1 className="app-title">Welcome to Quisar</h1>
        <p className="app-subtitle">
          You have successfully logged in. This is your home page.
        </p>

        <div className="app-card">
          <h2 className="app-card-title">Getting Started</h2>
          <p className="app-card-text">
            Quisar is your creative writing companion. Start crafting your
            stories, poems, and ideas with the elegant pen at your fingertips.
          </p>
          <button type="button" className="app-action-button">
            Start Writing
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home