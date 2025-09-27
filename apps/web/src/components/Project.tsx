import { ExternalLink } from "lucide-react";

import type { Project } from "@/types-schemas";
import { SiGithub } from "@icons-pack/react-simple-icons";

const handleCardHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();

  const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
  const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

  // Rotation angles (side you hover goes UP)
  const maxRotation = 20;
  const rotateX = relativeY * maxRotation * 1;
  const rotateY = relativeX * maxRotation * -1;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
};

const handleCardLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const card = e.currentTarget;
  card.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
};

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="duration-300 perspective-[800px] transform-3d">
    <div
      className="border-border hover:shadow-primary group flex w-full scale-3d flex-col gap-3 rounded-md border-1 p-3 shadow-2xl duration-300 will-change-transform transform-3d dark:hover:shadow-inner"
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
        src={project.image.src}
        alt={project.image.alt}
        className="group-hover:border-primary/90 rounded-md border"
      />
      <p className="opacity-75">{project.description}</p>
      <ul className="flex flex-wrap gap-1.5">
        {project.technologies.map((techno) => (
          <li
            key={`${project.title}-${techno}`}
            className="min-w-20 rounded-sm border-1 px-2 py-1 text-center opacity-65"
          >
            {techno}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ProjectCard;
