import { Briefcase, Mail, PenTool } from "lucide-react";
import type { SvgComponent } from "astro/types";

import {
  type IconType,
  SiDailydotdev,
  SiGithub,
  SiX,
} from "@icons-pack/react-simple-icons";

import LinkedIn from "./assets/socials/linkedin.svg";

export const CONTACT_LINKS: {
  Icon: IconType | (SvgComponent & ImageMetadata);
  link: string;
  title: string;
  target: string;
}[] = [
  {
    Icon: Briefcase,
    link: "/portfolio/",
    title: "Portfolio",
    target: "_self",
  },
  {
    Icon: PenTool,
    link: "/blog/",
    title: "Blog",
    target: "_self",
  },
  {
    Icon: SiGithub,
    link: "https://github.com/Friedrich482",
    title: "GitHub",
    target: "_blank",
  },
  {
    Icon: Mail,
    link: "mailto:friedrichcorner@gmail.com",
    title: "Mail",
    target: "_blank",
  },
  {
    Icon: LinkedIn,
    link: "https://www.linkedin.com/in/friedrich-wekenon-tokponto-106789283/",
    title: "LinkedIn",
    target: "_blank",
  },
  {
    Icon: SiX,
    link: "https://x.com/FriedrichC109",
    title: "X",
    target: "_blank",
  },
  {
    Icon: SiDailydotdev,
    link: "https://app.daily.dev/friedrich",
    title: "Daily.dev",
    target: "_blank",
  },
];
