/* Dois botões flutuantes/independentes:
   1) Balão verde do WhatsApp (canto inferior direito): vai direto para o link do WhatsApp
      (assets/js/config.js -> whatsapp).
   2) Chat: qualquer elemento com [data-chat-open] (hero, barra inferior) abre a janela de chat
      estilo Octadesk, com as cores do tema claro/escuro. O envio é FAKE por enquanto.
      Para plugar o Octadesk depois: troque o corpo de sendMessage() abaixo (ou esconda esta janela
      e faça os [data-chat-open] abrirem o widget do Octadesk). */
(function () {
  if (window.__mbChat) return; window.__mbChat = true;
  var cfg = window.SITE_CONFIG || {};
  var script = document.currentScript;
  var logoSrc = (script && script.src ? script.src.replace(/js\/chat\.js.*$/, "") : "assets/") + "img/logo-maria-bocuda.png";

  var WA = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="currentColor"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.23"/></svg>';
  var SEND = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  // ---- balão do WhatsApp (link direto) ----
  var wa = document.createElement("a");
  wa.className = "wa-float";
  wa.setAttribute("data-link", "whatsapp");
  wa.setAttribute("aria-label", "Abrir WhatsApp");
  wa.target = "_blank";
  wa.rel = "noopener";
  wa.href = cfg.whatsapp || "#";
  wa.innerHTML = WA;

  // ---- janela de chat ----
  var win = document.createElement("div");
  win.className = "chat";
  win.id = "chat-window";
  win.hidden = true;
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-label", "Chat Maria Bocuda");
  win.innerHTML =
    '<div class="chat-head">' +
      '<img class="chat-logo" src="' + logoSrc + '" alt="Maria Bocuda" width="99" height="35">' +
      '<div class="chat-status"><span class="chat-dot" aria-hidden="true"></span>Online</div>' +
      '<button type="button" class="chat-close" aria-label="Fechar chat">&times;</button>' +
    '</div>' +
    '<div class="chat-body" aria-live="polite"><div class="msg msg-in">Oi! Aqui é a equipe da Maria Bocuda. Conta pra gente o que você quer mudar que a gente te ajuda por aqui.</div></div>' +
    '<form class="chat-form" autocomplete="off">' +
      '<input class="chat-input" type="text" name="mensagem" placeholder="Digite sua mensagem" aria-label="Mensagem">' +
      '<button class="chat-send" type="submit" aria-label="Enviar">' + SEND + '</button>' +
    '</form>';

  document.body.appendChild(wa);
  document.body.appendChild(win);

  var body = win.querySelector(".chat-body");
  var form = win.querySelector(".chat-form");
  var input = win.querySelector(".chat-input");
  var closeBtn = win.querySelector(".chat-close");
  var opener = null;

  function add(text, cls) {
    var m = document.createElement("div");
    m.className = "msg " + cls;
    m.textContent = text;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
  }

  // FAKE: aqui entra o Octadesk depois
  function sendMessage(text) {
    add(text, "msg-out");
    setTimeout(function () { add("Obrigada pela mensagem! Em instantes alguém da nossa equipe responde por aqui.", "msg-in"); }, 700);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var t = input.value.trim();
    if (!t) return;
    input.value = "";
    sendMessage(t);
  });

  function open(from) {
    opener = from;
    win.hidden = false;
    wa.hidden = true;   // o balão do WhatsApp some enquanto o chat está aberto
    input.focus();
  }
  function close() {
    if (win.hidden) return;
    win.hidden = true;
    wa.hidden = false;  // e volta quando o chat fecha
    if (opener && opener.focus) opener.focus();
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-chat-open]");
    if (t) { e.preventDefault(); win.hidden ? open(t) : close(); }
  });
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();
