import { Card } from "react-bootstrap"

export default function Gravacao({ nomeArquivo, duracao }) {
  // Função para formatar duração em segundos para mm:ss
  const formatarDuracao = (segundos) => {
    const min = Math.floor(segundos / 60).toString().padStart(2, '0')
    const sec = Math.floor(segundos % 60).toString().padStart(2, '0')
    return `${min}:${sec}`
  }

  return (
    <Card className="mb-3 shadow-sm rounded-4">
      <Card.Body>
        <h6 className="mb-1 fw-bold">🎧 Áudio gravado</h6>
        <p className="mb-0 text-muted">{nomeArquivo || 'Sem nome'}</p>
        <small className="text-secondary">Duração: {formatarDuracao(duracao || 0)}</small>
      </Card.Body>
    </Card>
  )
}
