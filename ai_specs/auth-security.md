# Authentication & Security — NOT APPLICABLE (no auth)

> **OpenOwls SDD** — Status for this project: **Not applicable.**

OpenOwls Hub has **no user accounts, login, sessions, or authorization**. All content is
public and read-only to visitors; the only "write" path is editing files in the repo and
pushing through Git, which is governed by GitHub permissions, not by application code.

Because there is no backend, database, form submission, or secret, the usual web-app
threat model (auth bypass, injection, session theft, secret leakage) does not apply here.

Minimal security posture that still matters for a static site:
- **Transport:** HTTPS is enforced by Cloudflare Pages (automatic TLS).
- **Headers:** basic security headers are set via `_headers`.
- **No secrets:** the repo contains no keys, tokens, or credentials — and must not.
- **Third-party content:** avoid adding external scripts to pages (see `conventions.md`).

If this site ever adds accounts, forms, or a backend, restore this file from the SDD
template and document identity, authorization, and data protection before writing that code.
