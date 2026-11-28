# BookHub — Taller Práctico 1

Prototipo web de una librería digital colombiana (HTML5, CSS3 y JavaScript vanilla).

## Cómo ejecutarlo

`libros.json` se carga con `fetch()`, por lo que debe abrirse desde un servidor local:

- **VS Code:** extensión *Live Server* → clic derecho en `index.html` → *Open with Live Server*.
- **Terminal:** `python3 -m http.server 8000` y abrir `http://localhost:8000`.

Páginas: `index.html` (landing) y `dashboard.html` (panel administrativo con CRUD).

## Estructura

| Archivo | Responsabilidad |
|---|---|
| `index.html`, `styles.css`, `landing.css`, `landing.js` | Landing page y validación del formulario de suscripción |
| `dashboard.html`, `dashboard.js`, `catalogo.css` | Panel: sidebar, KPI, tabla, catálogo, gráfico |
| `app.js` | Carga, renderizado, filtros, CRUD, localStorage, KPI y gráfico |
| `libros.json` | Dataset inicial de 35 libros (datos simulados) |
| `libros-manuales.js` | Cinco registros manuales usados como ejemplos few-shot |
| `validacion.js` | `validarLibros()` y `esIsbn13Valido()` |
| `evidencia/` | Dataset antes/después y reportes de validación (`node evidencia/generar-reporte.js`) |
| `DOCUMENTACION.md` | Prompts, técnicas, ajustes, validación y reflexión |

## Datos simulados

Los libros, autores y precios son ficticios. Los ISBN son identificadores de prueba y no
corresponden a publicaciones reales.
