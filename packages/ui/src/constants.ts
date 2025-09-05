import { type LucideProps, Monitor, Moon, Sun } from "lucide-react";

import type { Theme } from "#types-schemas.ts";

export const THEME_ITEMS: {
  theme: Theme;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
}[] = [
  {
    theme: "light",
    Icon: Sun,
    text: "Light",
  },
  {
    theme: "dark",
    Icon: Moon,
    text: "Dark",
  },
  {
    theme: "system",
    Icon: Monitor,
    text: "System",
  },
];
