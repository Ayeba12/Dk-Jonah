disposition: fix

No new comp, QUALITY BAR card or concept seed was supplied, as this is an approved-incumbent extension. The degraded reviewer definition was used by an independent subagent. All 14 named final captures were opened; visual findings cover their captured regions only. No browser or second detector was run.

## persistence

Pass for PRODUCT.md, existing DESIGN.md, the direction contract and the eight paired asset families. Provenance is recorded in output/public-portal-preview/theme-assets/README.md and manifest.json. PRODUCT.md:30 names an additional README that does not exist and needs its reference corrected. FORM explicitly records the approved-incumbent extension, so a new seed, comp round and reproduction state are not required here.

Local scope only. Missing Supabase configuration still blocks login and registration; legal entity, fees, eligibility, custody, support and verified trader information remain release gates. The public pages retain noindex. These gates do not authorize account, database or deployment changes. Dashboard copy-trading links remain deferred to the dashboard phase.

## fidelity

| Element or promise | Finding |
| --- | --- |
| TYPE | Match. Space Grotesk display hierarchy and Geist Mono copy remain consistent with the approved incumbent. |
| MATERIAL | Match in the captured product regions. Real theme-paired raster artwork is used, with HTML concept/demo captions in source. No new fake physical material was introduced. |
| GROUND | Match in the captures. Dark zinc and neutral light fields retain the palette; first-visit theme selection contradicts the documented system-default rule. |
| THESIS | Match. The account overview and guide openings explain what to inspect before funding. |
| OWN-WORLD | Match apart from default theme selection. CA-only branding, yellow actions and the established type are retained. |
| STORY | Match. Public route links connect the overview, account process and trader evaluation without adding verified-performance claims. |
| FIRST VIEWPORT | Match. Centred homepage display and paired actions; smaller left-aligned guide openings; shared navigation above each. |
| FORM | Match in captured regions and source structure. Existing homepage rhythm is retained; guides use sequential steps and open editorial rows. |
| Navigation adaptation | Acceptable. Unbuilt destinations are omitted, and copy trading uses an evaluation action, as required by the implementation brief. |

The inherited grid, labels, radii and motion are not grounds for a new visual identity under the user's preservation instruction. Nine detector advisories concern that inherited styling and do not establish a new material defect.

## ceiling

No separate QUALITY BAR card was supplied, so a card-relative ceiling is not independently scoreable. The captured pages use the approved framing, display scale, flat panels and product imagery. No additional ornament or motion is required for this batch.

## material_fixes

1. P2, OWN-WORLD/theme contract: components/public-site/frame.tsx:29 defaults to dark, and lines 42-43 only change it when a stored preference exists. Default public mode to system, retain valid stored overrides, and test a fresh light-OS visit plus an OS change while system is selected. Preview mode may retain its approved dark default. DESIGN.md:60 requires system preference.
2. P3, persistence: PRODUCT.md:30 points at missing public/images/copy-trading/paired/README.md. Point it at the existing provenance README and manifest, or add the intended delivery-folder reference. No artwork regeneration is needed.

## keep

Preserve the approved homepage geometry, Space Grotesk/Geist Mono pairing, CA-only mark, matched image themes, explicit demo/risk wording and exact three-route public allowlist.

## verdict

1. Resolved. PublicFrame now starts public mode at system and keeps preview mode dark. The actual-frame test passes eight preference scenarios, including fresh light/dark OS, saved overrides, system changes and unavailable storage. The replacement desktop, mobile and tablet homepage captures are valid and preserve the saved dark theme and approved layout. The OS-light result is established by deterministic state/effect tests, not browser emulation; rendering and hydration remain outside that test.
2. Resolved. PRODUCT.md now links to the existing artwork README and manifest. Both target files exist.

No regressions observed in the replacement captures or the two changed areas.

## remaining

Clear for the two scored fixes. This ship verdict covers the scored fixes, not the whole surface. Scope remains the local public implementation; business, authentication configuration and production launch gates remain open.

disposition: ship
