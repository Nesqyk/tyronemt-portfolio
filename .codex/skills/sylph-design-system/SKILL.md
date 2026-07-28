---
name: sylph-design-system
description: Apply the Sylph portfolio template’s restrained editorial design system to Next.js, React, Tailwind, CSS, and MDX work. Use when creating or refining pages, components, content layouts, themes, code previews, or responsive states in this repository or another interface that should match the Sylph visual language.
---

# Sylph Design System

## Overview

Use this skill to keep new UI work visually coherent with the Sylph template: narrow editorial layouts, Inter typography, Radix semantic colors, subtle borders, compact spacing, gentle motion, and class-based light/dark theming. Read [references/design-system.md](references/design-system.md) before making styling decisions.

## Workflow

1. Inspect the existing page, component, and styling conventions before editing. Preserve the project’s Next.js, Tailwind, MDX, and component patterns unless the user explicitly requests a migration.
2. Read the design reference and identify the smallest set of tokens and composition patterns needed for the task.
3. Prefer existing semantic utilities and CSS variables (`bg-background`, `text-foreground`, `text-muted`, `border-border`, `rounded-small|base|large`) over raw colors or one-off values.
4. Build the narrowest responsive composition first, then add only necessary wider-screen adjustments. Keep content readable and avoid dashboard-like density.
5. Reuse existing motion, link, theme, post, preview, and navigation components when they provide the needed behavior.
6. Verify light mode, dark mode, hover/focus states, keyboard access, narrow widths, and any MDX/code rendering affected by the change.

## Implementation Rules

- Treat `styles/main.css` and `tailwind.config.ts` as the source of truth for tokens.
- Use Inter for interface and body text; keep typography quiet, compact, and hierarchy-driven rather than decorative.
- Use semantic Radix-backed variables for color. Do not introduce arbitrary hex values when a gray, pink, yellow, alpha, or semantic token fits.
- Use 1px borders, restrained radii, and opacity-based hover feedback. Avoid heavy shadows, gradients, oversized cards, and excessive ornament.
- Preserve the template’s editorial rhythm: headings and paragraphs are separated by deliberate whitespace, list and code content remains readable, and sections are divided with subtle rules where useful.
- Make interactive elements usable without relying on hover; provide visible focus and meaningful labels.
- For new styling primitives, add them to the token system or a reusable component instead of scattering ad hoc CSS.

## Validation

- Run the project’s available lint/build checks appropriate to the change.
- Check rendered output at mobile and desktop widths and in both theme modes when visual QA is possible.
- Report any assumptions, missing assets, or visual compromises instead of silently inventing a different design language.

## Reference

Load [references/design-system.md](references/design-system.md) for token values, layout measurements, component patterns, and anti-patterns.
