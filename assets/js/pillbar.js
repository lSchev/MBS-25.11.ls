/* Barra de procedimentos: banner de pílulas que passa sozinho em loop infinito.
   - Passa sozinho, devagar, sem fim (translateX, sem scroll nativo).
   - Arrasta com o dedo (toque) e com o mouse, para os 2 lados.
   - Ao tocar, arrastar ou clicar numa pílula: para 3 segundos e volta a passar sozinho.
   Sem JavaScript, a barra vira uma lista rolável normal (overflow-x). */
(function () {
  if (window.__mbPillbar) return; window.__mbPillbar = true;
  var bar = document.querySelector(".pillbar");
  var track = bar && bar.querySelector(".pillbar-track");
  var set = track && track.querySelector(".pill-set");
  if (!set) return;

  var SPEED = 32;        // px por segundo
  var PAUSE_MS = 3000;   // pausa depois de mexer
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  var W = 0;             // largura de 1 conjunto de pílulas
  var x = 0;             // deslocamento atual (0..W)
  var last = 0;
  var holding = false;   // dedo/mouse pressionado
  var resumeAt = 0;      // instante em que volta a passar sozinho
  var drag = null;       // { id, sx, sy, x0, moved }
  var suppressClick = false;

  function now() { return performance.now(); }
  function mod(v) { return ((v % W) + W) % W; }
  function paint() { track.style.transform = "translate3d(" + (-x) + "px,0,0)"; }
  function pause() { resumeAt = now() + PAUSE_MS; }

  function build() {
    track.querySelectorAll(".pill-set.clone").forEach(function (c) { c.remove(); });
    var ratio = W ? x / W : 0;
    W = set.getBoundingClientRect().width;
    if (!W) return;
    var copies = Math.ceil(bar.clientWidth / W) + 1;
    for (var i = 0; i < copies; i++) {
      var c = set.cloneNode(true);
      c.classList.add("clone");
      c.setAttribute("aria-hidden", "true");
      c.querySelectorAll("a").forEach(function (a) { a.setAttribute("tabindex", "-1"); });
      track.appendChild(c);
    }
    bar.classList.add("is-js");
    x = mod(ratio * W);
    paint();
  }

  // ---- toque e mouse (Pointer Events) ----
  bar.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag = { id: e.pointerId, sx: e.clientX, sy: e.clientY, x0: x, moved: false };
    holding = true;
  });

  window.addEventListener("pointermove", function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    var dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
    if (!drag.moved) {
      if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy)) return;
      drag.moved = true;
      bar.classList.add("is-dragging");
    }
    x = mod(drag.x0 - dx);
    paint();
  });

  function endDrag(e) {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    if (drag.moved) {
      suppressClick = true;
      setTimeout(function () { suppressClick = false; }, 80);
    }
    drag = null;
    holding = false;
    bar.classList.remove("is-dragging");
    pause();
  }
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);

  // clique numa pílula: pausa 3 s (e não clica se foi arrasto)
  bar.addEventListener("click", function (e) {
    if (suppressClick) { e.preventDefault(); e.stopPropagation(); return; }
    pause();
  }, true);
  bar.addEventListener("dragstart", function (e) { e.preventDefault(); });
  bar.addEventListener("focusin", pause);
  bar.addEventListener("wheel", function (e) {
    var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
    if (d) { x = mod(x + d); paint(); pause(); }
  }, { passive: true });

  // ---- animação ----
  function tick(t) {
    var dt = Math.min((t - last) / 1000, 0.1);
    last = t;
    if (!holding && t >= resumeAt && !reduce && !document.hidden && W) {
      x = mod(x + SPEED * dt);
      paint();
    }
    requestAnimationFrame(tick);
  }

  var timer;
  window.addEventListener("resize", function () { clearTimeout(timer); timer = setTimeout(build, 150); });
  window.addEventListener("load", build);
  build();
  requestAnimationFrame(function (t) { last = t; tick(t); });
})();
