# 08 — Uso de Inteligência Artificial

O enunciado do Projeto de Disciplina permite o uso de IA (**"Sinal Verde 🟢"**), desde que **todas as fontes,
incluindo ferramentas de IA, sejam devidamente citadas**. Este documento cumpre essa exigência.

## Ferramenta utilizada

| Item | Detalhe |
|---|---|
| Ferramenta | Antigravity (agente de programação com IA, Google DeepMind) |
| Modelos | Claude Opus (Anthropic) na Fase 0. _Atualizar se outras fases usarem outro modelo (ex.: Gemini, Google)._ |
| Período de uso | 05/10/2026 a _(data da entrega)_ |
| Forma de uso | *Pair programming*: a IA propôs o plano, gerou código e documentação em fases, e explicou cada arquivo. O aluno revisou, testou e aprovou cada fase antes da seguinte. |

## Para que a IA foi usada

- [x] Análise dos projetos de referência do professor e elaboração do plano em fases
- [x] Configuração inicial (Vite, vite-plugin-pwa, Firebase CLI, regras e índices do Firestore)
- [x] Rascunho da documentação técnica (`docs/`)
- [ ] Implementação das telas e da lógica (fases 1 a 4)
- [ ] Rascunho do relatório teórico (8 perguntas), **revisado e reescrito pelo aluno**

## Para que a IA **não** foi usada

- Decisões finais de produto e escopo, que foram tomadas pelo aluno a partir das opções sugeridas.
- Validação final: os testes manuais no navegador e no celular foram feitos pelo aluno.

## Verificação

O próprio enunciado alerta: *"os resultados da IA podem ser tendenciosos e imprecisos"*. Por isso:

- todo código passou por `npm run lint`, `npm run build` e pelos testes, além do teste manual;
- o comportamento das regras do Firestore foi testado contra o emulador (ver [04-firebase.md](04-firebase.md#teste-manual-feito-na-fase-0));
- as afirmações históricas do relatório foram conferidas nas fontes citadas nele.

## Citação sugerida (para o PDF)

> Este trabalho utilizou a ferramenta de IA **Antigravity (Google DeepMind), com o modelo Claude Opus
> (Anthropic)**, como assistente de programação e de redação, entre outubro de 2026 e a data da entrega.
> A IA foi usada para planejar a arquitetura, gerar código-fonte e documentação, e rascunhar textos.
> Todo o conteúdo foi revisado, testado e adaptado pelo autor, que assume a responsabilidade pelo resultado.
