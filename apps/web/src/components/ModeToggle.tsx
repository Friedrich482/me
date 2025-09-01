import ModeToggleContent from "@repo/ui/components/ModeToggleContent";
import type { Theme } from "@repo/ui/types-schemas";
import { useState, useEffect } from "react";

export function ModeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  const handleThemeOptionClick = (theme: Theme) => {
    setTheme(theme);
  };

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setTheme(isDarkMode ? "dark" : "light");
  }, []);

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <ModeToggleContent
      theme={theme}
      handleThemeOptionClick={handleThemeOptionClick}
    />
  );
}
