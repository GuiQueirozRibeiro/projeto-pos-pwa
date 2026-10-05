# 03 — Estrutura de arquivos

Para que serve cada arquivo do projeto. Atualizado a cada fase.

## Raiz

| Arquivo | Para que serve |
|---|---|
| `index.html` | Única página HTML da SPA. Tem título, descrição (SEO), `theme-color`, ícones para iOS e a fonte Inter. O React é montado na `<div id="root">`. |
| `vite.config.js` | Configura o Vite, o plugin do React, o **vite-plugin-pwa** (manifest + service worker) e o Vitest. Ver [05-pwa.md](05-pwa.md). |
| `package.json` | Dependências e scripts (`dev`, `build`, `emulators`, `test`...). |
| `eslint.config.js` | Regras de lint (padrão do template React do Vite, igual ao do professor). Inclui as regras de hooks do React. |
| `firebase.json` | Configuração do **Firebase CLI**: onde estão as regras e os índices, e as portas dos emuladores. Não existia no repositório do professor. |
| `.firebaserc` | Qual projeto Firebase o CLI usa. Hoje é `demo-ritmo` (projeto fictício, só para emulador). |
| `firestore.rules` | **Regras de segurança** do banco: quem pode ler/escrever e em qual formato. Ver [04-firebase.md](04-firebase.md#regras-de-segurança). |
| `firestore.indexes.json` | **Índices compostos** exigidos pelas consultas (usuário + data + horário). |
| `.env.example` | Modelo das variáveis de ambiente. Copiado para `.env`, que não vai para o git. |
| `.gitignore` | Ignora `node_modules`, `dist`, `.env`, logs e dados dos emuladores. |

## `public/`

Arquivos copiados **sem processamento** para a raiz do build.

| Arquivo | Para que serve |
|---|---|
| `favicon.svg` | Ícone da aba do navegador. |
| `icons/icon-*.png` | Ícones do PWA em vários tamanhos (manifest, tela inicial, splash). Reaproveitados do projeto do professor; serão trocados na Fase 5. |

## `src/`

| Arquivo | Para que serve |
|---|---|
| `main.jsx` | Ponto de entrada: importa o CSS do Bootstrap e o tema, e monta `<App />` dentro de `<StrictMode>`. |
| `index.css` | **Tema do app** (*design tokens*): cores, fonte e raio de borda, sobrescrevendo as variáveis CSS do Bootstrap (`--bs-*`). |
| `App.jsx` | Na Fase 0, uma tela provisória para validar a base. Na Fase 1 vira o **roteador** (como o `App.jsx` do professor). |

## Gerados (não versionados)

| Pasta | Origem |
|---|---|
| `node_modules/` | `npm install` |
| `dist/` | `npm run build` (inclui `sw.js`, `workbox-*.js`, `manifest.webmanifest`, `registerSW.js`) |
| `dev-dist/` | Service worker de desenvolvimento gerado pelo `npm run dev` |
| `.emulator-data/` | Dados dos emuladores salvos ao encerrar `npm run emulators` |
