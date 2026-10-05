import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./components/AppLayout.jsx";

// Paginas
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Hoje from "./pages/Hoje.jsx";
import Foco from "./pages/Foco.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Sobre from "./pages/Sobre.jsx";
import Perfil from "./pages/Perfil.jsx";
import Relatorio from "./pages/Relatorio.jsx";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
          {/* Rota Pública */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Rotas Privadas que usam o AppLayout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* O index indica a rota "/" dentro de AppLayout */}
            <Route index element={<Hoje />} />
            <Route path="foco" element={<Foco />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="relatorio" element={<Relatorio />} />
          </Route>
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
