import CryptoJS from "crypto-js";

const CHAVE_CRIPTOGRAFADA = "U2FsdGVkX19ptKKBSuCjiNFL9euAGbSq2Gy7JgfdeW5gNAqTIwboi0+NazjGcpLlUAw3dLgcis970E5tEav84k99elhyGTihljg7i1gRXUS7R56ROrk2x0zp7LFYWYfFu0Y0O/HrveEC6IOV0Ldn0OCBiopzt4wcpHN096AmET+bxiWJH2e5Qv5+oCPtpftQfPBtS6a7VFgoDtgp/FdGkjtuzUC6x2xEWGCXX6KqmGUhlZQ7zh5+Q5ARH6U01Ljl";

let chaveDescriptografada = null;

export function setSenhaParaChave(senha) {
  try {
    const bytes = CryptoJS.AES.decrypt(CHAVE_CRIPTOGRAFADA, senha);
    const chave = bytes.toString(CryptoJS.enc.Utf8);
    if (!chave) throw new Error("Senha inválida");
    chaveDescriptografada = chave;
    return true;
  } catch (error) {
    return false;
  }
}

export function getChave() {
  return chaveDescriptografada;
}

export async function transcreverAudio(audioFile) {
  const chave = getChave();
  if (!chave) throw new Error("Chave não definida");

  const formData = new FormData();
  formData.append("file", audioFile);
  formData.append("model", "whisper-1");
  formData.append("language", "pt");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${chave}`,
    },
    body: formData,
  });

  if (!response.ok) {
    console.log(await response.json());
    throw new Error("Erro ao transcrever o áudio");
  }

  const data = await response.json();
  return data.text;
}
