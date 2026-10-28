# Magia Gryffindor — Pantalla inicial

App web para iPhone con trucos de magia inspirados en Harry Potter. La pantalla inicial muestra un menú de tarjetas (una por truco) con colores de Gryffindor, ilustraciones SVG y soporte de tema claro/oscuro.

## Utilidades

- Menú principal con tarjetas flexibles: cada tarjeta es un truco.
- Tarjeta de truco con ilustración SVG (primer truco: **Carta del Sombrero**).
- Tema claro u oscuro: sigue el sistema y se puede cambiar con un botón.
- Texto siempre legible sobre el color de acento, en ambos temas.
- Adaptada al notch y a la barra inferior del iPhone.
- Accesible: contraste suficiente, etiquetas `aria-label` en todos los SVG y animaciones desactivables.

## Trucos del menú

Cada truco es una tarjeta del menú. La tarjeta de **Carta del Sombrero** es la que lleva la ilustración SVG principal.

| Truco | Qué ve la persona | Cómo se controla |
|---|---|---|
| **Carta elegida** | Nombra una carta y el celular la muestra | Cada esquina de la pantalla es un palo o un valor; se introduce el código con toques ocultos |
| **Carta del Sombrero** | Nombra una carta y sale de dentro del sombrero | Mismo código de esquinas para palo y valor |
| **Dado del destino** | Piensa un número del 1 al 6 y el dado cae en ese número | Toques ocultos definen el resultado |
| **Detector de mentiras** | Pone el dedo y el celular decide si miente | Un toque oculto antes o durante el escaneo define el veredicto |
| **Contador de edad** | Escribe su fecha de nacimiento y el celular "adivina" signo, edad y día de la semana en que nació | Cálculo con la fecha; sin toques ocultos |

Un "cargando" animado ("Consultando el Pensadero...") da tiempo para introducir el código sin que se note.

## Truco secreto (broma)

Sección con un campo para escribir un número de 10 dígitos (solo se aceptan dígitos) y un botón **Truco secreto** que copia al portapapeles únicamente ese número. Todo se queda en el dispositivo de la persona; no se envía ni se guarda nada.

## Estructura del proyecto

```
magia-gryffindor/
├── index.html          Estructura de la pantalla
├── trucos/
│   ├── carta-del-sombrero.html  Pantalla del truco Carta del Sombrero
│   ├── carta-elegida.html     Pantalla del truco Carta elegida
│   └── dado-del-destino.html  Pantalla del truco Dado del destino
├── css/
│   ├── style.css       Diseño, tarjetas, áreas seguras, transiciones
│   ├── tono.css        Variables de color (claro y oscuro)
│   └── truco.css       Estilos de las pantallas de truco
├── js/
│   ├── principal.js    Arranque de la pantalla
│   ├── tema.js         Detección, cambio y guardado del tema
│   ├── contraste.js    Cálculo del color de texto sobre el acento
│   ├── comun-truco.js  Código compartido por las pantallas de truco
│   ├── baraja.js       Código oculto y dibujo de la carta (trucos de cartas)
│   ├── carta-del-sombrero.js  Lógica del truco Carta del Sombrero
│   ├── carta-elegida.js  Lógica del truco Carta elegida
│   └── dado-del-destino.js  Lógica del truco Dado del destino
├── img/
│   └── icono.svg       Icono de la app
└── README.md
```

## Funcionamiento

### Pantalla
1. **Cabecera:** título de la app, botón (?) de Cómo jugar (abre un panel con un desplegable por truco; solo se ve la lista del truco consultado) y botón de tema (icono SVG de sol/luna).
2. **Contenedor flexible:** las tarjetas se acomodan en una o varias columnas según el ancho.
3. **Tarjeta del truco:** ilustración SVG grande arriba, nombre y descripción corta abajo. Toda la tarjeta es un botón.

### Colores (Gryffindor)

| Elemento | Claro | Oscuro |
|---|---|---|
| Fondo | Pergamino con degradado | Granate casi negro con degradado |
| Texto | Marrón oscuro | Crema |
| Acento | Granate | Dorado |
| Detalle | Dorado | Rojo |

Todos los colores viven como variables CSS en `tono.css`; el resto de estilos solo las usan.

### Tema claro/oscuro
- Por defecto se aplica la preferencia del sistema.
- El botón alterna el tema y la elección se guarda en el dispositivo.
- Si no hay elección guardada, se vuelve a seguir el sistema.

### Contraste dinámico
- Se calcula la luminosidad del color de acento activo.
- Según el resultado, el texto sobre el acento se pone claro u oscuro.
- Se recalcula cada vez que cambia el tema.

### Ilustraciones e iconos
- `icono.svg` es el icono de la app.
- Todo lo demás son SVG en línea que heredan los colores del tema mediante variables.
- Cada SVG lleva `aria-label` descriptivo.

### Tipografía
Solo fuentes del sistema. No se cargan fuentes ni librerías externas.

### Accesibilidad
- Contraste suficiente en ambos temas.
- Zonas táctiles amplias en tarjetas y botón de tema.
- Áreas seguras con `env(safe-area-inset-*)` y `viewport-fit=cover`.
- Transiciones breves que se anulan con `prefers-reduced-motion`.

### Lógica en español

| Nombre | Función |
|---|---|
| `iniciar` | Arranca la pantalla y aplica el tema |
| `obtenerTemaGuardado` | Lee la elección guardada |
| `aplicarTema` | Pone el tema en la página y recalcula el contraste |
| `alternarTema` | Cambia entre claro y oscuro |
| `calcularLuminancia` | Luminosidad de un color |
| `elegirColorTexto` | Texto claro u oscuro según el acento |
| `alternarAyuda` | Muestra u oculta el panel "Cómo jugar" |

## Carta elegida

La pantalla del truco muestra el título y los botones **Adivinar** y **Repetir**. La lista de pasos está en el menú de inicio: el botón (?) junto al botón de tema la despliega u oculta.

### Funcionamiento
1. La persona piensa una carta y la dice en voz alta.
2. El mago introduce el código tocando las cuatro esquinas ocultas de la pantalla (no se ven ni dan respuesta al tocarlas).
3. **Palo** (primer toque): arriba izquierda ♥, arriba derecha ♦, abajo izquierda ♣, abajo derecha ♠.
4. **Valor** (toques siguientes): arriba izquierda +1, arriba derecha +5, abajo izquierda +10. A=1, J=11, Q=12, K=13.
5. Al pulsar **Adivinar** aparece "Consultando el Pensadero..." y después la carta dibujada en SVG.
6. **Repetir** limpia la carta para volver a empezar. Mantener pulsado el título borra el código; si el código está incompleto, Adivinar lo reinicia.
7. Tocar el centro de la pantalla muestra durante 2 segundos unas pistas muy tenues del código en las esquinas.

### Lógica en español

| Nombre | Función |
|---|---|
| `registrarToque` | Guarda el palo (primer toque) o suma al valor |
| `codigoEsValido` | Comprueba que hay palo y un valor entre 1 y 13 |
| `crearCartaSvg` | Dibuja la carta con su `aria-label` |
| `adivinar` | Valida el código, espera y muestra la carta |
| `repetir` | Limpia la carta y reactiva el botón |
| `mostrarPistas` | Muestra 2 segundos las pistas tenues del código |

## Dado del destino

La pantalla del truco muestra el título y los botones **Lanzar** y **Repetir**. Los pasos están en el panel (?) del menú de inicio.

### Funcionamiento
1. La persona piensa un número del 1 al 6.
2. El mago lo introduce sumando toques en las esquinas ocultas: arriba izquierda +1, arriba derecha +2, abajo izquierda +3.
3. Al pulsar **Lanzar** el dado dibujado en SVG rueda durante unos segundos y cae en el número introducido. Con movimiento reducido solo se muestra el mensaje de espera y el resultado.
4. Si no hay un código válido, el dado cae en un número al azar.
5. Tocar el centro muestra 2 segundos las pistas tenues; mantener pulsado el título borra el código; **Repetir** deja el dado listo para otro lanzamiento.

### Lógica en español

| Nombre | Función |
|---|---|
| `registrarToque` | Suma al número según la esquina tocada |
| `codigoEsValido` | Comprueba que el número está entre 1 y 6 |
| `crearDadoSvg` | Dibuja el dado con su `aria-label` |
| `lanzar` | Anima el dado y muestra el resultado |
| `repetir` | Limpia el dado y reactiva el botón |

### Código compartido (`comun-truco.js`)
Reúne lo común a todas las pantallas de truco: botón de tema, pistas del centro, borrado con pulsación larga y creación de elementos SVG.

## Carta del Sombrero

La pantalla del truco muestra el título, un sombrero dibujado en SVG y los botones **Sacar carta** y **Repetir**. Los pasos están en el panel (?) del menú de inicio.

### Funcionamiento
1. La persona piensa una carta y la dice en voz alta.
2. El mago introduce el mismo código que en Carta elegida: primer toque en una esquina para el palo y toques siguientes para sumar el valor.
3. Al pulsar **Sacar carta** aparece "Consultando el Pensadero..." y la carta sube desde el interior del sombrero. Con movimiento reducido aparece sin animación.
4. Si el código está incompleto, el botón lo reinicia y pide intentarlo otra vez.
5. Tocar el centro muestra 2 segundos las pistas tenues; mantener pulsado el título borra el código; **Repetir** vuelve a mostrar el sombrero vacío.

### Lógica en español

| Nombre | Función |
|---|---|
| `crearSombreroSvg` | Dibuja el sombrero con su `aria-label` |
| `subirCarta` | Inserta la carta detrás del sombrero y la hace subir |
| `sacarCarta` | Valida el código, espera y saca la carta |
| `repetir` | Vuelve a mostrar el sombrero vacío |

### Código compartido (`baraja.js`)
Reúne lo común a los trucos de cartas: palos, valores, código oculto (`registrarToque`, `codigoEsValido`) y dibujo de la carta (`crearCartaGrupo`, `crearCartaSvg`).
