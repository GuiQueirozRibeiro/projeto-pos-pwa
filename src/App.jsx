import { Container, Card, Badge } from "react-bootstrap";

/**
 * Tela provisória da Fase 0: serve só para confirmar que Vite, React,
 * Bootstrap, o tema e o service worker estão funcionando.
 * Na Fase 1 este arquivo vira o roteador do app (como o App.jsx do professor).
 */
export default function App() {
  const checks = [
    "Vite + React 19",
    "react-bootstrap + tema do Ritmo",
    "vite-plugin-pwa (manifest + service worker)",
    "Firebase CLI + emuladores (Auth / Firestore)",
  ];

  return (
    <Container className="py-5" style={{ maxWidth: 560 }}>
      <h1 className="fw-bold mb-1">Ritmo</h1>
      <p className="text-body-secondary mb-4">Foco e blocos de tempo — Fase 0 (base do projeto)</p>

      <Card>
        <Card.Body>
          <Card.Title className="h6 mb-3">Base configurada</Card.Title>
          <ul className="list-unstyled mb-0 d-grid gap-2">
            {checks.map((item) => (
              <li key={item} className="d-flex align-items-center gap-2">
                <Badge bg="success">ok</Badge>
                {item}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}
