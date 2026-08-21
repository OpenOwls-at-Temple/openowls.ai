/* Renders the app cards from window.OPENOWLS_PROJECTS into #grid.
   Pure DOM, no dependencies. */
(function () {
  "use strict";

  var projects = window.OPENOWLS_PROJECTS || [];
  var grid = document.getElementById("grid");
  if (!grid) return;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function buildCard(p) {
    // A live card is an <a>; a coming-soon card is a non-clickable <div>.
    var card = document.createElement(p.live ? "a" : "div");
    card.className = "card" + (p.live ? "" : " card--soon");
    if (p.live) {
      card.href = p.url;
      card.rel = "noopener";
    }

    var head = el("div", "card-head");
    head.appendChild(el("span", "card-icon", p.icon || "🦉"));

    var badge = el("span", "badge " + (p.live ? "badge--live" : "badge--soon"),
      p.live ? "Live" : "Coming soon");
    head.appendChild(badge);
    card.appendChild(head);

    card.appendChild(el("h2", "card-name", p.name));
    card.appendChild(el("p", "card-desc", p.description || ""));

    if (p.tags && p.tags.length) {
      var tags = el("div", "card-tags");
      p.tags.forEach(function (t) { tags.appendChild(el("span", "tag", t)); });
      card.appendChild(tags);
    }

    if (p.live) {
      var host = (function () {
        try { return new URL(p.url).host; } catch (e) { return p.url; }
      })();
      var foot = el("div", "card-foot");
      foot.appendChild(el("span", "card-url", host));
      foot.appendChild(el("span", "card-arrow", "→"));
      card.appendChild(foot);
    }

    return card;
  }

  var frag = document.createDocumentFragment();
  projects.forEach(function (p) { frag.appendChild(buildCard(p)); });
  grid.appendChild(frag);

  // Small live-count line in the hero.
  var count = document.getElementById("live-count");
  if (count) {
    var liveN = projects.filter(function (p) { return p.live; }).length;
    count.textContent = liveN + (liveN === 1 ? " app live" : " apps live") +
      " · " + projects.length + " in the works";
  }
})();
