"use client";

import { Cambio } from "cambio";
import { motion } from "framer-motion";
import type { DragEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { LightboxContent } from "@/components/lightbox-content";
import type { Project } from "@/lib/projects";

type GridItem = {
  project: Project;
  video?: string;
  key: string;
};

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      {
        rootMargin: "200px 0px",
      },
    );

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
      className={`pointer-events-none block select-none [-webkit-user-drag:none] ${
        fillMedia ? "absolute inset-0 h-full w-full object-cover" : "max-h-full max-w-full rounded-sm object-contain"
      }`}
    />
  );
}

function GridCard({
  project,
  video,
  gridKey,
  horizontal,
  showDetails,
  disableHover,
  fillMedia,
  horizontalCardClass,
  reducedMotion,
  focusedKey,
  draggedRef,
  onSetFocused,
}: {
  project: Project;
  video?: string;
  gridKey: string;
  horizontal: boolean;
  showDetails: boolean;
  disableHover: boolean;
  fillMedia: boolean;
  horizontalCardClass: string;
  reducedMotion: boolean;
  focusedKey: string | null;
  draggedRef: React.MutableRefObject<boolean>;
  onSetFocused: (key: string | null) => void;
}) {
  const [open, setOpen] = useState(false);

  const isActive = focusedKey === gridKey;

  return (
    <Cambio.Root
      open={open}
      onOpenChange={(next) => {
        if (next && (draggedRef.current || project.projectMedia.length === 0)) {
          draggedRef.current = false;
          return;
        }

        setOpen(next);
      }}
      dismissible
      motion="snappy"
    >
      <Cambio.Trigger
        aria-label={`Open ${project.title} gallery`}
        onPointerEnter={() => {
          if (!disableHover) {
            onSetFocused(gridKey);
          }
        }}
        onFocus={() => {
          if (!disableHover) {
            onSetFocused(gridKey);
          }
        }}
        onBlur={(event: React.FocusEvent<HTMLButtonElement>) => {
          if (!disableHover && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
            onSetFocused(null);
          }
        }}
        className={`pointer-events-auto appearance-none border-0 bg-transparent p-0 text-left ${horizontal ? horizontalCardClass : "block min-w-0"} ${
          disableHover ? "" : `transition-[filter,opacity] duration-300 ${focusedKey === null || isActive ? "opacity-100 grayscale-0" : "opacity-10 grayscale"}`
        }`}
      >
        <motion.article whileHover={disableHover ? undefined : { opacity: 1 }} className="h-full min-w-0">
          <div
            className={`relative flex h-full items-center justify-center overflow-hidden ${
              horizontal ? "w-full rounded-sm border border-black/5 bg-white" : "aspect-[3/2] rounded-base bg-gray-3"
            } ${fillMedia ? "p-0" : "p-5 sm:p-7"}`}
          >
            {video ? (
              <ProjectVideo src={video} reducedMotion={reducedMotion} fillMedia={fillMedia} />
            ) : (
              <img
                src={project.cover}
                alt={`${project.title} preview`}
                draggable={false}
                onDragStart={noDrag}
                className={`pointer-events-none block select-none [-webkit-user-drag:none] ${
                  fillMedia ? "absolute inset-0 h-full w-full object-cover" : "max-h-full max-w-full rounded-sm object-contain"
                }`}
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
      </Cambio.Trigger>

      <Cambio.Portal>
        <Cambio.Backdrop className="fixed inset-0 z-[100] bg-black-a3" />

        <Cambio.Popup className="z-[101] flex max-h-[80vh] w-[92vw] items-center justify-center overflow-hidden rounded-base bg-background p-6 outline-none md:max-h-[75vh] md:w-[min(900px,80vw)] md:p-8">
          <LightboxContent slides={project.projectMedia} />
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
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
  fillMedia = true,
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
  const [reducedMotion, setReducedMotion] = useState(false);

  const horizontalRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const draggedRef = useRef(false);

  const items: GridItem[] = projects.map((project) => ({
    project,
    key: project.slug,
  }));

  const videoProject = videoProjectOverride ?? projects.find((project) => project.slug === "structsure");

  if (includeVideo && videoProject) {
    const videoItem: GridItem = {
      project: videoProject,
      video: "/multimedia/video_explainer_structsure.mp4",
      key: "structsure-video",
    };

    if (videoFirst) {
      items.unshift(videoItem);
    } else {
      items.push(videoItem);
    }
  }

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setReducedMotion(query.matches);
    };

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
    if (!horizontal || !dragRef.current.active || !horizontalRef.current) {
      return;
    }

    const distance = event.clientX - dragRef.current.startX;

    if (Math.abs(distance) > 10) {
      draggedRef.current = true;
    }

    horizontalRef.current.scrollLeft = dragRef.current.startScrollLeft - distance;
  };

  const handlePointerUp = () => {
    if (!horizontal || !horizontalRef.current) return;

    dragRef.current.active = false;
  };

  const horizontalCardClass = `${cardWidthClassName} h-48 shrink-0 sm:h-56 lg:h-72`;

  return (
    <section
      ref={horizontal ? horizontalRef : undefined}
      className={
        horizontal
          ? "project-scrollbar flex w-full min-w-0 cursor-grab touch-pan-y flex-row items-end gap-6 overflow-x-auto pb-1 active:cursor-grabbing"
          : `grid gap-5 ${gridClassName}`
      }
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={() => {
        if (!disableHover) {
          setFocusedKey(null);
        }

        if (horizontal) {
          dragRef.current.active = false;
        }
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
      {items.map(({ project, video, key }) => (
        <GridCard
          key={key}
          project={project}
          video={video}
          gridKey={key}
          horizontal={horizontal}
          showDetails={showDetails}
          disableHover={disableHover}
          fillMedia={fillMedia}
          horizontalCardClass={horizontalCardClass}
          reducedMotion={reducedMotion}
          focusedKey={focusedKey}
          draggedRef={draggedRef}
          onSetFocused={setFocusedKey}
        />
      ))}
    </section>
  );
};
