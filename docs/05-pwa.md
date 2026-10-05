# 05 — PWA

Um **Progressive Web App** é um site que, com três peças, passa a se comportar como um app:

| Peça | No Ritmo | Para quê |
|---|---|---|
| **HTTPS** | `localhost` conta como seguro; em produção, o Firebase Hosting ou outro host com HTTPS | Requisito para service worker, notificações e instalação |
| **Web App Manifest** | gerado a partir de `manifest` em `vite.config.js` → `dist/manifest.webmanifest` | Nome, ícones, cores, `display: standalone`, atalhos |
| **Service Worker** | gerado pelo Workbox a partir de `workbox` em `vite.config.js` → `dist/sw.js` | Cache do App Shell, funcionamento offline, notificações |

Referência: trilha [web.dev/learn/pwa](https://web.dev/learn/pwa).

## Do `sw.js` manual ao `vite-plugin-pwa`

No projeto vanilla das aulas (`infnet-26e3-pwa`), o service worker foi **escrito à mão**.
No React, ele é **descrito como configuração** e gerado no build. A tabela relaciona as duas versões:

| `infnet-26e3-pwa/sw.js` (à mão) | `vite.config.js` (gerado) |
|---|---|
| `const ASSETS = ["/", "/index.html", ...]` | `workbox.globPatterns` (o build já sabe quais arquivos existem e põe hash no nome) |
| `install` → `cache.addAll(ASSETS)` | *precache* automático do Workbox |
| `CACHE_VERSION = "v11"` e limpeza no `activate` | Cada arquivo tem uma *revision* (hash). O Workbox remove os antigos sozinho |
| `self.skipWaiting()` + `clients.claim()` | `registerType: "autoUpdate"` |
| `cacheFirst(request)` | `handler: "CacheFirst"` (fontes `fonts.gstatic.com`) |
| `networkFirst(request)` | `handler: "NetworkFirst"` (não usamos) |
| (não tinha) | `handler: "StaleWhileRevalidate"` (CSS das fontes) |
| `fetch` com `method !== "GET"` → passa direto | O Workbox só cacheia `GET` por padrão |
| fila `outbox` + `sync` (Background Sync) | **Desnecessário**: o SDK do Firestore faz a fila offline |
| `navigator.serviceWorker.register("/sw.js")` | `dist/registerSW.js`, injetado no `index.html` automaticamente |

### Estratégias de cache (resumo)

| Estratégia | Como funciona | Bom para |
|---|---|---|
| **CacheFirst** | Usa o cache; só vai à rede se não tiver | Arquivos que nunca mudam (fontes, assets com hash) |
| **NetworkFirst** | Tenta a rede; se falhar, usa o cache | Conteúdo que muda e precisa estar atualizado |
| **StaleWhileRevalidate** | Responde do cache **e** atualiza o cache em segundo plano | Conteúdo que muda pouco |
| **NetworkOnly** | Sempre a rede | Firestore/Auth (o SDK cuida do offline) |

## Como inspecionar

1. `npm run build && npm run preview` → <http://localhost:4173>
2. DevTools → **Application**:
   - **Manifest**: confira nome, ícones, atalhos e erros de instalação;
   - **Service Workers**: o `sw.js` ativo, com as opções *Offline*, *Update on reload* e *Push*;
   - **Cache Storage**: `workbox-precache-v2-…` (App Shell) e `google-fonts-*`.
3. Marque **Offline** em *Service Workers* (ou em *Network*) e recarregue a página: o app continua abrindo.

> No `npm run dev`, o SW também é registrado (`devOptions.enabled`), mas a versão de desenvolvimento
> não faz precache de tudo. Para testar offline e instalação de verdade, use `build` + `preview`.

## Recursos de "app" planejados

| Recurso | API | Fase |
|---|---|---|
| Instalar | `beforeinstallprompt` (componente do professor) | 1 |
| Aviso de offline | eventos `online` / `offline` (componente do professor) | 1 |
| Atalhos no ícone | `manifest.shortcuts` | 0 ✅ (rotas nas fases 2–4) |
| Notificação de fim de pomodoro | `Notification.requestPermission` + `registration.showNotification` | 3 |
| Selo no ícone (contador de blocos pendentes) | Badging API (`navigator.setAppBadge`) | 5 (opcional) |
