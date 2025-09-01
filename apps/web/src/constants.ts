import {
  SiDailydotdev,
  SiGithub,
  SiX,
  type IconType,
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
  { text: "Blog", link: "/blog" },
  { text: "Portfolio", link: "/portfolio" },
];

export const API_URL = "http://localhost:3010/trpc";
