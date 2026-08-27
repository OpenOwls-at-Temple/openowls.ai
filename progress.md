# Progress

> **OpenOwls SDD** — Living status document. Update at the end of every work session.
> Claude Code reads this first at the start of every new session to catch up.

## Current Phase

**Active Phase:** Phase 1 (Core MVP) — **F4 built.** Phase 1 features are all in place
(with placeholder content); next is Phase 2 (F5 real content, F6 homepage polish).

## Status Summary

The SDD specification for OpenOwls Hub is written, and all Phase 1 features (F1–F4) are
implemented. The top menu (Home · Projects · People) is on every page, and the two-panel
Projects/People readers are live: the left list is rendered from the registries and the
right pane loads each item's standalone page (fetch + inject its `<article>`), deep-linked
via `?p=<slug>`. Remaining Phase 1 content is still placeholder (real content is F5).

---

## Completed

- [x] 2026-08-26 — Filled `ai_specs/overview.md` (project definition for OpenOwls Hub).
- [x] 2026-08-26 — Filled `ai_specs/features.md` (3-phase feature set; F4 = top menu + two-panel browsing).
- [x] 2026-08-26 — Filled `ai_specs/architecture-planning.md`, `design.md`, `deployment.md`, `conventions.md` (static-site form).
- [x] 2026-08-26 — Marked N/A specs (`batchrun.md`, `llm-integration.md`, `auth-security.md`, `domain-knowledge.md`) and updated `CLAUDE.md` read-list.
- [x] 2026-08-26 — Built templates: `projects/owl-jeopardy.html`, `people/jordan-rivera.html`, `assets/css/profile.css` (placeholder content).
- [x] 2026-08-26 — **Resolved the open reader decision:** standalone pages are the source of truth; the reader fetches each page and injects its `<article>` (not iframe). Recorded in `design.md`.
- [x] 2026-08-26 — **F4 done.** Added the top menu (Home · Projects · People) to every page (moved `.topnav` CSS to `main.css`; added nav to `index.html`). Built `people/index.html` + `projects/index.html` two-panel readers, `assets/js/reader.js` (shared controller), `assets/js/people.js` (member index), `assets/css/reader.css`. Deep-linkable via `?p=<slug>`, first item default, stacks on mobile, page-less projects show a fallback blurb.

---

## In Progress

- [ ] _(none)_

---

## Blocked

| Item | Reason | Owner |
|------|--------|-------|
| _(none)_ | | |

---

## Up Next

- [ ] **F5 (Phase 2)** — Replace placeholder content with real project pages and member profiles (add each new member to `assets/js/people.js`, each new project page via the `page:` field in `assets/js/projects.js`).
- [ ] **F6 (Phase 2)** — Polish the homepage header/tagline to frame the hub's purpose.

### Open decisions
- _(none — the reader-loading decision is resolved; see `design.md`.)_

---

## Session Log

| Date | What Was Done |
|------|---------------|
| 2026-08-26 | Built **F4**: top menu on every page + the Projects/People two-panel readers (fetch-and-inject the standalone `<article>`; deep-linked via `?p=`). Resolved the open reader-loading decision in `design.md`. New files: `people/index.html`, `projects/index.html`, `assets/js/reader.js`, `assets/js/people.js`, `assets/css/reader.css`. |
| 2026-08-26 | Wrote the full SDD spec for OpenOwls Hub (overview, features, architecture, design, deployment, conventions); marked N/A specs; updated CLAUDE.md. Built project + member page templates and `profile.css` in a prior step this session. |
| YYYY-MM-DD | _Initial setup (template)_ |
