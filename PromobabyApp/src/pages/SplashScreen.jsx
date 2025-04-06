import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import SenhaApiCard from "./PassWord";

export default function SplashScreen() {
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSenhaValida = () => {
    navigate("/home"); // Redireciona somente se a senha for válida
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light"
    >
      <Image
        src="src/assets/IMAGENS/FAVICON/bebe.png"
        alt="Logo PromoBaby"
        className="splash-logo"
        width={120}
        height={120}
      />
      <h2 className="mt-3 text-primary fw-bold">PromoBaby</h2>

      <SenhaApiCard onSenhaValida={handleSenhaValida} />
    </Container>
  );
}
