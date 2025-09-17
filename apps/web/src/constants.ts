import { Briefcase, Linkedin, Mail, PenTool } from "lucide-react";

import {
  type IconType,
  SiDailydotdev,
  SiGithub,
  SiX,
} from "@icons-pack/react-simple-icons";

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
  { text: "Home", link: "/" },
  { text: "Blog", link: "/blog" },
  { text: "Portfolio", link: "/portfolio" },
];

export const CONTACT_LINKS: {
  Icon: IconType;
  link: string;
  title: string;
}[] = [
  {
    Icon: Briefcase,
    link: "/portfolio",
    title: "Portfolio",
  },
  {
    Icon: PenTool,
    link: "/blog",
    title: "Blog",
  },
  {
    Icon: SiGithub,
    link: "https://github.com/Friedrich482",
    title: "GitHub",
  },
  {
    Icon: Mail,
    link: "mailto:friedrichcorner@gmail.com",
    title: "Mail",
  },
  {
    Icon: Linkedin,
    link: "https://www.linkedin.com/in/friedrich-wekenon-tokponto-106789283/",
    title: "LinkedIn",
  },
  {
    Icon: SiX,
    link: "https://x.com/FriedrichC109",
    title: "X",
  },
  {
    Icon: SiDailydotdev,
    link: "https://app.daily.dev/friedrich",
    title: "Daily.dev",
  },
];
