# Progress

> **OpenOwls SDD** — Living status document. Update at the end of every work session.
> Claude Code reads this first at the start of every new session to catch up.

## Current Phase

**Active Phase:** Phase 1 (Core MVP) complete (placeholder content). **F9 (Phase 3 —
self-service profiles) delivered early as a fully static flow.** Next up is Phase 2
(F5 real content, F6 homepage polish).

## Status Summary

The SDD specification for OpenOwls Hub is written, and all Phase 1 features (F1–F4) are
implemented. The top menu (Home · Projects · People) is on every page, and the two-panel
Projects/People readers are live: the left list is rendered from the registries and the
right pane loads each item's standalone page (fetch + inject its `<article>`), deep-linked
via `?p=<slug>`. Remaining Phase 1 content is still placeholder (real content is F5).

**F9 (self-registration)** is now built as a *fully static* flow: `people/join.html`
generates a student's standalone profile page + their `people.js` entry and (in Chromium)
writes both into the contributor's local clone via the File System Access API, then shows
the git commands to open a PR — no backend, no DB. Guide: `how-to-add-student-profile.md`.
This deliberately **supersedes an earlier, unapproved backend implementation** of F9
(see Open decisions).

---

## Completed

- [x] 2026-08-26 — Filled `ai_specs/overview.md` (project definition for OpenOwls Hub).
- [x] 2026-08-26 — Filled `ai_specs/features.md` (3-phase feature set; F4 = top menu + two-panel browsing).
- [x] 2026-08-26 — Filled `ai_specs/architecture-planning.md`, `design.md`, `deployment.md`, `conventions.md` (static-site form).
- [x] 2026-08-26 — Marked N/A specs (`batchrun.md`, `llm-integration.md`, `auth-security.md`, `domain-knowledge.md`) and updated `CLAUDE.md` read-list.
- [x] 2026-08-26 — Built templates: `projects/owl-jeopardy.html`, `people/jordan-rivera.html`, `assets/css/profile.css` (placeholder content).
- [x] 2026-08-26 — **Resolved the open reader decision:** standalone pages are the source of truth; the reader fetches each page and injects its `<article>` (not iframe). Recorded in `design.md`.
- [x] 2026-08-26 — **F4 done.** Added the top menu (Home · Projects · People) to every page (moved `.topnav` CSS to `main.css`; added nav to `index.html`). Built `people/index.html` + `projects/index.html` two-panel readers, `assets/js/reader.js` (shared controller), `assets/js/people.js` (member index), `assets/css/reader.css`. Deep-linkable via `?p=<slug>`, first item default, stacks on mobile, page-less projects show a fallback blurb.
- [x] 2026-09-17 — **F9 done (static).** Built `people/join.html`, `assets/js/join.js`, `assets/css/join.css`: a client-side form that generates a student's standalone profile page + their `people.js` entry, writes both into the local clone via the File System Access API (Chromium; Download fallback elsewhere), and shows the git/PR commands. Photo = GitHub avatar (no upload). Added `how-to-add-student-profile.md` and linked it from `README.md`; +2 lines in `profile.css` (photo portrait). No backend/DB. On branch `feat/f9-static-join`.

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
- [ ] **Close / rework the `feat/people-self-registration` branch** — the earlier F9
  implementation (contributor Nimish) added a backend (Cloudflare Pages Functions + D1 +
  R2), which the maintainer did **not** approve. Superseded by the static F9 above; close
  its PR (or request a rework) rather than merging it.
- [ ] **Merge the static F9** — review `feat/f9-static-join` and merge to `main` when happy.

### Open decisions
- **Reader loading — resolved:** standalone pages are the source of truth; the reader
  fetches and injects each page's `<article>` (see `design.md`).
- **F9 approach — resolved (2026-09-17):** self-registration is a **fully static** form
  (no backend), per the maintainer. An earlier branch (`feat/people-self-registration`)
  implemented F9 with a Cloudflare Functions + D1 + R2 backend; the maintainer confirmed
  they never approved that deviation, so it is **not** being merged — the static flow on
  `feat/f9-static-join` supersedes it.

---

## Session Log

| Date | What Was Done |
|------|---------------|
| 2026-09-17 | Built **F9 as a fully static self-registration flow** on branch `feat/f9-static-join` (cut from clean `main`). New: `people/join.html`, `assets/js/join.js`, `assets/css/join.css`, `how-to-add-student-profile.md`; +2 lines in `profile.css`, a link in `README.md`. The form generates a student's profile page + `people.js` entry and (Chromium) writes them into the local clone via the File System Access API, then shows the git/PR commands (Download fallback elsewhere; photo from the GitHub avatar, no upload). Updated `ai_specs/features.md` (F9), `architecture-planning.md`, `deployment.md`. **Context:** this deliberately supersedes the *unapproved* backend F9 on `feat/people-self-registration` (contributor Nimish, 2026-09-15, Functions + D1 + R2) — the maintainer confirmed they never approved adding a backend. Also fixed the `.gitignore` `.wrangler/` glob (committed on the other branch as `ed77c85`). |
| 2026-08-26 | Built **F4**: top menu on every page + the Projects/People two-panel readers (fetch-and-inject the standalone `<article>`; deep-linked via `?p=`). Resolved the open reader-loading decision in `design.md`. New files: `people/index.html`, `projects/index.html`, `assets/js/reader.js`, `assets/js/people.js`, `assets/css/reader.css`. |
| 2026-08-26 | Wrote the full SDD spec for OpenOwls Hub (overview, features, architecture, design, deployment, conventions); marked N/A specs; updated CLAUDE.md. Built project + member page templates and `profile.css` in a prior step this session. |
| YYYY-MM-DD | _Initial setup (template)_ |
