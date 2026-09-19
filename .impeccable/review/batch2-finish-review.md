disposition: fix

Review basis: independent file-and-capture review, no browser actions. All 18 named viewport captures were opened. The existing-world extension explicitly needs no new comp, seed, quality-bar card, measured spec or comp diff. Automated checks are supplied evidence, not rerun here. The parent's final update confirms the corrected production build and smoke check for 11 pages, 223 internal links and 33 page scripts, plus cookie reopening, acknowledgement, focus return and reload persistence.

## persistence

Pass. PRODUCT.md and root DESIGN.md exist and match the implemented zinc/yellow palette, CA branding, Space Grotesk headings and Geist Mono prose. `docs/public-portal/second-batch-brief.md` records the requested shadcn auth override and the decision to extend the existing layouts without a concept round. The nine detector advisories belong to inherited first-batch CSS, not a newly introduced visual system. Existing artwork is reused. The parent reports adjacent provenance records for all 16 shipping rasters, with no image pixel changes and no missing provenance records. No dashboard styling, account records or environment files were changed by this review.

## fidelity

| Element or promise | State | Evidence |
| --- | --- | --- |
| TYPE | match | Final user/admin sign-in and registration captures show Space Grotesk headings and Geist Mono form prose. `pp-h2` on the auth H1 selects the existing heading family. Public guide and legal headings retain the existing scale. |
| MATERIAL | match | The account artwork is a rendered product image, not a CSS imitation. Desktop dark and 1024px light captures show their corresponding artwork; captions identify concept/demo data. |
| GROUND | match | Captures retain neutral zinc/white fields and yellow actions. `public.css` uses the existing scoped semantic tokens, with no new warm or blue-tinted ground. |
| Auth composition | match | All three entrances compose the adapted installed LoginForm/SignupForm and Field components. Desktop uses equal form/artwork columns; 768px, 602px and 390px use the form-only layout. Home is a breadcrumb, with no marketing header, footer or cookie overlay. |
| About first viewport | match | Left-aligned guide heading, explanatory prose, two next-step actions and the existing account image follow the supplied extension brief. |
| Contact first viewport | adaptation | Desktop pairs guidance and a labelled form. Mobile stacks guidance before the form, preserving reading order and the brief's responsive intent. The unavailable delivery notice and disabled fieldset make the missing endpoint explicit. |
| Policy reading layout | match | Terms uses a desktop contents rail and reading column; narrow legal captures use stacked contents. Clauses have labelled anchor targets and do not enter on scroll. |
| THESIS and STORY | match | About, contact/help and policy links establish the stated path toward the correct account entrance. Missing business facts are stated, not replaced with invented credentials or claims. |
| FORM and motion | match | Product text/image entrances are one-time, with capped 60ms staggering. Reduced motion, focus and hidden-tab changes finish active effects. Contact fields, auth fields and policy clauses remain stationary. The contract explicitly exempts this specified extension from a new seed or comp. |
| Account and legal truth | match | Local-unavailable forms are disabled and submit handlers guard unavailable actions. Registration remains closed. Terms/privacy are review drafts, support has no fabricated address, and demo artwork is labelled. Production auth, support and legal release gates remain open. |
| Cookie notice content and reopening | match | The mobile capture shows a fixed, readable informational notice with Cookie policy and Got it actions. Code distinguishes acknowledgement from tracker consent, focuses the heading when reopened, and restores focus after acknowledgement. |
| Cookie notice with mobile navigation | contradicted | `public.css:557` places the fixed notice at z-index 90, above the modal overlay at 80 and navigation sheet at 81, `public.css:295` and `public.css:303`. `header.tsx` traps focus in that sheet. The notice can therefore cover lower navigation links while those links remain keyboard-focusable inside the modal. |

## ceiling

Reached for the specified existing-world extension. Extra ornament, new imagery, a different font treatment or animated form/legal content would depart from the user's direction. The cookie/modal layering defect is the only material finish issue found in this bounded review.

## material_fixes

1. P2, focus visibility and working navigation: keep the fixed cookie notice below the mobile modal overlay/sheet, or suspend it while that sheet is open. In `components/public-site/public.css:557` and `components/public-site/header.tsx`, ensure every focused menu destination remains visible and the notice cannot cover a focus-trapped modal. Confirm at 390px with an unacknowledged notice, keyboard through the lower links, close the menu, then verify the notice still offers its existing acknowledgement and reopening behavior.

## keep

Keep the shadcn auth composition, Home-only breadcrumb, Space Grotesk/Geist Mono pairing, CA-only branding, matched concept artwork, stationary forms and policies, explicit unavailable/review-draft states, current public navigation choices and untouched dashboard styling.

---

## verdict

1. Resolved. The reopened `batch2-home-cookie-mobile.png` and new `batch2-cookie-menu-mobile.png` show the notice visible on the page and the lower Create account menu link fully visible with its keyboard focus ring. `public.css:557` now places the notice at 70, below overlay 80 and sheet 81. `batch2-cookie-reopened-mobile.png` shows the readable notice reopened at the footer. The parent's interaction record confirms Escape, acknowledgement, reload persistence, heading focus on reopening and return focus to Cookie settings. The supplied production build and 15 cookie/storage/layer assertions passed.

## remaining

Clear. No regression attributable to this single stacking change appears in the three recaptures. Ship covers the scored fix, not the whole surface.

disposition: ship
