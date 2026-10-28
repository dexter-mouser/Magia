// Luminancia relativa (WCAG) de un color "#rrggbb"
function calcularLuminancia(colorHex) {
  const canales = [1, 3, 5].map((inicio) => {
    const valor = parseInt(colorHex.slice(inicio, inicio + 2), 16) / 255;
    return valor <= 0.03928 ? valor / 12.92 : Math.pow((valor + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * canales[0] + 0.7152 * canales[1] + 0.0722 * canales[2];
}

// Texto oscuro sobre fondos claros y texto claro sobre fondos oscuros
function elegirColorTexto(colorFondo) {
  return calcularLuminancia(colorFondo) > 0.179 ? "#1A0B0B" : "#FFFFFF";
}

// Lee el acento activo y fija el color de texto que va encima
function aplicarContraste() {
  const raiz = document.documentElement;
  const acento = getComputedStyle(raiz).getPropertyValue("--acento").trim();
  if (/^#[0-9a-f]{6}$/i.test(acento)) {
    raiz.style.setProperty("--texto-sobre-acento", elegirColorTexto(acento));
  }
}
