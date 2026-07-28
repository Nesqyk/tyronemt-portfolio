# Sylph Design Reference

## Visual character

Minimal, lightweight, editorial, and content-first. The interface should feel like a carefully typeset personal site rather than a product dashboard. Favor whitespace, hierarchy, thin rules, and quiet interaction feedback.

## Foundations

- Font: Inter, with common ligatures, antialiasing, pretty text wrapping, and optimized text rendering.
- Base text: 14px, 21px line height, approximately `-0.09px` letter spacing (`text-default`). Small metadata: 12px (`text-small`).
- Layout: centered `max-w-screen-sm` content, typically `px-6 py-24`; allow wider layouts only when the content requires it.
- Radii: small 4px, base 8px, large 12px. Controls may use a 4–6px radius.
- Borders: 1px using `var(--border)` or `border-border`.
- Motion: short opacity and transform transitions; staggered fade-in is appropriate for page-level content.

## Color and themes

Use the Radix gray, pink, yellow, black-alpha, and white-alpha scales already imported by `styles/main.css`. Semantic mappings are:

| Purpose               | Token                             |
| --------------------- | --------------------------------- |
| Page background       | `bg-background` / `var(--bg)`     |
| Main text             | `text-foreground` / `var(--fg)`   |
| Secondary text        | `text-muted` / `var(--muted)`     |
| Divider               | `border-border` / `var(--border)` |
| Link/selection accent | pink selection tokens             |
| Highlight             | yellow highlight tokens           |
| Keyboard hint         | kbd tokens                        |

Theme state is controlled by `next-themes` with the `class` attribute and `system` as the default. Use semantic tokens so the same component remains legible in both modes. Avoid hardcoded light-only or dark-only colors.

## Composition patterns

- Intro blocks pair a strong `h1` with a muted `h2` subtitle and a short paragraph.
- Content sections use a muted section heading, often with a count, followed by thin horizontal rules and compact rows.
- List rows commonly use `flex justify-between`, `py-2`, a primary title, and muted date or metadata.
- Article flow uses about 24px between major blocks; headings close to their following paragraph; footnotes are separated by a 1px top rule with generous top margin.
- Code figures use a 1px border, base radius, 16px padding, horizontal scrolling, and 12px code text. Preview surfaces are centered, padded, and at least 384px tall when showcasing components.
- Links use a transition with reduced opacity on hover; preserve clear text meaning and keyboard focus.
- Theme controls are compact segmented controls on a gray surface with small gaps and a selected gray background.

## Avoid

Avoid gradients, large decorative illustrations, strong drop shadows, pill-heavy UI, dense multi-column dashboards, oversized display typography, arbitrary hex colors, and inconsistent radii. Do not introduce a new spacing or color scale when an existing semantic token or established rhythm solves the problem.
