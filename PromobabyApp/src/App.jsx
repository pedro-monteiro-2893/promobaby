import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Cabecalho from './pages/Cabecalho'

function App() {

  return (
    <Router>
      <Cabecalho/>
      <Routes>
        <Route path="/promobaby" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
