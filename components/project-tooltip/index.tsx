"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";

type ProjectTooltipProps = {
  id: string;
  name: string;
  description: string;
  pills: string[];
  href?: string;
  icon?: string;
};

export function ProjectTooltip({ id, name, description, pills, href, icon }: ProjectTooltipProps) {
  const generatedId = useId();
  const tooltipId = `project-tooltip-${id}-${generatedId.replace(/:/g, "")}`;
  const [open, setOpen] = useState(false);

  const content = (
    <>
      {icon && (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none size-[18px] shrink-0 select-none object-contain [-webkit-user-drag:none]"
        />
      )}
      {name}
    </>
  );

  const triggerProps = {
    "aria-describedby": open ? tooltipId : undefined,
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node | null)) setOpen(false);
    },
    onTouchStart: () => setOpen(true),
    className:
      "inline-flex max-w-full appearance-none items-center gap-1 border-0 bg-transparent p-0 font-inherit underline decoration-gray-a4 underline-offset-2 hover:opacity-100 focus-visible:relative focus-visible:z-40 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-gray-8",
  };

  return (
    <span className="relative inline-flex max-w-full align-baseline">
      {href ? (
        <a {...triggerProps} href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <button {...triggerProps} type="button" onClick={() => setOpen((value) => !value)}>
          {content}
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-30 w-[min(21rem,calc(100vw-2rem))] -translate-x-1/2 border border-border bg-background p-3 text-left text-small text-foreground"
          >
            <p className="m-0 leading-relaxed">{description}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {pills.map((pill) => (
                <span key={pill} className="border border-border bg-gray-2 px-1.5 py-0.5 text-[11px] leading-tight text-muted">
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
