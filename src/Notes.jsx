import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  StickyNote,
  Save,
  X,
} from 'lucide-react'

const STORAGE_KEY = 'quisar_notes'

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function loadNotesFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function formatTimestamp(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function Notes() {
  const navigate = useNavigate()

  const [notes, setNotes] = useState(loadNotesFromStorage)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const titleInputRef = useRef(null)

  // Persist notes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    } catch {
      // storage unavailable — fail silently
    }
  }, [notes])

  // Focus the title input when the editor opens
  useEffect(() => {
    if (editorOpen) {
      titleInputRef.current?.focus()
    }
  }, [editorOpen])

  // Close the editor with the Escape key
  useEffect(() => {
    if (!editorOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setEditorOpen(false)
        setEditingId(null)
        setTitle('')
        setContent('')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [editorOpen])

  const openNewNote = () => {
    setEditingId(null)
    setTitle('')
    setContent('')
    setEditorOpen(true)
  }

  const openEditNote = (note) => {
    setEditingId(note.id)
    setTitle(note.title)
    setContent(note.content)
    setEditorOpen(true)
  }

  const closeEditor = () => {
    setEditorOpen(false)
    setEditingId(null)
    setTitle('')
    setContent('')
  }

  const handleSaveNote = () => {
    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle && !trimmedContent) return

    const now = new Date().toISOString()
    const finalTitle = trimmedTitle || 'Untitled note'

    if (editingId) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: finalTitle,
                content: trimmedContent,
                updatedAt: now,
              }
            : note
        )
      )
    } else {
      const newNote = {
        id: generateId(),
        title: finalTitle,
        content: trimmedContent,
        createdAt: now,
        updatedAt: now,
      }
      setNotes((prev) => [newNote, ...prev])
    }

    closeEditor()
  }

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id))
    if (editingId === id) closeEditor()
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
          <h1 className="text-xl font-bold text-slate-100 truncate">My Notes</h1>
          <p className="text-xs text-slate-400 truncate">
            Jot down study ideas and quick thoughts.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewNote}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#e06691] hover:bg-[#d87093] active:bg-[#d87093] transition-colors"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">New Note</span>
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-5 py-6 pb-28">
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {notes.map((note) => (
              <article
                key={note.id}
                className="flex flex-col gap-3 p-5 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-[#e06691]/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-lg font-semibold text-slate-100 leading-snug break-words min-w-0">
                    {note.title}
                  </h2>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEditNote(note)}
                      aria-label={`Edit ${note.title}`}
                      title="Edit note"
                      className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-[#e06691] hover:bg-[#e06691]/10 transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(note.id)}
                      aria-label={`Delete ${note.title}`}
                      title="Delete note"
                      className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {note.content && (
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {note.content}
                  </p>
                )}

                <p className="mt-auto pt-2 text-xs text-slate-400">
                  Last updated {formatTimestamp(note.updatedAt)}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-700/60">
              <StickyNote size={32} className="text-[#e06691]" />
            </span>
            <p className="text-slate-400">
              No notes yet. Click + to write your first note!
            </p>
            <button
              type="button"
              onClick={openNewNote}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#e06691] hover:bg-[#d87093] active:bg-[#d87093] transition-colors"
            >
              <Plus size={18} />
              Write a note
            </button>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={openNewNote}
        aria-label="Add a new note"
        className="fixed bottom-6 right-6 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-[#e06691] text-white shadow-lg shadow-[#e06691]/30 hover:bg-[#d87093] active:bg-[#d87093] transition-colors"
      >
        <Plus size={26} />
      </button>

      {/* Note Editor Modal */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeEditor}
            aria-hidden="true"
          />
          <div className="relative w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl max-h-[85vh] overflow-y-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveNote()
              }}
              className="flex flex-col gap-4 p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-100">
                  {editingId ? 'Edit Note' : 'New Note'}
                </h2>
                <button
                  type="button"
                  onClick={closeEditor}
                  aria-label="Close editor"
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div>
                <label
                  htmlFor="note-title"
                  className="block text-sm font-medium text-slate-400 mb-1.5"
                >
                  Note Title
                </label>
                <input
                  id="note-title"
                  ref={titleInputRef}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Quantum Physics Basics"
                  autoComplete="off"
                  className="w-full px-4 py-3 rounded-xl bg-[#0E0F17] border border-slate-700/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#e06691] focus:ring-2 focus:ring-[#e06691]/20 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="note-content"
                  className="block text-sm font-medium text-slate-400 mb-1.5"
                >
                  Note Content
                </label>
                <textarea
                  id="note-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your thoughts here..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-[#0E0F17] border border-slate-700/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#e06691] focus:ring-2 focus:ring-[#e06691]/20 transition-colors resize-y"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#e06691] hover:bg-[#d87093] active:bg-[#d87093] transition-colors"
                >
                  <Save size={18} />
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notes