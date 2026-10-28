// Truco "Carta del Sombrero": la persona nombra una carta y sale de dentro del sombrero
const MS_CONSULTA = 1800;  // duración de la animación de espera
const ALTO_CARTA = 112;    // la carta empieza escondida: debe coincidir con truco.css

// Dibuja el sombrero vacío; la carta se insertará detrás de él
function crearSombreroSvg() {
  const svg = crearElementoSvg("svg", {
    viewBox: "0 0 120 235", role: "img", class: "sombrero-svg", "aria-label": "Sombrero mágico"
  });
  // Recorte: la carta solo se ve por encima de la abertura del sombrero
  const defs = crearElementoSvg("defs", {});
  const recorte = crearElementoSvg("clipPath", { id: "recorte-carta" });
  recorte.appendChild(crearElementoSvg("rect", { x: 0, y: 0, width: 120, height: 150 }));
  defs.appendChild(recorte);

  const zonaCarta = crearElementoSvg("g", { "clip-path": "url(#recorte-carta)", class: "zona-carta" });
  const sombrero = crearElementoSvg("g", { class: "sombrero" });
  sombrero.append(
    crearElementoSvg("path", { d: "M34 150 H86 L104 215 H16 Z" }),
    crearElementoSvg("ellipse", { cx: 60, cy: 215, rx: 58, ry: 14 }),
    crearElementoSvg("polygon", { points: "24,185 96,185 100,200 20,200", class: "banda" }),
    crearElementoSvg("ellipse", { cx: 60, cy: 150, rx: 26, ry: 6, class: "borde" })
  );
  svg.append(defs, zonaCarta, sombrero);
  return svg;
}

function mostrarSombrero() {
  obtener("zona-sombrero").replaceChildren(crearSombreroSvg());
}

// Inserta la carta y la hace subir desde el interior del sombrero
function subirCarta(palo, indiceValor) {
  const svg = obtener("zona-sombrero").firstElementChild;
  svg.setAttribute("aria-label", `Sombrero mágico del que sale esta carta. ${crearEtiquetaCarta(palo, indiceValor)}`);
  const subida = crearElementoSvg("g", { class: "carta-saliente" });
  const carta = crearElementoSvg("g", { transform: "translate(20 38) scale(0.8)" });
  carta.appendChild(crearCartaGrupo(palo, indiceValor));
  subida.appendChild(carta);
  svg.querySelector(".zona-carta").appendChild(subida);
  subida.getBoundingClientRect();   // fuerza el estilo inicial antes de animar
  subida.classList.add("sale");
}

function sacarCarta() {
  if (!codigoEsValido()) {
    reiniciarCodigo();
    mostrarMensaje("Piensa bien tu carta e inténtalo otra vez.");
    return;
  }
  const palo = PALOS[codigo.palo];
  const indiceValor = codigo.valor - 1;
  reiniciarCodigo();
  obtener("boton-sacar").disabled = true;
  mostrarMensaje("Consultando el Pensadero...");

  setTimeout(() => {
    subirCarta(palo, indiceValor);
    mostrarMensaje("");
    obtener("boton-repetir").hidden = false;
  }, MS_CONSULTA);
}

function repetir() {
  mostrarSombrero();
  obtener("boton-repetir").hidden = true;
  obtener("boton-sacar").disabled = false;
  mostrarMensaje("");
}

function iniciar() {
  iniciarCabeceraTruco();
  mostrarSombrero();
  obtener("boton-sacar").addEventListener("click", sacarCarta);
  obtener("boton-repetir").addEventListener("click", repetir);
  activarCodigoSecreto(registrarToque, reiniciarCodigo);
}

document.addEventListener("DOMContentLoaded", iniciar);
