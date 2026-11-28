/* =========================================================
   libros-manuales.js — Fase 3, Paso 2
   Cinco registros creados manualmente. Sirven como ejemplos
   para la generación few-shot (registros 6 a 35 del dataset)
   y para verificar la estructura definida en el taller.

   DATOS SIMULADOS: títulos, autores y precios son ficticios.
   Los ISBN son identificadores de prueba (prefijo 978000...) con
   dígito verificador válido; NO corresponden a publicaciones reales.
   ========================================================= */

const librosEjemplo = [
  {
    id: 1,
    codigo: "LIB001",
    titulo: "El secreto de las estrellas perdidas",
    categoria: "Literatura",
    precio: 45000,
    stock: 12,
    stockMinimo: 3,
    autor: "Valeria Montes",
    editorial: "Planeta",
    isbn: "9780000001016",
    anioPublicacion: 2021,
    activo: true
  },
  {
    id: 2,
    codigo: "LIB002",
    titulo: "El futuro de la inteligencia artificial",
    categoria: "Ciencia y tecnología",
    precio: 68000,
    stock: 0,
    stockMinimo: 0,
    autor: "Daniel Herrera",
    editorial: "McGraw-Hill",
    isbn: "9780000002020",
    anioPublicacion: 2024,
    activo: true
  },
  {
    id: 3,
    codigo: "LIB003",
    titulo: "Aprender es descubrir",
    categoria: "Educación",
    precio: 39000,
    stock: 8,
    stockMinimo: 3,
    autor: "Camila Torres",
    editorial: "Norma",
    isbn: "9780000003034",
    anioPublicacion: 2018,
    activo: true
  },
  {
    id: 4,
    codigo: "LIB004",
    titulo: "Los caminos de las civilizaciones",
    categoria: "Historia",
    precio: 57000,
    stock: 5,
    stockMinimo: 5,
    autor: "Sebastián Molina",
    editorial: "Anagrama",
    isbn: "9780000004048",
    anioPublicacion: 2015,
    activo: true
  },
  {
    id: 5,
    codigo: "LIB005",
    titulo: "La aventura del bosque encantado",
    categoria: "Infantil y juvenil",
    precio: 32000,
    stock: 18,
    stockMinimo: 4,
    autor: "Isabella Cruz",
    editorial: "Alfaguara",
    isbn: "9780000005052",
    anioPublicacion: 2022,
    activo: true
  }
];

// Permite reutilizar el arreglo desde Node.js (por ejemplo, en pruebas).
if (typeof module !== "undefined" && module.exports) {
  module.exports = librosEjemplo;
}
