import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import InstallPwaButton from "./InstallPwaButton.jsx";
import OfflineBanner from "./OfflineBanner.jsx";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  // Helper para aplicar classe 'active' e alto contraste aos ícones do bottom nav
  const getNavClass = ({ isActive }) =>
    `nav-link d-flex flex-column align-items-center bottom-nav-item ${isActive ? "active fw-bold" : ""}`;

  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      <OfflineBanner />
      
      {/* Top Navbar */}
      <Navbar className="border-bottom px-3 py-2 flex-shrink-0 bg-body" sticky="top">
        <Navbar.Brand className="fw-bold text-primary d-flex align-items-center m-0">
          <i className="bi bi-clock-history me-2 fs-4"></i> Ritmo
        </Navbar.Brand>
        
        <Navbar.Collapse className="justify-content-end">
          <InstallPwaButton className="me-3" />
          <Dropdown align="end">
            <Dropdown.Toggle 
              as="div" 
              role="button"
              tabIndex={0}
              aria-label="Menu de opções do usuário"
              id="dropdown-basic" 
              className="d-flex align-items-center bg-transparent p-0 text-decoration-none no-caret" 
              style={{ cursor: "pointer" }}
            >
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px", fontSize: "14px", fontWeight: "600" }}
              >
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
              </div>
              <i className="bi bi-chevron-down ms-2 text-body"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Header>{user?.displayName || user?.email}</Dropdown.Header>
              
              <Dropdown.Item onClick={() => navigate("/perfil")}>
                <i className="bi bi-person me-2"></i> Meu Perfil
              </Dropdown.Item>

              <Dropdown.Divider />
              
              <Dropdown.Item onClick={() => setTheme("light")} active={theme === "light"}>
                <i className="bi bi-sun me-2"></i> Tema Claro
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setTheme("dark")} active={theme === "dark"}>
                <i className="bi bi-moon me-2"></i> Tema Escuro
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setTheme("system")} active={theme === "system"}>
                <i className="bi bi-laptop me-2"></i> Usar do Sistema
              </Dropdown.Item>

              <Dropdown.Divider />
              
              <Dropdown.Item onClick={handleLogout} className="text-danger">
                <i className="bi bi-box-arrow-right me-2"></i> Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Content Area (Scrollable) */}
      <main className="flex-grow-1 overflow-auto pb-5 pb-md-0" style={{ backgroundColor: "var(--bs-body-bg)" }}>
        <Container className="py-4">
          <Outlet />
        </Container>
      </main>

      {/* Bottom Navigation (Mobile/App style) */}
      <Nav className="bg-body border-top justify-content-around py-2 flex-shrink-0 fixed-bottom d-md-none">
        <NavLink to="/" className={getNavClass} end>
          <i className="bi bi-calendar2-check fs-4 mb-1"></i>
          <span style={{ fontSize: "12px" }}>Hoje</span>
        </NavLink>
        <NavLink to="/foco" className={getNavClass}>
          <i className="bi bi-play-circle fs-4 mb-1"></i>
          <span style={{ fontSize: "12px" }}>Foco</span>
        </NavLink>
        <NavLink to="/dashboard" className={getNavClass}>
          <i className="bi bi-graph-up fs-4 mb-1"></i>
          <span style={{ fontSize: "12px" }}>Dados</span>
        </NavLink>
        <NavLink to="/sobre" className={getNavClass}>
          <i className="bi bi-info-circle fs-4 mb-1"></i>
          <span style={{ fontSize: "12px" }}>Sobre</span>
        </NavLink>
      </Nav>
    </div>
  );
}
