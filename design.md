# DK Jonah Design System

## Source
- Visual reference: `C:\Users\Ayeba\Downloads\avenzor.framer.website`
- Implementation target: DK Jonah adaptation using the existing Avenzor structure and fonts.
- Product voice: soft, honest, reflective, faith-aware, spacious, community-first.

## Core Tokens
- Ink: `#111111`
- Ink soft: `#201a16`
- Charcoal: `#3a332b`
- Muted: `#7a7065`
- Subtle: `#9a8f83`
- Line: `#ded2c1`
- Canvas: `#f8f2e8`
- Wash: `#fffaf2`
- Accent: `#b68a3a`
- Accent soft: `#ead9ad`
- Section wash: `#f1e7d8`

## Typography
- Display: Space Grotesk, 500/600/700.
- Body/UI: Inter, 400/500/600.
- Hero wordmark scale: oversized, tight line-height, no negative tracking.
- Section labels use bracketed language such as `[Toolkit]`, small size, muted color.
- Body copy stays calm and readable: 16-20px, 1.55-1.7 line height.

## Layout
- Header is simple: DK JONAH brand, About, Cozy Corner, Toolkit, Quiet Circle, Contact.
- Hero uses a large framed editorial image with monochrome treatment and large name overlay.
- Sections alternate open white space with dark editorial bands.
- Cards are shallow, 8-16px radius depending on context, never nested.
- Desktop max width is 1440px with generous 24-48px gutters.
- Mobile keeps hierarchy intact: compact nav, stacked sections, large but fitting headings.

## Components
- Buttons: pill or rounded rectangle with subtle gold moving arrow capsule.
- Project cards: image-led, minimal metadata, clear hover feedback.
- Forms: underline inputs, visible labels, strong focus states, validation feedback.
- FAQ: accordion with clean border rows and no heavy cards.
- Footer: dark band, large DK JONAH mark, menu/community/legal columns.

## Motion
- Use short 180-300ms transitions for hover, menu, forms, and accordion.
- Respect `prefers-reduced-motion`.
- Avoid layout-shifting hover scale; use color, opacity, shadow, and subtle image zoom.

## UI/UX Checklist
- No emoji icons.
- All clickable controls use pointer cursor and visible focus states.
- Contrast must meet readable light-mode standards.
- No horizontal scroll at 375px.
- Form success/error states are clear and non-blocking.
- Content must not hide under sticky navigation.
