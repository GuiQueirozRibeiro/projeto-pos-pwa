import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Inicializa o tema lendo do localStorage ou assumindo "system"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("ritmo-theme") || "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    function applyTheme(currentTheme) {
      if (currentTheme === "system") {
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.setAttribute("data-bs-theme", systemDark ? "dark" : "light");
      } else {
        root.setAttribute("data-bs-theme", currentTheme);
      }
    }

    applyTheme(theme);
    localStorage.setItem("ritmo-theme", theme);

    // Escuta mudanças no sistema, caso o tema escolhido seja "system"
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") applyTheme("system");
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
