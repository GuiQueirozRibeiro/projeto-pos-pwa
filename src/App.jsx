import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./components/AppLayout.jsx";

import { Suspense, lazy } from "react";

// Lazy loading das páginas (Code-splitting) para otimizar o carregamento
const Login = lazy(() => import("./pages/Login.jsx"));
const Registro = lazy(() => import("./pages/Registro.jsx"));
const Hoje = lazy(() => import("./pages/Hoje.jsx"));
const Foco = lazy(() => import("./pages/Foco.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Sobre = lazy(() => import("./pages/Sobre.jsx"));
const Perfil = lazy(() => import("./pages/Perfil.jsx"));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="vh-100 d-flex justify-content-center align-items-center">Carregando...</div>}>
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
            </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
