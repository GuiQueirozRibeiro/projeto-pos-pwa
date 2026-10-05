import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  indexedDBLocalPersistence,
  browserLocalPersistence,
  connectAuthEmulator,
} from "firebase/auth";
import {
  initializeFirestore,
  connectFirestoreEmulator,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

/**
 * Inicialização do SDK do Firebase.
 * Baseado no firebase.js do professor, mas sem o Messaging (FCM) por enquanto.
 */

const firebaseConfig = {
  // O Vite injeta essas variáveis a partir do .env
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-ritmo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-ritmo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-ritmo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:demo",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = initializeAuth(firebaseApp, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence],
});

// Firestore configurado com cache local persistente.
// Isso garante o funcionamento offline: grava no IndexedDB local e
// sincroniza com a nuvem quando a conexão volta.
export const db = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

const useEmulators = import.meta.env.VITE_USE_EMULATORS === "true";

if (useEmulators) {
  console.info("[Firebase] Conectando aos emuladores locais (Auth :9099, Firestore :8080).");
  // disableWarnings remove o banner de aviso amarelo na tela
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}

