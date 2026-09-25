const loginCorreo = document.getElementById("loginCorreo");
const loginPassword = document.getElementById("loginPassword");
const btnIngresar = document.getElementById("btnIngresar");

btnIngresar.addEventListener("click", function () {
  const msg = document.getElementById("loginMsg");

  const correoOk = validarCorreo(loginCorreo.value);
  const passOk = validarPassword(loginPassword.value);

  if (correoOk && passOk) {
    msg.textContent = "Credenciales válidas. Sesión iniciada correctamente.";
    msg.className = "mensaje-formulario show ok";
  } else {
    const errores = [];
    if (!correoOk) errores.push("correo inválido");
    if (!passOk) errores.push("contraseña inválida");
    msg.textContent = "Error de acceso: " + errores.join(" y ") + ".";
    msg.className = "mensaje-formulario show err";
  }
});