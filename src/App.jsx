import { Routes, Route } from 'react-router-dom'
import './App.css'
import Splash from './Splash'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App