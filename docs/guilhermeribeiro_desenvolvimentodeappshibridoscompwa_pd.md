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

O senhor pode optar por testar o aplicativo diretamente na **URL de produção**:
- **Deploy Oficial (Vercel):** [https://ritmo-tempo.vercel.app/](https://ritmo-tempo.vercel.app/)

Ou rodar localmente no seu computador:
1. `npm install`
2. `npm run build && npm run preview` (Executará a versão de produção otimizada).

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

## 8. Relatório Teórico: Fundamentos de Mobile e UX

### 1. Modos de Cor (RGB vs. Cores Indexadas) e Resolução em Dispositivos Móveis
- **RGB:** Modo aditivo que combina canais vermelho, verde e azul, suportando milhões de cores (24/32 bits). É o padrão para telas digitais e imagens fotográficas.
- **Cores Indexadas:** Utiliza uma paleta restrita (até 256 cores, 8 bits), gerando arquivos compactos, comuns em ícones simples e GIFs.
- **Impacto da Resolução:** Telas móveis contam com alta densidade de pixels (PPI). Imagens em baixa resolução sofrem pixelização e desfoque quando ampliadas. Recomenda-se o uso de gráficos vetoriais (SVG) e ativos exportados em múltiplas resoluções (@2x, @3x).

### 2. Elementos de Interface Comuns em Aplicativos Móveis
- **Barras de Navegação (Nav/Tab Bars):** Situadas no topo ou na base (Bottom Navigation), organizam e alternam entre as seções principais da aplicação.
- **Botões (Buttons e FAB):** Executam ações imediatas; o botão flutuante (*Floating Action Button*) destaca a ação primária da tela.
- **Campos de Entrada (Inputs):** Recebem dados textuais, numéricos ou opções selecionadas pelo usuário.
- **Cards e Listas:** Agrupam blocos de informação de forma modular e visualmente separada.
- **Modais e Diálogos:** Solicitam confirmações ou registram dados sem abandonar a tela corrente.

### 3. Importância do Teste de Acessibilidade
- **Inclusão:** Permite o uso autônomo por pessoas com deficiências visuais, auditivas, motoras ou cognitivas.
- **Experiência Universal:** Otimizações como contraste adequado e áreas de toque mínimas facilitam o uso por qualquer pessoa em ambientes desfavoráveis (ex.: luz solar intensa ou uso com uma mão).
- **Conformidade Técnica:** Assegura alinhamento com as diretrizes internacionais da WCAG (*Web Content Accessibility Guidelines*).

### 4. Prototipagem com Figma e Uso de Plugins
- **Prototipagem no Figma:** Criação de telas e fluxos interativos navegáveis antes da implementação em código, permitindo validação antecipada de usabilidade e redução de retrabalho.
- **Plugins:** Extensões que agregam utilidades ao editor, automatizando tarefas repetitivas como preenchimento de dados fictícios, análise de contraste de cores, geração de ícones e exportação de componentes.

### 5. Acesso à Internet em Smartphones
O acesso ocorre por interfaces sem fio:
- **Redes Móveis (3G, 4G, 5G):** Ondas de rádio conectam o modem do celular à estação rádio-base (torre) da operadora, que direciona o tráfego ao *backbone* da internet.
- **Wi-Fi:** Conexão por radiofrequência local a um ponto de acesso ou roteador interligado à banda larga fixa.
Ao efetuar uma requisição de rede, os pacotes são modulados pela antena do aparelho, trafegam até o servidor de destino e retornam pelo mesmo caminho.

### 6. O 4G e Características na Aplicação Móvel
O 4G (baseado na tecnologia LTE) é a quarta geração de conectividade móvel:
- **Altas Velocidades:** Transferências na ordem de dezenas de Mbps, viabilizando streaming e consumo de dados sem engasgos.
- **Baixa Latência:** Redução no tempo de ida e volta dos pacotes, essencial para chamadas VoIP, jogos e sincronização em tempo real.
- **Arquitetura All-IP:** Todo o tráfego (dados e chamadas de voz via VoLTE) é transmitido por comutação de pacotes IP, elevando a eficiência da rede.

### 7. Conceito de Internet e Provedores de Conexão
- **Internet:** Rede global descentralizada de computadores conectada pelo conjunto de protocolos padronizados TCP/IP.
- **Provedor de Conexão (ISP):** Empresa de telecomunicações que concede acesso à infraestrutura global da internet, fornecendo aos usuários roteamento, endereçamento de IP e interconexão com pontos de troca de tráfego (IX/PTT).

### 8. Funcionamento do GPS na Localização em Aplicativos
- **Princípio:** O receptor GPS interno do smartphone capta sinais de rádio com registro de tempo e posição emitidos por no mínimo quatro satélites. A distância de cada satélite é calculada pela velocidade da luz e a posição geográfica (latitude, longitude, altitude) é calculada por trilateração.
- **Uso em Apps:** As aplicações utilizam APIs do sistema operacional (como a Geolocation API). Para acelerar a obtenção das coordenadas e economizar bateria, emprega-se o A-GPS (Assisted GPS), combinando o sinal de satélite com dados de redes Wi-Fi e torres celulares próximas.
