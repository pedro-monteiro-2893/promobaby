// chatAi.js
import CryptoJS from "crypto-js";

const CHAVE_CRIPTOGRAFADA = "U2FsdGVkX19ptKKBSuCjiNFL9euAGbSq2Gy7JgfdeW5gNAqTIwboi0+NazjGcpLlUAw3dLgcis970E5tEav84k99elhyGTihljg7i1gRXUS7R56ROrk2x0zp7LFYWYfFu0Y0O/HrveEC6IOV0Ldn0OCBiopzt4wcpHN096AmET+bxiWJH2e5Qv5+oCPtpftQfPBtS6a7VFgoDtgp/FdGkjtuzUC6x2xEWGCXX6KqmGUhlZQ7zh5+Q5ARH6U01Ljl";

let chaveDescriptografada = null;

export function setSenhaChat(senha) {
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

export function getChaveChat() {
  return chaveDescriptografada;
}

export async function obterRespostaChatGPT(mensagem) {
  const chave = getChaveChat();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${chave}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: mensagem }],
    }),
  });

  if (!response.ok) throw new Error("Erro ao chamar o ChatGPT");

  const data = await response.json();
  return data.choices[0]?.message?.content || "";
}
