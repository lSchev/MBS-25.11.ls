(function () {
  var cfg = window.SITE_CONFIG || {};

  // Aplica os links do config.js nos botões
  document.querySelectorAll("[data-link]").forEach(function (a) {
    var url = cfg[a.getAttribute("data-link")];
    if (url) a.setAttribute("href", url);
  });

  // Menu mobile
  var btn = document.querySelector(".menu-toggle");
  var menu = document.getElementById("menu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
      btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) { menu.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }
    });
  }

  // Tema claro/escuro (o tema inicial ja foi definido por um script no <head>)
  var root = document.documentElement;
  var themeBtn = document.querySelector(".theme-toggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var COLORS = { light: "#E6007E", dark: "#E6007E" };
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    if (themeMeta) themeMeta.setAttribute("content", COLORS[t]);
    if (themeBtn) themeBtn.setAttribute("aria-label", t === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro");
  }
  function saved() { try { var v = localStorage.getItem("maria-bocuda-theme"); return v === "light" || v === "dark" ? v : null; } catch (e) { return null; } }
  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("maria-bocuda-theme", next); } catch (e) {}
    });
  }
  // Se a pessoa nunca escolheu, acompanha o tema do celular
  if (window.matchMedia) {
    var mq = matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (e) { if (!saved()) applyTheme(e.matches ? "dark" : "light"); };
    if (mq.addEventListener) mq.addEventListener("change", onChange); else if (mq.addListener) mq.addListener(onChange);
  }

  // Ano do rodapé
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
