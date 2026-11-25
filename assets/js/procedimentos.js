/* Popup "Ver detalhes". Funciona em TODAS as páginas: qualquer elemento com data-proc="slug"
   (botão Ver detalhes, pílulas do carrossel, atalhos de "O que você quer mudar?") abre o popup
   na hora, no mesmo lugar, sem trocar de página. Os textos ficam em DATA abaixo. */
(function () {
  if (window.__mbProcs) return; window.__mbProcs = true;
  var cfg = window.SITE_CONFIG || {};
  var script = document.currentScript;
  var base = script && script.src ? script.src.replace(/js\/procedimentos\.js.*$/, "") : "assets/";

  var DATA = {
  "preenchimento-labial": {
    "title": "Preenchimento Labial",
    "img": "proc-preenchimento-labial.jpg",
    "stats": [
      [
        "Efeito",
        "6 a 12 meses"
      ],
      [
        "Sessão",
        "40 min"
      ]
    ],
    "ex": "Feito com ácido hialurônico, que já existe no seu corpo. Dura em média 40 minutos.",
    "cu": "Depois, evitar beijo, canudo e exercício pesado no mesmo dia.",
    "q": "Dói?",
    "a": "A gente usa anestesia local, a maioria sente só um desconforto leve."
  },
  "botox": {
    "title": "Botox / Toxina Botulínica",
    "img": "proc-botox.jpg",
    "stats": [
      [
        "Efeito",
        "3 a 6 meses"
      ],
      [
        "Sessão",
        "20 min"
      ]
    ],
    "ex": "Aplicação rápida, com agulha bem fininha. Começa a aparecer em 2 a 5 dias e fica completo em 2 a 4 semanas.",
    "cu": "Depois, não deitar e não massagear o local por 4 horas.",
    "q": "Vou ficar sem expressão?",
    "a": "Não, a dose é pensada pra suavizar, não pra travar."
  },
  "preenchimento-facial": {
    "title": "Preenchimento Facial / Malar",
    "img": "proc-preenchimento-facial.jpg",
    "stats": [
      [
        "Efeito",
        "12 a 18 meses"
      ],
      [
        "Sessão",
        "60 min"
      ]
    ],
    "ex": "Feito com ácido hialurônico na região da maçã do rosto. Ajuda quem perdeu volume com o tempo ou quer um contorno mais marcado.",
    "cu": "Depois, evitar apertar o local e exercício pesado no dia.",
    "q": "Fica inchado?",
    "a": "Pode inchar um pouco nos 2 primeiros dias, depois volta ao normal."
  },
  "olheiras": {
    "title": "Preenchimento Olheiras",
    "img": "proc-olheiras.jpg",
    "stats": [
      [
        "Efeito",
        "8 a 12 meses"
      ],
      [
        "Sessão",
        "40 min"
      ]
    ],
    "ex": "Preenche só a depressão embaixo do olho, com ácido hialurônico. Não é pra todo mundo, por isso a avaliação é importante.",
    "cu": "Depois, evitar coçar e não usar maquiagem pesada no dia.",
    "q": "Fica roxo?",
    "a": "Pode ficar um roxinho leve, que some em poucos dias."
  },
  "bigode-chines": {
    "title": "Bigode Chinês",
    "img": "proc-bigode-chines.jpg",
    "stats": [
      [
        "Efeito",
        "12 a 18 meses"
      ],
      [
        "Sessão",
        "40 min"
      ]
    ],
    "ex": "Preenchimento com ácido hialurônico no sulco. Não apaga 100 porcento, mas deixa bem mais suave.",
    "cu": "Depois, evitar massagem e exercício pesado no dia.",
    "q": "Precisa de quantas seringas?",
    "a": "Depende da profundidade, a Gabi avalia na consulta."
  },
  "bioestimulador": {
    "title": "Bioestimulador de Colágeno",
    "img": "proc-bioestimulador.jpg",
    "stats": [
      [
        "Resultado",
        "Progressivo, 60 a 90 dias"
      ],
      [
        "Duração",
        "12 a 24 meses"
      ],
      [
        "Sessão",
        "60 min"
      ]
    ],
    "ex": "Não é preenchimento, é estímulo. O corpo vai produzindo colágeno aos poucos. Por isso o resultado aparece com o tempo.",
    "cu": "Depois, pode ter um inchaço leve.",
    "q": "Quantas sessões?",
    "a": "Geralmente 2 a 3 sessões, com intervalo que a Gabi define."
  }
};

  function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }

  var dlg = document.createElement("dialog");
  dlg.className = "proc-dialog";
  dlg.id = "proc-dialog";
  dlg.setAttribute("aria-labelledby", "proc-dialog-title");
  dlg.innerHTML =
    '<button class="proc-dialog-close" type="button" aria-label="Fechar">&times;</button>' +
    '<div class="proc-dialog-inner">' +
      '<img class="photo photo-proc proc-dialog-img" alt="" width="1600" height="1600">' +
      '<h2 class="proc-dialog-title" id="proc-dialog-title"></h2>' +
      '<dl class="stats proc-dialog-stats"></dl>' +
      '<div class="proc-dialog-body"></div>' +
      '<div class="actions">' +
        '<a class="btn btn-primary" target="_blank" rel="noopener">Agendar</a>' +
        '<button class="btn btn-outline" type="button" data-close>Fechar</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(dlg);

  var img = dlg.querySelector(".proc-dialog-img");
  var title = dlg.querySelector(".proc-dialog-title");
  var stats = dlg.querySelector(".proc-dialog-stats");
  var body = dlg.querySelector(".proc-dialog-body");
  dlg.querySelector(".actions .btn-primary").setAttribute("href", cfg.gendo || "#");
  var opener = null;

  function open(slug, from) {
    var d = DATA[slug];
    if (!d) return false;
    img.src = base + "img/" + d.img;
    img.alt = "Ilustração da área tratada: " + d.title;
    title.textContent = d.title;
    stats.innerHTML = d.stats.map(function (s) { return "<div><dt>" + esc(s[0]) + "</dt><dd>" + esc(s[1]) + "</dd></div>"; }).join("");
    body.innerHTML =
      "<h4>Explicação detalhada</h4><p>" + esc(d.ex) + "</p>" +
      "<h4>Cuidados</h4><p>" + esc(d.cu) + "</p>" +
      "<h4>Principais dúvidas</h4><p><strong>" + esc(d.q) + "</strong> " + esc(d.a) + "</p>";
    opener = from;
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    document.documentElement.classList.add("modal-open");
    dlg.scrollTop = 0;
    return true;
  }
  function close() { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-proc]");
    if (t && open(t.getAttribute("data-proc"), t)) e.preventDefault();
  });
  dlg.querySelector(".proc-dialog-close").addEventListener("click", close);
  dlg.querySelector("[data-close]").addEventListener("click", close);
  dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); }); // clicar fora fecha
  dlg.addEventListener("close", function () {
    document.documentElement.classList.remove("modal-open");
    if (opener && opener.focus) opener.focus();
  });
})();
