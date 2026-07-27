import { notFound } from "next/navigation";
import { Layout } from "@/components/screens/posts";
import { getProjectBySlug, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  return project ? { title: project.title, description: project.summary } : { title: "Project" };
}
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  const gallery = `<ProjectGallery title=${JSON.stringify(project.title)} images={${JSON.stringify(project.gallery)}}${project.video ? ` video=${JSON.stringify(project.video)}` : ""} />`;
  return (
    <Layout
      post={{
        ...project,
        content: `${project.content}\n\n## Gallery\n\n${gallery}`,
      }}
      route="work"
    />
  );
}
