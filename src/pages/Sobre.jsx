import React from "react";
import ReactMarkdown from "react-markdown";

const relatorioMarkdown = `
## Relatório Teórico: Fundamentos de Mobile e UX

### Uso de IAs: Sinal Verde 🟢
Neste trabalho, ferramentas baseadas em IA foram exploradas de forma consciente para suporte ao desenvolvimento e refatoração do código, com validação e revisão manual de todas as implementações.

---

### 1. Modos de Cor (RGB vs. Cores Indexadas) e Resolução em Dispositivos Móveis
- **RGB:** Modo aditivo que combina canais vermelho, verde e azul, suportando milhões de cores (24/32 bits). É o padrão para telas digitais e imagens fotográficas.
- **Cores Indexadas:** Utiliza uma paleta restrita (até 256 cores, 8 bits), gerando arquivos compactos, comuns em ícones simples e GIFs.
- **Impacto da Resolução:** Telas móveis contam com alta densidade de pixels (PPI). Imagens em baixa resolução sofrem pixelização e desfoque quando ampliadas. Recomenda-se o uso de gráficos vetoriais (SVG) e ativos exportados em múltiplas resoluções (@2x, @3x).

---

### 2. Elementos de Interface Comuns em Aplicativos Móveis
- **Barras de Navegação (Nav/Tab Bars):** Situadas no topo ou na base (Bottom Navigation), organizam e alternam entre as seções principais da aplicação.
- **Botões (Buttons e FAB):** Executam ações imediatas; o botão flutuante (*Floating Action Button*) destaca a ação primária da tela.
- **Campos de Entrada (Inputs):** Recebem dados textuais, numéricos ou opções selecionadas pelo usuário.
- **Cards e Listas:** Agrupam blocos de informação de forma modular e visualmente separada.
- **Modais e Diálogos:** Solicitam confirmações ou registram dados sem abandonar a tela corrente.

---

### 3. Importância do Teste de Acessibilidade
- **Inclusão:** Permite o uso autônomo por pessoas com deficiências visuais, auditivas, motoras ou cognitivas.
- **Experiência Universal:** Otimizações como contraste adequado e áreas de toque mínimas facilitam o uso por qualquer pessoa em ambientes desfavoráveis (ex.: luz solar intensa ou uso com uma mão).
- **Conformidade Técnica:** Assegura alinhamento com as diretrizes internacionais da WCAG (*Web Content Accessibility Guidelines*).

---

### 4. Prototipagem com Figma e Uso de Plugins
- **Prototipagem no Figma:** Criação de telas e fluxos interativos navegáveis antes da implementação em código, permitindo validação antecipada de usabilidade e redução de retrabalho.
- **Plugins:** Extensões que agregam utilidades ao editor, automatizando tarefas repetitivas como preenchimento de dados fictícios, análise de contraste de cores, geração de ícones e exportação de componentes.

---

### 5. Acesso à Internet em Smartphones
O acesso ocorre por interfaces sem fio:
- **Redes Móveis (3G, 4G, 5G):** Ondas de rádio conectam o modem do celular à estação rádio-base (torre) da operadora, que direciona o tráfego ao *backbone* da internet.
- **Wi-Fi:** Conexão por radiofrequência local a um ponto de acesso ou roteador interligado à banda larga fixa.
Ao efetuar uma requisição de rede, os pacotes são modulados pela antena do aparelho, trafegam até o servidor de destino e retornam pelo mesmo caminho.

---

### 6. O 4G e Características na Aplicação Móvel
O 4G (baseado na tecnologia LTE) é a quarta geração de conectividade móvel:
- **Altas Velocidades:** Transferências na ordem de dezenas de Mbps, viabilizando streaming e consumo de dados sem engasgos.
- **Baixa Latência:** Redução no tempo de ida e volta dos pacotes, essencial para chamadas VoIP, jogos e sincronização em tempo real.
- **Arquitetura All-IP:** Todo o tráfego (dados e chamadas de voz via VoLTE) é transmitido por comutação de pacotes IP, elevando a eficiência da rede.

---

### 7. Conceito de Internet e Provedores de Conexão
- **Internet:** Rede global descentralizada de computadores conectada pelo conjunto de protocolos padronizados TCP/IP.
- **Provedor de Conexão (ISP):** Empresa de telecomunicações que concede acesso à infraestrutura global da internet, fornecendo aos usuários roteamento, endereçamento de IP e interconexão com pontos de troca de tráfego (IX/PTT).

---

### 8. Funcionamento do GPS na Localização em Aplicativos
- **Princípio:** O receptor GPS interno do smartphone capta sinais de rádio com registro de tempo e posição emitidos por no mínimo quatro satélites. A distância de cada satélite é calculada pela velocidade da luz e a posição geográfica (latitude, longitude, altitude) é calculada por trilateração.
- **Uso em Apps:** As aplicações utilizam APIs do sistema operacional (como a Geolocation API). Para acelerar a obtenção das coordenadas e economizar bateria, emprega-se o A-GPS (Assisted GPS), combinando o sinal de satélite com dados de redes Wi-Fi e torres celulares próximas.
`;

export default function Sobre() {
  return (
    <div className="pb-5">
      <div className="mb-5 text-center">
        <h2 className="fw-bold mb-3">Sobre o Ritmo</h2>
        <p className="text-muted">PWA desenvolvido para a disciplina de Desenvolvimento de Apps Híbridos com PWA.</p>
        <p className="small mb-0"><strong>Professor:</strong> Kennedy Carvalho</p>
        <p className="small"><strong>Aluno:</strong> Guilherme Ribeiro</p>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="markdown-body text-body" style={{ lineHeight: "1.6" }}>
            <ReactMarkdown>{relatorioMarkdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
