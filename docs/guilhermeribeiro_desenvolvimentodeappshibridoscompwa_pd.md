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

- **ADR-004:** O Firestore foi configurado com suporte offline (`persistentLocalCache`), garantindo que o usuário consiga adicionar blocos de tempo ou acessar seu histórico de Pomodoros mesmo sem conexão. Os dados são sincronizados com a nuvem na próxima vez que a rede estiver ativa.
- **Segurança:** Sem um backend, a segurança precisou ser garantida pelas Regras do Firestore (`firestore.rules`). Desenvolvemos um *schema validation* diretamente nas regras. Um cliente não consegue escrever dados corrompidos (como strings em campos numéricos) nem ler blocos de tempo de outros usuários, evitando falhas conhecidas como IDOR (*Insecure Direct Object Reference*).

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
**Nível: Sinal Verde 🟢**
Conforme as regras da disciplina, o uso de inteligência artificial (Google Gemini) foi explorado de maneira estratégica (Sinal Verde 🟢). A IA auxiliou a refinar o código e construir a infraestrutura do Service Worker (Workbox). Os resultados gerados foram analisados, testados e validados antes de comporem o projeto final.

## 7. Evolução de UX: Do Protótipo ao Código Real
O projeto **Ritmo** (originalmente idealizado sob o nome "Santuário de Tarefas") baseia-se na pesquisa de usuários feita no módulo de UX para Desenvolvimento Mobile.

**Dores Identificadas na Pesquisa Original:**
- Incerteza e medo de perder dados ao preencher formulários extensos.
- Excesso de informações concorrendo por atenção na tela.
- Falta de feedback visual confirmando que a ação foi salva com sucesso.

**Aplicação Direta no PWA Ritmo:**
1. **Redução Cognitiva e Labels Explícitas:** Atendendo ao feedback do entrevistado Gustavo Passo (54 anos), o Modal de Novo Bloco do Ritmo possui **rótulos explícitos (labels)** logo acima de cada input (*O que você vai fazer?*, *Categoria*, *Horário*), garantindo previsibilidade, com um botão claro de "Salvar Bloco".
2. **Navegação Móvel (*Bottom Navigation*):** Para contemplar usuários iniciantes em smartphones (como a persona de 75 anos da nossa pesquisa), optou-se por navegação fixa na parte inferior, abolindo menus "hambúrguer" ocultos e usando ícones claros.
3. **Feedback Imediato (Toast):** Conforme relatado pelo entrevistado Victor Cardoso (30 anos), inserimos notificações instantâneas do tipo "Toast" (*Bloco salvo com sucesso!*) na base da tela após a criação de qualquer bloco, aliviando a ansiedade e o "medo de que não sincronizou".
4. **Dashboard de Resumo Consolidado:** O anel percentual solicitado na pesquisa de UX foi implementado na aba "Hoje" (indicando quantos blocos diários foram cumpridos). A aba "Dados" se expandiu para exibir os históricos consolidados em tempo real extraídos do Firestore, permitindo ao usuário "bater o olho e ver" onde foca mais tempo (Trabalho, Estudo, etc.).

Com isso, entregamos não apenas um código funcional, mas um produto **focado nas necessidades dos nossos usuários reais**, combinando os ensinamentos de Gestão de Interfaces (UX) com o rigor técnico de Desenvolvimento de Apps Híbridos.

## 8. Relatório Teórico de Usabilidade e História

**1. O início da computação**
A computação iniciou-se com máquinas de uso militar e científico, como o ENIAC. Seu foco não era o usuário comum, mas a resolução de cálculos; as interfaces resumiam-se a cartões perfurados e conexões físicas por cabos.

**2. A internet e comunicação**
Com a expansão da ARPANET para a rede global (WWW) na década de 90, a comunicação deixou de ser restrita ao meio acadêmico/militar. A World Wide Web introduziu a hiperligação (links), mudando a forma como o mundo consome dados e permitindo o nascimento das aplicações web modernas.

**3. A influência da Apple na evolução e usabilidade das máquinas**
A Apple revolucionou a interação humano-computador ao popularizar a interface gráfica e o mouse (com o Macintosh em 1984) e, posteriormente, a revolução mobile com a tela capacitiva e os gestos de pinça no lançamento do iPhone (2007). A empresa quebrou a barreira do teclado físico e popularizou a interação natural e direta com a tela.

**4. GUI e Modelos Mentais**
A Graphical User Interface (GUI) baseia-se em metáforas do mundo real (ex: "Lixeira", "Pastas") para construir modelos mentais facilmente assimiláveis. Isso reduz a curva de aprendizado de usuários leigos, que podem associar a tela a um ambiente físico conhecido.

**5. A importância de UX e UI para o usuário**
UX (Experiência do Usuário) garante que o sistema resolva uma dor do usuário sem atrito, enquanto UI (Interface do Usuário) materializa essa experiência. Sem um bom trabalho conjunto, até o sistema mais robusto do mundo será rejeitado por causar frustração ou fadiga cognitiva.

**6. A importância de aplicativos de simples uso no século XXI**
A sobrecarga de informações hoje exige soluções limpas e focadas. Usuários desinstalam aplicativos em segundos se não entenderem sua proposta. Portanto, a simplicidade não é ausência de funcionalidades, mas a priorização inteligente que elimina o esforço cognitivo do usuário.

**7. A evolução da usabilidade nos últimos 10 anos**
Deixamos o skeuomorfismo (texturas de couro, sombras) para adotar o Flat Design e o Material Design. Acessibilidade (contraste, navegação por leitores de tela), interações por voz e design responsivo (que se adapta a diferentes telas) tornaram-se o padrão da indústria.

**8. A evolução do uso de aplicativos móveis nos últimos 10 anos**
Há 10 anos, usávamos o celular basicamente para comunicação assíncrona. Hoje, o mobile é o controle remoto da vida: movimentação financeira (Pix), transporte (Uber), casa inteligente e produtividade operam primeiramente, ou exclusivamente, em ambientes móveis (*Mobile First*). O uso transicionou da "consulta" para a "gestão de vida em tempo real".
