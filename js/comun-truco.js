// Utilidades compartidas por las pantallas de truco
const ESPACIO_SVG = "http://www.w3.org/2000/svg";
const MS_PISTAS = 2000;          // tiempo que se ven las pistas
const MS_PULSACION_LARGA = 700;  // mantener el título borra el código

function obtener(id) {
  return document.getElementById(id);
}

function mostrarMensaje(texto) {
  obtener("mensaje-truco").textContent = texto;
}

// Crea un elemento SVG con sus atributos (y texto opcional)
function crearElementoSvg(nombre, atributos, texto) {
  const elemento = document.createElementNS(ESPACIO_SVG, nombre);
  Object.entries(atributos).forEach(([clave, valor]) => elemento.setAttribute(clave, valor));
  if (texto) elemento.textContent = texto;
  return elemento;
}

// Muestra por 2 segundos unas pistas muy tenues del código
let temporizadorPistas = null;
function mostrarPistas() {
  const escenario = document.querySelector(".escenario");
  escenario.classList.add("mostrando-pistas");
  clearTimeout(temporizadorPistas);
  temporizadorPistas = setTimeout(() => escenario.classList.remove("mostrando-pistas"), MS_PISTAS);
}

// Mantener pulsado el título borra el código sin dar señales
function activarBorradoSecreto(reiniciar) {
  let temporizador = null;
  const titulo = obtener("titulo-truco");
  const cancelar = () => clearTimeout(temporizador);
  titulo.addEventListener("pointerdown", () => {
    temporizador = setTimeout(reiniciar, MS_PULSACION_LARGA);
  });
  ["pointerup", "pointerleave", "pointercancel"].forEach((evento) => titulo.addEventListener(evento, cancelar));
}

// Botón de tema de la cabecera
function iniciarCabeceraTruco() {
  aplicarTema(document.documentElement.dataset.tema); // actualiza el botón
  obtener("boton-tema").addEventListener("click", alternarTema);
}

// Conecta las esquinas (código), el centro (pistas) y el título (borrar)
function activarCodigoSecreto(registrar, reiniciar) {
  document.querySelectorAll(".esquina").forEach((zona) => {
    zona.addEventListener("pointerdown", () => registrar(zona.dataset.esquina));
  });
  document.querySelector(".centro").addEventListener("pointerdown", mostrarPistas);
  activarBorradoSecreto(reiniciar);
}
