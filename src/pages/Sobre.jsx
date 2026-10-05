import React from "react";
import ReactMarkdown from "react-markdown";

const relatorioMarkdown = `
## Relatório Teórico: Fundamentos de Mobile e UX

Este relatório responde às questões teóricas propostas para a avaliação, integradas diretamente no aplicativo para fácil consulta.

### 1. Qual é a principal diferença entre os modos de cor indexadas e RGB? Como a resolução da imagem afeta a qualidade da imagem em dispositivos móveis? (Valor: 0.5)

**Modos de Cor:**
- **RGB:** Utilizado para telas digitais (incluindo dispositivos móveis), funciona através da mistura de luzes vermelha (Red), verde (Green) e azul (Blue). Ele suporta milhões de cores.
- **Cores Indexadas:** Utiliza uma paleta limitada (geralmente até 256 cores), o que reduz drasticamente o tamanho do arquivo, mas não é ideal para fotografias de alta qualidade. É mais utilizado para ícones simples, logos e GIFs.

**Impacto da Resolução:**
Em dispositivos móveis (que possuem altas densidades de pixels, como telas Retina ou AMOLED), imagens com baixa resolução (poucos pixels por polegada, ou PPI) perdem nitidez e ficam pixeladas (borradas) quando esticadas para preencher o espaço da tela. Por isso, no desenvolvimento mobile moderno, priorizamos gráficos vetoriais (como SVG) para UI e fornecemos imagens em múltiplas resoluções (@2x, @3x) para garantir que permaneçam nítidas em qualquer densidade de tela.

---

### 2. Na interface de um aplicativo, quais são os elementos de interface mais comuns e qual o papel de cada um deles? (Valor: 0.5)

- **Barras de Navegação (Nav/Tab Bars):** Situadas geralmente no topo ou na base (Bottom Navigation). Facilitam a transição entre os fluxos ou abas principais do app.
- **Botões (Buttons & FABs):** Iniciam ações primárias e secundárias. O *Floating Action Button* (FAB), muito comum em Material Design, destaca a principal ação de uma tela (ex: adicionar uma tarefa no nosso app).
- **Campos de Entrada (Text Fields/Inputs):** Permitem que o usuário insira dados de texto, senhas ou selecione opções.
- **Listas e Cards:** Agrupam e organizam conteúdos de forma modular. Cards são excelentes para dividir informações sem poluir a interface visualmente, como exibimos as tarefas.
- **Menus (Dropdown/Drawers):** Ocultam opções secundárias ou navegação mais profunda para liberar espaço na interface principal.
- **Modais e Alertas (Dialogs):** Interrompem o fluxo atual para exigir uma decisão ou confirmar ações críticas (ex: "Tem certeza que deseja excluir?").

---

### 3. Explique por que o teste de acessibilidade é importante para os aplicativos. (Valor: 0.5)

Acessibilidade (a11y) garante que o aplicativo possa ser utilizado pelo maior número possível de pessoas, incluindo aquelas com deficiências visuais, motoras, auditivas ou cognitivas. O teste de acessibilidade é vital porque:
1. **Inclusão:** Remove barreiras e permite que todos tenham autonomia digital.
2. **Qualidade Geral (UX):** Muitas melhorias de acessibilidade (como bom contraste e alvos de toque maiores) beneficiam *todos* os usuários, inclusive aqueles em condições temporárias ou situacionais (ex: usar o celular sob sol forte ou com apenas uma mão).
3. **Conformidade Legal:** Muitos países exigem que produtos digitais obedeçam a diretrizes como a WCAG (Web Content Accessibility Guidelines).
4. **Abrangência de Mercado:** Um produto acessível retém um público que, caso contrário, o abandonaria por incapacidade de uso.

---

### 4. O que é Prototipagem com Figma e para que serve o plugin do Figma? (Valor: 1.0)

**Prototipagem com Figma:**
É a criação de uma representação interativa das telas de um produto antes do desenvolvimento em código. Permite conectar telas (frames), adicionar transições e simular fluxos reais para validar a usabilidade e navegação com usuários, além de alinhar o design com a equipe de desenvolvimento.

**O plugin do Figma:**
Os plugins do Figma são extensões que adicionam funcionalidades de terceiros ao editor, automatizando tarefas repetitivas ou integrando outros serviços. Servem para preencher dados falsos, exportar código, gerar ícones, verificar contraste de cores ou gerar ativos de forma muito mais rápida.

---

### 5. Como o acesso à internet se dá em smartphones? (Valor: 1.0)

Smartphones acessam a internet majoritariamente por duas vias sem fio:
- **Redes Celulares (3G, 4G, 5G):** Usam ondas de rádio para se conectar às torres de telefonia móvel das operadoras. Essas torres formam células e são conectadas via fibra ótica ao *backbone* global da internet. A comunicação entre o celular e a torre depende da tecnologia e espectro de frequência da rede atual.
- **Redes Wi-Fi:** O celular conecta-se a um roteador sem fio local (geralmente ligado a um modem de banda larga via cabo ou fibra). O roteador gerencia o tráfego de dados locais e os encaminha para a infraestrutura de internet fixa.

Quando um aplicativo faz uma requisição (ex: carregar tarefas do Firebase), ele envia pacotes de dados pela antena do smartphone via rádio até a torre ou roteador, de onde trafegam até o servidor de destino, fazendo o caminho inverso com a resposta.

---

### 6. O que é o 4G e quais as características principais de sua aplicação móvel? (Valor: 1.0)

O **4G** (Quarta Geração de telefonia móvel), baseado no padrão LTE (*Long Term Evolution*), é a evolução do 3G focada em prover acesso de banda larga móvel de alta velocidade.

**Características Principais:**
- **Velocidade:** Taxas de transferência consideravelmente maiores que o 3G, suportando downloads e uploads na ordem de dezenas de Mbps, viabilizando streaming de vídeo em HD, videochamadas de qualidade e apps pesados.
- **Baixa Latência:** Resposta de rede mais rápida, essencial para comunicação em tempo real e estabilidade de aplicações interativas.
- **Protocolo IP (All-IP):** Ao contrário das gerações anteriores que usavam redes separadas para voz (circuitos) e dados, o 4G usa comutação de pacotes (IP) para tudo (incluindo voz, via VoLTE).
- **Eficiência Espectral:** Melhor aproveitamento das bandas de rádio, suportando mais usuários conectados simultaneamente na mesma célula.

---

### 7. O que é a internet e como funciona um provedor de conexão? (Valor: 0.5)

**A Internet:**
É uma rede global descentralizada que conecta milhares de outras redes menores de computadores (públicas, privadas, acadêmicas, governamentais) utilizando um conjunto de protocolos padronizados (TCP/IP). Nenhuma entidade única a controla; é uma "rede de redes".

**Provedor de Conexão (ISP - Internet Service Provider):**
É a empresa (como Claro, Vivo, provedores regionais) que fornece aos clientes acesso à infraestrutura da internet. Eles funcionam possuindo ou alugando linhas de telecomunicações de alta capacidade e infraestrutura de roteamento.
O ISP conecta a residência ou o dispositivo móvel do usuário (a "última milha") aos seus próprios roteadores e servidores centrais, que por sua vez estão conectados aos *backbones* de internet maiores que cruzam países e oceanos. Quando você acessa um site, os dados passam pela infraestrutura do seu ISP até chegar à rede de destino.

---

### 8. Defina o funcionamento do GPS na localização do dispositivo em aplicativos. (Valor: 1.0)

O **GPS** (Global Positioning System) é um sistema de navegação por satélite.
**Como funciona:**
O chip receptor de GPS do smartphone capta sinais de rádio emitidos constantemente por uma constelação de satélites em órbita da Terra. O sinal de cada satélite contém a hora exata em que foi transmitido e a posição orbital do satélite.
Ao receber sinais de pelo menos quatro satélites, o dispositivo calcula o tempo que os sinais demoraram para chegar (sabendo que viajam à velocidade da luz) para determinar a distância até cada um. Usando uma técnica matemática chamada *trilateração*, o dispositivo calcula sua posição precisa (latitude, longitude, altitude) na Terra.

**Em Aplicativos:**
Os apps solicitam a localização via APIs do Sistema Operacional (ex: Geolocation API em web/PWA ou APIs nativas do Android/iOS). Para acelerar e economizar bateria, os smartphones modernos usam A-GPS (Assisted GPS), combinando o sinal de satélite com dados de redes Wi-Fi e torres de celular próximas para triangular a localização muito mais rapidamente e de forma precisa, mesmo em locais fechados.
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

      <div className="card shadow-sm border-0 bg-body-tertiary">
        <div className="card-body p-4">
          <div className="markdown-body text-body" style={{ lineHeight: "1.6" }}>
            <ReactMarkdown>{relatorioMarkdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
