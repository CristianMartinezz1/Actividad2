# ACTIVIDAD 2_ utileria.js

**Autor:** Cristian Martinez Pacheco — Ingeniería en Sistemas Computacionales, Instituto Tecnológico de Oaxaca (ITO)
**Num de Control:** 23161016

## 📌 Portada

Todo formulario web repite el mismo problema: validar correos, contraseñas, nombres, edades y longitudes de campos numéricos, casi siempre reescribiendo las mismas expresiones regulares y cálculos de fecha en cada proyecto nuevo.

**`utileria.js`** resuelve esto centralizando **8 funciones reutilizables** de validación y formateo en una sola librería JavaScript, sin dependencias ni frameworks. Se incluye con una sola línea de `<script>` y queda lista para usarse en cualquier formulario.

Incluye:
- 6 funciones obligatorias de validación y cálculo.
- 2 funciones propias: formateo de texto y evaluación de fuerza de contraseña.
- Un formulario de registro (`index.html`) con validación en tiempo real y una ventana modal que muestra la edad calculada.
- Una pantalla de `login.html` que valida correo y contraseña.

---

## ⚙️ Instalación

Copia el archivo `utileria.js` a tu proyecto e inclúyelo antes de tu propio script:

```html
<script src="utileria.js"></script>
```

Si usas Node.js / CommonJS, también puedes importarla con `require`:

```javascript
const utileria = require("./js/utileria.js");
```

---

## 🚀 Uso

Cada función está lista para usarse directamente. Abajo está el código real de la librería junto con ejemplos de entrada/salida.

### `validarCorreo(correo)`

Valida el formato de un correo electrónico con expresión regular.

```javascript
function validarCorreo(correo) {
  if (typeof correo !== "string") return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo.trim());
}
```

```javascript
validarCorreo("cristian@ito.mx"); // true
validarCorreo("cristian@ito");    // false
```

### `soloLetras(texto)`

Verifica que un texto contenga únicamente letras (incluye acentos y ñ) y espacios.

```javascript
function soloLetras(texto) {
  if (typeof texto !== "string" || texto.trim() === "") return false;
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  return regex.test(texto);
}
```

```javascript
soloLetras("José Núñez");   // true
soloLetras("Cristian23");   // false
```

### `validarLongitud(numero, maxLongitud)`

Valida que un valor numérico no exceda una cantidad máxima de dígitos (útil para teléfonos).

```javascript
function validarLongitud(numero, maxLongitud) {
  if (numero === null || numero === undefined) return false;
  const digitos = String(numero).replace(/\D/g, "");
  if (digitos === "") return false;
  return digitos.length <= maxLongitud;
}
```

```javascript
validarLongitud(9511234567, 10);  // true
validarLongitud(95112345678, 10); // false
```

### `calcularEdad(fechaNacimiento)`

Calcula la edad exacta a partir de una fecha de nacimiento, considerando mes y día actuales.

```javascript
function calcularEdad(fechaNacimiento) {
  const nacimiento = new Date(fechaNacimiento);
  if (isNaN(nacimiento.getTime())) return NaN;

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mesActual = hoy.getMonth() - nacimiento.getMonth();
  const diaActual = hoy.getDate() - nacimiento.getDate();

  if (mesActual < 0 || (mesActual === 0 && diaActual < 0)) {
    edad--;
  }
  return edad;
}
```

```javascript
calcularEdad("2000-05-15"); // ej. 26 (según la fecha actual)
```

### `esMayorDeEdad(fechaNacimiento)`

Reutiliza `calcularEdad` para determinar si una persona es mayor de edad.

```javascript
function esMayorDeEdad(fechaNacimiento) {
  const edad = calcularEdad(fechaNacimiento);
  if (isNaN(edad)) return false;
  return edad >= 18;
}
```

```javascript
esMayorDeEdad("2000-01-01"); // true
esMayorDeEdad("2015-01-01"); // false
```

### `validarPassword(password)`

Verifica que una contraseña tenga mayúscula, minúscula, número, carácter especial y mínimo 8 caracteres.

```javascript
function validarPassword(password) {
  if (typeof password !== "string") return false;
  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneMinuscula = /[a-z]/.test(password);
  const tieneNumero = /[0-9]/.test(password);
  const tieneEspecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password);
  const longitudValida = password.length >= 8;

  return (
    tieneMayuscula &&
    tieneMinuscula &&
    tieneNumero &&
    tieneEspecial &&
    longitudValida
  );
}
```

```javascript
validarPassword("Sistemas1$"); // true
validarPassword("sistemas1");  // false
```

### 🌟 Funciones propias

#### `capitalizarPalabras(texto)`

Formatea un texto para que cada palabra inicie con mayúscula. Resuelve el problema de nombres o direcciones escritos de forma irregular en formularios (todo mayúsculas, todo minúsculas, etc.).

```javascript
function capitalizarPalabras(texto) {
  if (typeof texto !== "string" || texto.trim() === "") return "";
  return texto
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}
```

```javascript
capitalizarPalabras("JOSÉ DE LA CRUZ"); // "José De La Cruz"
```

#### `calcularFuerzaPassword(password)`

Evalúa qué tan robusta es una contraseña por puntos (longitud, mayúsculas, minúsculas, números, caracteres especiales) y regresa una etiqueta descriptiva, dando retroalimentación más útil que un simple `true`/`false`.

```javascript
function calcularFuerzaPassword(password) {
  if (typeof password !== "string" || password.length === 0) return "Muy débil";

  let puntos = 0;
  if (password.length >= 8) puntos++;
  if (password.length >= 12) puntos++;
  if (/[A-Z]/.test(password)) puntos++;
  if (/[a-z]/.test(password)) puntos++;
  if (/[0-9]/.test(password)) puntos++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password)) puntos++;

  if (puntos <= 1) return "Muy débil";
  if (puntos === 2) return "Débil";
  if (puntos === 3 || puntos === 4) return "Media";
  if (puntos === 5) return "Fuerte";
  return "Muy fuerte";
}
```

```javascript
calcularFuerzaPassword("Abcdefg1$xyz"); // "Muy fuerte"
```

---

## 🧩 Integración en el proyecto

**`index.html` + `js/index.js`** — formulario de registro que valida nombre, correo, teléfono y contraseña en tiempo real con `utileria.js`. Ejemplo real de uso dentro del proyecto:

```javascript
if (!soloLetras(nombre.value)) {
  hintNombre.textContent = "Nombre inválido (solo letras y espacios).";
}

if (!validarCorreo(correo.value)) {
  hintCorreo.textContent = "Correo electrónico inválido.";
}

if (!validarLongitud(telefono.value, 10)) {
  hintTelefono.textContent = "Teléfono inválido (máx. 10 dígitos).";
}

if (!esMayorDeEdad(fechaNacimiento.value)) {
  hintFecha.textContent = "No puedes registrarte, eres menor de edad.";
}

// Al enviar el formulario correctamente:
const primerNombre = capitalizarPalabras(nombre.value.trim()).split(" ")[0];
const edad = calcularEdad(fechaNacimiento.value);
```

**`login.html` + `js/login.js`** — pantalla de acceso que usa `validarCorreo` y `validarPassword` para validar las credenciales antes de simular el inicio de sesión.

---

## 🖥️ Capturas de pantalla

**Consola mostrando resultados del formulario:**

```
--- utileria.js: resultados del formulario ---
Nombre formateado: Cristian Ramirez
Correo válido: true
Teléfono válido: true
Edad calculada: 24
Es mayor de edad: true
Fuerza de contraseña: Fuerte
```

![Consola - formulario](img/captura-consola-formulario.png)

**Modal de edad:**

![Modal de edad](img/captura-modal.png)

**Consola mostrando resultado del login:**

```
--- utileria.js: intento de login ---
Correo válido: true
Contraseña válida: true
```

![Consola - login](img/captura-consola-login.png)

---

## 🎬 Video demo (máx. 1 min)

Video promocional mostrando el problema que resuelve `utileria.js`, cómo se usa (formulario, modal, login) y el resultado en acción (consola/alerta/cambio en la página):

[▶ Ver video demo](PENDIENTE-agregar-link)

---

## 🌐 GitHub Pages

[Ver demo en vivo]([https://cristianmartinezz1.github.io/Actividad2/)

---

## 📁 Estructura del repositorio

```
/utileria
├── README.md
├── index.html
├── login.html
├── css/
│   └── formulario.css
├── js/
│   ├── utileria.js
│   ├── index.js
│   └── login.js
└── img/
    └── (capturas usadas en el proyecto)
```
