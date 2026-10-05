# Diário de fases

O que foi feito em cada fase, o que aprender com ela e como testar.

## Combinados do projeto

- **Disciplina:** Desenvolvimento de Apps Híbridos com PWA [26E3_3]
- **PDF da entrega:** `guilhermeribeiro_desenvolvimentodeappshibridoscompwa_pd.pdf` (formato "nomedoaluno_nomedadisciplina_pd.PDF")
- **Prazo no Moodle:** 12/10/2026
- **Nome do app:** Ritmo (confirmado)
- **Fluxo de trabalho:** uma fase por vez; ao final de cada fase, **commit + push** e explicação dos arquivos
- **Plano completo:** fases 0 a 6 no README (tabela "Status") e nos tópicos abaixo

---

## Fase 0 — Base do projeto ✅ (05/10/2026)

### O que foi feito

1. **Projeto Vite + React** criado com `create-vite` (template `react`, com ESLint) e movido para a raiz do repositório.
2. **Dependências iguais às do professor:** `react-bootstrap`, `bootstrap`, `react-router-dom`, `firebase`, `vite-plugin-pwa`, `firebase-tools`. Acréscimo: `vitest`.
3. **`vite.config.js`**: manifest do Ritmo (nome, cores, `start_url: /hoje`, 3 atalhos), Workbox com cache de fontes e configuração do Vitest.
4. **`index.html`**: `lang="pt-BR"`, título e descrição (SEO), `theme-color`, ícones para iOS e fonte Inter.
5. **Firebase:** `firebase.json` (emuladores), `.firebaserc` (projeto `demo-ritmo`), **regras com validação** e **índices compostos**.
6. **Tema:** `src/index.css` sobrescreve as variáveis do Bootstrap com a paleta do Ritmo (modo escuro).
7. **Documentação** em `docs/`.

### Conceitos para revisar

- **Variáveis de ambiente no Vite:** só o que começa com `VITE_` chega ao navegador (`import.meta.env`). Nada secreto deve ir para o front-end.
- **Por que a config do Firebase pode ser pública:** ela só identifica o projeto. Quem protege os dados são as **regras**.
- **Projeto `demo-*`:** só existe para os emuladores. É seguro e não precisa de login.
- **Manifest gerado:** o `manifest.webmanifest` não é escrito à mão; o plugin o gera no build.
- **Service worker gerado:** compare `infnet-26e3-pwa/sw.js` com o bloco `workbox` (tabela em [05-pwa.md](05-pwa.md)).

### Como testar

```bash
npm run lint            # sem erros
npm run build           # gera dist/sw.js e dist/manifest.webmanifest
npm run preview         # http://localhost:4173 → DevTools > Application > Manifest / Service Workers
npm run emulators       # http://localhost:4000 (painel dos emuladores)
```

### Verificado

- `npm run lint` ✅ · `npm run build` ✅ (precache de 23 arquivos)
- Emuladores iniciam e as regras compilam ✅
- Leitura sem login e escrita inválida são negadas (HTTP 403) ✅

---

## Fase 1 — Autenticação e App Shell ✅ (05/10/2026)

### O que foi feito

- `src/firebase.js`: Firebase Auth + Firestore com `persistentLocalCache` (offline-first).
- `src/contexts/AuthContext.jsx`: Contexto de autenticação, registrando nome com `updateProfile`.
- Componentes base: `ProtectedRoute.jsx`, `OfflineBanner.jsx`, `InstallPwaButton.jsx` reaproveitados.
- `src/components/AppLayout.jsx`: O "App Shell" — barra superior (com avatar/logout e botão de instalação) e barra de navegação inferior estilo mobile-first.
- `src/pages/Login.jsx`: Tela estilizada com login/cadastro e tratamento de erros do Firebase via `src/utils/authErrors.js`.
- `src/App.jsx`: Configurado com React Router DOM e protegido.
- `main.jsx`: Inclusão do CSS do Bootstrap Icons.

## Fase 2 — Linha do tempo ✅ (05/10/2026)

### O que foi feito

- `src/services/taskService.js`: Camada de abstração do Firestore implementada com suporte a queries (`subscribeTasksByDate`) baseadas em `uid` e `date`. Alinhada perfeitamente ao *schema* estrito definido em `firestore.rules`.
- `src/utils/dateHelpers.js`: Funções de apoio para gerenciar formatação de horas e a data atual (`YYYY-MM-DD`) localmente.
- `src/components/TaskCard.jsx`: Componente modular para mostrar os blocos de tempo com visualização da categoria e opções de Focar, Concluir e Excluir.
- `src/pages/Hoje.jsx`: Página principal usando `onSnapshot` do Firebase para listagem em tempo real (reativa). Inclui Modal estilizado para criar blocos de tempo respeitando regras do banco. Adição de card de progresso diário (circular).
## Fase 3 — Timer Pomodoro ✅ (05/10/2026)

### O que foi feito

- `src/pages/Foco.jsx`: Construção da página do Timer. Lemos o `taskId` (via `useSearchParams`), carregamos a tarefa correspondente do Firestore em tempo real.
- **Timer Reativo:** Lógica usando `setInterval` num `useEffect` para controlar os 25 minutos. Ao pausar ou limpar, o intervalo é recriado ou destruído, evitando vazamento de memória.
- **Notificações Locais:** Quando o cronômetro bate 00:00, usamos a API nativa do navegador (`Notification.requestPermission` e `new Notification`) para avisar que o pomodoro acabou, cumprindo o requisito de uso de notificações locais.
- **Atualização no Banco:** Usamos a função `updateTaskFocus` para incrementar o contador de pomodoros e o tempo focado da tarefa, salvando no Firebase (permitindo que a Fase 4 de Dashboard mostre gráficos reais).
## Fase 4 — Dashboard ✅ (05/10/2026)

### O que foi feito

- `npm install recharts`: Instalação de biblioteca de gráficos fácil e reativa para React.
- `src/services/taskService.js`: Adicionada a query `subscribeAllTasks` para buscar todo o histórico de produtividade do usuário (apenas os documentos criados pelo próprio uid).
- `src/pages/Dashboard.jsx`: Criação do Dashboard agregando os dados no front-end:
  - Resumo: Quantidade total de Pomodoros e Tempo Total em Foco (convertido de segundos para horas/minutos).
  - Gráfico de Foco por Categoria (Trabalho, Estudo, Saúde, Pessoal).
  - Gráfico de Produtividade dos Últimos 7 dias.
## Fase 5 — PWA final, Firebase real e Hosting ✅ (05/10/2026)

### O que foi feito

- Adição de suporte ao **Firebase Hosting** no arquivo `firebase.json` (incluindo o fallback `"rewrites": [{"source": "**", "destination": "/index.html"}]` para PWA e roteamento do React Router).
- Criação do arquivo `.env.production` (e liberação no `.gitignore`) contendo as variáveis não confidenciais para que o avaliador (professor) possa compilar o projeto em casa com as credenciais prontas.
- O projeto final pode ser implantado usando `firebase deploy`.

## Fase 6 — Relatório e documentação final ⏳
