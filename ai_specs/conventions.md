# Conventions

> **OpenOwls SDD** — Read by engineers and the AI coding assistant.
> How code is written on this project. These rules apply to every file, every session.
> (Slimmed for a static, framework-free site — no Python/React backend here.)

---

## Languages & Tooling

| Technology | Version / Note |
|------------|----------------|
| HTML | HTML5, semantic elements |
| CSS | Modern CSS with custom properties; no preprocessor |
| JavaScript | Vanilla ES5-compatible style (matches existing `render.js`); no framework, no bundler |
| Tooling | None required — no build step |

---

## Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| HTML/CSS/JS file names | `kebab-case` | `owl-jeopardy.html`, `main.css` |
| Member profile files | `firstname-lastname.html` | `jordan-rivera.html` |
| Project detail files | `project-slug.html` | `owl-jeopardy.html` |
| CSS classes | `kebab-case` | `member-hero`, `card-title` |
| JS variables & functions | `camelCase` | `buildCard`, `liveCount` |
| Git branches | `type/short-description` | `feat/people-two-panel` |

---

## File & Folder Conventions

- Project detail pages live in `projects/`; member profiles live in `people/`.
- Shared styles live in `assets/css/`; shared scripts and data registries in `assets/js/`.
- A new page is created by **copying an existing template** in the same folder, then editing content.
- Every page links `main.css`; detail/profile pages also link `profile.css`.

---

## Code Style

- Indent with 2 spaces; keep lines readable (~100 chars).
- Use semantic HTML; always provide `alt` text on images.
- No inline styles beyond trivial one-offs — use the shared classes/variables.
- Keep JavaScript dependency-free; no external CDN scripts on a page.
- No `console.log` left in committed code; delete dead/commented-out code.

---

## Git Conventions

- Commit messages: `type: short description` (`feat`, `fix`, `docs`, `refactor`, `chore`).
  - Example: `feat: add people two-panel index`
- Work on a branch, not directly on `main`.
- Contributions arrive as pull requests; the maintainer (Alex Pang) reviews and merges.

---

## Content Conventions

- Project pages cover: what it does, how it's built, the team, the sprint story.
- Member profiles cover: who they are, strengths, how they use AI, projects shipped, links.
- Cross-link every contributor → their profile, and every profile → their projects.
- Add a new app to the home directory by editing the entry in `assets/js/projects.js`.

---

## Quality Checks (in place of unit tests)

There is no automated test suite for a static content site. Before merging, verify by hand:

- [ ] The page renders correctly when served locally (`python -m http.server`).
- [ ] All links resolve (no 404s), including top-nav and cross-links.
- [ ] Layout is responsive down to a phone width.
- [ ] Contrast and keyboard navigation are acceptable (WCAG AA).

---

## What Claude Code Should Never Do

- Never modify files in `ai_specs/` without explicit instruction.
- Never introduce a framework, bundler, or build step — the no-build principle is deliberate. Ask first.
- Never add an external CDN dependency to a page without asking.
- Never break the shared navy/gold theme or hardcode colors outside the CSS variables.
