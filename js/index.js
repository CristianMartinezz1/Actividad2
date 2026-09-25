const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const password = document.getElementById("password");
const btnRegistrar = document.getElementById("btnRegistrar");

const hintNombre = document.getElementById("hintNombre");
const hintCorreo = document.getElementById("hintCorreo");
const hintTelefono = document.getElementById("hintTelefono");
const hintFecha = document.getElementById("hintFecha");
const hintPassword = document.getElementById("hintPassword");

password.addEventListener("input", function () {
  const fuerza = calcularFuerzaPassword(password.value);
  if (password.value.trim() === "") {
    hintPassword.textContent = "";
    hintPassword.className = "hint";
    password.classList.remove("input-err");
  } else {
    hintPassword.textContent = "Fuerza de la contraseña: " + fuerza;
    hintPassword.className = "hint show neutral";
  }
});

btnRegistrar.addEventListener("click", function () {
  const formMsg = document.getElementById("formMsg");

  let hayErrores = false;

  if (!soloLetras(nombre.value)) {
    hintNombre.textContent = "Nombre inválido (solo letras y espacios).";
    hintNombre.className = "hint show err";
    nombre.classList.add("input-err");
    hayErrores = true;
  } else {
    hintNombre.textContent = "";
    hintNombre.className = "hint";
    nombre.classList.remove("input-err");
  }

  if (!validarCorreo(correo.value)) {
    hintCorreo.textContent = "Correo electrónico inválido.";
    hintCorreo.className = "hint show err";
    correo.classList.add("input-err");
    hayErrores = true;
  } else {
    hintCorreo.textContent = "";
    hintCorreo.className = "hint";
    correo.classList.remove("input-err");
  }

  if (!validarLongitud(telefono.value, 10)) {
    hintTelefono.textContent = "Teléfono inválido (máx. 10 dígitos).";
    hintTelefono.className = "hint show err";
    telefono.classList.add("input-err");
    hayErrores = true;
  } else {
    hintTelefono.textContent = "";
    hintTelefono.className = "hint";
    telefono.classList.remove("input-err");
  }

  if (!fechaNacimiento.value) {
    hintFecha.textContent = "Fecha de nacimiento requerida.";
    hintFecha.className = "hint show err";
    fechaNacimiento.classList.add("input-err");
    hayErrores = true;
  } else if (!esMayorDeEdad(fechaNacimiento.value)) {
    hintFecha.textContent = "No puedes registrarte, eres menor de edad.";
    hintFecha.className = "hint show err";
    fechaNacimiento.classList.add("input-err");
    hayErrores = true;
  } else {
    hintFecha.textContent = "";
    hintFecha.className = "hint";
    fechaNacimiento.classList.remove("input-err");
  }

  if (!validarPassword(password.value)) {
    hintPassword.textContent = "Contraseña inválida (mín. 8 caracteres, mayúscula, minúscula, número y carácter especial).";
    hintPassword.className = "hint show err";
    password.classList.add("input-err");
    hayErrores = true;
  } else {
    hintPassword.textContent = "";
    hintPassword.className = "hint";
    password.classList.remove("input-err");
  }

  if (hayErrores) {
    formMsg.textContent = "Por favor, corrija los campos marcados en rojo.";
    formMsg.className = "mensaje-formulario show err";
    return;
  }

  formMsg.textContent = "";
  formMsg.className = "mensaje-formulario";

  const primerNombre = capitalizarPalabras(nombre.value.trim()).split(" ")[0];
  const edad = calcularEdad(fechaNacimiento.value);

  const parrafoEdad = document.querySelector("#modalEdad .caja-modal > p");
  if (parrafoEdad) {
    parrafoEdad.textContent = `Bienvenido, ${primerNombre}. Tu edad calculada es:`;
  }

  document.getElementById("edadCalculada").textContent = edad;
  const estatus = document.getElementById("estatusEdad");
  estatus.textContent = "Mayor de edad (Acceso autorizado)";
  estatus.className = "estatus mayor";

  document.getElementById("modalEdad").classList.add("show");
});

document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById("modalEdad").classList.remove("show");
});