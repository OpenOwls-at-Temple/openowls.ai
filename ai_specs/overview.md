# Overview

> **OpenOwls SDD** — Read by the business sponsor and the full team.
> Describes the project at a high level: what it is, why it exists, who it is for, and what technology it uses.

---

## Project Name

OpenOwls Hub (openowls.ai)

## One-Line Description

A public showcase site for OpenOwls at Temple — a directory of the AI apps students have shipped, with a permanent, documented page for every project and every contributor.

---

## Problem Statement

OpenOwls students build real, faculty-used AI apps in four-week sprints, but that work is scattered across separate repositories and subdomains. There is no central, credible place that explains what each app does, who built it, and what each person contributed. An employer evaluating a student has nothing concrete to point to; faculty, the CIS department, and the public have no single view of the group's impact. The Hub gives every app and every member a permanent, shareable page and ties them together.

---

## Goals

- **App coverage:** 100% of *live* apps have a project detail page describing what it does, how it is built, and who built it.
- **Member coverage:** Every active member has a profile page covering their role, at least one project contribution, and how they use AI.
- **Portfolio-ready profiles:** Each member profile is a clean, shareable URL suitable to put on a resume or LinkedIn.
- **Full cross-linking:** Every project lists its contributors (linking to their profiles), and every profile lists that person's projects (linking back).
- **Fast, accessible, static:** Pages load in under ~2s, work on mobile, and meet basic WCAG AA contrast and keyboard-navigation standards.

## Non-Goals

- No user accounts, login, or authentication — all content is public and edited through the repository.
- No backend, database, or runtime LLM. The site is fully static.
- Not a blog or CMS — content is curated by editing files and pushing, not authored in an admin UI.
- Does not host the apps themselves; each app lives on its own subdomain and its own host.

---

## Target Users

| User Type | Description |
|-----------|-------------|
| Employer / Recruiter (Primary) | Evaluates members' real work; uses project pages and member profiles as portfolio evidence for internships and jobs. |
| Faculty / Department / Public (Primary) | Faculty, the CIS department, and general visitors who want to see what the group has built and its impact. |
| Student Member (Secondary / Contributor) | Maintains their own profile and project contributions via the repository. |

---

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Markup | Static HTML5 | Hand-authored pages; no framework. |
| Styling | Vanilla CSS | Custom-property theme (navy + gold); `assets/css/main.css` + `profile.css`. |
| Scripting | Vanilla JavaScript | No framework, no build step; small render/helper scripts only. |
| Fonts | Google Fonts | Syne (display) + DM Sans (body). |
| Hosting | Cloudflare Pages | Serves the folder as-is; no build command. |
| Domains | Cloudflare DNS + per-app CNAMEs | `openowls.ai` apex; `<app>.openowls.ai` points to each app's own host. |
| Source | GitHub | `OpenOwls-at-Temple/openowls.ai`. |

---

## Stakeholders

| Name / Role | Responsibility |
|-------------|----------------|
| Alex Pang (Alex.Pang@temple.edu) — Owner / Maintainer | Owns the site, defines scope, reviews and merges changes, manages the OpenOwls group. |
| Student Contributors | Supply and maintain their own project detail and member-profile content via pull requests. |
| End Users (employers, faculty, public) | Read the site; provide informal feedback. |

> Note: No other faculty are involved in maintaining this site.

---

## Key Constraints

- **Free-tier static hosting only** (Cloudflare Pages).
- **No build pipeline by design** — any student can edit one file and push; keep the site framework-free so the barrier to contributing stays low.
- **Content maintained through Git** — additions and edits arrive as commits / pull requests to this repo.
- **No hard deadline** — coverage-based definition of done (all live apps have pages; all active members have profiles); ongoing as the group ships more apps and adds members.
