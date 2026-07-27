"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeftIcon, ChevronRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import { motion, useReducedMotion } from "framer-motion";
import type { DragEvent } from "react";
import { useEffect, useRef, useState } from "react";

const noDrag = (event: DragEvent) => event.preventDefault();

type Slide = {
  src: string;
  type: "image" | "video";
  alt: string;
  caption?: string;
};

export default function EditorialLightbox({
  slides,
  index,
  onClose,
  onNavigate,
}: {
  slides: Slide[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const swipeStart = useRef<number | null>(null);
  const slide = slides[index];
  const duration = prefersReducedMotion ? 0 : 0.24;
  const close = () => setVisible(false);
  const finishClose = () => {
    if (!visible) onClose();
  };
  const previous = () => {
    if (slides.length > 1) onNavigate((index - 1 + slides.length) % slides.length);
  };
  const next = () => {
    if (slides.length > 1) onNavigate((index + 1) % slides.length);
  };
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
      if (event.key === "Escape") close();
    };
    if (visible) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible, close, next, previous]);

  if (!slide) return null;

  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <Dialog.Portal forceMount>
        <Dialog.Overlay forceMount asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration }}
            className="pointer-events-auto fixed inset-0 z-[100] bg-black-a3"
          />
        </Dialog.Overlay>
        <Dialog.Content
          forceMount
          asChild
          onEscapeKeyDown={(event) => {
            event.preventDefault();
            close();
          }}
          onPointerDownOutside={(event) => {
            event.preventDefault();
            close();
          }}
          onInteractOutside={(event) => event.preventDefault()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.98 }}
            transition={{ duration }}
            onAnimationComplete={finishClose}
            className="pointer-events-auto fixed top-1/2 left-1/2 z-[101] flex max-h-[80vh] w-[92vw] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-background p-6 outline-none [touch-action:pan-y] md:max-h-[75vh] md:w-[min(900px,80vw)] md:p-8"
          >
            <Dialog.Title className="sr-only">Image preview</Dialog.Title>
            <div className="absolute top-6 left-6 text-muted text-small">
              {index + 1} / {slides.length}
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close image preview"
                onClick={close}
                className="absolute top-6 right-6 text-muted transition-colors hover:text-foreground"
              >
                <Cross2Icon width={16} height={16} />
              </button>
            </Dialog.Close>
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={previous}
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
            <figure
              className="flex max-h-full max-w-full flex-col items-center justify-center gap-3"
              onPointerDown={(event) => {
                swipeStart.current = event.clientX;
              }}
              onPointerUp={(event) => {
                if (swipeStart.current === null) return;
                const delta = event.clientX - swipeStart.current;
                swipeStart.current = null;
                if (Math.abs(delta) < 48) return;
                if (delta > 0) previous();
                else next();
              }}
            >
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
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
