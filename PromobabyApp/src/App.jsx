import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/promobaby" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
