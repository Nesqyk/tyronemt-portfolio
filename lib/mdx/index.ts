import fs from "fs";
import matter from "gray-matter";
import path from "path";
import type { Post, ProjectFrontmatter } from "@/types/post";

function readFile(filePath: string): Post | null {
  try {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(rawContent);
    const slug = path.basename(filePath, path.extname(filePath));
    return { ...data, slug, content } as Post;
  } catch (error) {
    console.error(`Failed to read or parse the file at ${filePath}:`, error);
    return null;
  }
}

function getFiles(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
  } catch (error) {
    console.error(`Failed to read directory at ${dir}:`, error);
    return [];
  }
}

export function getPosts(directory: string): Post[] {
  const postDirectory = path.join(process.cwd(), "app", "(posts)", directory, "posts");
  return getFiles(postDirectory)
    .map((file) => readFile(path.join(postDirectory, file)))
    .filter((post): post is Post => post !== null)
    .map((post) => ({
      ...post,
      time: {
        created: post.time?.created ?? "2026-01-01",
        updated: post.time?.updated ?? post.time?.created ?? "2026-01-01",
      },
    }));
}

export type ProjectDocument = ProjectFrontmatter & {
  content: string;
  time: Post["time"];
};

export function getProjects(): ProjectDocument[] {
  const directory = path.join(process.cwd(), "app", "(posts)", "work", "posts");
  return getFiles(directory)
    .map((file) => readFile(path.join(directory, file)))
    .filter((project): project is Post => project !== null)
    .map(
      (project) =>
        ({
          ...project,
          time: project.time ?? {
            created: `${(project as unknown as ProjectFrontmatter).year}-01-01`,
            updated: `${(project as unknown as ProjectFrontmatter).year}-01-01`,
          },
        }) as unknown as ProjectDocument,
    )
    .sort((a, b) => a.order - b.order);
}
