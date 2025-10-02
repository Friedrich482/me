import { useEffect } from "react";

import { appTheme } from "@/store/themeStore";
import { useStore } from "@nanostores/react";
import ModeToggleContent from "@repo/ui/components/ModeToggleContent";
import type { ResolvedTheme, Theme } from "@repo/ui/types-schemas";

const ModeToggle = () => {
  const $themeData = useStore(appTheme);

  const handleThemeOptionClick = (theme: Theme) => {
    appTheme.set({ ...$themeData, theme });
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    let newTheme: ResolvedTheme;

    if ($themeData.theme === "system") {
      newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      newTheme = $themeData.theme;
    }

    root.classList.add(newTheme);
    appTheme.set({ ...$themeData, resolvedTheme: newTheme });
  }, [$themeData.theme]);

  return (
    <div className="flex">
      <ModeToggleContent
        theme={$themeData.theme}
        handleThemeOptionClick={handleThemeOptionClick}
      />
    </div>
  );
};

export default ModeToggle;
