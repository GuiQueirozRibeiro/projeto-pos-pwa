import { useEffect, useState } from "react";

/**
 * Exibe uma faixa alertando o usuário que ele está sem internet.
 * Como o Firestore tem cache local, o app continua funcionando.
 */
export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      style={{
        backgroundColor: "var(--ritmo-warning)",
        color: "#000",
        padding: "0.5rem 1rem",
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: "500",
        position: "sticky",
        top: 0,
        zIndex: 1050,
      }}
    >
      Sem conexão. O app funcionará offline e sincronizará os dados depois.
    </div>
  );
}
