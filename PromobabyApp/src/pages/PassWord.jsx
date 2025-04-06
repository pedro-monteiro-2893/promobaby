import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { setSenhaParaChave } from "../Utils/whisperAuth";


export default function SenhaApiCard({ onSenhaValida }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

  const handlePasswordChange = (e) => {
    setSenha(e.target.value);
    setErro(false);
  };

  const handleEntrar = () => {
    const sucesso = setSenhaParaChave(senha);
    if (sucesso) {
      onSenhaValida(); // Redireciona ou executa ação no componente pai
    } else {
      setErro(true); // Mostra erro se a senha estiver errada
    }
  };

  return (
    <Card className="mt-4 p-3 shadow-sm rounded-4 w-100" style={{ maxWidth: 400 }}>
      <Card.Body>
        <Form.Group controlId="senhaApi">
          <Form.Label className="fw-bold">🔐 Insira a senha da API</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite a senha para descriptografar"
            value={senha}
            onChange={handlePasswordChange}
            isInvalid={erro}
          />
          <Form.Control.Feedback type="invalid">
            Senha incorreta. Tente novamente.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex justify-content-end mt-3">
          <Button onClick={handleEntrar} variant="primary">
            Entrar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
