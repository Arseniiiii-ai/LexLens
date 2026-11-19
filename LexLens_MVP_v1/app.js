/* LexLens v1 app: language switch, input, checking, results and the report.
 * Everything runs in the browser. The contract text is never sent or stored.
 */
(function () {
  "use strict";

  var T = window.LexLensI18n.T;
  var fmt = window.LexLensI18n.fmt;
  var R = window.LexLensRules;
  var S = window.LexLensSamples;

  var MIN_CHARS = 150;
  var MAX_BYTES = 2 * 1024 * 1024;

  var state = { lang: "en", result: null, fileName: null };

  function $(id) {
    return document.getElementById(id);
  }
  function t() {
    return T[state.lang];
  }

  // ---------- language ----------
  function initialLang() {
    var p = new URLSearchParams(location.search).get("lang");
    if (p === "kk" || p === "en") return p;
    var langs = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < langs.length; i++) if (/^kk/i.test(langs[i])) return "kk";
    return "en";
  }

  function applyLang() {
    var d = t();
    document.documentElement.lang = d.htmlLang;
    document.title =
      state.lang === "kk"
        ? "LexLens Бета: шартты Қазақстан заңнамасы бойынша тексеру"
        : "LexLens Beta: contract check against Kazakhstan law";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (el.id === "filename" && state.fileName) return;
      el.textContent = d[el.getAttribute("data-i18n")];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.placeholder = d[el.getAttribute("data-i18n-placeholder")];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", d[el.getAttribute("data-i18n-aria")]);
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === state.lang));
    });
    if (state.fileName) $("filename").textContent = fmt(d.fileLoaded, { name: state.fileName });
    updateCount();
    renderCoverage();
    if (state.result) renderResults(state.result);
    if (!$("error").hidden && $("error").dataset.key) showError($("error").dataset.key);
  }

  function setLang(lang) {
    state.lang = lang;
    var url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url.toString());
    applyLang();
  }

  // ---------- helpers ----------
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = text;
    return e;
  }

  function citation(norm, d) {
    var s = d.acts[norm.act] + ", " + fmt(d.article, { a: norm.article });
    if (norm.para) s += ", " + fmt(d.paragraph, { p: norm.para });
    return s;
  }

  function quoteFor(norm, contractLang) {
    var useKk = contractLang === "kk" && norm.kk;
    return { lang: useKk ? "kk" : "ru", text: useKk ? norm.kk : norm.ru, pendingKk: contractLang === "kk" && !norm.kk };
  }

  function explanation(flag, d) {
    var r = d.rules[flag.rule];
    return fmt(flag.variant ? r[flag.variant] : r.why, flag.vars);
  }

  function updateCount() {
    var n = $("contract").value.length;
    $("charcount").textContent = fmt(t().chars, { n: n.toLocaleString(state.lang === "kk" ? "kk-KZ" : "en-US") });
  }

  function showError(key) {
    var box = $("error");
    box.dataset.key = key;
    box.textContent = t()[key];
    box.hidden = false;
  }
  function clearError() {
    var box = $("error");
    box.hidden = true;
    box.textContent = "";
    delete box.dataset.key;
  }

  // ---------- file input ----------
  function decodeText(buf) {
    var utf8 = new TextDecoder("utf-8").decode(buf);
    var bad = (utf8.match(/�/g) || []).length;
    if (bad > 3) {
      try {
        return new TextDecoder("windows-1251").decode(buf);
      } catch (e) {
        return utf8;
      }
    }
    return utf8.replace(/^﻿/, "");
  }

  function onFile(ev) {
    var file = ev.target.files && ev.target.files[0];
    if (!file) return;
    clearError();
    var name = file.name || "";
    var ext = (name.match(/\.[^.]+$/) || [""])[0].toLowerCase();
    var fail = function (key) {
      showError(key);
      ev.target.value = "";
    };
    if (ext !== ".txt" && ext !== ".docx") return fail("errType");
    if (file.size === 0) return fail("errEmptyFile");
    if (file.size > MAX_BYTES) return fail("errSize");
    file
      .arrayBuffer()
      .then(function (buf) {
        return ext === ".txt" ? decodeText(buf) : window.LexLensDocx.readDocx(buf);
      })
      .then(function (text) {
        if (!text || !text.trim()) return fail("errEmptyFile");
        $("contract").value = text.trim();
        state.fileName = name;
        $("filename").textContent = fmt(t().fileLoaded, { name: name });
        updateCount();
      })
      .catch(function () {
        fail("errRead");
      });
  }

  // ---------- checking ----------
  function runCheck() {
    clearError();
    var text = $("contract").value.trim();
    if (!text) {
      showError("errEmpty");
      $("contract").focus();
      return;
    }
    if (text.length < MIN_CHARS) {
      showError("errShort");
      $("contract").focus();
      return;
    }
    var btn = $("checkBtn");
    btn.disabled = true;
    btn.textContent = t().checking;
    // A short pause lets the button state paint before the check runs.
    setTimeout(function () {
      state.result = R.check(text);
      renderResults(state.result);
      btn.disabled = false;
      btn.textContent = t().check;
      $("results").hidden = false;
      $("step2").focus();
      $("results").scrollIntoView({ block: "start" });
    }, 60);
  }

  function highlighted(clause, match) {
    var frag = document.createDocumentFragment();
    var m = (match || "").trim();
    var i = m ? clause.indexOf(m) : -1;
    if (i < 0) {
      frag.appendChild(document.createTextNode(clause));
      return frag;
    }
    frag.appendChild(document.createTextNode(clause.slice(0, i)));
    frag.appendChild(el("mark", null, m));
    frag.appendChild(document.createTextNode(clause.slice(i + m.length)));
    return frag;
  }

  function renderResults(res) {
    var d = t();
    var high = res.flags.filter(function (f) {
      return f.severity === "high";
    }).length;
    var med = res.flags.length - high;
    $("resMeta").textContent =
      fmt(d.contractLang, { lang: d.langNames[res.language] }) + " · " + fmt(d.clausesChecked, { n: res.clauses });
    $("resSummary").textContent = res.flags.length
      ? fmt(res.flags.length === 1 ? d.summaryOne : d.summary, { n: res.flags.length, h: high, m: med })
      : d.noneTitle;
    var warn = $("warn");
    warn.hidden = res.language !== "other";
    warn.textContent = res.language === "other" ? d.warnLatin : "";

    var list = $("flags");
    list.textContent = "";
    $("none").hidden = res.flags.length > 0;
    res.flags.forEach(function (f) {
      var norm = R.NORMS[f.norm];
      var q = quoteFor(norm, res.language);
      var li = el("li", "flag " + f.severity);
      var head = el("div", "flag-head");
      head.appendChild(el("span", "sev " + f.severity, d.sev[f.severity]));
      head.appendChild(el("h3", "flag-title", d.rules[f.rule].title));
      li.appendChild(head);

      li.appendChild(el("p", "label", d.clause));
      var cl = el("p", "clause");
      cl.appendChild(highlighted(f.clause, f.match));
      li.appendChild(cl);

      li.appendChild(el("p", "label", d.why));
      li.appendChild(el("p", "why", explanation(f, d)));

      li.appendChild(el("p", "label", d.basis));
      li.appendChild(el("p", "basis", citation(norm, d)));
      var bq = el("blockquote", "quote");
      bq.setAttribute("lang", q.lang === "kk" ? "kk" : "ru");
      bq.appendChild(el("span", "quote-lang", fmt(d.official, { lang: d.officialLang[q.lang] })));
      bq.appendChild(document.createTextNode("«" + q.text + "»"));
      li.appendChild(bq);
      if (q.pendingKk) li.appendChild(el("p", "muted small", d.kkPending));

      var a = el("a", "adilet", d.openAdilet + " ↗");
      a.href = norm.url[q.pendingKk ? "kk" : q.lang];
      a.target = "_blank";
      a.rel = "noopener";
      a.appendChild(el("span", "visually-hidden", " " + d.opensNew));
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function renderCoverage() {
    var d = t();
    var ul = $("coverageList");
    ul.textContent = "";
    R.RULES.forEach(function (r) {
      var li = el("li", null, d.rules[r.id].title);
      li.appendChild(el("span", "cite", citation(R.NORMS[r.norm], d)));
      ul.appendChild(li);
    });
  }

  // ---------- report ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function buildReport(res) {
    var d = t();
    var high = res.flags.filter(function (f) {
      return f.severity === "high";
    }).length;
    var when = new Date().toLocaleString(state.lang === "kk" ? "kk-KZ" : "en-GB");
    var items = res.flags
      .map(function (f) {
        var norm = R.NORMS[f.norm];
        var q = quoteFor(norm, res.language);
        var m = (f.match || "").trim();
        var i = m ? f.clause.indexOf(m) : -1;
        var clause =
          i < 0
            ? esc(f.clause)
            : esc(f.clause.slice(0, i)) + "<mark>" + esc(m) + "</mark>" + esc(f.clause.slice(i + m.length));
        return (
          '<li class="' +
          f.severity +
          '"><p class="sev">' +
          esc(d.sev[f.severity]) +
          "</p>" +
          "<h3>" +
          esc(d.rules[f.rule].title) +
          "</h3>" +
          '<p class="lbl">' +
          esc(d.clause) +
          '</p><p class="clause">' +
          clause +
          "</p>" +
          '<p class="lbl">' +
          esc(d.why) +
          "</p><p>" +
          esc(explanation(f, d)) +
          "</p>" +
          '<p class="lbl">' +
          esc(d.basis) +
          "</p><p><b>" +
          esc(citation(norm, d)) +
          "</b></p>" +
          "<blockquote><small>" +
          esc(fmt(d.official, { lang: d.officialLang[q.lang] })) +
          "</small><br>«" +
          esc(q.text) +
          "»</blockquote>" +
          '<p><a href="' +
          esc(norm.url[q.pendingKk ? "kk" : q.lang]) +
          '">' +
          esc(d.openAdilet) +
          "</a></p></li>"
        );
      })
      .join("");
    var summary = res.flags.length
      ? fmt(res.flags.length === 1 ? d.summaryOne : d.summary, {
          n: res.flags.length,
          h: high,
          m: res.flags.length - high,
        })
      : d.noneTitle + ". " + d.noneBody;
    return (
      '<!doctype html><html lang="' +
      d.htmlLang +
      '"><head><meta charset="utf-8"><title>' +
      esc(d.reportTitle) +
      "</title>" +
      "<style>body{font:15px/1.55 Arial,sans-serif;color:#34261C;max-width:820px;margin:32px auto;padding:0 20px}" +
      "h1{font:28px Georgia,serif}h3{margin:4px 0 8px}ol{padding-left:20px}li{margin:0 0 22px;padding:14px;border:1px solid #D9C6B4;border-radius:10px;list-style-position:inside}" +
      ".sev{font-weight:700;text-transform:uppercase;font-size:12px;margin:0}li.high .sev{color:#A4361F}li.medium .sev{color:#8A5A00}" +
      ".lbl{font-size:12px;font-weight:700;text-transform:uppercase;color:#6E5947;margin:10px 0 2px}.clause{background:#EFE4D5;padding:8px;border-radius:6px}" +
      "mark{background:#F3C9A6}blockquote{margin:6px 0;padding:8px 12px;background:#F8F2EA;font-style:italic;font-family:Georgia,serif}" +
      ".meta{color:#6E5947}.disc{margin-top:28px;color:#6E5947;font-family:Georgia,serif}</style></head><body>" +
      "<h1>" +
      esc(d.reportTitle) +
      "</h1>" +
      '<p class="meta">' +
      esc(d.reportGenerated) +
      ": " +
      esc(when) +
      " · " +
      esc(fmt(d.contractLang, { lang: d.langNames[res.language] })) +
      " · " +
      esc(fmt(d.clausesChecked, { n: res.clauses })) +
      "</p>" +
      "<p><b>" +
      esc(summary) +
      "</b></p><ol>" +
      items +
      "</ol>" +
      '<p class="disc">' +
      esc(d.disclaimer) +
      '</p><p class="meta">' +
      esc(d.footer) +
      "</p></body></html>"
    );
  }

  function downloadReport() {
    if (!state.result) return;
    var blob = new Blob([buildReport(state.result)], { type: "text/html;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "LexLens_report_" + new Date().toISOString().slice(0, 10) + ".html";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 2000);
  }

  // ---------- wiring ----------
  function clearAll() {
    $("contract").value = "";
    $("file").value = "";
    state.fileName = null;
    state.result = null;
    $("filename").textContent = t().fileNone;
    $("results").hidden = true;
    clearError();
    updateCount();
    $("contract").focus();
  }

  document.addEventListener("DOMContentLoaded", function () {
    state.lang = initialLang();
    applyLang();
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () {
        setLang(b.getAttribute("data-lang"));
      });
    });
    $("contract").addEventListener("input", function () {
      updateCount();
      if (!$("error").hidden) clearError();
    });
    $("file").addEventListener("change", onFile);
    $("checkBtn").addEventListener("click", runCheck);
    $("clearBtn").addEventListener("click", clearAll);
    $("downloadBtn").addEventListener("click", downloadReport);
    document.querySelectorAll("[data-sample]").forEach(function (b) {
      b.addEventListener("click", function () {
        $("contract").value = S[b.getAttribute("data-sample")];
        state.fileName = null;
        $("filename").textContent = t().fileNone;
        clearError();
        updateCount();
        $("checkBtn").focus();
      });
    });
  });
})();
