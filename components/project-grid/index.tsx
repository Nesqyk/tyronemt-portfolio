"use client";

import { motion } from "framer-motion";
import type { DragEvent } from "react";
import { useEffect, useRef, useState } from "react";
import EditorialLightbox from "@/components/editorial-lightbox";
import type { Project } from "@/lib/projects";

type GridItem = { project: Project; video?: string; key: string };
const noDrag = (event: DragEvent) => event.preventDefault();

function ProjectVideo({ src, reducedMotion, fillMedia }: { src: string; reducedMotion: boolean; fillMedia: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? void video.play().catch(() => undefined) : video.pause()), {
      rootMargin: "200px 0px",
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay={!reducedMotion}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Project video preview"
      draggable={false}
      onDragStart={noDrag}
      className={`pointer-events-none block select-none rounded-sm object-contain [-webkit-user-drag:none] ${fillMedia ? "h-full w-full" : "max-h-full max-w-full"}`}
    />
  );
}

export const ProjectGrid = ({
  projects,
  includeVideo = false,
  showDetails = true,
  videoProject: videoProjectOverride,
  gridClassName = "grid-cols-1 sm:grid-cols-2",
  horizontal = false,
  videoFirst = false,
  disableHover = false,
  cardWidthClassName = "w-[calc(100vw-2rem)] sm:w-[32rem] lg:w-[40rem]",
  fillMedia = false,
}: {
  projects: readonly Project[];
  includeVideo?: boolean;
  showDetails?: boolean;
  videoProject?: Project;
  gridClassName?: string;
  horizontal?: boolean;
  videoFirst?: boolean;
  disableHover?: boolean;
  cardWidthClassName?: string;
  fillMedia?: boolean;
}) => {
  const [focusedKey, setFocusedKey] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startScrollLeft: 0 });
  const draggedRef = useRef(false);
  const items: GridItem[] = projects.map((project) => ({
    project,
    key: project.slug,
  }));
  const videoProject = videoProjectOverride ?? projects.find((project) => project.slug === "structsure");

  if (includeVideo && videoProject) {
    const videoItem = {
      project: videoProject,
      video: "/multimedia/video_explainer_structsure.mp4",
      key: "structsure-video",
    };
    if (videoFirst) items.unshift(videoItem);
    else items.push(videoItem);
  }

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!horizontal || !horizontalRef.current) return;
    draggedRef.current = false;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: horizontalRef.current.scrollLeft,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!horizontal || !dragRef.current.active || !horizontalRef.current) return;
    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 10) {
      draggedRef.current = true;
    }
    horizontalRef.current.scrollLeft = dragRef.current.startScrollLeft - distance;
  };

  const handlePointerUp = (_event: React.PointerEvent<HTMLDivElement>) => {
    if (!horizontal || !horizontalRef.current) return;
    dragRef.current.active = false;
  };

  const openGallery = (project: Project) => {
    if (draggedRef.current || project.projectMedia.length === 0) {
      draggedRef.current = false;
      return;
    }
    setActiveProject(project);
    setActiveIndex(0);
  };

  const horizontalCardClass = `${cardWidthClassName} shrink-0 h-48 sm:h-56 lg:h-72`;

  return (
    <>
      <section
        ref={horizontal ? horizontalRef : undefined}
        className={`${horizontal ? "project-scrollbar flex w-full min-w-0 cursor-grab touch-pan-y flex-row items-end gap-6 overflow-x-auto pb-1 active:cursor-grabbing" : `grid gap-5 ${gridClassName}`} `}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => {
          if (!disableHover) setFocusedKey(null);
          if (horizontal) dragRef.current.active = false;
        }}
        onWheel={(event) => {
          if (horizontal && Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.preventDefault();
            event.currentTarget.scrollLeft += event.deltaY;
          }
        }}
        tabIndex={horizontal ? 0 : undefined}
        aria-label={horizontal ? "Selected works carousel" : "Project grid"}
      >
        {items.map(({ project, video, key }) => {
          const isActive = focusedKey === key;
          return (
            <button
              key={key}
              type="button"
              aria-label={`Open ${project.title} gallery`}
              onClick={() => openGallery(project)}
              onPointerEnter={() => {
                if (!disableHover) setFocusedKey(key);
              }}
              onFocus={() => {
                if (!disableHover) setFocusedKey(key);
              }}
              onBlur={(event) => {
                if (!disableHover && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setFocusedKey(null);
                }
              }}
              className={`pointer-events-auto appearance-none border-0 bg-transparent p-0 text-left ${horizontal ? horizontalCardClass : "block min-w-0"} ${disableHover ? "" : `transition-[filter,opacity] duration-300 ${focusedKey === null || isActive ? "opacity-100 grayscale-0" : "opacity-10 grayscale"}`}`}
            >
              <motion.article whileHover={disableHover ? undefined : { opacity: 1 }} className="h-full min-w-0">
                <div
                  className={`relative flex h-full items-center justify-center ${horizontal ? "w-full rounded-sm" : "aspect-[3/2] rounded-base"} overflow-hidden ${horizontal ? "border border-black/5 bg-white" : "bg-gray-3"} p-5 sm:p-7`}
                >
                  {video ? (
                    <ProjectVideo src={video} reducedMotion={reducedMotion} fillMedia={fillMedia} />
                  ) : (
                    <img
                      src={project.cover}
                      alt={`${project.title} preview`}
                      draggable={false}
                      onDragStart={noDrag}
                      className={`pointer-events-none block select-none rounded-sm object-contain [-webkit-user-drag:none] ${fillMedia ? "h-full w-full" : "max-h-full max-w-full"}`}
                    />
                  )}
                </div>
                {showDetails && (
                  <div className="mt-2 flex items-baseline justify-between gap-3">
                    <span className="min-w-0 truncate">{project.title}</span>
                    <span className="shrink-0 text-muted text-small">View project</span>
                  </div>
                )}
              </motion.article>
            </button>
          );
        })}
      </section>
      {activeProject && activeProject.projectMedia.length > 0 && (
        <EditorialLightbox index={activeIndex} slides={activeProject.projectMedia} onClose={() => setActiveProject(null)} onNavigate={setActiveIndex} />
      )}
    </>
  );
};
