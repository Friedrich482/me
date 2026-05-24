import { useEffect, useState } from "react";

import { ModeToggleContent } from "@repo/ui/components/mode-toggle-content";
import { getInitialTheme } from "@repo/ui/lib/utils";
import type { ResolvedTheme, Theme } from "@repo/ui/types-schemas";

export const ModeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());
  const [, setResolvedTheme] = useState<ResolvedTheme>("light");

  const handleThemeOptionClick = (theme: Theme) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    let newTheme: ResolvedTheme;

    if (theme === "system") {
      newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      newTheme = theme;
    }

    root.classList.add(newTheme);
    setResolvedTheme(newTheme);
  }, [theme]);

  return (
    <ModeToggleContent
      theme={theme}
      handleThemeOptionClick={handleThemeOptionClick}
    />
  );
};
