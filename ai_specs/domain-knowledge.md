# Domain Knowledge — MINIMAL / MOSTLY N/A

> **OpenOwls SDD** — Status for this project: **Minimal.**

OpenOwls Hub is a content/showcase website, not a domain application — it has no business
rules, workflows, or domain constraints to encode. The only terms worth pinning down:

| Term | Definition |
|------|------------|
| Hub | This site (`openowls.ai`) — the central directory that links to every OpenOwls app and documents projects and members. |
| App / Project | A student-built application that lives in its own repo and deploys to its own `<app>.openowls.ai` subdomain. |
| Member | A student contributor who has a profile page on the Hub. |
| Sprint | The ~4-week cycle in which OpenOwls teams ideate, build, demo, and publish a project. |
| Live vs. Coming soon | An app card is "Live" (clickable) once its subdomain is wired up; otherwise it shows as "Coming soon." |

Everything else about how the Hub is built lives in `overview.md`, `features.md`,
`architecture-planning.md`, `design.md`, and `conventions.md`. There is no separate
domain model beyond the content shapes described in `architecture-planning.md`.
