# 07 — Decisões técnicas

Registro no estilo **ADR** (*Architecture Decision Record*): para cada decisão, o contexto,
o que foi decidido e as consequências. Serve para lembrar **por que** algo foi feito de determinado jeito.

---

## ADR-001 — Manter a stack do professor

- **Contexto:** o projeto precisa usar React + Firebase e os conceitos da disciplina. O objetivo pessoal é aprender, não usar a ferramenta mais nova.
- **Decisão:** usar exatamente a stack do `infnet-pwa-react`: Vite, React 19, react-router-dom 7, react-bootstrap, Firebase 12 e vite-plugin-pwa. O único acréscimo é o **Vitest**, só para funções puras.
- **Consequências:** cada parte do código pode ser comparada com o que foi visto em aula. O visual fica limitado ao que o Bootstrap oferece, o que é compensado por um tema próprio feito com variáveis CSS.

## ADR-002 — Produto: foco e *time-blocking*

- **Contexto:** o enunciado pede gestão de horários com Login, Home (cadastro) e Dashboard, e permite ir além.
- **Decisão:** cada tarefa vira um **bloco de horário** (início + duração) e ganha um **timer Pomodoro** que registra o tempo focado.
- **Consequências:** o Dashboard ganha um dado real (tempo planejado vs. focado). O timer traz um desafio de estado interessante (Fase 3). Ver [01-produto.md](01-produto.md).

## ADR-003 — Emuladores primeiro, projeto real depois

- **Contexto:** desenvolver contra a nuvem desde o começo cria dados de teste no projeto real e depende da internet. O professor criou um dublê em memória porque o emulador do Firestore não rodava no ambiente dele.
- **Decisão:** desenvolver contra os **Emuladores** (Auth + Firestore), com o projeto fictício `demo-ritmo`. Manter também o **dublê em memória** do professor (`VITE_DATA_BACKEND=mock`), pelo valor didático do padrão *provider*. O projeto real é criado na Fase 5.
- **Consequências:** precisa de Java instalado. O ciclo de teste é rápido e não há risco de mexer em dados reais.

## ADR-004 — Coleções na raiz com campo `uid`

- **Contexto:** há duas formas comuns de organizar: `tasks/{id}` com `uid` (raiz) ou `users/{uid}/tasks/{id}` (subcoleção).
- **Decisão:** coleções na **raiz** com campo `uid`, como no projeto do professor.
- **Consequências:** é preciso filtrar por `uid` em toda consulta e criar índices compostos começando por `uid`. Em troca, o modelo fica igual ao visto em aula e permite consultas entre usuários no futuro (por exemplo, estatísticas agregadas). Com subcoleções, as regras ficariam um pouco mais simples (`match /users/{uid}/...`).

## ADR-005 — `date` e `startTime` como strings

- **Decisão:** `"YYYY-MM-DD"` e `"HH:MM"` em vez de `Timestamp`.
- **Por quê:** um bloco é um horário **local** que não deve mudar com o fuso. Strings nesse formato ordenam corretamente e são fáceis de validar nas regras. Detalhes em [04-firebase.md](04-firebase.md#modelo-de-dados).

## ADR-006 — Regras com validação de esquema

- **Contexto:** as regras do professor fazem só autorização (dono do documento).
- **Decisão:** acrescentar validação de campos, tipos e valores (`hasOnly`, `is int`, `matches`, `in [...]`).
- **Consequências:** o banco recusa dados malformados mesmo vindos de fora do app. O custo é manter as regras em sincronia com o modelo, ou seja, mudou o modelo, mudam as regras.

## ADR-007 — Notificações locais primeiro; FCM como extra (em avaliação)

> **Status:** notificações locais confirmadas para a Fase 3. FCM fica como fase extra opcional, que depende
> de ativar o plano Blaze (ver "FCM de verdade" abaixo).

- **Contexto:** o professor usou Firebase Cloud Messaging (push remoto), que exige chave VAPID e um backend ou o Console para enviar mensagens. O `firebase-messaging-sw.js` citado no README dele nem está no repositório.
- **Decisão:** usar a **Notifications API** com `registration.showNotification()` (conceito da aula 7) para avisar o fim do pomodoro e o início de um bloco, com o app aberto.
- **Consequências:** funciona sem backend e sem chaves. Não há aviso com o app totalmente fechado, o que exigiria push remoto ou a API experimental de *Notification Triggers*. Isso está documentado como limitação.
- **FCM de verdade:** para lembrar "seu bloco começa às 14:00" com o app **fechado**, alguém precisa *enviar* o push nesse horário. Sem servidor, o FCM só permite envios manuais pelo Console. O caminho completo seria: salvar o token FCM do usuário no Firestore e criar uma **Cloud Function agendada** (a cada minuto) que procura blocos prestes a começar e envia o push. Cloud Functions exigem o **plano Blaze**, que tem cota gratuita mas pede cartão de crédito.

## ADR-008 — npm como gerenciador de pacotes

- **Contexto:** o repositório do professor tem `package-lock.json` e `pnpm-lock.yaml`.
- **Decisão:** usar só **npm**, para ter um único lockfile.

## ADR-009 — `vite-plugin-pwa` 2.x

- **Contexto:** o professor usa a 1.3. O `npm install` trouxe a 2.0.
- **Decisão:** usar a 2.0. A configuração é compatível. A única mudança foi remover `devOptions.navigateFallback`, que está obsoleto.

## ADR-010 — Como o professor vai testar (variáveis de ambiente e entrega)

- **Contexto:** o `.env` não vai para o git. Se o professor clonar o repositório, não terá as credenciais.
- **Fato importante:** a config Web do Firebase (`apiKey`, `projectId`...) **não é segredo**. Ela vai embutida no JavaScript que qualquer visitante baixa. Quem protege os dados são as **regras do Firestore** e a lista de **domínios autorizados** do Auth.
- **Decisão (três caminhos, do mais fácil para o mais completo):**
  1. **Link público (principal):** deploy no **Firebase Hosting** na Fase 5. O link vai no PDF e no README. O professor abre no navegador ou no celular e pode até instalar o PWA.
  2. **Conta de demonstração:** um usuário de teste com dados de exemplo. E-mail e senha vão no PDF, para o Dashboard já aparecer preenchido.
  3. **Rodar localmente:**
     - **sem credenciais nenhuma:** `cp .env.example .env` + `npm run emulators` + `npm run dev` (já funciona hoje);
     - **contra o projeto real:** o arquivo `.env.production` com a config pública será **versionado** (exceção no `.gitignore`), e `npm run build && npm run preview` funciona direto após clonar.
- **Consequências:** nenhuma credencial secreta existe no projeto. Se algum dia houver um segredo (ex.: chave de servidor), ele vai para Cloud Functions/Secret Manager, nunca para o front-end.
