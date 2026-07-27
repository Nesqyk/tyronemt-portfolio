import fs from "fs";
import path from "path";
import { getProjects } from "@/lib/mdx";

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);
const videoExtensions = new Set([".mp4", ".webm", ".mov", ".m4v"]);

export type ProjectMedia = {
  src: string;
  type: "image" | "video";
  alt: string;
};

function getProjectMedia(slug: string, title: string): ProjectMedia[] {
  const directory = path.join(process.cwd(), "public", "projects", slug);
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()) || videoExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((file, index) => ({
      src: `/projects/${slug}/${encodeURIComponent(file)}`,
      type: videoExtensions.has(path.extname(file).toLowerCase()) ? "video" : "image",
      alt: `${title} preview ${index + 1}`,
    }));
}

const documents = getProjects();
export const projects = documents.map((project) => ({
  ...project,
  projectMedia: getProjectMedia(project.slug, project.title),
}));
export type Project = (typeof projects)[number];
export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
export const featuredProjects = projects.filter((project) => project.featured);
