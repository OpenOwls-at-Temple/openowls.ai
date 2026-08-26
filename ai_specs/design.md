# Design

> **OpenOwls SDD** — Read by engineers and the AI coding assistant.
> Captures the design intent and standards for building the Hub — the companion to
> `architecture-planning.md` (which owns structure, data shapes, and folders).

---

## Design Overview

OpenOwls Hub is a content-first static showcase with a small, consistent design system. It favors a handful of shared, single-responsibility CSS/JS files over a framework, so pages stay lightweight and any student can add one by copying a template.

---

## Design Principles

- **Low barrier to contribute** — no build step, no framework; edit a file, preview, push.
- **One design system** — all colors, fonts, and spacing come from CSS custom properties in `main.css`; pages don't invent their own styling.
- **Accessible by default** — meet WCAG AA contrast, provide alt text, keep it keyboard-navigable.
- **Mobile-first & responsive** — every layout, including the two-panel reader, works down to a phone.
- **Self-contained pages** — a page depends only on the shared CSS/JS; no per-page external libraries.

---

## Design Instructions & Directives

| Directive | Rationale |
|-----------|-----------|
| All pages link `main.css`; profile/detail pages also link `profile.css`. | Single source of theme truth; consistent look. |
| Use the theme CSS variables (`--navy`, `--gold`, etc.) — never hardcode hex colors in a page. | Keeps the palette consistent and themeable. |
| Use semantic HTML (`header`, `nav`, `main`, `article`, `footer`). | Accessibility and clarity. |
| The two-panel reader must collapse to stacked (list → detail) on narrow screens. | Mobile usability (F4). |
| Keep JavaScript dependency-free and progressive — content should be reachable even if JS is limited. | Resilience and simplicity. |

---

## Design Specifications

### Top Navigation
- **Responsibility:** Persistent menu (Home · Projects · People) on every page.
- **Behavior:** Sticky, blurred navy bar; links resolve on every page.

### Two-Panel Reader (Projects & People)
- **Responsibility:** List pane (left) + detail pane (right); selection updates the detail and the URL.
- **Constraints:** People list sorts by first name, then last name; first item shown by default; stacks on mobile.

---

## Design Patterns

| Use | Avoid |
|-----|-------|
| Shared theme tokens + utility classes | Inline styles and per-page color hexes |
| Copy-a-template to add a page | Bespoke, one-off page structures |
| Vanilla DOM rendering (like `render.js`) | Pulling in a front-end framework or bundler |

---

## Non-Functional Requirements

| Attribute | Requirement |
|-----------|-------------|
| Performance | Pages load in under ~2s on a typical connection. |
| Accessibility | WCAG AA contrast; keyboard navigable; images have alt text. |
| Maintainability | A new student can add a project/profile by copying a template, without touching unrelated files. |
| Responsiveness | All pages, including the two-panel reader, work from desktop down to ~360px wide. |

---

## UI / UX Design Guidelines

- **Palette:** navy (`--navy` family) background, gold (`--gold`) accent, off-white text; defined in `main.css`.
- **Type:** Syne (display/headings) + DM Sans (body), via Google Fonts.
- **Components:** app cards, Live / "Coming soon" badges, contributor cards, pulled quotes, meta chips — reuse the existing classes.
- **Consistency:** every page carries the top nav and the shared footer.

---

## Design Constraints

- Must run within Cloudflare Pages free-tier static hosting.
- No native mobile app — responsive web only.
- No build pipeline — the served files are the source files.

---

## Open Design Questions

| Question | Status | Owner |
|----------|--------|-------|
| For the two-panel reader, is detail content loaded from the standalone HTML pages (fetch/iframe) or generated from JS data registries? | Open — decide before building F4 | Alex Pang |
| Do we adopt JS data registries (`people.js`, project-detail data) or keep hand-authored standalone pages as the source of truth? | Open | Alex Pang |

---

## Design Review Criteria

- [ ] Uses the shared theme variables and components (no rogue colors/fonts).
- [ ] Meets the non-functional requirements (perf, a11y, responsive).
- [ ] Top nav present and links resolve.
- [ ] No framework/build step introduced.
