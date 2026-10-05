import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged é a fonte da verdade sobre o login.
    // O Firebase persiste a sessão no IndexedDB sozinho.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function register(name, email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Adição em relação ao professor: salvar o nome de exibição.
    await updateProfile(userCredential.user, { displayName: name });
    // Força a atualização do estado local (porque updateProfile não dispara onAuthStateChanged)
    setUser({ ...userCredential.user, displayName: name });
  }

  async function logout() {
    await signOut(auth);
  }

  const value = { user, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook customizado para acessar o contexto facilmente nos componentes
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de <AuthProvider>");
  return ctx;
}
