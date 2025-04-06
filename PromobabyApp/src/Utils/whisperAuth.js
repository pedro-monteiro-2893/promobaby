export async function transcreverAudio(audioFile) {
    const formData = new FormData()
    formData.append("file", audioFile)
    formData.append("model", "whisper-1")
    formData.append("language", "pt")
  
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: formData
    })
  
    if (!response.ok) {
        console.log(response)
      throw new Error("Erro ao transcrever o áudio");
    }
  
    const data = await response.json()
    return data.text
  }
  