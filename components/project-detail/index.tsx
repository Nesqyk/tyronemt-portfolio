import ProjectGallery from "@/components/project-gallery";
import type { Project } from "@/lib/projects";

export const ProjectDetail = ({ project }: { project: Project }) => (
  <>
    <p className="text-muted">{project.summary}</p>
    <ProjectGallery title={project.title} images={project.gallery} video={project.video} />
  </>
);
