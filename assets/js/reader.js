/* ═══════════════════════════════════════════════════════════════════════
   OpenOwls — two-panel reader (Projects & People index pages)
   ───────────────────────────────────────────────────────────────────────
   Renders a master list (left) and a detail pane (right). Selecting an item
   fetches that item's STANDALONE page and injects its <article> into the
   right pane — the standalone page stays the single source of truth and the
   shareable URL. The selection is reflected in the address bar (?p=<slug>).

   Progressive enhancement: every list row is a real <a href> to the
   standalone page (not a div+onclick), so it can be opened in a new tab,
   middle-clicked, or followed if the click handler ever fails — it simply
   opens the full page instead of swapping the right pane. The canonical
   content always lives in the standalone pages; this list is rendered from
   the registry the same way the home grid is (see render.js).

   Each index page sets  window.OPENOWLS_READER = { kind: "people" | "projects" }
   before loading its registry and then this script.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var cfg = window.OPENOWLS_READER || {};
  var listEl = document.getElementById("reader-list");
  var detailEl = document.getElementById("reader-detail");
  if (!listEl || !detailEl) return;

  /* ── helpers ── */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function initials(name) {
    var parts = String(name).trim().split(/\s+/);
    var s = (parts[0] || "").charAt(0) + (parts.length > 1 ? parts[parts.length - 1].charAt(0) : "");
    return s.toUpperCase();
  }
  function slugify(name) {
    return String(name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function getParam() {
    try { return new URLSearchParams(location.search).get("p"); } catch (e) { return null; }
  }

  /* ── normalize each registry into a common item shape ── */
  var items = [];
  if (cfg.kind === "people") {
    (window.OPENOWLS_PEOPLE || []).slice()
      .sort(function (a, b) { return a.name.localeCompare(b.name); })  // first, then last
      .forEach(function (p) {
        items.push({
          id: p.slug,
          href: p.slug + ".html",
          title: p.name,
          subtitle: p.role || "",
          avatar: initials(p.name),
        });
      });
  } else {
    (window.OPENOWLS_PROJECTS || []).forEach(function (p) {
      items.push({
        id: p.page ? p.page.replace(/\.html$/, "") : slugify(p.name),
        href: p.page || null,           // null → no detail page yet (show a fallback)
        title: p.name,
        subtitle: p.live ? "Live" : "Coming soon",
        icon: p.icon || "🦉",
        live: !!p.live,
        url: p.url,
        description: p.description || "",
      });
    });
  }

  if (!items.length) {
    detailEl.innerHTML = "";
    detailEl.appendChild(el("p", "reader-error", "Nothing to show yet."));
    return;
  }

  /* ── build the left list ── */
  var rows = {};
  items.forEach(function (item) {
    var a = el("a", "item");
    a.href = item.href || ("?p=" + encodeURIComponent(item.id));
    a.setAttribute("data-id", item.id);

    var badge = el("span", cfg.kind === "people" ? "item-avatar" : "item-icon",
      cfg.kind === "people" ? item.avatar : item.icon);
    var text = el("span", "item-text");
    text.appendChild(el("span", "item-title", item.title));
    if (item.subtitle) text.appendChild(el("span", "item-sub", item.subtitle));

    a.appendChild(badge);
    a.appendChild(text);
    listEl.appendChild(a);
    rows[item.id] = a;
  });

  /* ── selection ── */
  var current = null;

  function setActive(id) {
    if (current && rows[current]) {
      rows[current].classList.remove("is-active");
      rows[current].removeAttribute("aria-current");
    }
    if (rows[id]) {
      rows[id].classList.add("is-active");
      rows[id].setAttribute("aria-current", "true");
    }
    current = id;
  }

  function itemById(id) {
    for (var i = 0; i < items.length; i++) if (items[i].id === id) return items[i];
    return null;
  }

  function renderFallback(item) {
    detailEl.innerHTML = "";
    var art = el("article", "article");
    var hero = el("div", "proj-hero");

    var row = el("div", "status-row");
    row.appendChild(el("div", "proj-emoji", item.icon));
    row.appendChild(el("span", "badge " + (item.live ? "badge--live" : "badge--soon"),
      item.live ? "Live" : "Coming soon"));
    hero.appendChild(row);

    hero.appendChild(el("h1", null, item.title));
    hero.appendChild(el("p", "lede", item.description));

    if (item.live && item.url) {
      var cta = el("div", "cta-row");
      var link = el("a", "btn btn--gold", "Open the app →");
      link.href = item.url; link.rel = "noopener";
      cta.appendChild(link);
      hero.appendChild(cta);
    }
    art.appendChild(hero);
    art.appendChild(el("p", "tpl-note", "A full project page for this app is coming soon."));
    detailEl.appendChild(art);
    document.title = item.title + " — OpenOwls";
  }

  function loadArticle(item) {
    detailEl.setAttribute("aria-busy", "true");
    fetch(item.href)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var art = doc.querySelector(".article");
        detailEl.innerHTML = "";
        if (art) {
          detailEl.appendChild(document.importNode(art, true));
        } else {
          detailEl.appendChild(el("p", "reader-error", "Couldn’t read this page."));
        }
        var t = doc.querySelector("title");
        if (t) document.title = t.textContent;
        detailEl.removeAttribute("aria-busy");
      })
      .catch(function () {
        detailEl.innerHTML = "";
        var msg = el("p", "reader-error", "Couldn’t load this content. ");
        var link = el("a", null, "Open the full page →");
        link.href = item.href;
        msg.appendChild(link);
        detailEl.appendChild(msg);
        detailEl.removeAttribute("aria-busy");
      });
  }

  function select(id, push) {
    var item = itemById(id) || items[0];
    setActive(item.id);

    if (item.href) loadArticle(item);
    else renderFallback(item);

    var url = "?p=" + encodeURIComponent(item.id);
    if (push) history.pushState({ id: item.id }, "", url);
    else history.replaceState({ id: item.id }, "", url);

    // On a phone the list sits above the detail — bring the detail into view.
    if (push && window.matchMedia && window.matchMedia("(max-width: 800px)").matches) {
      detailEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ── wire up clicks (delegated) + back/forward ── */
  listEl.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a.item") : null;
    if (!a) return;
    e.preventDefault();
    select(a.getAttribute("data-id"), true);
  });

  window.addEventListener("popstate", function () {
    var id = getParam();
    select(id && itemById(id) ? id : items[0].id, false);
  });

  /* ── initial selection ── */
  var startId = getParam();
  select(startId && itemById(startId) ? startId : items[0].id, false);
})();
