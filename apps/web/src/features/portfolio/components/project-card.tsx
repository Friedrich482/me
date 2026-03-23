import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

import { appTheme } from "@/stores/theme-store";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useStore } from "@nanostores/react";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

import type { Project } from "../types-schemas";
import { handleCardHover } from "../utils/handle-card-hover";
import { handleCardLeave } from "../utils/handle-card-leave";

export const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  // prevents hydration errors and forces the component to be only rendered on the client (the theme is determined on the client)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { resolvedTheme } = useStore(appTheme);

  if (!isMounted) {
    return <Skeleton className="h-112 w-full" />;
  }

  return (
    <div className="duration-300 perspective-midrange transform-3d">
      <div
        className="border-border hover:shadow-primary group flex w-full scale-3d flex-col gap-3 rounded-md border p-3 shadow-2xl duration-300 will-change-transform transform-3d dark:hover:shadow-inner"
        onMouseMove={handleCardHover}
        onMouseLeave={handleCardLeave}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-primary text-2xl">{project.title}</h2>
          <div className="flex gap-3">
            <a
              href={project.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="External Link"
            >
              <ExternalLink className="hover:text-primary" />
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Link"
            >
              <SiGithub className="hover:text-primary" />
            </a>
          </div>
        </div>
        <img
          src={
            resolvedTheme === "dark"
              ? project.image.srcDark
              : project.image.srcLight
          }
          width="1000"
          height="1000"
          alt={project.image.alt}
          className="group-hover:border-primary/90 w-full rounded-md border"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
        <p className="opacity-75">{project.description}</p>
        <ul className="flex flex-wrap gap-1.5">
          {project.technologies.map((techno) => (
            <li
              key={`${project.title}-${techno}`}
              className="min-w-20 rounded-sm border px-2 py-1 text-center opacity-65"
            >
              {techno}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
