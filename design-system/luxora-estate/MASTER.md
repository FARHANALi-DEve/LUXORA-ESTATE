# LUXORA ESTATE — UI design system

**Purpose:** High-end residential discovery with an architectural 3D study, a clear path to inquiry, and honest demonstration content.
**Design method:** UI UX Pro Max public guidance (design-system hierarchy, product-first visual choices, pre-delivery UX/accessibility checklist) + existing UI UX Designer principles. Public guide: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill . These values were curated for LUXORA manually; the UI UX Pro Max CLI/plugin was **not** installed or executed in this ChatGPT environment.

## Direction
- Architectural editorial rather than generic SaaS: asymmetric layouts, full-width imagery, substantial whitespace, serif headlines and minimal chrome.
- The homes, not the interface, are the primary visual subject. Use WebGL *where it helps exploration*, with lightweight visual fallback.
- Homepage path: immersive introduction → featured homes → hands-on 3D studio → brand story → personal consultation.
- Listing path: search/filters/sort → residence detail → inquiry or requested viewing → admin inbox.
- Avoid neon gradients, excessive glass cards, animation-only controls, misleading live availability, fabricated endorsements or bookings falsely marked confirmed.

## Tokens
| Token | Value | Role |
|---|---|---|
| Deep green | `#17211d` | Nav, primary CTA, architectural studio |
| Ink | `#202622` | Main readable text |
| Ivory | `#f7f5f0` | Paper-like canvas |
| Linen | `#eeece5` | Dividers and neutral panels |
| Sage | `#798078` | Supporting labels (not tiny light-on-light text) |
| Gilded accent | `#cbbd9b` | Decorative focal point and selected outlines |
| Focus | `#b6a16e` | 3px keyboard indicator, with offset |
| Display face | `Playfair Display`, Georgia | Hero and editorial story headings |
| UI face | `DM Sans`, Arial | Navigation, body, controls |
| Width | 1440px maximum | Content rhythm |
| Grid | 8px base | Padding, gaps, vertical rhythm |
| Primary action | 56px tall | Make requests unambiguous |
| Touch targets | 44px minimum | Mobile navigation, selects, 3D controls |

## Page layout principles
1. Hero: one main CTA to collection, one secondary CTA to hands-on 3D.
2. Property grid: large visual card with clearly presented type, location and price; make the entire card focusable.
3. Search: visible form controls; empty state offers a reset; sorting must not mutate the source list.
4. Residence details: editorial photographs and details first, honest concept disclaimer, form with a choice of inquiry/viewing.
5. Owner studio: simple navigation, explicit save/status/error feedback; CRUD endpoints verify authentication server-side.
6. 3D studio: day/sunset light states, blueprint study mode, rotate/pause and reset with proper `aria-pressed` states. Remain navigable without 3D support.

## Motion and comfort
- Scene camera can auto-orbit unless `prefers-reduced-motion` is enabled. Offer a **Pause** control.
- Scroll reveal is optional progressive enhancement; reading order must remain intact with JS disabled or motion reduced.
- Small hover/focus transitions: 180–300 ms. Large reveals: roughly 800–1000 ms at most, only when helpful.
- Respect hardware: cap WebGL device pixel ratio to 1.45; avoid autoplay video backgrounds.

## Mandatory verification
- 375px, 390px, 768px, 1024px, 1440px responsive checkpoints.
- 4.5:1 foreground/background contrast for small readable text, visible keyboard outline and correct labels.
- Property create/edit/delete should appear in listings; inquiry/viewing request should appear in admin inbox and status changes persist.
- Viewer interaction is meaningful; live 3D on a supported browser and explicit fallback otherwise.
- No fake confirmations: the visitor **requests** a viewing; an admin has to confirm externally.
- Treat 3D browser interaction, full Next.js build, MongoDB connection and production deployment as **unverified** until actually run in a networked environment.
