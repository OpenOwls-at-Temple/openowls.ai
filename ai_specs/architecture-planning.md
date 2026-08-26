# Architecture Planning

> **OpenOwls SDD** — Read by the system architect and software engineers.
> Defines the folder structure, key design decisions, and implementation details.
> Claude Code uses this file to understand how the codebase is organized.

---

## System Architecture Overview

OpenOwls Hub is a **fully static website** — there is no backend, database, API, or server-side code. Cloudflare Pages serves the repository folder as-is (no build step). All rendering happens in the browser with a small amount of vanilla JavaScript; content is stored in the repo as HTML pages and JS "registry" files and edited via Git.

The apps that the Hub links to are **not** part of this codebase — each lives in its own repository on its own host and is reached through a subdomain (`<app>.openowls.ai`).

---

## Folder Structure

```
openowls.ai/
├── CLAUDE.md               # SDD entry point / read-order
├── progress.md             # Living status board
├── batchrun.md             # N/A for this project (see file)
├── README.md               # Repo + deploy notes
├── index.html              # Home — the app card directory
├── 404.html
├── favicon.svg
├── _redirects              # Cloudflare Pages: www → apex
├── _headers                # Cloudflare Pages: security headers
├── ai_specs/               # The SDD specification (this folder)
├── assets/
│   ├── css/
│   │   ├── main.css        # Base theme (navy/gold), home + cards
│   │   └── profile.css     # Project-detail + member-profile layouts
│   └── js/
│       ├── projects.js     # Registry of apps (drives home cards)
│       └── render.js       # Renders home cards from the registry
├── projects/               # Project detail pages (right-panel content)
│   └── owl-jeopardy.html
└── people/                 # Member profile pages (right-panel content)
    └── jordan-rivera.html
```

> Planned (Phase 1, F4): a `projects/` index and a `people/` index that present the
> two-panel reader (list on the left, selected detail on the right).

---

## Key Design Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Build tooling | **None** — no framework, no bundler | Any student can edit one file and push; lowest possible barrier to contributing. |
| Rendering | Static HTML + a little vanilla JS | Keeps the site fast, cheap, and dependency-free. |
| Content storage | HTML pages + JS registry files in the repo | No CMS/DB; content is reviewed and versioned through Git. |
| Browse pattern | Two-panel master-detail for Projects & People | Lets a visitor scan the full list and read any one item without losing place (F4). |
| Detail pages | Standalone HTML that also serves as the right-panel content | One source of content, deep-linkable by URL. |
| App hosting | Per-app subdomains via CNAME (not in this repo) | Each app deploys independently; the Hub only links out. |
| Deep-linking | Selected item reflected in the URL (query/hash) | Makes each profile/project a shareable, resume-ready link (F3). |

---

## Data Models

These are content shapes, not database tables (there is no database).

### Project (app registry entry — `assets/js/projects.js`)
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name |
| `icon` | string | Emoji |
| `url` | string | Public subdomain URL |
| `description` | string | One- or two-sentence card blurb |
| `tags` | string[] | Tech/stack labels |
| `live` | boolean | `true` = clickable card; `false` = "Coming soon" |

### Project Detail (project page content)
Adds to the above: what-it-does, how-it's-built, screenshots/demo, **contributors** (name → role, what they owned, biggest challenge, link to profile), and the sprint story.

### Member (profile page content)
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Full name (first, last) |
| `slug` | string | URL slug, e.g. `jordan-rivera` |
| `year` / `major` | string | Standing and program |
| `role` | string | Their role(s) on projects |
| `quote` | string | Pulled "in their words" line |
| `bio` | string | Who they are |
| `strengths` | string[] | What they bring |
| `ai_usage` | string | How they use AI |
| `projects` | ref[] | Projects shipped (link back to project pages) |
| `links` | object | GitHub, LinkedIn, email |

---

## API Endpoints

Not applicable — the site is static and exposes no API.

---

## Environment Variables

None. The site requires no secrets, keys, or runtime configuration.

---

## LLM Integration

Not applicable — this project has no LLM layer. See `ai_specs/llm-integration.md`.

---

## Deployment

See `ai_specs/deployment.md`.
