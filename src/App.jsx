import { Routes, Route } from 'react-router-dom'
import './App.css'
import Splash from './Splash'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import Learn from './Learn'
import QuizPage from './QuizPage'
import RiddlePage from './RiddlePage'
import Notes from './Notes'
import Settings from './Settings'
import Records from './Records'
import RecordDetail from './RecordDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/riddle" element={<RiddlePage />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/records" element={<Records />} />
      <Route path="/records/:id" element={<RecordDetail />} />
    </Routes>
  )
}

export default App