import { Container, Card, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  if (!user) return null;

  return (
    <Container className="py-4" style={{ maxWidth: "600px" }}>
      <h2 className="fw-bold mb-4">Meu Perfil</h2>
      
      <Card className="shadow-sm border-0 rounded-4 mb-4 bg-body-tertiary">
        <Card.Body className="text-center p-4">
          <div 
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold shadow-sm"
            style={{ width: "80px", height: "80px", fontSize: "2rem" }}
          >
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </div>
          <h4 className="fw-bold mb-1">{user.displayName || "Usuário"}</h4>
          <p className="text-muted mb-0">{user.email}</p>
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0 rounded-4 mb-4 bg-body-tertiary">
        <Card.Body>
          <h5 className="fw-bold mb-3">Preferências</h5>
          
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <i className="bi bi-palette me-2"></i> Tema
            </div>
            <select 
              className="form-select w-auto bg-body text-body" 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
              <option value="system">Sistema</option>
            </select>
          </div>
        </Card.Body>
      </Card>

      <Button variant="outline-danger" className="w-100 rounded-pill py-2 fw-bold" onClick={handleLogout}>
        <i className="bi bi-box-arrow-right me-2"></i> Sair da conta
      </Button>
    </Container>
  );
}
