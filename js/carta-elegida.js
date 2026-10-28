// Truco "Carta elegida": la persona nombra una carta y el celular la muestra
const MS_CONSULTA = 1800;        // duración de la animación de espera

function adivinar() {
  if (!codigoEsValido()) {
    reiniciarCodigo();
    mostrarMensaje("Piensa bien tu carta e inténtalo otra vez.");
    return;
  }
  const palo = PALOS[codigo.palo];
  const indiceValor = codigo.valor - 1;
  reiniciarCodigo();
  obtener("boton-adivinar").disabled = true;
  mostrarMensaje("Consultando el Pensadero...");

  setTimeout(() => {
    const carta = crearCartaSvg(palo, indiceValor);
    obtener("zona-carta").replaceChildren(carta);
    requestAnimationFrame(() => carta.classList.add("visible"));
    mostrarMensaje("");
    obtener("boton-repetir").hidden = false;
  }, MS_CONSULTA);
}

function repetir() {
  obtener("zona-carta").replaceChildren();
  obtener("boton-repetir").hidden = true;
  obtener("boton-adivinar").disabled = false;
  mostrarMensaje("");
}

function iniciar() {
  iniciarCabeceraTruco();
  obtener("boton-adivinar").addEventListener("click", adivinar);
  obtener("boton-repetir").addEventListener("click", repetir);
  activarCodigoSecreto(registrarToque, reiniciarCodigo);
}

document.addEventListener("DOMContentLoaded", iniciar);
