import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const VALID_THEMES = ["light", "dark", "system"];

export function ThemeProvider({ children }) {

  //  Get initial theme (safe)
  const getInitialTheme = () => {
    const stored = localStorage.getItem("monni-theme");

    if (VALID_THEMES.includes(stored)) return stored;

    return "system"; // default
  };

  const [theme, setThemeState] = useState(getInitialTheme);

  //  Apply theme to DOM
  const applyTheme = (themeValue) => {
    const root = document.documentElement;

    if (themeValue === "dark") {
      root.classList.add("dark");
    } 
    else if (themeValue === "light") {
      root.classList.remove("dark");
    } 
    else {
      // system
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    }
  };

  //  Safe setter
  const setTheme = (newTheme) => {
    if (!VALID_THEMES.includes(newTheme)) return;

    setThemeState(newTheme);
  };

  //  Apply + persist
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("monni-theme", theme);
  }, [theme]);

  //  Listen to system changes (VERY PREMIUM)
  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => applyTheme("system");

    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
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