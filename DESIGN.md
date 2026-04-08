# Design Brief

## Direction

Minimal Media Storage — Clean, functional interface prioritizing clarity and efficient file discovery on mobile and desktop.

## Tone

Focused, editorial, minimal — inspired by Vercel/Linear's clean aesthetic without decoration, emphasizing information hierarchy and touch-friendly interactions.

## Differentiation

Media-centric card grid with thumbnail previews, smart file-type icons, and contextual metadata (upload date, file size) visible at a glance without hover.

## Color Palette

| Token      | OKLCH       | Role                           |
| ---------- | ----------- | ------------------------------ |
| background | 0.98 0.008 230 | Cool off-white, primary surface |
| foreground | 0.18 0.015 230 | Cool dark text                 |
| card       | 1.0 0.004 230  | Bright card surface            |
| primary    | 0.52 0.16 220  | Teal action buttons & accents  |
| accent     | 0.68 0.15 40   | Warm orange upload/CTA         |
| muted      | 0.94 0.01 230  | Subtle backgrounds & dividers  |
| destructive| 0.55 0.22 25   | Delete warning state           |

## Typography

- Display: Space Grotesk — Hero headings, section titles
- Body: General Sans — Labels, body text, UI components
- Mono: Geist Mono — File metadata, timestamps
- Scale: hero `text-4xl md:text-6xl font-bold`, section h2 `text-2xl md:text-4xl font-bold`, label `text-xs font-semibold uppercase`, body `text-base`

## Elevation & Depth

Card surfaces elevated via subtle border and xs shadow; no layered depth — single elevation tier (card) for simplicity and clarity.

## Structural Zones

| Zone    | Background         | Border                | Notes                                              |
| ------- | ------------------ | --------------------- | -------------------------------------------------- |
| Header  | card with border-b | border-border         | White surface, logout/profile in top-right         |
| Sidebar | sidebar (same as card) | sidebar-border | Filter categories, storage meter below             |
| Content | background         | —                     | Paginated file grid, alternating card backgrounds |
| Footer  | background         | —                     | Pagination controls, minimal footer              |

## Spacing & Rhythm

Spacious layout: 2rem sections, 1rem card gaps, 0.5rem micro-spacing (icon/text pairs). Mobile-first padding: 1rem on sm, 1.5rem on md. Grid: 1 col mobile, 2-3 col tablet, 3-4 col desktop.

## Component Patterns

- Buttons: teal primary (0.52 0.16 220), warm orange accent (0.68 0.15 40), subtle hover (opacity + shadow), rounded-sm
- Cards: card-elevated class (bg-card, border-border, rounded-md, shadow-xs), no shadow stacking
- Badges: file-type icons as inline badges, muted background, sm text
- Upload: large touch target (48px min), drag-drop overlay centered

## Motion

- Entrance: Fade-in on page load, 0.3s ease-out
- Hover: Subtle shadow increase on cards (`shadow-sm` → `shadow-md`), `transition-smooth` on all interactive
- Decorative: None — functionality prioritized over motion

## Constraints

- All colors must maintain AA+ contrast on both light and dark backgrounds
- No decorative gradients or ambient elements
- Touch targets minimum 44px (iOS) / 48px (Android)
- Radius consistency: 6px (0.375rem) for all surfaces
- Font weights: 400 body, 600 labels, 700 headings

## Signature Detail

Cool teal primary with warm orange secondary creates an unexpected accent pairing for a productivity tool — modern without trend-chasing.

