/* ═══════════════════════════════════════════════════════════════════════
   OpenOwls — member registry
   ───────────────────────────────────────────────────────────────────────
   This is the ONLY file you edit to add a member to the People index.
   It is a lightweight *index* (name + slug), not the profile content —
   the profile itself lives in its own standalone page: people/<slug>.html
   (that page is the source of truth and the shareable resume/LinkedIn URL).

   To add a member:
     1. Copy people/jordan-rivera.html → people/<firstname-lastname>.html and
        fill in their content.
     2. Add a block below with their display name and matching slug.

   Fields:
     name   Full name, "First Last" (the list sorts by first, then last).
     slug   URL slug = the profile file name without ".html".
     role   Short role line shown under the name in the list (optional).
   ═══════════════════════════════════════════════════════════════════════ */

window.OPENOWLS_PEOPLE = [
  {
    name: "John Doe",
    slug: "john-doe",
    role: "Team Lead · Front-end",
  },
];
