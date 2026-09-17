/* ═══════════════════════════════════════════════════════════════════════
   OpenOwls — Join form controller (people/join.html)
   ───────────────────────────────────────────────────────────────────────
   100% client-side, no backend. It validates the form, then GENERATES:
     1. a standalone profile page (people/<slug>.html), matching the
        john-doe.html template, and
     2. the one-line entry for assets/js/people.js,
   and hands the student a pre-filled GitHub "create new file" link so they
   can open a pull request entirely in the browser. A maintainer reviews and
   merges — that merge is the moderation step. Nothing is published from here.

   Photo: derived from the student's GitHub avatar (github.com/<user>.png),
   so there is no file upload and the site stays fully static.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── repo config (where the pull request is opened) ── */
  var REPO_OWNER = "OpenOwls-at-Temple";
  var REPO_NAME = "openowls.ai";
  var REPO_BRANCH = "main";
  var LIVE_ORIGIN = "https://openowls.ai";

  var form = document.getElementById("join-form");
  if (!form) return;

  var result = document.getElementById("join-result");
  var errorBanner = document.getElementById("form-error-banner");
  var photoPreview = document.getElementById("photo-preview");
  var githubInput = document.getElementById("github-input");
  var lastHtml = "";       // most recently generated profile page (for download)
  var lastFileName = "";   // e.g. "people/alex-pang.html"

  /* ── validation patterns (mirror the original server-side checks) ── */
  var LINKEDIN_RE = /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/.+/i;
  var GITHUB_RE = /^https:\/\/github\.com\/[A-Za-z0-9-]+\/?$/i;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ── small helpers ── */
  function byName(name) { return form.elements[name]; }
  function val(name) {
    var f = byName(name);
    return f ? String(f.value || "").trim() : "";
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function slugify(name) {
    return String(name).toLowerCase()
      .normalize ? String(name).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60)
      : String(name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  }
  function githubUser(url) {
    var m = String(url).match(/github\.com\/([A-Za-z0-9-]+)/i);
    return m ? m[1] : "";
  }
  function initials(name) {
    var parts = String(name).trim().split(/\s+/);
    var s = (parts[0] || "").charAt(0) + (parts.length > 1 ? parts[parts.length - 1].charAt(0) : "");
    return s.toUpperCase() || "?";
  }
  function lines(text) {
    return String(text).split(/\r?\n/)
      .map(function (l) { return l.trim(); })
      .filter(function (l) { return l.length; });
  }
  // blank-line-separated blocks → paragraphs (single newlines collapse to spaces)
  function paras(text) {
    return String(text).split(/\n\s*\n/)
      .map(function (b) { return b.replace(/\s*\n\s*/g, " ").trim(); })
      .filter(function (b) { return b.length; });
  }

  /* ── live GitHub-avatar preview ── */
  function updatePhoto() {
    var user = githubUser(githubInput.value);
    var name = val("name");
    if (user) {
      photoPreview.innerHTML = "";
      var img = document.createElement("img");
      img.src = "https://github.com/" + encodeURIComponent(user) + ".png?size=200";
      img.alt = name || user;
      img.onerror = function () { photoPreview.textContent = name ? initials(name) : "?"; };
      photoPreview.appendChild(img);
    } else {
      photoPreview.textContent = name ? initials(name) : "?";
    }
  }
  githubInput.addEventListener("input", updatePhoto);
  var nameInput = document.getElementById("name-input");
  if (nameInput) nameInput.addEventListener("input", updatePhoto);

  /* ── project picker (from assets/js/projects.js) ── */
  (function buildProjectPicker() {
    var picker = document.getElementById("project-picker");
    var projects = window.OPENOWLS_PROJECTS || [];
    if (!picker || !projects.length) {
      if (picker) picker.innerHTML = "<span class='hint'>No projects listed yet.</span>";
      return;
    }
    projects.forEach(function (p, i) {
      var label = document.createElement("label");
      label.className = "proj-toggle";
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = p.name;
      cb.setAttribute("data-index", String(i));
      var span = document.createElement("span");
      span.textContent = (p.icon ? p.icon + " " : "") + p.name;
      label.appendChild(cb);
      label.appendChild(span);
      picker.appendChild(label);
    });
  })();

  function selectedProjects() {
    var out = [];
    var boxes = form.querySelectorAll(".project-picker input:checked");
    var projects = window.OPENOWLS_PROJECTS || [];
    for (var i = 0; i < boxes.length; i++) {
      var idx = parseInt(boxes[i].getAttribute("data-index"), 10);
      if (projects[idx]) out.push(projects[idx]);
    }
    return out;
  }

  /* ── validation ── */
  function setFieldError(name, on) {
    var f = byName(name);
    if (!f) return;
    var group = f.closest(".field-group") || f.parentNode;
    if (group) group.classList.toggle("has-error", !!on);
  }
  function validate() {
    var errors = [];
    ["name", "linkedin_url", "github_url", "email", "quote", "bio", "strengths",
     "ai_usage", "ai_pull", "hard_problem", "whats_next"]
      .forEach(function (n) { setFieldError(n, false); });

    if (val("name").length < 2) { setFieldError("name", true); errors.push("name"); }
    if (!LINKEDIN_RE.test(val("linkedin_url"))) { setFieldError("linkedin_url", true); errors.push("linkedin_url"); }
    if (!GITHUB_RE.test(val("github_url"))) { setFieldError("github_url", true); errors.push("github_url"); }
    if (val("email") && !EMAIL_RE.test(val("email"))) { setFieldError("email", true); errors.push("email"); }
    if (val("quote").length > 400) { setFieldError("quote", true); errors.push("quote"); }
    if (val("bio").length > 2000) { setFieldError("bio", true); errors.push("bio"); }
    if (val("strengths").length > 1500) { setFieldError("strengths", true); errors.push("strengths"); }
    if (val("ai_usage").length > 2000) { setFieldError("ai_usage", true); errors.push("ai_usage"); }
    if (val("ai_pull").length > 400) { setFieldError("ai_pull", true); errors.push("ai_pull"); }
    if (val("hard_problem").length > 2000) { setFieldError("hard_problem", true); errors.push("hard_problem"); }
    if (val("whats_next").length > 2000) { setFieldError("whats_next", true); errors.push("whats_next"); }
    return errors;
  }

  /* ── generate the standalone profile page ── */
  function buildProfileHtml(d) {
    var out = [];
    function p(s) { out.push(s); }

    var avatar = d.githubUser
      ? "https://github.com/" + d.githubUser + ".png?size=400"
      : "";
    var portrait = avatar
      ? '<div class="portrait"><img src="' + esc(avatar) + '" alt="' + esc(d.name) + '" /></div>'
      : '<div class="portrait">' + esc(initials(d.name)) + "</div>";

    var metaDesc = d.name + ", OpenOwls at Temple University"
      + (d.role ? " — " + d.role + "." : ".");

    p('<!DOCTYPE html>');
    p('<html lang="en">');
    p('<head>');
    p('  <meta charset="UTF-8" />');
    p('  <meta name="viewport" content="width=device-width, initial-scale=1.0" />');
    p('  <title>' + esc(d.name) + ' — OpenOwls Member</title>');
    p('  <meta name="description" content="' + esc(metaDesc) + '" />');
    p('');
    p('  <meta property="og:title" content="' + esc(d.name) + ' — OpenOwls at Temple" />');
    p('  <meta property="og:description" content="' + esc(metaDesc) + '" />');
    p('  <meta property="og:type" content="profile" />');
    p('  <meta property="og:url" content="' + esc(LIVE_ORIGIN + "/people/" + d.slug + ".html") + '" />');
    p('');
    p('  <link rel="icon" href="../favicon.svg" type="image/svg+xml" />');
    p('  <link rel="stylesheet" href="../assets/css/main.css" />');
    p('  <link rel="stylesheet" href="../assets/css/profile.css" />');
    p('</head>');
    p('<body>');
    p('  <div class="bg"></div>');
    p('');
    p('  <header class="topnav">');
    p('    <div class="wrap">');
    p('      <a class="logo" href="../index.html" style="color:var(--white)">');
    p('        <span class="owl-icon">🦉</span><span>OpenOwls</span>');
    p('      </a>');
    p('      <nav>');
    p('        <a href="../index.html">Home</a>');
    p('        <a href="../projects/">Projects</a>');
    p('        <a href="../people/" aria-current="page">People</a>');
    p('      </nav>');
    p('    </div>');
    p('  </header>');
    p('');
    p('  <main class="page">');
    p('    <div class="wrap">');
    p('      <article class="article">');
    p('');
    p('        <p class="breadcrumb">');
    p('          <a href="../index.html">Home</a><span>›</span>');
    p('          <a href="../people/">People</a><span>›</span>');
    p('          ' + esc(d.name));
    p('        </p>');
    p('');
    p('        <section class="member-hero">');
    p('          ' + portrait);
    p('          <div>');
    p('            <span class="kicker">OpenOwls Member</span>');
    p('            <h1>' + esc(d.name) + '</h1>');
    if (d.role) p('            <p class="role-line">' + esc(d.role) + '</p>');

    var chips = [];
    if (d.year) chips.push('<span class="chip"><span class="k">Year:</span> ' + esc(d.year) + '</span>');
    if (d.major) chips.push('<span class="chip"><span class="k">Major:</span> ' + esc(d.major) + '</span>');
    if (d.joined) chips.push('<span class="chip"><span class="k">Joined:</span> ' + esc(d.joined) + '</span>');
    if (d.lookingFor) chips.push('<span class="chip"><span class="k">Looking for:</span> ' + esc(d.lookingFor) + '</span>');
    if (chips.length) {
      p('');
      p('            <div class="meta-chips">');
      chips.forEach(function (c) { p('              ' + c); });
      p('            </div>');
    }
    if (d.quote) {
      p('');
      p('            <p class="intro-quote">');
      p('              ' + esc(d.quote));
      p('            </p>');
    }
    p('          </div>');
    p('        </section>');
    p('');

    /* link row */
    p('        <div class="linkrow">');
    p('          <a href="' + esc(d.githubUrl) + '" rel="noopener">🔗 GitHub</a>');
    p('          <a href="' + esc(d.linkedinUrl) + '" rel="noopener">💼 LinkedIn</a>');
    if (d.email) p('          <a href="mailto:' + esc(d.email) + '">✉️ Email</a>');
    p('        </div>');
    p('');
    p('        <hr class="rule" />');

    /* who I am */
    if (d.bio) {
      p('');
      p('        <section class="section">');
      p('          <span class="kicker">Who I am</span>');
      p('          <h2>A little about me</h2>');
      paras(d.bio).forEach(function (para) { p('          <p>' + esc(para) + '</p>'); });
      p('        </section>');
    }

    /* strengths */
    if (d.strengths.length) {
      p('');
      p('        <section class="section">');
      p('          <span class="kicker">What I bring</span>');
      p('          <h2>My strengths</h2>');
      p('          <ul>');
      d.strengths.forEach(function (s) {
        var m = s.match(/^([^:]{1,60}):\s*(.+)$/);
        if (m) p('            <li><strong>' + esc(m[1]) + ':</strong> ' + esc(m[2]) + '</li>');
        else p('            <li>' + esc(s) + '</li>');
      });
      p('          </ul>');
      p('        </section>');
    }

    /* how I use AI */
    if (d.aiUsage || d.aiPull) {
      p('');
      p('        <section class="section">');
      p('          <span class="kicker">How I work</span>');
      p('          <h2>How I use AI</h2>');
      paras(d.aiUsage).forEach(function (para) { p('          <p>' + esc(para) + '</p>'); });
      if (d.aiPull) {
        p('          <blockquote class="pull">');
        p('            ' + esc(d.aiPull));
        p('          </blockquote>');
      }
      p('        </section>');
    }

    /* projects */
    if (d.projects.length) {
      p('');
      p('        <hr class="rule" />');
      p('');
      p('        <section class="section">');
      p('          <span class="kicker">On the board</span>');
      p('          <h2>Projects I\'m involved with</h2>');
      p('          <div class="xlink-grid">');
      d.projects.forEach(function (proj) {
        var href = proj.page ? "../projects/" + proj.page : "../projects/";
        p('            <a class="xlink" href="' + esc(href) + '">');
        p('              <span class="xi">' + esc(proj.icon || "🦉") + '</span>');
        p('              <span class="xt"><span class="xn">' + esc(proj.name) + '</span>'
          + '<span class="xr">' + esc(d.role || "Contributor") + '</span></span>');
        p('            </a>');
      });
      p('          </div>');
      p('        </section>');
    }

    /* a hard problem */
    if (d.hardProblem) {
      p('');
      p('        <section class="section">');
      p('          <span class="kicker">Proud of</span>');
      p('          <h2>A hard problem I cracked</h2>');
      paras(d.hardProblem).forEach(function (para) { p('          <p>' + esc(para) + '</p>'); });
      p('        </section>');
    }

    /* what's next */
    if (d.whatsNext) {
      p('');
      p('        <section class="section">');
      p('          <span class="kicker">What\'s next</span>');
      p('          <h2>Where I\'m headed</h2>');
      paras(d.whatsNext).forEach(function (para) { p('          <p>' + esc(para) + '</p>'); });
      p('        </section>');
    }

    p('');
    p('      </article>');
    p('    </div>');
    p('  </main>');
    p('');
    p('  <footer>');
    p('    <div class="wrap">');
    p('      <div class="foot-links">');
    p('        <a href="../index.html">All apps</a>');
    p('        <a href="../projects/">Projects</a>');
    p('        <a href="../people/">People</a>');
    p('        <a href="https://github.com/OpenOwls-at-Temple">GitHub</a>');
    p('      </div>');
    p('      <div>© <span id="year">2026</span> OpenOwls at Temple University</div>');
    p('    </div>');
    p('  </footer>');
    p('');
    p('  <script>');
    p('    (function () { var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear(); })();');
    p('  <\/script>');
    p('</body>');
    p('</html>');
    p('');
    return out.join("\n");
  }

  /* ── generate the people.js registry line ── */
  function buildRegistryLine(d) {
    var out = [];
    out.push("  {");
    out.push('    name: "' + d.name.replace(/"/g, '\\"') + '",');
    out.push('    slug: "' + d.slug + '",');
    if (d.role) out.push('    role: "' + d.role.replace(/"/g, '\\"') + '",');
    out.push("  },");
    return out.join("\n");
  }

  /* ── branch name + terminal commands ── */
  function sanitizeBranch(name) {
    var b = String(name).trim().toLowerCase()
      .replace(/[^a-z0-9._/-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^[-/.]+|[-/.]+$/g, "");
    return b || "add-member";
  }
  function buildGitCommands(d, branch, fileName) {
    var msg = "Add " + d.name.replace(/"/g, "'") + " to the People page";
    return [
      "git switch -c " + branch,
      "git add " + fileName + " assets/js/people.js",
      'git commit -m "' + msg + '"',
      "git push -u origin " + branch
    ].join("\n");
  }

  /* ── insert the registry entry into people.js source text ── */
  function insertIntoPeopleJs(text, entryBlock, slug) {
    if (new RegExp("slug:\\s*[\"']" + slug + "[\"']").test(text)) {
      return { text: text, existed: true };
    }
    var re = /(window\.OPENOWLS_PEOPLE\s*=\s*\[)/;
    if (!re.test(text)) return { text: text, error: true };
    return { text: text.replace(re, "$1\n" + entryBlock), existed: false };
  }

  /* ── write both files straight into the local clone (File System Access API) ──
     Chromium only; needs one folder-permission prompt. Falls back to a download
     on other browsers. Kept promise-based (no async/await) to match the repo. */
  function writeLocally(d, html, entryBlock) {
    var statusEl = document.getElementById("write-status");
    setStatus(statusEl, "Choose your local repo folder in the prompt to write the files…", "");
    window.showDirectoryPicker({ mode: "readwrite" }).then(function (root) {
      var peopleDir, jsHandle;
      return root.getDirectoryHandle("people").then(function (pd) {
        peopleDir = pd;
        return root.getDirectoryHandle("assets");
      }).then(function (assets) {
        return assets.getDirectoryHandle("js");
      }).then(function (js) {
        return js.getFileHandle("people.js");
      }).then(function (jh) {
        jsHandle = jh;
        return peopleDir.getFileHandle(d.slug + ".html", { create: true });
      }).then(function (fh) {
        return fh.createWritable();
      }).then(function (w) {
        return w.write(html).then(function () { return w.close(); });
      }).then(function () {
        return jsHandle.getFile();
      }).then(function (file) {
        return file.text();
      }).then(function (txt) {
        var res = insertIntoPeopleJs(txt, entryBlock, d.slug);
        if (res.error || res.existed) return res;
        return jsHandle.createWritable().then(function (w2) {
          return w2.write(res.text).then(function () { return w2.close(); });
        }).then(function () { return res; });
      }).then(function (res) {
        var extra = res.existed
          ? " (you were already listed in people.js)"
          : (res.error
              ? " — but couldn't update people.js automatically; add the line below by hand"
              : " and updated assets/js/people.js");
        setStatus(statusEl, "✓ Wrote people/" + d.slug + ".html" + extra
          + ". Now run the commands below.", "write-ok");
        if (res.error) showManual(); else hideManual();
      });
    })["catch"](function (err) {
      if (err && err.name === "AbortError") {
        setStatus(statusEl, "No folder chosen. Pick one again by re-submitting, "
          + "or add the files by hand below.", "");
      } else {
        setStatus(statusEl, "That folder didn't look like the openowls.ai repo, or "
          + "couldn't be written. Add the files by hand below.", "form-banner--error");
      }
      showManual();
    });
  }
  function noFsAvailable() {
    setStatus(document.getElementById("write-status"),
      "Your browser can't write files directly (use Chrome or Edge for that). "
      + "Add the files by hand below, then run the commands.", "");
    showManual();
  }
  function setStatus(el, text, cls) {
    if (!el) return;
    el.className = "form-banner is-shown" + (cls ? " " + cls : "");
    el.textContent = text;
  }
  function showManual() { var m = document.getElementById("manual-fallback"); if (m) m.hidden = false; }
  function hideManual() { var m = document.getElementById("manual-fallback"); if (m) m.hidden = true; }

  function downloadFile(fileName, text) {
    var blob = new Blob([text], { type: "text/html;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName.replace(/^.*\//, "");
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
  }

  /* ── copy-to-clipboard buttons ── */
  function wireCopy(btnId) {
    var btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener("click", function () {
      var target = document.getElementById(btn.getAttribute("data-copy-target"));
      if (!target) return;
      var text = target.textContent;
      var done = function () {
        var original = btn.textContent;
        btn.classList.add("is-copied");
        btn.textContent = "Copied ✓";
        setTimeout(function () { btn.classList.remove("is-copied"); btn.textContent = original; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(target); done(); });
      } else {
        fallbackCopy(target); done();
      }
    });
  }
  function fallbackCopy(target) {
    try {
      var range = document.createRange();
      range.selectNodeContents(target);
      var sel = window.getSelection();
      sel.removeAllRanges(); sel.addRange(range);
      document.execCommand("copy");
      sel.removeAllRanges();
    } catch (e) { /* no-op */ }
  }
  wireCopy("copy-registry-btn");
  wireCopy("copy-git-btn");

  /* download button (manual fallback) */
  var dlBtn = document.getElementById("download-html-btn");
  if (dlBtn) {
    dlBtn.addEventListener("click", function () {
      if (lastFileName && lastHtml) downloadFile(lastFileName, lastHtml);
    });
  }

  /* ── submit → generate everything ── */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorBanner.classList.remove("is-shown");

    var errors = validate();
    if (errors.length) {
      errorBanner.textContent = "Please fix the highlighted field" + (errors.length > 1 ? "s" : "") + " above.";
      errorBanner.classList.add("is-shown");
      var firstBad = form.querySelector(".has-error input, .has-error textarea");
      if (firstBad) firstBad.focus();
      return;
    }

    var d = {
      name: val("name"),
      role: val("role"),
      year: val("year"),
      major: val("major"),
      joined: val("joined"),
      lookingFor: val("looking_for"),
      quote: val("quote"),
      bio: val("bio"),
      strengths: lines(val("strengths")),
      aiUsage: val("ai_usage"),
      aiPull: val("ai_pull"),
      projects: selectedProjects(),
      hardProblem: val("hard_problem"),
      whatsNext: val("whats_next"),
      linkedinUrl: val("linkedin_url"),
      githubUrl: val("github_url"),
      email: val("email")
    };
    d.githubUser = githubUser(d.githubUrl);
    d.slug = slugify(d.name);

    var fileName = "people/" + d.slug + ".html";
    var html = buildProfileHtml(d);
    var entryBlock = buildRegistryLine(d);
    var branch = sanitizeBranch(val("branch") || ("add-" + d.slug));

    lastHtml = html;
    lastFileName = fileName;

    /* fill the shared result bits */
    document.getElementById("registry-output").textContent = entryBlock;
    document.getElementById("git-output").textContent = buildGitCommands(d, branch, fileName);
    document.getElementById("file-name").textContent = fileName;
    document.getElementById("dl-name").textContent = d.slug + ".html";
    document.getElementById("live-url").textContent = LIVE_ORIGIN + "/" + fileName;
    document.getElementById("pr-link").href =
      "https://github.com/" + REPO_OWNER + "/" + REPO_NAME
      + "/compare/" + REPO_BRANCH + "..." + encodeURIComponent(branch) + "?expand=1";

    hideManual();
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "start" });

    /* write the files straight into the local clone if the browser supports it */
    if (window.showDirectoryPicker) {
      writeLocally(d, html, entryBlock);
    } else {
      noFsAvailable();
    }
  });

  /* ── start over ── */
  var restart = document.getElementById("restart-btn");
  if (restart) {
    restart.addEventListener("click", function () {
      form.reset();
      result.hidden = true;
      updatePhoto();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  updatePhoto();
})();
