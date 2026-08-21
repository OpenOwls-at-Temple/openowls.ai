# openowls.ai

The central landing page for **OpenOwls at Temple University** — a lightweight
"linktree" that lists every student app we've deployed and links out to it.

Live at **[openowls.ai](https://openowls.ai)**. This repo is *only* the landing
page; each app lives in its own repo and is deployed on its own host (Render,
Vercel, etc.) behind a subdomain.

## How it works

```
openowls.ai                     →  this repo (Cloudflare Pages)
owl-jeopardy.openowls.ai        →  CNAME → the app's host (Render / Vercel / …)
owl-street.openowls.ai          →  CNAME → …
accessibility-automator.openowls.ai → …
ask-clara.openowls.ai           → …
```

The landing page reads its list of apps from **`assets/js/projects.js`** and
renders the cards client-side. No build step, no framework — Cloudflare Pages
just serves the folder.

## Editing the app list

Open **`assets/js/projects.js`** and edit the array. That's the only file you
touch for content. Each entry:

```js
{
  name: "Owl Jeopardy",
  icon: "🎯",
  url: "https://owl-jeopardy.openowls.ai",
  description: "One or two sentences.",
  tags: ["React", "Claude AI"],
  live: true,     // true = clickable card; false = "Coming soon"
}
```

- **Adding an app:** copy a block, fill it in, commit, push. Cloudflare Pages
  redeploys automatically.
- **Taking an app live:** flip `live: false` → `true` (after the subdomain is
  wired up — see below).
- **Moving an app's backend:** you do **not** edit this repo. The `url` stays
  the same; you just re-point the subdomain's DNS (see below).

## Local preview

No server needed — just double-click `index.html`, or:

```bash
# any static server works, e.g.
python -m http.server 8000   # then visit http://localhost:8000
```

## Deploying (Cloudflare Pages)

1. Push this repo to GitHub (`OpenOwls-at-Temple/openowls.ai`).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick this repo. **Build command:** *(none)*. **Build output directory:** `/`.
4. After the first deploy, **Custom domains → Set up a domain** → `openowls.ai`
   (and `www.openowls.ai`). Cloudflare provisions TLS automatically.

`_redirects` sends `www` → the bare apex; `_headers` sets basic security headers.

## Wiring up a new subdomain (the important part)

Pointing `<app>.openowls.ai` at a deployed app takes **two** steps — DNS alone
is not enough:

1. **On the app's host** (Render / Vercel / Netlify): add `<app>.openowls.ai`
   as a **custom domain** on that service. The host will show you the CNAME
   target to use and will issue the TLS certificate once DNS matches.
2. **In Cloudflare DNS** (`openowls.ai` zone): add a **CNAME** record
   `<app>` → the target the host gave you.
   - Set it to **DNS only (grey cloud)** first so the host can validate and
     issue its cert; you can turn the orange proxy on afterward if you want.

> ⚠️ If you skip step 1, the subdomain resolves but the host returns its own
> 404 or an SSL error, because it doesn't know it should serve your app on that
> hostname.

### Moving an app to a new backend later

1. Add `<app>.openowls.ai` as a custom domain on the **new** host.
2. Update the CNAME in Cloudflare to the new target.
3. (Optional) remove the domain from the old host.

The public URL never changes, so nothing in this repo needs editing.

## Structure

```
openowls.ai/
├── index.html              # the landing page
├── 404.html
├── favicon.svg
├── _redirects              # Cloudflare Pages: www → apex
├── _headers                # Cloudflare Pages: security headers
└── assets/
    ├── css/main.css        # all styles (OpenOwls navy + gold theme)
    └── js/
        ├── projects.js     # ← edit this to add / update apps
        └── render.js       # renders the cards (rarely touched)
```
