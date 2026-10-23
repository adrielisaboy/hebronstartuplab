import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hsl-theme");
      if (stored === "light" || stored === "dark") {
        return stored;
      }
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
      const f32 = document.querySelector<HTMLLinkElement>('link[rel="icon"][sizes="32x32"]');
      const f16 = document.querySelector<HTMLLinkElement>('link[rel="icon"][sizes="16x16"]');
      const fIco = document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]');
      if (f32) f32.href = "/favicon-dark-32x32.png";
      if (f16) f16.href = "/favicon-dark-16x16.png";
      if (fIco) fIco.href = "/favicon-dark.ico";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      const f32 = document.querySelector<HTMLLinkElement>('link[rel="icon"][sizes="32x32"]');
      const f16 = document.querySelector<HTMLLinkElement>('link[rel="icon"][sizes="16x16"]');
      const fIco = document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]');
      if (f32) f32.href = "/favicon-32x32.png";
      if (f16) f16.href = "/favicon-16x16.png";
      if (fIco) fIco.href = "/favicon.ico";
    }

    if (switchable && typeof window !== "undefined") {
      localStorage.setItem("hsl-theme", theme);
    }
  }, [theme, switchable]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
