import { Routes, Route } from 'react-router-dom'
import './App.css'
import Splash from './Splash'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import Learn from './Learn'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/learn" element={<Learn />} />
    </Routes>
  )
}

export default App