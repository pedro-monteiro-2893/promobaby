import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Image } from 'react-bootstrap'
import '../assets/SplashScreen.css'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home') // Redireciona após 2.5 segundos
    }, 2500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <Image
        src="src\assets\IMAGENS\FAVICON\bebe.png"
        alt="Logo PromoBaby"
        className="splash-logo"
        width={120}
        height={120}
      />
      <h2 className="mt-3 text-primary fw-bold">PromoBaby</h2>
    </Container>
  )
}
