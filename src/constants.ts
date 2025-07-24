import { Monitor, Moon, Sun, type LucideProps } from "lucide-react";
import type { Theme } from "./types-schemas";
import {
  SiDailydotdev,
  SiGithub,
  SiX,
  type IconType,
} from "@icons-pack/react-simple-icons";

export const THEME_ITEMS: {
  theme: Theme;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
}[] = [
  {
    theme: "theme-light",
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

export const HEADER_LINKS: {
  Icon: IconType;
  link: string;
  title: string;
}[] = [
  {
    Icon: SiGithub,
    link: "https://github.com/Friedrich482",
    title: "GitHub",
  },
  {
    Icon: SiDailydotdev,
    link: "https://app.daily.dev/friedrich",
    title: "Daily.dev",
  },
  {
    Icon: SiX,
    link: "https://x.com/FriedrichC109",
    title: "X",
  },
];

export const NAVBAR_LINKS: { text: string; link: string }[] = [
  { text: "Blog", link: "/blog" },
  { text: "Portfolio", link: "/portfolio" },
];
