export type Project = {
  title: string;
  image: {
    srcLight: string;
    srcDark: string;
    alt: string;
  };
  description: string;
  technologies: string[];
  githubLink: string;
  previewLink: string;
};
