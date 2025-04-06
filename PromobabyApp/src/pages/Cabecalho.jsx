import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
// Cabecalho.jsx
import logoBebe from '/public/IMAGENS/FAVICON/bebe.png'; // ajuste o caminho conforme a estrutura

<Image src={logoBebe} alt="Logo PromoBaby" width={50} height={50} />


export default function Cabecalho() {
  return (
    <Container fluid className="bg-white py-3 shadow-sm border-bottom mb-3">
      <Row className="align-items-center">
        <Col xs="auto">
          <Image
            src={logoBebe}
            alt="Logo PromoBaby"
            width={50}
            height={50}
            roundedCircle
          />
        </Col>
        <Col>
          <h4 className="m-0 fw-bold text-primary">PromoBaby</h4>
        </Col>
      </Row>
    </Container>
  )
}
