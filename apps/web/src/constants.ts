import { Briefcase, Linkedin, Mail, PenTool } from "lucide-react";

import {
  type IconType,
  SiDailydotdev,
  SiGithub,
  SiX,
} from "@icons-pack/react-simple-icons";

import type { Project } from "./types-schemas";

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

export const PROJECTS: Project[] = [
  {
    title: "MoonCode",
    description:
      "A modern application that tracks and monitors your coding time with a detailed summary of languages used, files and projects you're working on. Powered by a vscode extension.",
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "Vite",
      "React Router",
      "Shadcn/ui",
      "Turborepo",
      "tRPC",
      "Nest.js",
      "Drizzle ORM",
      "PostgreSQL",
      "Docker",
      "Dokploy",
    ],
    githubLink: "https://github.com/Friedrich482/mooncode",
    previewLink: "https://api.mooncode.cc",
  },
  {
    title: "MangaXR",
    description:
      "A modern platform to read manga for free and endlessly. Powered by a Web Scrapper of popular manga sites.",
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "Prisma",
      "MongoDB",
      "Docker",
      "Puppeteer",
      "Browserless",
      "Vitest",
    ],
    githubLink: "https://github.com/Friedrich482/manga-xr",
    previewLink: "https://mangaxr.glacifer.com/",
  },
  {
    title: "Friedrich Sell's",
    description: "A React application for houses, cars and motorbikes selling",
    technologies: [
      "TypeScript",
      "React",
      "Vite",
      "React Router",
      "Tailwind CSS",
    ],
    githubLink:
      "https://github.com/Friedrich482/react-houses-cars-motorbikes-sell",
    previewLink: "https://react-houses-cars-motorbikes-sell.vercel.app",
  },
];
