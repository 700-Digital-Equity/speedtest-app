import './App.css'
import Comparison from './components/comparison/Comparison'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import './components/components.css';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comparison" element={<Comparison />} />
      </Routes>
    </>
    
  )
}

export default App
