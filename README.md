# Actividad2
# utileria.js

**Autor:** Cristian — Ingeniería en Sistemas Computacionales, Instituto Tecnológico de Oaxaca (ITO)
**Matrícula:** 23161016

## Portada

`utileria.js` es una librería JavaScript ligera, sin dependencias ni frameworks, que resuelve un problema muy común en formularios web: repetir una y otra vez el mismo código de validación de correo, contraseñas, nombres, edades y longitudes de campos numéricos. En lugar de reescribir expresiones regulares y cálculos de fecha en cada proyecto, `utileria.js` centraliza estas 8 funciones listas para usarse con una sola línea de `<script>`.

Incluye:
- 6 funciones obligatorias de validación y cálculo.
- 2 funciones propias (formateo de texto y evaluación de fuerza de contraseña).
- Un formulario de registro (`index.html`) con validación en tiempo real y una ventana modal que muestra la edad calculada.
- Una pantalla de `login.html` que valida correo y contraseña.

## Instalación

Copia el archivo `js/utileria.js` a tu proyecto e inclúyelo antes de tu propio script:

```html
<script src="js/utileria.js"></script>
<script src="tu-script.js"></script>
```

Si usas Node.js / CommonJS, también puedes importarla con `require`:

```javascript
const utileria = require("./js/utileria.js");
```

## Uso

### validarCorreo(correo)

```javascript
validarCorreo("cristian@ito.mx"); // true
validarCorreo("cristian@ito");    // false
```

### soloLetras(texto)

```javascript
soloLetras("José Núñez");   // true
soloLetras("Cristian23");   // false
```

### validarLongitud(numero, maxLongitud)

```javascript
validarLongitud(9511234567, 10); // true
validarLongitud(95112345678, 10); // false
```

### calcularEdad(fechaNacimiento)

```javascript
calcularEdad("2000-05-15"); // ej. 26 (según la fecha actual)
```

### esMayorDeEdad(fechaNacimiento)

```javascript
esMayorDeEdad("2000-01-01"); // true
esMayorDeEdad("2015-01-01"); // false
```

### validarPassword(password)

```javascript
validarPassword("Sistemas1$"); // true
validarPassword("sistemas1");  // false
```

### Funciones propias

#### capitalizarPalabras(texto)

Formatea un texto para que cada palabra inicie con mayúscula. Resuelve el problema de nombres/direcciones escritos de forma irregular en formularios.

```javascript
capitalizarPalabras("JOSÉ DE LA CRUZ"); // "José De La Cruz"
```

#### calcularFuerzaPassword(password)

Evalúa qué tan robusta es una contraseña y regresa una etiqueta descriptiva, dando retroalimentación más útil que un simple true/false.

```javascript
calcularFuerzaPassword("Abcdefg1$xyz"); // "Muy fuerte"
```

## Integración en el proyecto

- **`index.html`**: formulario de registro que valida nombre, correo, teléfono y contraseña en tiempo real con `utileria.js`, y al enviarse muestra en una ventana modal la edad calculada (`calcularEdad`) junto con el estatus de mayoría de edad (`esMayorDeEdad`).
- **`login.html`**: pantalla de acceso que usa `validarCorreo` y `validarPassword` para validar las credenciales antes de simular el inicio de sesión.

## Capturas de pantalla

> Reemplaza estas rutas con tus propias capturas antes de subir el repositorio.

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

`![Consola - formulario](img/captura-consola-formulario.png)`

**Modal de edad:**

`![Modal de edad](img/captura-modal.png)`

**Consola mostrando resultado del login:**

```
--- utileria.js: intento de login ---
Correo válido: true
Contraseña válida: true
```

`![Consola - login](img/captura-consola-login.png)`

## Video demo (máx. 1 min)

> Pendiente: graba un video de máx. 60 segundos mostrando el problema que resuelve `utileria.js`, cómo se usa (formulario, modal, login) y el resultado en acción (consola/alerta/cambio en la página). Sube el link aquí:

`[Video demo](PENDIENTE-agregar-link)`

## GitHub Pages

`[Ver demo en vivo](PENDIENTE-agregar-link-de-github-pages)`

## Estructura del repositorio

```
/utileria
├── README.md
├── index.html
├── login.html
├── css/
│   └── styles.css
├── js/
│   └── utileria.js
└── img/
    └── (recursos usados en el proyecto, si aplica)
```
