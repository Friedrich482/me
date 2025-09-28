import { Briefcase, Mail, PenTool } from "lucide-react";

import FriedrichSellsPreviewDarkImage from "@/assets/projects/dark/friedrich-sells-preview-dark.webp";
import MangaXRPreviewDarkImage from "@/assets/projects/dark/mangaxr-preview-dark.webp";
import MoonCodePreviewDarkImage from "@/assets/projects/dark/mooncode-preview-dark.webp";
import FriedrichSellsPreviewLightImage from "@/assets/projects/light/friedrich-sells-preview-light.webp";
import MangaXRPreviewLightImage from "@/assets/projects/light/mangaxr-preview-light.webp";
import MoonCodePreviewLightImage from "@/assets/projects/light/mooncode-preview-light.webp";
import DockerLogo from "@/assets/tech/docker.svg";
import DrizzleORMLogo from "@/assets/tech/drizzle.svg";
import ExpressLogo from "@/assets/tech/express.svg";
import FigmaLogo from "@/assets/tech/figma.svg";
import LinkedIn from "@/assets/tech/linkedin.svg";
import MongoDBLogo from "@/assets/tech/mongodb.svg";
import NestJSLogo from "@/assets/tech/nestjs.svg";
import NextJSLogo from "@/assets/tech/nextjs.svg";
import NodeJSLogo from "@/assets/tech/nodejs.svg";
import PostgreSQLLogo from "@/assets/tech/postgresql.svg";
import PrismaLogo from "@/assets/tech/prisma.svg";
import ReactLogo from "@/assets/tech/react.svg";
import ReactRouterLogo from "@/assets/tech/react-router.svg";
import ShadcnLogo from "@/assets/tech/shadcn-ui.svg";
import TailwindCSSLogo from "@/assets/tech/tailwind-css.svg";
import TypeScriptLogo from "@/assets/tech/typescript.svg";
import ViteLogo from "@/assets/tech/vite.svg";
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
  { text: "Blog", link: "/blog/" },
  { text: "Portfolio", link: "/portfolio/" },
];

export const CONTACT_LINKS: {
  Icon:
    | IconType
    | (((_props: astroHTML.JSX.SVGAttributes) => any) & ImageMetadata);
  link: string;
  title: string;
}[] = [
  {
    Icon: Briefcase,
    link: "/portfolio/",
    title: "Portfolio",
  },
  {
    Icon: PenTool,
    link: "/blog/",
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
    Icon: LinkedIn,
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
    image: {
      srcDark: MoonCodePreviewDarkImage.src,
      srcLight: MoonCodePreviewLightImage.src,
      alt: "MoonCode preview image",
    },
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
    image: {
      srcDark: MangaXRPreviewDarkImage.src,
      srcLight: MangaXRPreviewLightImage.src,
      alt: "MangaXR preview image",
    },
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
    image: {
      srcDark: FriedrichSellsPreviewDarkImage.src,
      srcLight: FriedrichSellsPreviewLightImage.src,
      alt: "Friedrich Sells preview image",
    },
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

export const SKILLS: {
  logo: ((_props: astroHTML.JSX.SVGAttributes) => any) & ImageMetadata;
  tech: string;
}[] = [
  { tech: "TypeScript", logo: TypeScriptLogo },
  { tech: "React", logo: ReactLogo },
  { tech: "Next.js", logo: NextJSLogo },
  { tech: "Vite", logo: ViteLogo },
  { tech: "React Router", logo: ReactRouterLogo },
  { tech: "Tailwind CSS", logo: TailwindCSSLogo },
  { tech: "shadcn/ui", logo: ShadcnLogo },
  { tech: "Node.js", logo: NodeJSLogo },
  { tech: "Express.js", logo: ExpressLogo },
  { tech: "Nest.js", logo: NestJSLogo },
  { tech: "Prisma", logo: PrismaLogo },
  { tech: "Drizzle ORM", logo: DrizzleORMLogo },
  { tech: "Docker", logo: DockerLogo },
  { tech: "PostgreSQL", logo: PostgreSQLLogo },
  { tech: "MongoDB", logo: MongoDBLogo },
  { tech: "Figma", logo: FigmaLogo },
];
