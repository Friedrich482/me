import ModeToggleContent from "@repo/ui/components/ModeToggleContent";
import { useTheme } from "@/providers/themeProvider";
import type { Theme } from "@repo/ui/types-schemas";

export function ModeToggle() {
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
}
