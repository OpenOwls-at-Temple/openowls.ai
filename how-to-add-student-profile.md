# How to Add Your Student Profile

Welcome to **OpenOwls at Temple**! This guide walks you through adding your own profile
to the [People page](https://openowls.ai/people/). When you're done you'll have a clean,
shareable page — `https://openowls.ai/people/your-name.html` — that you can drop straight
onto a resume, LinkedIn, or a job application.

The site is **fully static** (no backend, no database), so you add yourself the same way
you'd contribute any code: with a small pull request. A form does the file-writing for
you, so you don't have to hand-write any HTML.

---

## What you'll need

- A **GitHub account** (your GitHub avatar becomes your profile photo — no upload needed).
- **Git** installed, and a **local clone** of this repo (you need one to open a pull request).
- **Google Chrome or Microsoft Edge.** The form writes files straight into your local
  clone using a browser feature that only Chromium browsers support. (On other browsers
  you'll get a Download button instead — see [Manual fallback](#manual-fallback).)

> **Heads-up:** the form only writes into a folder you explicitly pick, and nothing is
> published until a maintainer reviews and merges your pull request.

---

## Step 1 — Get the repo locally

If you're an OpenOwls member with write access:

```bash
git clone https://github.com/OpenOwls-at-Temple/openowls.ai.git
cd openowls.ai
```

If you don't have write access, **fork** the repo on GitHub first, then clone your fork.

---

## Step 2 — Open the Join form

You have two options:

**A. Use the live site (simplest — no server needed).**
Go to **<https://openowls.ai/people/join.html>**. The live page can still write into your
local clone (you'll pick the folder in Step 4).

**B. Run it locally.**
From inside your clone, start any static file server and open the page. Node's works
everywhere:

```bash
npx http-server . -p 8080 -c-1
# then open http://localhost:8080/people/join.html
```

(If you have Python instead: `python -m http.server 8000`, then
`http://localhost:8000/people/join.html`.)

---

## Step 3 — Fill in the form

- **Branch name** *(top of the form)* — a short name for your Git branch, e.g.
  `add-alex-pang`. Leave it blank and one is chosen for you.
- **Full name** — required.
- **LinkedIn** and **GitHub** URLs — required. Your **photo** is pulled automatically
  from your GitHub avatar and previews as you type your GitHub URL.
- Everything else (role, year, major, bio, how you use AI, strengths, projects, email) is
  **optional** — fill in as much as you'd like. You can always update it later.

Then click **Generate my profile**.

---

## Step 4 — Let the form write your files

When you click Generate, your browser asks you to **choose a folder**. Pick the **root of
your local clone** (the folder that contains `people/` and `assets/`), and grant write
permission.

The form then:

- creates `people/<your-name>.html` (your profile page), and
- adds one entry to `assets/js/people.js` (so your name appears in the People list).

You'll see a green **"✓ Wrote …"** confirmation.

> **Tip — preview before you commit:** with your local server still running, open
> `http://localhost:8080/people/` — your name is now in the list, and clicking it shows
> your new profile. 🎉

---

## Step 5 — Commit and open your pull request

The bottom of the form shows the exact commands, pre-filled with your branch name. Run
them from inside your clone:

```bash
git switch -c add-alex-pang
git add people/alex-pang.html assets/js/people.js
git commit -m "Add Alex Pang to the People page"
git push -u origin add-alex-pang
```

Then click the **"create the PR ↗"** link on the form (or the link GitHub prints after
`git push`) to open your pull request.

A maintainer reviews it, and once it's merged **your profile is live**.

---

## Manual fallback

If you're not on Chrome/Edge, or you'd rather do it by hand, the form reveals a
**Download** button and a copy-paste snippet:

1. Click **Download** to save `your-name.html`, and move it into the `people/` folder of
   your clone.
2. Copy the shown line and paste it just inside the
   `window.OPENOWLS_PEOPLE = [` block in `assets/js/people.js`.
3. Continue from [Step 5](#step-5--commit-and-open-your-pull-request).

---

## Updating your profile later

Your profile lives in `people/<your-name>.html` — it's the single source of truth and
your shareable URL. To change anything, edit that file directly and open another pull
request. (Re-running the form with the same name also regenerates the page.)

### Using a custom photo instead of your GitHub avatar

The generated page points its portrait at your GitHub avatar. To use a different headshot,
edit your profile page's `<div class="portrait">` to reference an image you've added to the
repo, and include that image file in the same pull request.

---

## Troubleshooting

| Problem | Fix |
|--------|-----|
| No folder prompt appeared | You're not on Chrome/Edge — use the [Manual fallback](#manual-fallback). |
| "That folder didn't look like the repo" | Pick the **root** of your clone (it must contain `people/` and `assets/`), not a subfolder. |
| My name didn't show up in the local preview | Make sure `assets/js/people.js` was updated (green confirmation), and hard-refresh the People page (Ctrl+F5). |
| `git push` was rejected | You don't have write access — fork the repo, push to your fork, and open the PR from there. |

Questions? Ask a maintainer — **Alex Pang** (Alex.Pang@temple.edu). Owls helping Owls. 🦉
