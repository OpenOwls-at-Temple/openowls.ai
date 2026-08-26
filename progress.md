# Progress

> **OpenOwls SDD** — Living status document. Update at the end of every work session.
> Claude Code reads this first at the start of every new session to catch up.

## Current Phase

**Active Phase:** Phase 1 (Core MVP) — spec complete; implementation of F4 next.

## Status Summary

The SDD specification for OpenOwls Hub is written. The project-detail and member-profile
page **templates** exist (with placeholder content). The remaining Phase 1 work is F4:
the top menu and the two-panel Projects/People readers.

---

## Completed

- [x] 2026-08-26 — Filled `ai_specs/overview.md` (project definition for OpenOwls Hub).
- [x] 2026-08-26 — Filled `ai_specs/features.md` (3-phase feature set; F4 = top menu + two-panel browsing).
- [x] 2026-08-26 — Filled `ai_specs/architecture-planning.md`, `design.md`, `deployment.md`, `conventions.md` (static-site form).
- [x] 2026-08-26 — Marked N/A specs (`batchrun.md`, `llm-integration.md`, `auth-security.md`, `domain-knowledge.md`) and updated `CLAUDE.md` read-list.
- [x] 2026-08-26 — Built templates: `projects/owl-jeopardy.html`, `people/jordan-rivera.html`, `assets/css/profile.css` (placeholder content).

---

## In Progress

- [ ] _(none — spec phase wrapped up this session)_

---

## Blocked

| Item | Reason | Owner |
|------|--------|-------|
| _(none)_ | | |

---

## Up Next

- [ ] **F4** — Build the top menu (Home · Projects · People) on every page.
- [ ] **F4** — Build the `people/` two-panel index (name list sorted by first, last → profile on the right; deep-linkable URL).
- [ ] **F4** — Build the `projects/` two-panel index (project list → detail on the right).
- [ ] **F6 (Phase 2)** — Polish the homepage header/tagline to frame the hub's purpose.

### Open decisions (from design.md)
- How the two-panel reader loads detail content: standalone HTML (fetch/iframe) vs. JS data registries. Decide before building F4.

---

## Session Log

| Date | What Was Done |
|------|---------------|
| 2026-08-26 | Wrote the full SDD spec for OpenOwls Hub (overview, features, architecture, design, deployment, conventions); marked N/A specs; updated CLAUDE.md. Built project + member page templates and `profile.css` in a prior step this session. |
| YYYY-MM-DD | _Initial setup (template)_ |
