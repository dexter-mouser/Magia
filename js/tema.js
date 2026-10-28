// Tema claro/oscuro: sigue al sistema hasta que la persona elige uno
const CLAVE_TEMA = "magia-tema";
const consultaOscuro = window.matchMedia("(prefers-color-scheme: dark)");

function obtenerTemaGuardado() {
  try {
    const tema = localStorage.getItem(CLAVE_TEMA);
    return tema === "claro" || tema === "oscuro" ? tema : null;
  } catch (error) {
    return null; // almacenamiento no disponible
  }
}

function guardarTema(tema) {
  try { localStorage.setItem(CLAVE_TEMA, tema); } catch (error) { /* se ignora */ }
}

function obtenerTemaSistema() {
  return consultaOscuro.matches ? "oscuro" : "claro";
}

function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  aplicarContraste();
  const boton = document.getElementById("boton-tema");
  if (boton) boton.setAttribute("aria-pressed", String(tema === "oscuro"));
}

function alternarTema() {
  const nuevo = document.documentElement.dataset.tema === "oscuro" ? "claro" : "oscuro";
  guardarTema(nuevo);
  aplicarTema(nuevo);
}

// Se aplica de inmediato (script en <head>) para evitar parpadeos
aplicarTema(obtenerTemaGuardado() || obtenerTemaSistema());
consultaOscuro.addEventListener("change", () => {
  if (!obtenerTemaGuardado()) aplicarTema(obtenerTemaSistema());
});
