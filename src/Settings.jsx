import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Moon,
  Sun,
  Info,
  KeyRound,
  LogOut,
  X,
  Check,
} from 'lucide-react'

const THEME_KEY = 'quisar_theme'

function loadThemeFromStorage() {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark'
  } catch {
    return false
  }
}

function Settings() {
  const navigate = useNavigate()

  const [darkMode, setDarkMode] = useState(loadThemeFromStorage)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetError, setResetError] = useState('')
  const [resetSuccess, setResetSuccess] = useState(false)

  // Apply and persist the theme whenever it changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    try {
      localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light')
    } catch {
      // storage unavailable — fail silently
    }
  }, [darkMode])

  // Close about modal with Escape key
  useEffect(() => {
    if (!aboutOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setAboutOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [aboutOpen])

  // Close reset modal with Escape key
  useEffect(() => {
    if (!resetOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setResetOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [resetOpen])

  const toggleTheme = () => {
    setDarkMode((prev) => !prev)
  }

  const openAbout = () => {
    setAboutOpen(true)
  }

  const closeAbout = () => {
    setAboutOpen(false)
  }

  const openReset = () => {
    setResetError('')
    setResetSuccess(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setResetOpen(true)
  }

  const closeReset = () => {
    setResetOpen(false)
    setResetError('')
    setResetSuccess(false)
  }

  const handleResetPassword = (e) => {
    e.preventDefault()

    setResetError('')

    if (!currentPassword) {
      setResetError('Please enter your current password.')
      return
    }

    if (newPassword.length < 6) {
      setResetError('New password must be at least 6 characters long.')
      return
    }

    if (newPassword !== confirmPassword) {
      setResetError('New password and confirmation do not match.')
      return
    }

    // Bypass auth: simulate a successful password reset locally
    setResetSuccess(true)

    // Clear the form so returning to it starts fresh
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleLogOut = () => {
    try {
      localStorage.removeItem('quisar_user')
    } catch {
      // storage unavailable — fail silently
    }
    navigate('/login')
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-300 ${
        darkMode
          ? 'dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 dark:text-gray-100'
          : 'bg-gradient-to-b from-pink-50 via-white to-white text-gray-900'
      }`}
    >
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-4 border-b backdrop-blur-sm bg-white/80 border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
        <button
          type="button"
          onClick={() => navigate('/home')}
          aria-label="Go back to Home"
          className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-900 dark:text-slate-100 truncate">Settings</h1>
          <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
            Manage your preferences and account.
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-6 pb-28">
        <div className="flex flex-col gap-5">
          {/* Appearance */}
          <section className="rounded-xl bg-white border border-gray-200 p-5 dark:bg-gray-800/60 dark:border-gray-700">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-4">
              Appearance
            </h2>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon size={22} className="text-[#e06691]" />
                ) : (
                  <Sun size={22} className="text-[#e06691]" />
                )}
                <div>
                  <p className="text-base font-semibold text-gray-900 dark:text-slate-100">
                    {darkMode ? 'Dark Mode' : 'Light Mode'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Toggle between light and dark appearance.
                  </p>
                </div>
              </div>

              {/* Toggle switch */}
              <button
                type="button"
                role="switch"
                aria-checked={darkMode}
                aria-label="Toggle dark mode"
                onClick={toggleTheme}
                className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors ${
                  darkMode ? 'bg-[#e06691]' : 'bg-slate-600/70'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Account */}
          <section className="rounded-xl bg-white border border-gray-200 p-5 dark:bg-gray-800/60 dark:border-gray-700">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-4">
              Account
            </h2>

            <div className="flex flex-col">
              {/* About Us */}
              <button
                type="button"
                onClick={openAbout}
                className="flex items-center gap-3 py-3.5 text-left transition-colors group"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e06691]/10 text-[#e06691] border border-[#e06691]/30 group-hover:bg-[#e06691]/20 transition-colors">
                  <Info size={20} />
                </span>
                <span className="flex-1">
                  <span className="block text-base font-semibold text-gray-900 dark:text-slate-100">
                    About Us
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-slate-400">
                    Learn more about Quisar.
                  </span>
                </span>
                <span className="text-gray-400 group-hover:text-[#e06691] dark:text-slate-500 transition-colors">
                  ›
                </span>
              </button>

              <div className="h-px bg-gray-200 dark:bg-slate-700/60" />

              {/* Reset Password */}
              <button
                type="button"
                onClick={openReset}
                className="flex items-center gap-3 py-3.5 text-left transition-colors group"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e06691]/10 text-[#e06691] border border-[#e06691]/30 group-hover:bg-[#e06691]/20 transition-colors">
                  <KeyRound size={20} />
                </span>
                <span className="flex-1">
                  <span className="block text-base font-semibold text-gray-900 dark:text-slate-100">
                    Reset Password
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-slate-400">
                    Update your account password.
                  </span>
                </span>
                <span className="text-gray-400 group-hover:text-[#e06691] dark:text-slate-500 transition-colors">
                  ›
                </span>
              </button>
            </div>
          </section>

          {/* Sign out */}
          <section className="rounded-xl bg-white border border-gray-200 p-5 dark:bg-gray-800/60 dark:border-gray-700">
            <button
              type="button"
              onClick={handleLogOut}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-[#e06691] hover:bg-[#d87093] active:bg-[#d87093] transition-colors"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </section>
        </div>
      </main>

      {/* About Us Modal */}
      {aboutOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeAbout}
            aria-hidden="true"
          />
          <div className="relative w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-100">About Us</h2>
                <button
                  type="button"
                  onClick={closeAbout}
                  aria-label="Close About Us"
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-slate-400 leading-relaxed">
                Quisar is your creative space for learning, note-taking, and
                exploring new ideas.
              </p>

              <p className="text-slate-400 leading-relaxed">
                Build your study toolkit with lessons, quick notes, and fun
                challenges — all in one place.
              </p>

              <div className="flex items-center gap-2 pt-2 text-sm text-slate-400">
                <span className="text-[#e06691]">Quisar</span>
                <span>·</span>
                <span>v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {resetOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeReset}
            aria-hidden="true"
          />
          <div className="relative w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl max-h-[85vh] overflow-y-auto">
            <form
              onSubmit={handleResetPassword}
              className="flex flex-col gap-4 p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-100">
                  Reset Password
                </h2>
                <button
                  type="button"
                  onClick={closeReset}
                  aria-label="Close Reset Password"
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {resetSuccess ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <span className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                    <Check size={28} />
                  </span>
                  <p className="text-slate-100 font-semibold">
                    Password updated!
                  </p>
                  <p className="text-sm text-slate-400">
                    Your password has been reset successfully.
                  </p>
                  <button
                    type="button"
                    onClick={closeReset}
                    className="mt-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#e06691] hover:bg-[#d87093] transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <label
                      htmlFor="current-password"
                      className="block text-sm font-medium text-slate-400 mb-1.5"
                    >
                      Current Password
                    </label>
                    <input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your current password"
                      autoComplete="current-password"
                      className="w-full px-4 py-3 rounded-xl bg-[#0E0F17] border border-slate-700/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#e06691] focus:ring-2 focus:ring-[#e06691]/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium text-slate-400 mb-1.5"
                    >
                      New Password
                    </label>
                    <input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      className="w-full px-4 py-3 rounded-xl bg-[#0E0F17] border border-slate-700/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#e06691] focus:ring-2 focus:ring-[#e06691]/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-slate-400 mb-1.5"
                    >
                      Confirm New Password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your new password"
                      autoComplete="new-password"
                      className="w-full px-4 py-3 rounded-xl bg-[#0E0F17] border border-slate-700/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#e06691] focus:ring-2 focus:ring-[#e06691]/20 transition-colors"
                    />
                  </div>

                  {resetError && (
                    <p className="text-sm text-red-400">{resetError}</p>
                  )}

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={closeReset}
                      className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#e06691] hover:bg-[#d87093] transition-colors"
                    >
                      Reset Password
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings