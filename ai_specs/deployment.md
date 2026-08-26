# Deployment

> **OpenOwls SDD** — Read by engineers and DevOps-minded team members.
> Defines how the Hub is served and deployed. It is a static site, so this is short by design.

---

## Environments

| Environment | Purpose | URL |
|-------------|---------|-----|
| Local | Preview on your machine before pushing | `http://localhost:8000` |
| Production | The live site | `https://openowls.ai` |

> No separate staging environment is required. Cloudflare Pages preview deployments
> (one per pull request / branch) cover pre-merge review if needed.

---

## Hosting Platforms

| Component | Platform | Tier | Notes |
|-----------|----------|------|-------|
| Whole site | Cloudflare Pages | Free | Serves the repo folder; **no build command**, output directory `/`. Auto-deploys on push to `main`. |
| DNS / domains | Cloudflare DNS | Free | `openowls.ai` apex + `www`; per-app `<app>.openowls.ai` CNAMEs. |
| The apps themselves | Their own hosts (Render, Vercel, …) | — | Not part of this repo; linked by subdomain only. |

---

## Environment Variables

**None.** The site is static and needs no secrets, API keys, or runtime configuration.

---

## Local Development Setup

### Prerequisites
- Any static file server (Python is fine — no install needed beyond Python 3).

### Steps
```bash
# From the repo root
python -m http.server 8000
# then open http://localhost:8000
```

> Note: open the site through the server, **not** by double-clicking a file. Pages in
> `projects/` and `people/` load shared CSS by path, which only resolves over `http://`.

---

## Deployment Process

### Site (Cloudflare Pages)
1. Push to `main` — Cloudflare Pages auto-deploys the folder.
2. No build command; build output directory is `/`.
3. Custom domains `openowls.ai` and `www.openowls.ai` are configured in the Pages project; TLS is automatic.
4. `_redirects` sends `www` → the bare apex; `_headers` sets basic security headers.

### Wiring a new app subdomain (`<app>.openowls.ai`)
Two steps (DNS alone is not enough):
1. **On the app's host** (Render/Vercel/Netlify): add `<app>.openowls.ai` as a custom domain so the host issues TLS and knows to serve that hostname.
2. **In Cloudflare DNS**: add a CNAME `<app>` → the target the host gave you (set DNS-only / grey cloud first so the host can validate). See `README.md` for the full walkthrough.

---

## CI/CD Pipeline

None currently. Cloudflare Pages' own build-and-deploy on push is the entire pipeline. (A future option: a GitHub Action for HTML/link/accessibility checks on pull requests.)

---

## Common Deployment Issues

| Issue | Likely Cause | Fix |
|-------|-------------|-----|
| A subdomain resolves but shows a 404 or SSL error | Step 1 skipped — the app's host doesn't know that hostname | Add the custom domain on the app's host, then wait for its cert |
| Local page looks unstyled when opened by double-click | Relative CSS path doesn't resolve over `file://` | Serve with `python -m http.server` and use `http://localhost` |
| Change didn't appear on the live site | Not pushed to `main`, or Pages build still running | Confirm the commit is on `main`; check the Pages dashboard |

---

## Secrets Management

Not applicable — the site holds no secrets. Nothing sensitive is committed or configured.
