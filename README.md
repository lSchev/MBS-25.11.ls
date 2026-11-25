# Site Maria Bocuda (Tatuapé)

HTML + CSS + JS puro. Sem build. Abra qualquer .html no navegador ou publique a pasta como está.

## Páginas
- index.html — Início
- procedimentos/index.html — Lista de procedimentos
- sobre.html — Sobre / História
- como-funciona.html — Agendar, cancelar e remarcar
- contato.html — Fale conosco

## Links (um lugar só)
Edite assets/js/config.js:
- octadesk → botão "Fale conosco" (ícone WhatsApp, abre o chat do Octadesk)
- gendo → botão "Agendar" (abre a Gendo em nova aba, não embutida)

Enquanto estiverem como PLACEHOLDER_*, os botões apontam para o texto do placeholder.

## Pixel e Google Tag
Ainda NÃO instalados. Quando chegar a hora, cole o código em assets/js/tracking.js (já carregado em todas as páginas).

## WhatsApp e Chat (separados)
- Balão verde (#25D366, canto inferior direito): vai direto para o WhatsApp. Link em assets/js/config.js -> `whatsapp` (hoje PLACEHOLDER_WHATSAPP).
- Botão "Chat" (hero da home, página Contato, barra inferior do celular): abre a janela de chat estilo Octadesk (assets/js/chat.js), com as cores do tema claro/escuro, logo no cabeçalho, status Online e campo de mensagem. O envio é FAKE por enquanto. Quando o chat abre, o balão do WhatsApp some; quando fecha, volta. Para plugar o Octadesk depois, troque `sendMessage()` em chat.js (ou faça os `[data-chat-open]` abrirem o widget real). A chave `octadesk` do config.js fica reservada para isso.
- Não há botão "Fale conosco" no meio das páginas.

## Banner de pílulas (topo)
assets/js/pillbar.js: passa sozinho em loop infinito; arrasta com dedo e mouse; ao tocar/arrastar/clicar numa pílula, pausa 3 s e volta sozinho. Para mudar as pílulas, edite o bloco `.pill-set` em cada HTML.

## Imagens (assets/img)
- Logo: logo-maria-bocuda.png, PNG com fundo transparente (texto "Dra. Gabi Almeida" em branco), usado sobre o cabeçalho rosa #E6007E nos dois temas e no cabeçalho do chat. O arquivo que veio (fundo rosa claro com moldura) está guardado em logo-maria-bocuda-original.png. Se chegar o logo transparente oficial, basta sobrescrever logo-maria-bocuda.png.
- Fotos: hero-gabi, dra-gabi, clinica-recepcao, clinica-sala, clinica-fachada. Reservas (não exibidas): gabi-fachada, clinica-recepcao-2.
- Procedimentos: proc-*.jpg (silhuetas). Sem fotos de antes e depois.

## Procedimentos
Página procedimentos/index.html: 6 cards com EFEITO e SESSÃO; "Ver detalhes" abre um popup (assets/js/procedimentos.js) com explicação, cuidados e dúvidas. Textos entre colchetes ainda faltam. Sem preços. Pílulas, "O que você quer mudar?" e cards da home apontam para #slug de cada card.

## Textos temporários
Todos os textos do site são temporários, para o Gabriel aprovar. Ainda faltam confirmar com o cliente: CNPJ, registro da Responsável Técnica, número do WhatsApp e os 3 links em assets/js/config.js (PLACEHOLDER_GENDO, PLACEHOLDER_OCTADESK, PLACEHOLDER_WHATSAPP).
Os textos dos popups de procedimento ficam em assets/js/procedimentos.js (e as descrições dos cards, nos HTMLs).

## Cores (assets/css/base.css)
Rosa principal #E6007E · rosa claro #F9A8BC · rosa médio #FF6EB4 · verde WhatsApp #25D366 (só no balão flutuante).
Tema escuro: preto com degradê e rosa. Variáveis em `:root` (claro) e `:root[data-theme="dark"]` (escuro).

## Tema claro / escuro
- Botão sol/lua no cabeçalho. A escolha fica salva no navegador (localStorage, chave "theme"). Sem escolha, segue o tema do celular.
- O tema inicial é definido por um pequeno script no <head> de cada página (evita piscar) e por assets/js/main.js. A cor da barra do navegador (theme-color) acompanha: claro #FFFFFF, escuro #0A0A0A.

## Observações
- Cabeçalho, barra de pílulas, rodapé e barra inferior estão repetidos em cada HTML. Mudou o menu ou as pílulas? Altere em todas as páginas.
- A barra inferior (Procedimentos / Agendar / Chat) aparece só no celular (até 768px), em todas as páginas.
