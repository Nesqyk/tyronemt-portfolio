import { Breadcrumb } from "@/components/breadcrumb";
import { ProjectGrid } from "@/components/project-grid";
import { projects } from "@/lib/projects";

export const metadata = { title: "Projects" };
export default function WorkPage() {
  return (
    <>
      <Breadcrumb />
      <h1>Projects</h1>
      <div className="mt-2 border-border border-t" />
      <div className="mt-5">
        <ProjectGrid projects={projects} showDetails={false} />
      </div>
    </>
  );
}
