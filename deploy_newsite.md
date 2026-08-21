# Deploying & Adding a Site — OpenOwls Runbook

How the `openowls.ai` hub works, how to deploy it, and how to publish a new
student app at `<app>.openowls.ai`. Keep this handy — every new project follows
the same steps.

---

## The mental model

```
openowls.ai                     →  the landing "linktree" (this repo, on Cloudflare Pages)
owl-jeopardy.openowls.ai        →  CNAME → the app's host (Render / Vercel / …)
owl-street.openowls.ai          →  CNAME → …
<app>.openowls.ai               →  CNAME → wherever that app is deployed
```

- **The hub** (`openowls.ai`) is one static site that just lists the apps.
- **Each app** is its own repo, deployed on its own host, reached through its
  own subdomain.
- **DNS lives in Cloudflare**, so re-pointing a subdomain to a new host is a
  one-line change — no code, no redeploy of the hub.

Two things you set up once, then rarely touch:
- **A.** Deploy the hub (`openowls.ai`) → below, do this once.
- **B.** Point the domain's DNS at Cloudflare → below, do this once.

Then, per app, you repeat **C** (deploy the app) + **D** (wire its subdomain).

---

## A. Deploy the hub (`openowls.ai`) — one time

1. The repo is already on GitHub: `OpenOwls-at-Temple/openowls.ai`.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Select `OpenOwls-at-Temple/openowls.ai`.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
5. **Save and Deploy.** You get a `*.pages.dev` preview URL — confirm it looks right.
6. Custom domain: **the Pages project → Custom domains → Set up a domain** →
   add `openowls.ai`, then add `www.openowls.ai`. Cloudflare provisions TLS
   automatically (may take a few minutes).

> `_redirects` in the repo sends `www` → the bare apex, and `_headers` sets
> basic security headers. Nothing to configure — Cloudflare Pages reads them.

**Updating the hub later:** just `git push` to `main`. Cloudflare Pages
rebuilds and redeploys automatically in ~1 minute.

---

## B. Put the domain on Cloudflare DNS — one time

Only needed if `openowls.ai` isn't already managed by Cloudflare.

1. Cloudflare dashboard → **Add a site** → `openowls.ai` (Free plan is fine).
2. Cloudflare shows you two **nameservers**. Go to wherever you registered the
   domain and replace its nameservers with those two.
3. Wait for Cloudflare to show the zone as **Active** (minutes to a few hours).

After this, all DNS records for the domain are managed in Cloudflare's **DNS**
tab — that's where you'll add subdomains in step D.

---

## C. Deploy a new student app — per app

The app is a normal web app in its own repo. Deploy it however it's built:

**Vercel (typical for React / Next.js frontends):**
1. Vercel → **Add New → Project** → import the app's GitHub repo.
2. Accept the detected framework/build settings → **Deploy**.
3. Confirm the app works on the `*.vercel.app` URL it gives you.

**Render (typical for Python / Node backends or full-stack):**
1. Render → **New → Web Service** (or Static Site) → connect the repo.
2. Set build/start commands and any env vars → **Create**.
3. Confirm it works on the `*.onrender.com` URL.

Whatever host you use, note the URL it hands you — you'll point the subdomain at
it next.

---

## D. Point `<app>.openowls.ai` at the deploy — per app

**This takes TWO steps. DNS alone is not enough.** The host has to be told it
should answer for your subdomain (that's what lets it route the request and
issue the TLS certificate), *and* DNS has to send traffic there.

### Step 1 — add the custom domain ON THE HOST

- **Vercel:** Project → **Settings → Domains → Add** → type
  `owl-jeopardy.openowls.ai`. Vercel shows you a CNAME target
  (usually `cname.vercel-dns.com`). Copy it.
- **Render:** Service → **Settings → Custom Domains → Add Custom Domain** →
  type the subdomain. Render shows you a CNAME target
  (`<something>.onrender.com`). Copy it.

### Step 2 — add the CNAME in Cloudflare

Cloudflare → **DNS → Records → Add record:**

| Field   | Value                                            |
|---------|--------------------------------------------------|
| Type    | `CNAME`                                          |
| Name    | `owl-jeopardy`  *(just the label, not the full domain)* |
| Target  | the target the host gave you in Step 1           |
| Proxy   | **DNS only (grey cloud)** at first               |

> **Grey cloud first.** Set the proxy to **DNS only** so the host can validate
> ownership and issue its certificate. Once the host shows the domain as active
> with a valid cert, you may switch the proxy to **Proxied (orange cloud)** if
> you want Cloudflare in front — but grey-cloud is perfectly fine to leave as-is.

### Step 3 — verify

- Wait a few minutes, then visit `https://owl-jeopardy.openowls.ai`.
- The host's dashboard should show the domain as **Active / Certificate issued**.

> ⚠️ **If you skip Step 1:** the subdomain resolves but you get the host's
> generic 404 or an SSL error, because the host doesn't know it should serve
> *your* app on that hostname.

---

## E. Show the app on the hub

Edit **`assets/js/projects.js`** in this repo. Find (or add) the app's entry and
set it live:

```js
{
  name: "Owl Jeopardy",
  icon: "🎯",
  url: "https://owl-jeopardy.openowls.ai",
  description: "One or two sentences.",
  tags: ["React", "Claude AI"],
  live: true,        // ← flip from false to true once the subdomain works
}
```

`git push` → the hub redeploys automatically and the card becomes clickable.

---

## Moving an app to a new backend later

The public URL (`<app>.openowls.ai`) never changes, so **you don't edit this
repo at all**:

1. On the **new** host, add `<app>.openowls.ai` as a custom domain (step D-1).
2. In Cloudflare, update that subdomain's **CNAME target** to the new host (step D-2).
3. (Optional) remove the domain from the old host.

Done — traffic now flows to the new deploy.

---

## Quick checklist for a brand-new app

- [ ] App deployed on its host (Vercel/Render); works on the host's URL.
- [ ] Custom domain `<app>.openowls.ai` added **on the host** (step D-1).
- [ ] CNAME `<app>` → host target added **in Cloudflare**, grey cloud (step D-2).
- [ ] `https://<app>.openowls.ai` loads with a valid certificate.
- [ ] Entry added/updated in `assets/js/projects.js` with `live: true`, pushed.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Subdomain shows host's 404 / "not found" | Custom domain not added on the host | Do step D-1 |
| `SSL: no certificate` / cert error | Cert not issued yet, or proxy on too early | Set Cloudflare proxy to **grey cloud**, wait for the host to issue the cert |
| `DNS_PROBE` / doesn't resolve | CNAME missing or wrong name | Check the record **Name** is just `<app>`, not the full domain |
| Card not clickable on the hub | `live: false` or not pushed | Set `live: true` in `projects.js` and push |
| Hub changes not showing | Cache / deploy still running | Wait ~1 min; hard-refresh; check the Pages deployment log |
