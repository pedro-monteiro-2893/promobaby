import React, { useState, useRef } from 'react'
import { Button, Card } from 'react-bootstrap'
import { transcreverAudio } from '../Utils/whisperAuth'

export default function GravadorAudio() {
  const [gravando, setGravando] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const [duracao, setDuracao] = useState(0)
  const [nomeArquivo, setNomeArquivo] = useState(null)

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
    }

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.current.push(e.data)
    }

    mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        const nome = `gravacao-${Date.now()}.webm`
        setAudioUrl(url)
        setNomeArquivo(nome)
      
        const duracaoSeg = Math.floor((Date.now() - startTimeRef.current) / 1000)
        setDuracao(duracaoSeg)
        setGravando(false)
      
        // Transcrição aqui 👇
        const file = new File([blob], nome, { type: 'audio/webm' })
        try {
          const texto = await transcreverAudio(file)
          alert(`Transcrição: ${texto}`)
          // Ou setTranscricao(texto) para mostrar na tela
        } catch (err) {
          alert("Erro na transcrição")
          console.error(err)
        }
      }
      

    mediaRecorderRef.current = mediaRecorder
    mediaRecorder.start()
  }

  const pararGravacao = () => {
    mediaRecorderRef.current.stop()
  }

  const formatarDuracao = (segundos) => {
    const min = Math.floor(segundos / 60).toString().padStart(2, '0')
    const sec = (segundos % 60).toString().padStart(2, '0')
    return `${min}:${sec}`
  }

  return (
    <>
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
              <audio controls src={audioUrl} />
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  )
}
