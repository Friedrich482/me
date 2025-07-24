import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Theme } from "@/types-schemas";
import { THEME_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const [theme, setThemeState] = useState<Theme>("theme-light");

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="size-[1.6rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-[1.3rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1 p-2">
        {THEME_ITEMS.map(({ Icon, text, theme: selectedTheme }) => (
          <DropdownMenuItem
            onClick={() => setThemeState(selectedTheme)}
            className={cn(
              "group cursor-pointer",
              selectedTheme === theme && "border-primary border",
            )}
            key={text}
          >
            <Icon className="group-hover:text-primary-foreground" />
            {text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
