/**
 * Ponto de entrada do React.
 *
 * Ordem dos imports de CSS importa: primeiro o Bootstrap (base), depois o
 * nosso index.css, que sobrescreve as variáveis do Bootstrap com o tema
 * do Ritmo.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
