# CLAUDE.md
> This project (**OpenOwls Hub** — the openowls.ai showcase site) follows the
> **OpenOwls SDD (Spec-Driven Development) Process**.
> Read the files below in order before doing any work.
>
> **Project shape:** a *fully static* website — no backend, no database, no build step,
> no LLM, and no user accounts. Cloudflare Pages serves the repo folder as-is. Keep it
> framework-free (see `ai_specs/conventions.md`).

## Session Startup — Read These First

1. **`progress.md`** (project root) — catch up on what's done, in progress, and up next
2. **`ai_specs/overview.md`** — project goals, audience, tech stack, stakeholders
3. **`ai_specs/features.md`** — full feature scope and which phase we're in
4. **`ai_specs/architecture-planning.md`** — folder structure, content shapes, decisions
5. **`ai_specs/design.md`** — design principles, the navy/gold system, non-functional requirements
6. **`ai_specs/conventions.md`** — HTML/CSS/JS conventions, naming, git, quality checks
7. **`ai_specs/deployment.md`** — Cloudflare Pages hosting and the subdomain-wiring process

## Not Applicable To This Project (read only if scope changes)

These SDD files are kept for reuse but do **not** apply to a static showcase site. Each
contains a short note explaining why:

- **`batchrun.md`** (project root) — no scheduled/batch jobs
- **`ai_specs/llm-integration.md`** — no LLM layer
- **`ai_specs/auth-security.md`** — no accounts/auth (minimal static-site posture only)
- **`ai_specs/domain-knowledge.md`** — minimal; just a small glossary

## General Instructions

- Always work within the current phase defined in `ai_specs/features.md`. Do not implement
  features from a future phase unless explicitly instructed.
- After completing any meaningful unit of work, update `progress.md`.
- Do **not** introduce a framework, bundler, or build step — the no-build design is
  deliberate. Ask the maintainer first.
- If you encounter a conflict between spec files, flag it to the maintainer before proceeding.
- If a spec file is missing a detail you need, ask rather than assume.
- Never delete or overwrite any file in `ai_specs/` without explicit instruction.
