"use client";

import { Cambio } from "cambio";
import Image from "next/image";
import type { DragEvent } from "react";
import { useState } from "react";

const noDrag = (event: DragEvent) => event.preventDefault();

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Cambio.Root open={open} onOpenChange={setOpen} motion="snappy" dismissible>
      <Cambio.Trigger className="relative aspect-[3/2] overflow-hidden rounded-base border border-border focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-8 focus-visible:outline-offset-4">
        <Image src={src} alt={alt} fill sizes="100vw" draggable={false} onDragStart={noDrag} className="select-none object-contain [-webkit-user-drag:none]" />
      </Cambio.Trigger>
      <Cambio.Portal>
        <Cambio.Backdrop className="fixed inset-0 z-[100] bg-black-a11/80" />
        <Cambio.Popup className="z-[101] flex max-h-[80vh] w-[92vw] items-center justify-center overflow-hidden rounded-base bg-background p-6 outline-none md:max-h-[75vh] md:w-[min(900px,80vw)] md:p-8">
          <div className="relative h-full w-full">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              draggable={false}
              onDragStart={noDrag}
              className="select-none object-contain [-webkit-user-drag:none]"
            />
          </div>
        </Cambio.Popup>
      </Cambio.Portal>
    </Cambio.Root>
  );
}

export default function ProjectGallery({ title, images, video }: { title: string; images: string[]; video?: string }) {
  return (
    <div className="grid gap-6">
      {images.map((src, index) => (
        <GalleryImage key={src} src={src} alt={`${title} gallery image ${index + 1}`} />
      ))}
      {video && (
        <video
          src={video}
          controls
          muted
          playsInline
          preload="metadata"
          aria-label={`${title} video`}
          draggable={false}
          onDragStart={noDrag}
          className="w-full select-none rounded-base border border-border [-webkit-user-drag:none]"
        />
      )}
    </div>
  );
}
