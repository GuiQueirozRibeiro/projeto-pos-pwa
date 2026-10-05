import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

/**
 * Configuração do Vite + PWA.
 *
 * Base: vite.config.js do projeto do professor (infnet-pwa-react).
 * Diferenças principais:
 *   - manifest com a identidade do "Ritmo" e atalhos para as telas novas;
 *   - runtimeCaching para as fontes do Google (exemplo concreto das
 *     estratégias de cache que no projeto vanilla eram escritas à mão em sw.js);
 *   - configuração do vitest (testes de funções puras) no mesmo arquivo.
 */
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // "generateSW": o plugin gera o service worker (dist/sw.js) usando o
      // Workbox. É o equivalente declarativo do sw.js manual do projeto
      // infnet-26e3-pwa (ASSETS + cacheFirst + networkFirst + CACHE_VERSION).
      strategies: "generateSW",
      // "autoUpdate": quando sai um build novo, o SW novo é ativado sozinho
      // (equivalente ao self.skipWaiting() + clients.claim() do sw.js manual).
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "icons/*.png"],
      manifest: {
        id: "/",
        name: "Ritmo — Foco e blocos de tempo",
        short_name: "Ritmo",
        description:
          "Planeje o seu dia em blocos de horário, execute com Pomodoro e acompanhe o que foi feito.",
        lang: "pt-BR",
        start_url: "/hoje",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#0f1020",
        theme_color: "#4f46e5",
        categories: ["productivity"],
        icons: [
          { src: "icons/icon-72x72.png", sizes: "72x72", type: "image/png" },
          { src: "icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
          { src: "icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
          { src: "icons/icon-144x144.png", sizes: "144x144", type: "image/png" },
          { src: "icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
          { src: "icons/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icons/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
          { src: "icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
          { src: "icons/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "icons/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
        // Atalhos aparecem ao segurar o ícone do app instalado (Android) ou
        // com o botão direito no ícone (desktop). As rotas serão criadas nas
        // próximas fases.
        shortcuts: [
          {
            name: "Novo bloco",
            short_name: "Novo bloco",
            url: "/hoje?novo=1",
            icons: [{ src: "icons/icon-192x192.png", sizes: "192x192" }],
          },
          {
            name: "Iniciar foco",
            short_name: "Foco",
            url: "/foco",
            icons: [{ src: "icons/icon-192x192.png", sizes: "192x192" }],
          },
          {
            name: "Dashboard",
            short_name: "Dashboard",
            url: "/dashboard",
            icons: [{ src: "icons/icon-192x192.png", sizes: "192x192" }],
          },
        ],
      },
      workbox: {
        // App Shell: tudo que o build gera é pré-cacheado na instalação do
        // SW (equivalente ao array ASSETS + cache.addAll() no evento install).
        globPatterns: ["**/*.{js,css,html,png,svg,ico,woff2}"],
        // SPA: qualquer navegação offline cai no index.html e o React Router
        // decide qual tela mostrar.
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            // Firestore/Auth: o próprio SDK cuida do offline (cache
            // persistente em IndexedDB). Cachear isso no SW causaria dados
            // velhos e conflitos, então: só rede.
            urlPattern: ({ url }) =>
              url.hostname.includes("googleapis.com") &&
              !url.hostname.startsWith("fonts."),
            handler: "NetworkOnly",
          },
          {
            // CSS das fontes muda raramente: StaleWhileRevalidate entrega o
            // que está em cache na hora e atualiza em segundo plano.
            urlPattern: ({ url }) => url.origin === "https://fonts.googleapis.com",
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts-css" },
          },
          {
            // Arquivos das fontes (woff2) nunca mudam para a mesma URL:
            // CacheFirst (igual ao cacheFirst() do sw.js manual).
            urlPattern: ({ url }) => url.origin === "https://fonts.gstatic.com",
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-files",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: {
        // Registra o SW também no `npm run dev` (DevTools > Application).
        enabled: true,
        type: "module",
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
  },
  test: {
    // Testes só de funções puras (datas, estatísticas, timer): ambiente node basta.
    environment: "node",
    include: ["src/**/*.test.js"],
  },
});
