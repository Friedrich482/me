import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { THEME_ITEMS } from "#constants.ts";
import { cn } from "#lib/utils.ts";
import { type Theme } from "#types-schemas.ts";

const ModeToggleContent = ({
  theme,
  handleThemeOptionClick,
}: {
  theme: Theme;
  handleThemeOptionClick: (theme: Theme) => void;
}) => {
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
            onClick={() => handleThemeOptionClick(selectedTheme)}
            className={cn(
              "group cursor-pointer",
              selectedTheme === theme && "border-primary border",
            )}
            key={text}
          >
            <Icon />
            {text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggleContent;
