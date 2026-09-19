# Second-batch detector

One scoped run on 4 September 2026, after the requested shadcn authentication revision. Command: `node .agents/skills/impeccable/scripts/detect.mjs --json components/public-site components/login-form.tsx components/signup-form.tsx components/auth-password-field.tsx "app/(marketing)" "app/(auth)"`.

Nine advisories, no errors. All refer to existing rules in `components/public-site/public.css`, before the second-batch CSS additions.

| Rule | Line | Finding |
| --- | --- | --- |
| Decorative grid-line background | 169 | Existing homepage grid motif |
| Colour outside DESIGN.md | 160 | `rgb(0 0 0 / 16%)` |
| Radius outside DESIGN.md | 190 | `2px` |
| Colour outside DESIGN.md | 295 | `rgb(0 0 0 / 56%)` |
| Colour outside DESIGN.md | 296 | `rgb(0 0 0 / 20%)` |
| Radius outside DESIGN.md | 349 | `4px` |
| Radius outside DESIGN.md | 354 | `999px` |
| Radius outside DESIGN.md | 371 | `4px` |
| Radius outside DESIGN.md | 375 | `4px` |

The homepage grid is part of the user-approved Dovetail direction. The remaining values are inherited component details, not newly introduced auth or policy tokens. The finish reviewer should judge these against the existing implementation and pinned brief. No second detector run is planned.
