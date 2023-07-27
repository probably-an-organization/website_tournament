import { useState, createContext, useEffect, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

enum Theme {
  Light = "light",
  Dark = "dark",
}

/* CONTEXT */
type ThemeContext = {
  theme?: Theme;
  setTheme: Dispatch<SetStateAction<Theme | undefined>>;
  toggleTheme(): void;
};

export const ThemeContext = createContext<ThemeContext>({
  theme: Theme.Dark,
  setTheme: () => undefined,
  toggleTheme: () => undefined,
});

/* HOOK */
export type ThemeContextProps = ({
  theme,
  setTheme,
  toggleTheme,
}: ThemeContext) => void;

export const useTheme = () => useContext(ThemeContext);

/* CONTEXT PROVIDER */
type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>();

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.Dark ? Theme.Light : Theme.Dark));
  };

  useEffect(() => {
    switch (theme) {
      case Theme.Light:
        document.querySelector("html")?.classList.remove("dark");
        document.querySelector("html")?.classList.add("light");
        break;
      case Theme.Dark:
        document.querySelector("html")?.classList.remove("light");
        document.querySelector("html")?.classList.add("dark");
        break;
      default:
        setTheme(localStorage.theme ?? Theme.Light);
        return;
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
