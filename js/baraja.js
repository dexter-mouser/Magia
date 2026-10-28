// Baraja compartida por los trucos de cartas: código oculto y dibujo de la carta

// Primer toque: el palo según la esquina
const PALOS = {
  "sup-izq": { nombre: "Corazones", simbolo: "\u2665\uFE0E", tinta: "tinta-roja" },
  "sup-der": { nombre: "Diamantes", simbolo: "\u2666\uFE0E", tinta: "tinta-roja" },
  "inf-izq": { nombre: "Tréboles", simbolo: "\u2663\uFE0E", tinta: "tinta-negra" },
  "inf-der": { nombre: "Picas", simbolo: "\u2660\uFE0E", tinta: "tinta-negra" }
};
// Toques siguientes: cada esquina suma al valor
const SUMA_ESQUINA = { "sup-izq": 1, "sup-der": 5, "inf-izq": 10 };
const ETIQUETAS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const NOMBRES = ["As", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jota", "Reina", "Rey"];

// Código oculto introducido por el mago
const codigo = { palo: null, valor: 0 };

function reiniciarCodigo() {
  codigo.palo = null;
  codigo.valor = 0;
}

function registrarToque(esquina) {
  if (codigo.palo === null) {
    codigo.palo = esquina;
  } else {
    codigo.valor += SUMA_ESQUINA[esquina] || 0;
  }
}

function codigoEsValido() {
  return codigo.palo !== null && codigo.valor >= 1 && codigo.valor <= 13;
}

function crearEtiquetaCarta(palo, indiceValor) {
  return `Carta: ${NOMBRES[indiceValor]} de ${palo.nombre}`;
}

// Dibuja la carta en coordenadas 100x140: valor y palo en dos esquinas y palo grande al centro
function crearCartaGrupo(palo, indiceValor) {
  const grupo = crearElementoSvg("g", {});
  grupo.appendChild(crearElementoSvg("rect", { x: 2, y: 2, width: 96, height: 136, rx: 8, class: "carta-fondo" }));

  const esquina = crearElementoSvg("g", { class: palo.tinta });
  esquina.appendChild(crearElementoSvg("text", { x: 9, y: 24, "font-size": 18, "font-weight": 700 }, ETIQUETAS[indiceValor]));
  esquina.appendChild(crearElementoSvg("text", { x: 9, y: 42, "font-size": 16 }, palo.simbolo));

  const opuesta = esquina.cloneNode(true);
  opuesta.setAttribute("transform", "rotate(180 50 70)");
  const centro = crearElementoSvg("text", { x: 50, y: 88, "font-size": 56, "text-anchor": "middle", class: palo.tinta }, palo.simbolo);

  grupo.append(esquina, opuesta, centro);
  return grupo;
}

function crearCartaSvg(palo, indiceValor) {
  const svg = crearElementoSvg("svg", {
    viewBox: "0 0 100 140", role: "img", class: "carta-svg",
    "aria-label": crearEtiquetaCarta(palo, indiceValor)
  });
  svg.appendChild(crearCartaGrupo(palo, indiceValor));
  return svg;
}
