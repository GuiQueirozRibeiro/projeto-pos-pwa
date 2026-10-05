import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Componente que lida com o evento beforeinstallprompt para
 * permitir a instalação do PWA. (Reaproveitado do professor).
 */
export default function InstallPwaButton({ variant = "outline-primary", size = "sm", className }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(
    window.matchMedia("(display-mode: standalone)").matches
  );

  useEffect(() => {
    function onBeforeInstallPrompt(event) {
      event.preventDefault(); // Impede o navegador de mostrar o aviso padrão
      setDeferredPrompt(event);
    }
    
    function onAppInstalled() {
      setInstalled(true);
      setDeferredPrompt(null);
    }
    
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  if (installed || !deferredPrompt) return null;

  async function handleInstall() {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Usuário ${outcome} a instalação do PWA`);
    setDeferredPrompt(null);
  }

  return (
    <Button size={size} variant={variant} className={className} onClick={handleInstall}>
      Instalar App
    </Button>
  );
}
