import { ModeToggleContent } from "@repo/ui/components/mode-toggle-content";
import { useTheme } from "@repo/ui/providers/theme-provider";
import type { Theme } from "@repo/ui/types-schemas";

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme();
  const handleThemeOptionClick = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <ModeToggleContent
      theme={theme}
      handleThemeOptionClick={handleThemeOptionClick}
    />
  );
};
