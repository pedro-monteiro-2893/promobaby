import React, { useState } from 'react'
import { Container, Form, Button, Card } from 'react-bootstrap'
import Gravacao from './Gravacao'
import GravadorAudio from './Gravador'

export default function Home() {
  const [link, setLink] = useState('')
  const [image, setImage] = useState(null)
  const [senha, setSenha] = useState('')

  const handleLinkChange = (e) => setLink(e.target.value)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setImage(file)
    } else {
      alert('Apenas imagens PNG ou JPEG são permitidas.')
    }
  }

  const handlePassword = (e) => {
    const valor = e.target.value;
    setSenha(valor);
    onSenhaChange(valor); 
  };

  return (
    <Container fluid className="min-vh-100 d-flex flex-column justify-content-between p-3 bg-light">

      {/* Card do Link */}
      <Card className="mb-3 shadow-sm rounded-4">
        <Card.Body>
          <Form.Group>
            <Form.Label className="fw-bold">🔗 Link para divulgação</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cole o link aqui"
              value={link}
              onChange={handleLinkChange}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Card do Upload de Imagem */}
      <Card className="mb-3 shadow-sm rounded-4">
        <Card.Body>
          <Form.Group className='mb-3'>
            <Form.Label className="fw-bold">🖼️ Anexar imagem (PNG ou JPEG)</Form.Label>
            <Form.Control type="file" accept="image/png, image/jpeg" onChange={handleImageUpload} />
            {image && (
              <div className="mt-2 small text-muted">
                <strong>Selecionado:</strong> {image.name}
              </div>
            )}
          </Form.Group>
          <Card.Body className='shadow-sm rounded-4'>
            <h8>Se o link não gerar imagem automaticamente, anexar aqui uma imagem que represnete o produto</h8>
          </Card.Body>
        </Card.Body>
      </Card>
      {/* Espaço vazio pra empurrar o botão pra baixo */}
      <div style={{ height: '80px' }}></div>

      {/* Botão flutuante de gravação */}
      <GravadorAudio/>
    </Container>
  )
}
