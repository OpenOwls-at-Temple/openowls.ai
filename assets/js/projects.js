/* ═══════════════════════════════════════════════════════════════════════
   OpenOwls — deployed app registry
   ───────────────────────────────────────────────────────────────────────
   This is the ONLY file you edit to add / update / re-point an app.

   To add an app:      copy a block below and fill it in.
   To take one live:   set  live: true  and make sure the subdomain's DNS +
                       host custom-domain are configured (see README).
   To move a backend:  you don't touch this file at all — just re-point the
                       subdomain's CNAME. `url` stays the same.

   Fields:
     name        Display name.
     icon        Any emoji.
     url         The public subdomain, e.g. https://owl-jeopardy.openowls.ai
     description One or two sentences shown on the card.
     tags        Short tech/stack labels.
     live        true  → clickable card linking to `url`.
                 false → shown as "Coming soon" (not clickable).
   ═══════════════════════════════════════════════════════════════════════ */

window.OPENOWLS_PROJECTS = [
  {
    name: "Owl Jeopardy",
    icon: "🎯",
    url: "https://owl-jeopardy.openowls.ai",
    description:
      "An AI-powered Jeopardy review game that builds its board straight from your Canvas course — no manual question entry.",
    tags: ["React", "Canvas API", "Claude AI", "WebSockets"],
    live: true,
  },
  {
    name: "Owl Street",
    icon: "📈",
    url: "https://owl-street.openowls.ai",
    description:
      "A learning-focused trading platform — live equity charts, paper trading, price alerts, and AI market insights.",
    tags: ["React", "Python", "Claude AI", "Finance API"],
    live: false,
  },
  {
    name: "Accessibility Automator",
    icon: "♿",
    url: "https://accessibility-automator.openowls.ai",
    description:
      "Scans course slide decks for WCAG violations — missing alt text, low contrast, broken reading order — and suggests AI fixes.",
    tags: ["Python", "Canvas API", "Claude AI", "WCAG"],
    live: false,
  },
  {
    name: "Ask Clara",
    icon: "💼",
    url: "https://ask-clara.openowls.ai",
    description:
      "A personalized AI career coach for Temple CS seniors — resume analysis, job-match scoring, and interview prep.",
    tags: ["React", "Python", "Claude AI"],
    live: false,
  },
];
