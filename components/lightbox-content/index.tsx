"use client";

import { ChevronLeftIcon, ChevronRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Cambio } from "cambio";
import { useCallback, useEffect, useState } from "react";

const noDrag = (event: React.DragEvent) => event.preventDefault();

type Slide = {
  src: string;
  type: "image" | "video";
  alt: string;
  caption?: string;
};

export function LightboxContent({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const total = slides.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [prev, next]);

  if (!slide) return null;

  return (
    <>
      <div className="absolute top-6 left-6 text-muted text-small">
        {index + 1} / {total}
      </div>
      <Cambio.Close asChild>
        <button type="button" aria-label="Close image preview" className="absolute top-6 right-6 text-muted transition-colors hover:text-foreground">
          <Cross2Icon width={16} height={16} />
        </button>
      </Cambio.Close>
      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
          >
            <ChevronLeftIcon width={18} height={18} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
          >
            <ChevronRightIcon width={18} height={18} />
          </button>
        </>
      )}
      <figure className="flex max-h-full max-w-full flex-col items-center justify-center gap-3">
        {slide.type === "video" ? (
          <video
            src={slide.src}
            controls
            muted
            playsInline
            preload="metadata"
            aria-label={slide.alt}
            draggable={false}
            onDragStart={noDrag}
            className="max-h-[calc(80vh-3rem)] max-w-full select-none object-contain [-webkit-user-drag:none] md:max-h-[calc(75vh-4rem)]"
          />
        ) : (
          <img
            src={slide.src}
            alt={slide.alt}
            draggable={false}
            onDragStart={noDrag}
            className="max-h-[calc(80vh-3rem)] max-w-full select-none object-contain [-webkit-user-drag:none] md:max-h-[calc(75vh-4rem)]"
          />
        )}
        {slide.caption && <figcaption className="text-muted text-small">{slide.caption}</figcaption>}
      </figure>
    </>
  );
}
