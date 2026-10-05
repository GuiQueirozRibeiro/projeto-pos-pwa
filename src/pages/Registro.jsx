import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { traduzErroAuth } from "../utils/authErrors.js";
import InstallPwaButton from "../components/InstallPwaButton.jsx";

export default function Registro() {
  const { user, register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!name.trim()) throw { code: "custom", message: "Informe seu nome." };
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "custom") {
        setError(err.message);
      } else {
        setError(traduzErroAuth(err.code));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container as="main" className="d-flex align-items-center justify-content-center" style={{ minHeight: "100svh", backgroundColor: "var(--bs-body-bg)" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        
        <div className="text-center mb-4">
          <i className="bi bi-clock-history text-primary" style={{ fontSize: "3rem" }}></i>
          <h1 className="fw-bold mt-2 text-primary">Ritmo</h1>
          <p className="text-muted">Seu tempo, no seu controle.</p>
        </div>

        <Card className="shadow-sm border-0 rounded-4 p-3 p-md-4">
          <Card.Body>
            <h2 className="fs-4 fw-bold text-center mb-4">Criar conta</h2>

            {error && <Alert variant="danger" className="py-2">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nome completo</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Como quer ser chamado?" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Senha</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="******" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </Form.Group>

              <Button disabled={loading} className="w-100 rounded-pill py-2 fw-bold" type="submit">
                {loading ? "Aguarde..." : "Cadastrar"}
              </Button>
            </Form>

            <div className="text-center mt-4">
              <span className="text-muted">Já tem uma conta?</span>{" "}
              <Link to="/login" className="p-0 text-decoration-none fw-bold">
                Entrar aqui
              </Link>
            </div>
          </Card.Body>
        </Card>

        <div className="text-center mt-4">
          <InstallPwaButton variant="outline-secondary" />
        </div>
      </div>
    </Container>
  );
}
