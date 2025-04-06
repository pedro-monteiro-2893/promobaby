import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Cabecalho from './pages/Cabecalho'
import SplashScreen from './pages/SplashScreen'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/promobaby" element={<SplashScreen/>}/>
        <Route path="/home" element={
          <>
          <Cabecalho/>
          <Home />
          </>
          }/>
      </Routes>
    </Router>
  )
}

export default App
