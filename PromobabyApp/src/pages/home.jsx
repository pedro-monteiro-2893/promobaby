import React, { useState } from 'react'
import { Container, Form, Button, Card } from 'react-bootstrap'
import Gravacao from './Gravacao'
import GravadorAudio from './Gravador'
import { ACESSE_LINK, PADRAO_MENSAGEM_PAGUE_MENOS, TEXTO_BASE_LINK } from '../Utils/Constantes'
import { obterRespostaChatGPT } from '../Utils/ChatAi'

export default function Home() {
  const [link, setLink] = useState('')
  const [image, setImage] = useState(null)
  const [resposta, setResposta] = useState(null);
  const [carregando, setCarregando] = useState(false);


  const handleLinkChange = (e) => setLink(e.target.value)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setImage(file)
    } else {
      alert('Apenas imagens PNG ou JPEG são permitidas.')
    }
  }

  const enviarParaChatGPT = async () => {
        try {
            setCarregando(true);
            const promptFinal = `${ACESSE_LINK} ${link}\n\n ${TEXTO_BASE_LINK}`;
            const respostaGPT = await obterRespostaChatGPT(promptFinal);
        setResposta(respostaGPT);
      } catch (err) {
        alert("Erro ao obter resposta do ChatGPT");
        console.error(err);
      } finally {
        setCarregando(false);
      }
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

          <Button
            variant="success"
            className="mt-2"
            onClick={enviarParaChatGPT}
            disabled={carregando}
          >
            {carregando ? "Enviando..." : "🤖 Mensagem Padrão"}
          </Button>
        </Card.Body>

        {resposta && 
         <div>
                <Card className="mt-3 p-3 bg-white rounded-4 shadow-sm">
                  <h6 className="fw-bold">💡 Resposta do ChatGPT</h6>
                  <p>{resposta}</p>
                </Card>

            <Button
              className="mt-2"
              variant="success"
              onClick={() => {
                const numero = "5583996650645"; // Substitua pelo número desejado
                const mensagem = encodeURIComponent(resposta);
                window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
              }}
            >
              📲 Enviar via WhatsApp
            </Button>
              </div>
              }

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

      <GravadorAudio link={link} />
    </Container>
  )
}
