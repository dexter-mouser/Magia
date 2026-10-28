// Truco "Dado del destino": la persona piensa un número del 1 al 6 y el dado cae en él
const MS_LANZAMIENTO = 1800;  // duración del lanzamiento
const MS_CAMBIO_CARA = 120;   // cada cuánto cambia la cara mientras rueda

// Toques en las esquinas: cada una suma al número
const SUMA_ESQUINA = { "sup-izq": 1, "sup-der": 2, "inf-izq": 3 };

// Puntos de cada cara del dado (cuadrícula de 100x100)
const CARAS = [
  [[50, 50]],
  [[28, 28], [72, 72]],
  [[28, 28], [50, 50], [72, 72]],
  [[28, 28], [72, 28], [28, 72], [72, 72]],
  [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  [[28, 28], [72, 28], [28, 50], [72, 50], [28, 72], [72, 72]]
];

// Código oculto introducido por el mago
const codigo = { valor: 0 };

function reiniciarCodigo() {
  codigo.valor = 0;
}

function registrarToque(esquina) {
  codigo.valor += SUMA_ESQUINA[esquina] || 0;
}

function codigoEsValido() {
  return codigo.valor >= 1 && codigo.valor <= 6;
}

// Dibuja el dado con la cara indicada
function crearDadoSvg(numero) {
  const svg = crearElementoSvg("svg", {
    viewBox: "0 0 100 100", role: "img", class: "dado-svg visible",
    "aria-label": `Dado que muestra el número ${numero}`
  });
  svg.appendChild(crearElementoSvg("rect", { x: 4, y: 4, width: 92, height: 92, rx: 16, class: "dado-fondo" }));
  CARAS[numero - 1].forEach(([x, y]) => {
    svg.appendChild(crearElementoSvg("circle", { cx: x, cy: y, r: 7.5, class: "dado-punto" }));
  });
  return svg;
}

function mostrarCara(numero) {
  obtener("zona-dado").replaceChildren(crearDadoSvg(numero));
}

function caraAleatoria() {
  return Math.floor(Math.random() * 6) + 1;
}

function lanzar() {
  // Sin código válido el dado cae al azar, como un dado normal
  const resultado = codigoEsValido() ? codigo.valor : caraAleatoria();
  reiniciarCodigo();
  obtener("boton-lanzar").disabled = true;
  mostrarMensaje("El destino decide...");

  const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const intervalo = sinMovimiento ? null : setInterval(() => mostrarCara(caraAleatoria()), MS_CAMBIO_CARA);

  setTimeout(() => {
    clearInterval(intervalo);
    mostrarCara(resultado);
    mostrarMensaje("");
    obtener("boton-repetir").hidden = false;
  }, MS_LANZAMIENTO);
}

function repetir() {
  obtener("zona-dado").replaceChildren();
  obtener("boton-repetir").hidden = true;
  obtener("boton-lanzar").disabled = false;
  mostrarMensaje("");
}

function iniciar() {
  iniciarCabeceraTruco();
  obtener("boton-lanzar").addEventListener("click", lanzar);
  obtener("boton-repetir").addEventListener("click", repetir);
  activarCodigoSecreto(registrarToque, reiniciarCodigo);
}

document.addEventListener("DOMContentLoaded", iniciar);
