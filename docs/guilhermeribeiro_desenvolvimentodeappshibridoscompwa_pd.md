# Projeto de Disciplina - Desenvolvimento de Apps Híbridos com PWA

**Aluno:** Guilherme Ribeiro
**Disciplina:** Desenvolvimento de Apps Híbridos com PWA [26E3_3]
**Professor:** Kennedy Carvalho
**Data:** 05/10/2026

## 1. Introdução e Visão Geral
O projeto **Ritmo** é um PWA (Progressive Web App) desenvolvido para auxiliar pessoas na gestão de tempo e produtividade utilizando blocos de horário e o método Pomodoro. A aplicação foi construída com foco em ser *mobile-first*, permitindo o uso off-line, instalação na tela inicial dos dispositivos, e contando com notificações locais para os alertas do timer. 

## 2. Tecnologias Utilizadas
- **Front-end:** React.js, Vite (bundler), React Router DOM, React Bootstrap (UI) e Recharts (para os gráficos do Dashboard).
- **Back-end as a Service (BaaS):** Firebase (Auth, Firestore e Hosting).
- **PWA:** vite-plugin-pwa (com Workbox gerando a estratégia de *Service Worker* e o Manifest).
- **Versionamento e Testes:** Git, GitHub e Vitest (disponível no ambiente de dev).

## 3. Arquitetura e Decisões (ADR)
A arquitetura escolhida foi do tipo SPA (*Single Page Application*) conversando diretamente com o Firebase SDK (*Client-first*), abolindo a necessidade de um servidor intermediário (Node.js/Express) para lidar com o CRUD.

- **ADR-004:** O Firestore foi configurado com suporte offline agressivo (`persistentLocalCache`), garantindo que o usuário consiga adicionar blocos de tempo ou acessar seu histórico de Pomodoros mesmo quando estiver no metrô, sem conexão. Os dados são sincronizados com a nuvem na próxima vez que a rede estiver ativa.
- **Segurança:** Sem um backend, a segurança precisou ser garantida pelas Regras do Firestore (`firestore.rules`). Desenvolvemos um *schema validation* rígido diretamente nas regras. Um cliente não consegue escrever dados corrompidos (como strings em campos numéricos) nem ler blocos de tempo de outros usuários, evitando falhas conhecidas como IDOR (*Insecure Direct Object Reference*).

## 4. O que funciona e Diferenciais
### 4.1. Funcionalidades do App Shell
O aplicativo possui navegação inferior nativa (*Bottom Navigation*). Também inclui suporte à mudança de temas: **Claro, Escuro e Sistema**, salvando a preferência localmente no navegador, deixando a experiência idêntica à de um app nativo moderno.

### 4.2. Linha do Tempo e Timer (Pomodoro)
A tela inicial ("Hoje") é reativa. Todo novo bloco salvo no banco de dados reflete imediatamente na tela através do `onSnapshot` do Firestore. Na aba "Foco", construímos um cronômetro que se comunica com o navegador para lançar **notificações locais** sempre que os 25 minutos chegam ao fim. Após concluído, os dados retroalimentam a tarefa.

### 4.3. Dashboard Produtivo
Através da aba "Dados", todas as tarefas do Firebase são calculadas localmente para montar um Dashboard interativo usando *Recharts*. O usuário consegue ver gráficos de tempo total em foco, produtividade por categoria (Trabalho, Saúde, Estudo) e volume de pomodoros concluídos na semana.

## 5. Como o professor pode testar
O projeto foi pensado para facilitar a correção. O código foi entregue com o arquivo `.env.production` preenchido (ou mapeado para ser facilmente substituído). 

O senhor pode optar por testar o aplicativo diretamente na **URL de produção do Firebase Hosting**:
*(INSERIR SEU LINK DO FIREBASE HOSTING AQUI)*

Ou rodar localmente no seu computador:
1. `npm install`
2. `npm run build && npm run preview` (Executará a versão otimizada conversando com a nuvem real).

O projeto é capaz de se autenticar nativamente no Firebase. Basta criar uma conta através do próprio botão "Criar conta" na tela de login da aplicação para testar as dependências reais.

## 6. Declaração de Uso de Inteligência Artificial
**Nível: Sinal Amarelo** 🟡
Conforme as regras da disciplina, o suporte de inteligência artificial (Google Gemini) foi aplicado em conformidade com o nível **Sinal Amarelo**. A IA foi utilizada como *pair programmer* para acelerar tarefas mecânicas, explicar integrações complexas (como a geração do *Service Worker* via `vite-plugin-pwa` e o isolamento de dados nas Regras do Firestore) e ajudar a traduzir os protótipos do Figma (desenvolvidos na disciplina anterior) para o código em React. Nenhuma linha gerada pela IA foi incluída sem supervisão ativa, revisão, testes manuais e total compreensão por parte do autor.

## 7. Evolução de UX: Do Protótipo ao Código Real
O projeto **Ritmo** (originalmente idealizado sob o nome "Santuário de Tarefas") baseia-se na extensa pesquisa de usuários feita no módulo de UX para Desenvolvimento Mobile.

**Doenças Identificadas na Pesquisa Original:**
- Incerteza e medo de perder dados ao preencher formulários extensos.
- Excesso de informações concorrendo por atenção na tela.
- Falta de feedback visual confirmando que a ação foi salva com sucesso.

**Aplicação Direta no PWA Ritmo:**
1. **Redução Cognitiva e Labels Explícitas:** Atendendo ao feedback do entrevistado Gustavo Passo (54 anos), o Modal de Novo Bloco do Ritmo possui tipografia arejada e **rótulos explícitos (labels)** logo acima de cada input (*O que você vai fazer?*, *Categoria*, *Horário*), garantindo previsibilidade total, com um botão massivo e claro de "Salvar Bloco".
2. **Navegação Móvel (*Bottom Navigation*):** Para contemplar usuários iniciantes em smartphones (como a persona de 75 anos da nossa pesquisa), optou-se por navegação fixa na parte inferior, abolindo menus "hambúrguer" ocultos e usando ícones claros.
3. **Feedback Imediato (Toast):** Conforme relatado pelo entrevistado Victor Cardoso (30 anos), inserimos notificações instantâneas do tipo "Toast" (*Bloco salvo com sucesso!*) na base da tela após a criação de qualquer bloco, aliviando a ansiedade e o "medo de que não sincronizou".
4. **Dashboard de Resumo Consolidado:** O anel percentual solicitado na pesquisa de UX foi implementado na aba "Hoje" (indicando quantos blocos diários foram cumpridos). A aba "Dados" se expandiu para exibir os históricos consolidados em tempo real extraídos do Firestore, permitindo ao usuário "bater o olho e ver" onde foca mais tempo (Trabalho, Estudo, etc.).

Com isso, entregamos não apenas um código funcional, mas um produto **focado nas necessidades dos nossos usuários reais**, combinando os ensinamentos de Gestão de Interfaces (UX) com o rigor técnico de Desenvolvimento de Apps Híbridos.
