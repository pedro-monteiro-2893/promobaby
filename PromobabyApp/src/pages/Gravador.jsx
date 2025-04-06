import React, { useState, useRef } from 'react'
import { Button, Card } from 'react-bootstrap'
import { transcreverAudio } from '../Utils/whisperAuth'
import { obterRespostaChatGPT } from '../Utils/ChatAi'

export default function GravadorAudio() {
  const [gravando, setGravando] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const [duracao, setDuracao] = useState(0)
  const [nomeArquivo, setNomeArquivo] = useState(null)
  const [arquivoAudio, setArquivoAudio] = useState(null)
  const [transcricao, setTranscricao] = useState(null)
  const [resposta, setResposta] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const mediaRecorderRef = useRef(null)
  const audioChunks = useRef([])
  const startTimeRef = useRef(null)

  const iniciarGravacao = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.onstart = () => {
      audioChunks.current = []
      startTimeRef.current = Date.now()
      setGravando(true)
      setTranscricao(null) // limpa transcrição anterior
    }

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.current.push(e.data)
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks.current, { type: 'audio/webm' })
      const url = URL.createObjectURL(blob)
      const nome = `gravacao-${Date.now()}.webm`
      const file = new File([blob], nome, { type: 'audio/webm' })

      setAudioUrl(url)
      setNomeArquivo(nome)
      setDuracao(Math.floor((Date.now() - startTimeRef.current) / 1000))
      setArquivoAudio(file)
      setGravando(false)
    }

    mediaRecorderRef.current = mediaRecorder
    mediaRecorder.start()
  }

  const pararGravacao = () => {
    mediaRecorderRef.current.stop()
  }

  const enviarParaTranscricao = async () => {
    if (!arquivoAudio) return

    try {
      const texto = await transcreverAudio(arquivoAudio)
      setTranscricao(texto)
    } catch (err) {
      alert("Erro na transcrição")
      console.error(err)
    }
  }

  const formatarDuracao = (segundos) => {
    const min = Math.floor(segundos / 60).toString().padStart(2, '0')
    const sec = (segundos % 60).toString().padStart(2, '0')
    return `${min}:${sec}`
  }

  const enviarParaChatGPT = async () => {
    try {
      setCarregando(true);
      const respostaGPT = await obterRespostaChatGPT(transcricao);
      setResposta(respostaGPT);
    } catch (err) {
      alert("Erro ao obter resposta do ChatGPT");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Card className="mb-3 shadow-sm rounded-4">
      <Card.Body>
        <h6 className="fw-bold">🎤 Gravação de Áudio</h6>

        <Button
          variant={gravando ? 'secondary' : 'danger'}
          onClick={gravando ? pararGravacao : iniciarGravacao}
          className="mb-3"
        >
          {gravando ? '⏹️ Parar Gravação' : '🎙️ Iniciar Gravação'}
        </Button>

        {audioUrl && (
          <div>
            <p className="mb-1 text-muted">{nomeArquivo}</p>
            <p className="mb-1 text-secondary">Duração: {formatarDuracao(duracao)}</p>
            <audio controls src={audioUrl} className="mb-2" />

            <div>
              <Button variant="primary" onClick={enviarParaTranscricao}>
                📤 Transcrever Áudio
              </Button>
            </div>

            {transcricao && (
                <div>
                <Card className="mt-3 p-3 bg-light rounded-4 shadow-sm">
                  <h6 className="fw-bold">📝 Transcrição</h6>
                  <p>{transcricao}</p>
                </Card>
                <Button
                  variant="success"
                  className="mt-2"
                  onClick={enviarParaChatGPT}
                  disabled={carregando}
                >
                  {carregando ? "Enviando..." : "🤖 Enviar para ChatGPT"}
                </Button>
              </div>
        
        )
            }
          </div>
        )}

        {resposta && (
        <Card className="mt-3 p-3 bg-white rounded-4 shadow-sm">
          <h6 className="fw-bold">💡 Resposta do ChatGPT</h6>
          <p>{resposta}</p>
        </Card>
      )}

      </Card.Body>
    </Card>
  )
}
