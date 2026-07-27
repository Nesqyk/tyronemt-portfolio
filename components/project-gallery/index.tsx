"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { DragEvent } from "react";
import { useState } from "react";

const noDrag = (event: DragEvent) => event.preventDefault();
export default function ProjectGallery({ title, images, video }: { title: string; images: string[]; video?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="grid gap-6">
      {images.map((src, index) => (
        <motion.button
          key={src}
          type="button"
          onClick={() => setActive(src)}
          whileHover={{ opacity: 0.85 }}
          className="relative aspect-[3/2] overflow-hidden rounded-base border border-border focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-8 focus-visible:outline-offset-4"
        >
          <Image
            src={src}
            alt={`${title} gallery image ${index + 1}`}
            fill
            sizes="100vw"
            draggable={false}
            onDragStart={noDrag}
            className="select-none object-contain [-webkit-user-drag:none]"
          />
        </motion.button>
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
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image preview`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black-a11/80 p-6"
          onClick={() => setActive(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-full w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={active}
              alt={`${title} enlarged preview`}
              fill
              sizes="100vw"
              draggable={false}
              onDragStart={noDrag}
              className="select-none object-contain [-webkit-user-drag:none]"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
