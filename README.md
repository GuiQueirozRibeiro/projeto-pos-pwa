# Ritmo — Foco e blocos de tempo

PWA em **React + Firebase** desenvolvido como Projeto de Disciplina da pós-graduação (Infnet).

O Ritmo ajuda você a **planejar o dia em blocos de horário**, **executar cada bloco com um timer Pomodoro** e,
no fim do dia, **ver no Dashboard** o que foi feito e quanto tempo você realmente focou.

> Projeto construído a partir da base do professor
> ([kndrio/infnet-pwa-react](https://github.com/kndrio/infnet-pwa-react) e
> [kndrio/infnet-26e3-pwa](https://github.com/kndrio/infnet-26e3-pwa)), mantendo a mesma stack e os mesmos padrões
> e expandindo o escopo. Veja [docs/07-decisoes.md](docs/07-decisoes.md).

## Status

| Fase | Conteúdo | Status |
|---|---|---|
| 0 | Base: Vite/React, PWA, Firebase CLI, emuladores, regras, docs | ✅ |
| 1 | Autenticação + App Shell (layout, navegação) | ⏳ |
| 2 | Linha do tempo do dia (Home) | ⏳ |
| 3 | Timer Pomodoro | ⏳ |
| 4 | Dashboard | ⏳ |
| 5 | PWA final + Firebase real | ⏳ |
| 6 | Relatório + documentação final | ⏳ |

Detalhes de cada fase em [docs/diario-de-fases.md](docs/diario-de-fases.md).

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + [React Router 7](https://reactrouter.com/)
- [react-bootstrap](https://react-bootstrap.github.io/) + Bootstrap 5 (tema próprio)
- [Firebase](https://firebase.google.com/): Authentication + Cloud Firestore
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox): manifest + service worker
- [Vitest](https://vitest.dev/): testes das funções puras

## Como rodar

Pré-requisitos: Node 20+ e Java 11+ (o emulador do Firestore é um `.jar`).

```bash
npm install
cp .env.example .env     # já vem pronto para os emuladores

# terminal 1 — emuladores do Firebase (Auth + Firestore + painel em http://localhost:4000)
npm run emulators

# terminal 2 — app em http://localhost:5173
npm run dev
```

Os dados dos emuladores são salvos em `.emulator-data/` quando você encerra com `Ctrl+C`
e são recarregados na próxima vez.

### Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (com service worker ativo) |
| `npm run build` | Build de produção em `dist/` (gera `sw.js` e `manifest.webmanifest`) |
| `npm run preview` | Serve o build de produção, que é onde testar instalação/offline |
| `npm run emulators` | Sobe os emuladores de Auth e Firestore |
| `npm run lint` | ESLint |
| `npm test` | Testes (Vitest) |

## Documentação

| Documento | Assunto |
|---|---|
| [01 — Produto](docs/01-produto.md) | Problema, persona, proposta, escopo |
| [02 — Arquitetura](docs/02-arquitetura.md) | Camadas, fluxo de dados, diagramas |
| [03 — Estrutura de arquivos](docs/03-estrutura-de-arquivos.md) | Para que serve cada arquivo |
| [04 — Firebase](docs/04-firebase.md) | Auth, Firestore, regras, índices, emuladores |
| [05 — PWA](docs/05-pwa.md) | Manifest, service worker, offline, instalação |
| [07 — Decisões](docs/07-decisoes.md) | Por que cada escolha técnica foi feita |
| [08 — Uso de IA](docs/08-uso-de-ia.md) | Declaração e citação do uso de IA |
| [Diário de fases](docs/diario-de-fases.md) | O que foi feito e aprendido em cada fase |

## Autor

Guilherme Ribeiro — Pós-graduação Infnet.