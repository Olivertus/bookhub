/* =========================================================
   landing.js — Validación del formulario de suscripción
   Landing page de BookHub (Fase 1)
   - Valida nombre, correo y consentimiento.
   - Muestra mensajes comprensibles y accesibles (aria-invalid,
     aria-describedby y aria-live).
   - Es un formulario demostrativo: no envía datos a ningún servidor.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".subscription-form");

    if (!formulario) {
        return;
    }

    const campoNombre = formulario.querySelector("#subscriber-name");
    const campoCorreo = formulario.querySelector("#subscriber-email");
    const campoConsentimiento = formulario.querySelector("#subscription-consent");

    // Se desactiva la validación nativa para mostrar mensajes propios en español.
    formulario.setAttribute("novalidate", "");

    // Crea (una sola vez) el contenedor del mensaje de error de un campo.
    function obtenerContenedorError(campo) {
        const idError = `error-${campo.id}`;
        let contenedor = document.getElementById(idError);

        if (!contenedor) {
            contenedor = document.createElement("p");
            contenedor.id = idError;
            contenedor.className = "field-error";
            contenedor.setAttribute("aria-live", "polite");
            campo.closest(".form-field, .form-consent").appendChild(contenedor);
            campo.setAttribute("aria-describedby", idError);
        }

        return contenedor;
    }

    function mostrarError(campo, mensaje) {
        campo.setAttribute("aria-invalid", "true");
        obtenerContenedorError(campo).textContent = mensaje;
    }

    function limpiarError(campo) {
        campo.removeAttribute("aria-invalid");
        obtenerContenedorError(campo).textContent = "";
    }

    // Reglas de validación de cada campo. Devuelven un mensaje o "" si es válido.
    function validarNombre() {
        const nombre = campoNombre.value.trim();

        if (nombre === "") {
            return "Escribe tu nombre para poder suscribirte.";
        }

        if (nombre.length < 2) {
            return "El nombre debe tener al menos 2 caracteres.";
        }

        if (nombre.length > 60) {
            return "El nombre no puede superar los 60 caracteres.";
        }

        return "";
    }

    function validarCorreo() {
        const correo = campoCorreo.value.trim();
        const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (correo === "") {
            return "Escribe tu correo electrónico.";
        }

        if (!patronCorreo.test(correo)) {
            return "El correo no parece válido. Usa un formato como ejemplo@correo.com.";
        }

        return "";
    }

    function validarConsentimiento() {
        return campoConsentimiento.checked
            ? ""
            : "Debes aceptar el tratamiento de datos para continuar.";
    }

    const reglas = [
        [campoNombre, validarNombre],
        [campoCorreo, validarCorreo],
        [campoConsentimiento, validarConsentimiento]
    ];

    // Valida un campo individual y actualiza su estado visual.
    function validarCampo(campo, regla) {
        const mensaje = regla();

        if (mensaje) {
            mostrarError(campo, mensaje);
        } else {
            limpiarError(campo);
        }

        return mensaje === "";
    }

    // Mensaje de confirmación accesible (se crea una sola vez).
    function obtenerMensajeExito() {
        let exito = document.getElementById("mensaje-suscripcion");

        if (!exito) {
            exito = document.createElement("p");
            exito.id = "mensaje-suscripcion";
            exito.className = "form-success";
            exito.setAttribute("role", "status");
            formulario.appendChild(exito);
        }

        return exito;
    }

    // Validación en tiempo real una vez que el usuario salió del campo.
    reglas.forEach(([campo, regla]) => {
        const evento = campo.type === "checkbox" ? "change" : "blur";

        campo.addEventListener(evento, () => validarCampo(campo, regla));

        campo.addEventListener("input", () => {
            if (campo.getAttribute("aria-invalid") === "true") {
                validarCampo(campo, regla);
            }
        });
    });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const exito = obtenerMensajeExito();
        exito.textContent = "";

        const resultados = reglas.map(([campo, regla]) => validarCampo(campo, regla));
        const esValido = resultados.every(Boolean);

        if (!esValido) {
            const primerInvalido = formulario.querySelector('[aria-invalid="true"]');
            primerInvalido?.focus();
            return;
        }

        const nombre = campoNombre.value.trim();

        formulario.reset();
        exito.textContent = `¡Gracias, ${nombre}! Te suscribimos a las novedades de BookHub (formulario demostrativo).`;
    });
});
