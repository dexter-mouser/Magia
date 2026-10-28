// Arranque de la pantalla inicial

// Deja solo dígitos (máx. 10)
function limpiarNumero(texto) {
  return texto.replace(/\D/g, "").slice(0, 10);
}

function mostrarMensaje(texto) {
  document.getElementById("mensaje-secreto").textContent = texto;
}

// Truco secreto: copia solo el número al portapapeles (nada sale del dispositivo)
async function ejecutarTrucoSecreto() {
  const campo = document.getElementById("campo-numero");
  const numero = limpiarNumero(campo.value);
  if (numero.length !== 10) {
    mostrarMensaje("El número debe tener 10 dígitos.");
    campo.focus();
    return;
  }
  try {
    await navigator.clipboard.writeText(numero);
    mostrarMensaje("Número copiado.");
  } catch (error) {
    mostrarMensaje("No se pudo copiar en este navegador.");
  }
}

// Muestra u oculta el panel "Cómo jugar"
function alternarAyuda() {
  const panel = document.getElementById("panel-ayuda");
  panel.hidden = !panel.hidden;
  document.getElementById("boton-ayuda").setAttribute("aria-expanded", String(!panel.hidden));
}

function iniciar() {
  aplicarTema(document.documentElement.dataset.tema); // actualiza el botón
  document.getElementById("boton-tema").addEventListener("click", alternarTema);
  document.getElementById("boton-ayuda").addEventListener("click", alternarAyuda);
  document.getElementById("boton-secreto").addEventListener("click", ejecutarTrucoSecreto);
  const campo = document.getElementById("campo-numero");
  campo.addEventListener("input", () => { campo.value = limpiarNumero(campo.value); });
}

document.addEventListener("DOMContentLoaded", iniciar);
