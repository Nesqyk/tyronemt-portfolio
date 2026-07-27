import * as FadeIn from "@/components/motion/staggers/fade";
import { ProjectGrid } from "@/components/project-grid";
import { getProjectBySlug } from "@/lib/projects";

const selectedProjects = ["panoptes", "perch", "applymatic", "irisvault", "pigeonvault"]
  .map((slug) => getProjectBySlug(slug))
  .filter((project): project is NonNullable<typeof project> => project !== undefined);
const structSure = getProjectBySlug("structsure");

export const WorkSection = () => (
  <FadeIn.Item>
    <section aria-labelledby="work-heading" className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden bg-background px-6">
      {/* <div className="border-border border-b pb-2"><h2 id="work-heading" className="text-foreground">Selected Works (6)</h2></div> */}
      <ProjectGrid
        projects={selectedProjects}
        includeVideo
        videoProject={structSure}
        horizontal
        videoFirst
        disableHover
        showDetails={false}
        cardWidthClassName="w-[calc(100vw-3rem)] sm:w-[28rem] lg:w-[34rem]"
        fillMedia
      />
    </section>
  </FadeIn.Item>
);
