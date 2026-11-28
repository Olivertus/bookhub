/* Genera los reportes de validación (antes y después de corregir).
   Uso:  node evidencia/generar-reporte.js
   Requiere Node.js 14+. No usa dependencias externas. */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

// Carga validacion.js (script de navegador) dentro de un contexto aislado.
const rutaValidacion = path.join(__dirname, "..", "validacion.js");
const contexto = {};
vm.createContext(contexto);
vm.runInContext(
  fs.readFileSync(rutaValidacion, "utf8") + "\nthis.validarLibros = validarLibros;",
  contexto
);
const validarLibros = contexto.validarLibros;

function generarReporte(nombreArchivo, titulo) {
  const ruta = path.join(__dirname, nombreArchivo);
  const lista = JSON.parse(fs.readFileSync(ruta, "utf8"));
  const errores = validarLibros(lista);

  const lineas = [];
  lineas.push(`REPORTE DE VALIDACIÓN — ${titulo}`);
  lineas.push(`Archivo: ${nombreArchivo}`);
  lineas.push(`Registros revisados: ${lista.length}`);
  lineas.push(`Errores encontrados: ${errores.length}`);
  lineas.push("");

  if (errores.length === 0) {
    lineas.push("Resultado: SIN ERRORES. El dataset cumple todas las reglas.");
  } else {
    lineas.push("Índice | ID   | Campo            | Descripción");
    lineas.push("-------|------|------------------|---------------------------------------------");
    errores.forEach((e) => {
      lineas.push(
        `${String(e.indice).padEnd(6)} | ${String(e.id).padEnd(4)} | ${String(e.campo).padEnd(16)} | ${e.descripcion}`
      );
    });
  }

  return { texto: lineas.join("\n") + "\n", errores };
}

const antes = generarReporte("libros-antes-con-errores.json", "ANTES de corregir");
const despues = generarReporte("libros-despues-corregido.json", "DESPUÉS de corregir");

fs.writeFileSync(path.join(__dirname, "reporte-validacion-antes.txt"), antes.texto);
fs.writeFileSync(path.join(__dirname, "reporte-validacion-despues.txt"), despues.texto);

console.log(antes.texto);
console.log(despues.texto);

// Código de salida distinto de cero si el dataset corregido aún tiene errores.
process.exit(despues.errores.length === 0 ? 0 : 1);
