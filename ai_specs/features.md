# Features

> **OpenOwls SDD** — Read by end users and the product owner.
> Defines what the OpenOwls Hub does, in plain language.
> Organized into three phases. Phase 1 is the MVP — the smallest version where the showcase works end to end.

---

## How to Read This File

- **Phase 1** — Must-have features. The Hub is not usable without these.
- **Phase 2** — Should-have features. Adds meaningful value once Phase 1 is stable.
- **Phase 3** — Nice-to-have features. Enhancements and stretch goals.

Each feature has a short user story and a couple of acceptance criteria written from the reader's or contributor's perspective.

---

## Phase 1 — Core MVP

### F1: App Directory (Home)
**As a** visitor (employer, faculty, or public),
**I want to** see every app OpenOwls has built on one landing page,
**So that** I can quickly understand what the group ships and jump into any app.

**Acceptance Criteria:**
- [ ] Each app appears as a card with name, icon, one-line description, and tech tags.
- [ ] Live apps are clickable (link to their subdomain); not-yet-launched apps show as "Coming soon" and are not clickable.

_Status: exists (`index.html` + `assets/js/projects.js`)._

---

### F2: Project Detail Pages
**As an** employer or faculty member,
**I want to** open a dedicated page for a project,
**So that** I can see what it does, how it was built, and who built it.

**Acceptance Criteria:**
- [ ] Each page covers: what it does, how it's built, the team (contributor cards), and the sprint story.
- [ ] Each contributor card links to that student's member profile.

_Status: template built (`projects/owl-jeopardy.html`)._

---

### F3: Member Profile Pages
**As an** employer or recruiter,
**I want to** view a student's profile page,
**So that** I can evaluate their strengths and real contributions as portfolio evidence.

**Acceptance Criteria:**
- [ ] Each profile covers: who they are, strengths, how they use AI, and the projects they've shipped.
- [ ] The profile has a clean, shareable URL suitable for a resume or LinkedIn, and lists projects that link back to their detail pages.

_Status: template built (`people/jordan-rivera.html`)._

---

### F4: Top Menu + Two-Panel Browsing
**As a** visitor,
**I want** a persistent top menu (Home, Projects, People) and a two-panel reader for projects and people,
**So that** I can scan the whole list and read any one item without losing my place.

**Acceptance Criteria:**
- [ ] A top menu with **Home**, **Projects**, and **People** appears on every page. **Home** opens the main landing page showing all the project cards.
- [ ] **People** opens a two-panel page: the left panel lists student names ordered by first name, then last name; selecting a name shows that student's profile in the right panel (the first student is shown by default).
- [ ] **Projects** opens the same two-panel layout: the left panel lists the projects; selecting one shows its detail in the right panel (the first project is shown by default).
- [ ] The selected item is reflected in the page URL so a specific profile or project can be linked and shared directly; on narrow screens the two panels stack (list first, then the selected detail).

---

## Phase 2 — Enhanced Features

### F5: Real Content Populated
**As the** site owner,
**I want** every live app and every active member to have real (not placeholder) pages,
**So that** the Hub is credible and complete.

**Acceptance Criteria:**
- [ ] Every live app in the directory has a filled-in project page.
- [ ] Every active member has a filled-in profile with a real bio and links.

---

### F6: Homepage Polish
**As a** first-time visitor,
**I want** the homepage to clearly say what this site is and point me to projects and people,
**So that** I immediately understand it's the hub linking to everything OpenOwls has built.

**Acceptance Criteria:**
- [ ] The header/tagline states the site's purpose and references the projects and people sections.
- [ ] The home page offers a clear path into the `/projects` and `/people` hubs.

---

### F7: Per-Page Share Cards (SEO / Open Graph)
**As** someone sharing a project or profile link,
**I want** the link to preview nicely on LinkedIn, Slack, or in search,
**So that** the shared page looks professional and draws clicks.

**Acceptance Criteria:**
- [ ] Every project and profile page has a unique title, description, and Open Graph tags.
- [ ] A shared link renders a correct title + description preview.

---

### F8: Filter / Search on Hubs
**As a** visitor with a specific interest,
**I want to** filter the projects or people lists,
**So that** I can find relevant work fast.

**Acceptance Criteria:**
- [ ] Projects can be filtered by tech tag.
- [ ] People can be filtered (e.g. by "looking for an internship").

---

## Phase 3 — Advanced / Stretch Features

### F9: Contribution Workflow — Self-Service Profile
**As a** student member,
**I want** a low-friction, documented way to add my own profile,
**So that** I can get on the site without needing the maintainer to write it for me.

**Acceptance Criteria:**
- [x] A profile template plus a "how to add yourself" guide exist
      (`people/john-doe.html` as the template; `how-to-add-student-profile.md` as the guide).
- [x] A self-service form (`people/join.html`) generates a student's standalone profile
      page **and** their People-list entry from a short form — no hand-written HTML.
- [x] A new member submits their page as a pull request by following the guide; a
      maintainer reviews and merges it (that merge is the moderation step).

> **How it stays static:** the form runs entirely in the browser. The photo comes from
> the student's GitHub avatar (no upload), and — in Chromium browsers — the
> [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)
> writes the two files straight into the student's local clone (with a Download fallback
> elsewhere), then shows the git commands to open the PR. **No backend, database, or
> server-side code is introduced** — this satisfies F9 while honoring the "fully static /
> no backend" line in "Out of Scope" below. See `architecture-planning.md` and
> `how-to-add-student-profile.md`.

---

### F10: "How We Build" Page
**As a** visitor curious about the group,
**I want** a page explaining the OpenOwls sprint + spec-driven process,
**So that** I understand how these apps get made.

**Acceptance Criteria:**
- [ ] A page describes the 4-week sprint cycle and the SDD workflow in plain language.

---

### F11: Recruiter View
**As an** employer,
**I want** a filtered view of members open to internships with their strengths at a glance,
**So that** I can shortlist candidates quickly.

**Acceptance Criteria:**
- [ ] An index surfaces members flagged as "open to internships" with role and key strengths.

---

### F12: Richer Media & Analytics
**As a** visitor,
**I want** to see real screenshots or short demos on project pages,
**So that** I can grasp what an app does without leaving the page.

**Acceptance Criteria:**
- [ ] Project pages support real screenshots / demo GIFs in place of the placeholder frame.
- [ ] (Optional) Privacy-friendly analytics record page views without tracking individuals.

---

## Out of Scope
<!-- Explicitly excluded to prevent scope creep. -->

- User accounts, login, or authentication — all content is public and edited via the repo.
- Any backend, database, or runtime LLM — the site stays fully static.
- Hosting the apps themselves — each app lives on its own subdomain and host.
- A CMS or in-browser content editor — content is authored by editing files and pushing.
