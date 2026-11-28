// Arreglo completo de libros cargado desde libros.json. Nunca se filtra ni se modifica.
let librosOriginales = [];

// Calcula el estado de inventario de un libro según las reglas del enunciado.
function calcularEstado(libro) {
  const stock = Number(libro.stock);
  const stockMinimo = Number(libro.stockMinimo);

  // Sin existencias.
  if (stock === 0) {
    return "Agotado";
  }

  // Hay existencias, pero están en el mínimo o por debajo.
  if (stock > 0 && stock <= stockMinimo) {
    return "Stock bajo";
  }

  // Hay más existencias que el mínimo.
  return "Disponible";
}

// Construye y muestra las tarjetas de libros dentro del catálogo.
function renderizarLibros(lista) {
  // Obtiene el contenedor del catálogo y verifica que exista.
  const contenedor = document.getElementById("catalogo-grid");

  if (!contenedor) {
    return;
  }

  // Limpia el contenido anterior antes de renderizar los nuevos libros.
  contenedor.replaceChildren();

  // Muestra un mensaje cuando no hay libros para presentar.
  if (!Array.isArray(lista) || lista.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("estado-mensaje");
    mensaje.textContent = "No se encontraron libros con los filtros actuales. Prueba con otra búsqueda o limpia los filtros.";
    contenedor.appendChild(mensaje);
    actualizarResumenCatalogo(0);
    return;
  }

  // Configura el formato de moneda colombiana.
  const formatoMoneda = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  });

  // Crea un fragmento para agrupar todas las tarjetas antes de insertarlas.
  const fragmento = document.createDocumentFragment();

  // Recorre la lista y construye una tarjeta para cada libro.
  lista.forEach((libro) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("catalogo-card");

    // Inserta el título del libro.
    const titulo = document.createElement("h3");
    titulo.classList.add("catalogo-card-title");
    titulo.textContent = libro.titulo ?? "";
    tarjeta.appendChild(titulo);

    // Inserta la categoría y el año de publicación.
    const categoriaAnio = document.createElement("p");
    categoriaAnio.classList.add("catalogo-card-category");
    categoriaAnio.textContent = `${libro.categoria ?? ""} · ${libro.anioPublicacion ?? ""}`;
    tarjeta.appendChild(categoriaAnio);

    // Inserta el precio con formato de pesos colombianos.
    const precio = document.createElement("p");
    precio.classList.add("catalogo-card-price");
    precio.textContent = formatoMoneda.format(Number(libro.precio) || 0);
    tarjeta.appendChild(precio);

    // Inserta la cantidad de unidades disponibles.
    const stock = document.createElement("p");
    stock.classList.add("catalogo-card-stock");
    stock.textContent = `Stock disponible: ${libro.stock ?? 0}`;
    tarjeta.appendChild(stock);

    // Inserta el autor y la editorial.
    const autorEditorial = document.createElement("p");
    autorEditorial.classList.add("catalogo-card-author");
    autorEditorial.textContent = `Autor: ${libro.autor ?? ""} · Editorial: ${libro.editorial ?? ""}`;
    tarjeta.appendChild(autorEditorial);

    // Inserta el ISBN del libro.
    const isbn = document.createElement("p");
    isbn.classList.add("catalogo-card-isbn");
    isbn.textContent = `ISBN: ${libro.isbn ?? ""}`;
    tarjeta.appendChild(isbn);

    // Calcula el estado y asigna la clase visual correspondiente.
    const estado = calcularEstado(libro);
    const badge = document.createElement("span");

    const clasesEstado = {
      "Disponible": "badge-disponible",
      "Stock bajo": "badge-stock-bajo",
      "Agotado": "badge-agotado"
    };

    badge.classList.add(clasesEstado[estado] || "badge-agotado");
    badge.textContent = estado;
    tarjeta.appendChild(badge);

    // Crea el contenedor de botones de acciones.
    const acciones = document.createElement("div");
    acciones.classList.add("cell-actions");

    // Crea el botón para editar el libro.
    const botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.classList.add("table-action", "table-action-edit");
    botonEditar.dataset.id = libro.id;
    botonEditar.setAttribute("aria-label", `Editar ${libro.titulo ?? "libro"}`);
    botonEditar.textContent = "Editar";
    acciones.appendChild(botonEditar);

    // Crea el botón para eliminar el libro.
    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.classList.add("table-action", "table-action-delete");
    botonEliminar.dataset.id = libro.id;
    botonEliminar.setAttribute("aria-label", `Eliminar ${libro.titulo ?? "libro"}`);
    botonEliminar.textContent = "Eliminar";
    acciones.appendChild(botonEliminar);

    // Añade las acciones y la tarjeta completa al fragmento.
    tarjeta.appendChild(acciones);
    fragmento.appendChild(tarjeta);
  });

  // Inserta todas las tarjetas en el contenedor en una sola operación.
  contenedor.appendChild(fragmento);
  actualizarResumenCatalogo(lista.length);
}

// Muestra cuántos libros se ven del total del catálogo.
function actualizarResumenCatalogo(cantidadVisible) {
  const resumen = document.getElementById("catalogo-resumen");

  if (!resumen) {
    return;
  }

  resumen.textContent = `Mostrando ${cantidadVisible} de ${librosOriginales.length} libros.`;
}

// Muestra un mensaje de error visible dentro del catálogo.
function mostrarErrorCatalogo(texto) {
  const contenedor = document.getElementById("catalogo-grid");

  if (!contenedor) {
    return;
  }

  contenedor.replaceChildren();

  const mensaje = document.createElement("p");
  mensaje.classList.add("estado-mensaje", "estado-mensaje-error");
  mensaje.setAttribute("role", "alert");
  mensaje.textContent = texto;
  contenedor.appendChild(mensaje);
}

// Obtiene los controles del sistema de filtros.
const buscador = document.getElementById("buscador");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroEditorial = document.getElementById("filtro-editorial");
const filtroEstado = document.getElementById("filtro-estado");
const botonLimpiar = document.getElementById("limpiar-filtros");

// Pasa el texto a minúsculas y quita acentos para comparar sin errores.
function normalizarTexto(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

// Genera las opciones de categoría y editorial a partir de los datos originales.
function generarOpcionesFiltros() {
  // Comprueba que los controles y los datos estén disponibles.
  if (
    !Array.isArray(librosOriginales) ||
    !filtroCategoria ||
    !filtroEditorial
  ) {
    return;
  }

  // Genera las categorías válidas definidas en validacion.js.
  const categorias = CATEGORIAS_VALIDAS;

  // Obtiene las editoriales únicas presentes en el catálogo.
  const editoriales = [
    ...new Set(
      librosOriginales
        .map((libro) => libro.editorial)
        .filter(Boolean)
    )
  ].sort((a, b) => a.localeCompare(b, "es"));

  // Limpia las opciones anteriores y conserva la opción inicial.
  filtroCategoria.replaceChildren();
  filtroEditorial.replaceChildren();

  const opcionCategoria = document.createElement("option");
  opcionCategoria.value = "";
  opcionCategoria.textContent = "Todas las categorías";
  filtroCategoria.appendChild(opcionCategoria);

  const opcionEditorial = document.createElement("option");
  opcionEditorial.value = "";
  opcionEditorial.textContent = "Todas las editoriales";
  filtroEditorial.appendChild(opcionEditorial);

  // Añade las categorías válidas al selector.
  categorias.forEach((categoria) => {
    const opcion = document.createElement("option");
    opcion.value = categoria;
    opcion.textContent = categoria;
    filtroCategoria.appendChild(opcion);
  });

  // Añade las editoriales encontradas en los libros.
  editoriales.forEach((editorial) => {
    const opcion = document.createElement("option");
    opcion.value = editorial;
    opcion.textContent = editorial;
    filtroEditorial.appendChild(opcion);
  });
}

// Filtra el catálogo combinando todos los criterios seleccionados.
function filtrarLibros() {
  // Comprueba que exista el arreglo original y los controles.
  if (
    !Array.isArray(librosOriginales) ||
    !buscador ||
    !filtroCategoria ||
    !filtroEditorial ||
    !filtroEstado
  ) {
    return;
  }

  // Obtiene los valores actuales de los controles.
  const textoBusqueda = normalizarTexto(buscador.value.trim());
  const categoriaSeleccionada = filtroCategoria.value;
  const editorialSeleccionada = filtroEditorial.value;
  const estadoSeleccionado = filtroEstado.value;

  // Aplica todos los criterios sobre el arreglo original.
  const resultado = librosOriginales.filter((libro) => {
    const coincideBusqueda = [
      libro.titulo,
      libro.autor,
      libro.editorial,
      libro.isbn
    ].some((dato) => normalizarTexto(dato).includes(textoBusqueda));

    const coincideCategoria =
      !categoriaSeleccionada ||
      libro.categoria === categoriaSeleccionada;

    const coincideEditorial =
      !editorialSeleccionada ||
      libro.editorial === editorialSeleccionada;

    const coincideEstado =
      !estadoSeleccionado ||
      calcularEstado(libro) === estadoSeleccionado;

    return (
      coincideBusqueda &&
      coincideCategoria &&
      coincideEditorial &&
      coincideEstado
    );
  });

  // Renderiza los libros que cumplen todos los criterios.
  renderizarLibros(resultado);
}

// Restablece los controles y muestra nuevamente todo el catálogo.
function limpiarFiltros() {
  if (
    !buscador ||
    !filtroCategoria ||
    !filtroEditorial ||
    !filtroEstado
  ) {
    return;
  }

  buscador.value = "";
  filtroCategoria.value = "";
  filtroEditorial.value = "";
  filtroEstado.value = "";

  filtrarLibros();
}

// Registra los eventos de búsqueda y selección de filtros.
function inicializarFiltros() {
  if (
    !buscador ||
    !filtroCategoria ||
    !filtroEditorial ||
    !filtroEstado ||
    !botonLimpiar
  ) {
    return;
  }

  generarOpcionesFiltros();

  buscador.addEventListener("input", filtrarLibros);
  filtroCategoria.addEventListener("change", filtrarLibros);
  filtroEditorial.addEventListener("change", filtrarLibros);
  filtroEstado.addEventListener("change", filtrarLibros);
  botonLimpiar.addEventListener("click", limpiarFiltros);
}

// Recalcula los tres indicadores del dashboard a partir de los datos reales.
function actualizarKPIs() {
  const elTotal = document.getElementById("kpi-total-libros");
  const elBajo = document.getElementById("kpi-inventario-bajo");
  const elValor = document.getElementById("kpi-valor-inventario");

  if (!elTotal || !elBajo || !elValor) {
    return;
  }

  // Libros registrados: títulos activos en el catálogo.
  const totalLibros = librosOriginales.filter((libro) => libro.activo === true).length;

  // Inventario bajo: stock igual o inferior al mínimo (incluye agotados).
  const inventarioBajo = librosOriginales.filter(
    (libro) => Number(libro.stock) <= Number(libro.stockMinimo)
  ).length;

  // Valor del inventario: precio por unidades disponibles, sumado en todo el catálogo.
  const valorInventario = librosOriginales.reduce(
    (total, libro) => total + Number(libro.precio) * Number(libro.stock),
    0
  );

  const formatoMoneda = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  });

  elTotal.textContent = totalLibros;
  elBajo.textContent = inventarioBajo;
  elValor.textContent = formatoMoneda.format(valorInventario);
}

/* =========================================================
   MODAL DE CREACIÓN Y EDICIÓN DE LIBROS
   ========================================================= */

let elementoQueAbrioModal = null;
let libroEnEdicionId = null;

const modalLibro = document.getElementById("modal-libro");
const formularioLibro = document.getElementById("form-libro");
const botonAgregar = document.getElementById("boton-agregar");
const botonCancelarLibro = document.getElementById("boton-cancelar-libro");

const camposLibro = [
  "titulo",
  "categoria",
  "precio",
  "stock",
  "stockMinimo",
  "autor",
  "editorial",
  "isbn",
  "anioPublicacion"
];

const editorialesValidas = [
  "Planeta",
  "Penguin Random House",
  "Alfaguara",
  "Anagrama",
  "Norma",
  "Editorial Sudamericana",
  "McGraw-Hill"
];

// Recupera un límite de validacion.js (LIMITES[campo].min / .max o .minimo / .maximo).
function obtenerLimite(campo, tipo) {
  const limitesCampo = LIMITES[campo];

  if (limitesCampo && typeof limitesCampo === "object") {
    return limitesCampo[tipo] ??
      limitesCampo[tipo === "min" ? "minimo" : "maximo"];
  }

  return undefined;
}

// Limpia los mensajes y estados de error del formulario.
function limpiarErroresFormulario() {
  camposLibro.forEach((campo) => {
    const control = formularioLibro.elements.namedItem(campo);
    const mensaje = document.getElementById(`error-${campo}`);

    control.removeAttribute("aria-invalid");
    mensaje.textContent = "";
  });
}

// Abre el modal para crear un libro o editar uno existente.
function abrirModal(id) {
  if (!modalLibro || !formularioLibro) return;

  elementoQueAbrioModal = document.activeElement;
  libroEnEdicionId = id ?? null;

  formularioLibro.reset();
  limpiarErroresFormulario();

  const tituloModal = document.getElementById("titulo-modal-libro");

  if (id !== undefined && id !== null) {
    const libro = librosOriginales.find(
      (elemento) => String(elemento.id) === String(id)
    );

    if (!libro) {
      libroEnEdicionId = null;
      return;
    }

    camposLibro.forEach((campo) => {
      formularioLibro.elements.namedItem(campo).value = libro[campo] ?? "";
    });

    tituloModal.textContent = "Editar libro";
  } else {
    tituloModal.textContent = "Agregar libro";
  }

  modalLibro.hidden = false;
  formularioLibro.elements.namedItem("titulo").focus();
}

// Cierra el modal y devuelve el foco al elemento que lo abrió.
function cerrarModal() {
  if (!modalLibro || modalLibro.hidden) return;

  modalLibro.hidden = true;
  formularioLibro.reset();
  limpiarErroresFormulario();

  libroEnEdicionId = null;

  if (elementoQueAbrioModal?.isConnected) {
    elementoQueAbrioModal.focus();
  }

  elementoQueAbrioModal = null;
}

// Valida los campos del formulario y devuelve un objeto con los errores por campo.
function validarFormulario() {
  const errores = {};
  const datos = {};

  limpiarErroresFormulario();

  camposLibro.forEach((campo) => {
    const control = formularioLibro.elements.namedItem(campo);
    datos[campo] = control.value.trim();
  });

  // Comprueba que los campos de texto obligatorios no estén vacíos.
  ["titulo", "autor", "isbn"].forEach((campo) => {
    if (!datos[campo]) {
      errores[campo] = "Este campo es obligatorio.";
    }
  });

  // Comprueba la longitud permitida de título y autor.
  [["titulo", "El título"], ["autor", "El autor"]].forEach(([campo, nombre]) => {
    if (!datos[campo]) return;

    const minimo = obtenerLimite(campo, "min");
    const maximo = obtenerLimite(campo, "max");

    if (minimo !== undefined && datos[campo].length < minimo) {
      errores[campo] = `${nombre} debe tener al menos ${minimo} caracteres.`;
    }

    if (maximo !== undefined && datos[campo].length > maximo) {
      errores[campo] = `${nombre} no puede superar ${maximo} caracteres.`;
    }
  });

  // Comprueba que la categoría y la editorial estén en las listas permitidas.
  if (!CATEGORIAS_VALIDAS.includes(datos.categoria)) {
    errores.categoria = "Selecciona una categoría válida.";
  }

  if (!editorialesValidas.includes(datos.editorial)) {
    errores.editorial = "Selecciona una editorial válida.";
  }

  // Convierte los campos numéricos y comprueba que sean enteros.
  const camposNumericos = ["precio", "stock", "stockMinimo", "anioPublicacion"];

  camposNumericos.forEach((campo) => {
    const valor = Number(datos[campo]);

    if (datos[campo] === "" || !Number.isInteger(valor)) {
      errores[campo] = "Introduce un número entero válido.";
      return;
    }

    datos[campo] = valor;

    const minimo = obtenerLimite(campo, "min");
    const maximo = obtenerLimite(campo, "max");

    if (minimo !== undefined && valor < minimo) {
      errores[campo] = `El valor mínimo permitido es ${minimo}.`;
    }

    if (maximo !== undefined && valor > maximo) {
      errores[campo] = `El valor máximo permitido es ${maximo}.`;
    }
  });

  // Reglas de inventario: el precio debe ser positivo y el stock no puede ser negativo.
  if (typeof datos.precio === "number" && datos.precio <= 0) {
    errores.precio = "El precio debe ser mayor que cero.";
  }

  if (typeof datos.stock === "number" && datos.stock < 0) {
    errores.stock = "El stock no puede ser negativo.";
  }

  if (typeof datos.stockMinimo === "number" && datos.stockMinimo < 0) {
    errores.stockMinimo = "El stock mínimo no puede ser negativo.";
  }

  // Comprueba que el ISBN tenga exactamente 13 dígitos.
  if (datos.isbn && !/^\d{13}$/.test(datos.isbn)) {
    errores.isbn = "El ISBN debe contener exactamente 13 dígitos.";
  }

  // Comprueba el dígito verificador del ISBN (misma regla que validarLibros).
  if (/^\d{13}$/.test(datos.isbn) && !esIsbn13Valido(datos.isbn)) {
    errores.isbn = "El dígito verificador del ISBN no es válido.";
  }

  // Evita repetir el ISBN de otro libro. Al editar, el propio libro no cuenta.
  if (/^\d{13}$/.test(datos.isbn)) {
    const isbnRepetido = librosOriginales.some((libro) =>
      String(libro.id) !== String(libroEnEdicionId) &&
      libro.isbn === datos.isbn
    );

    if (isbnRepetido) {
      errores.isbn = "Este ISBN ya está registrado en otro libro.";
    }
  }

  // Muestra cada error de forma accesible.
  Object.entries(errores).forEach(([campo, mensaje]) => {
    const control = formularioLibro.elements.namedItem(campo);
    const contenedor = document.getElementById(`error-${campo}`);

    control.setAttribute("aria-invalid", "true");
    contenedor.textContent = mensaje;
  });

  return errores;
}

// Guarda el catálogo completo en localStorage.
function guardarLibros() {
  try {
    localStorage.setItem("bookhub-libros", JSON.stringify(librosOriginales));
  } catch (error) {
    // Puede fallar si el almacenamiento está lleno o bloqueado por el navegador.
    console.error("No se pudo guardar en localStorage.", error);
    window.alert("No se pudieron guardar los cambios en este navegador. Los datos se perderán al recargar.");
  }
}

// Crea un libro nuevo o actualiza uno existente.
function guardarLibro() {
  const errores = validarFormulario();

  if (Object.keys(errores).length > 0) {
    const primerCampoInvalido = formularioLibro.querySelector(
      '[aria-invalid="true"]'
    );

    primerCampoInvalido?.focus();
    return;
  }

  const datos = {};

  camposLibro.forEach((campo) => {
    const valor = formularioLibro.elements.namedItem(campo).value.trim();

    datos[campo] = [
      "precio",
      "stock",
      "stockMinimo",
      "anioPublicacion"
    ].includes(campo)
      ? Number(valor)
      : valor;
  });

  if (libroEnEdicionId !== null) {
    // Actualiza los datos sin modificar el ID original.
    const indice = librosOriginales.findIndex(
      (libro) => String(libro.id) === String(libroEnEdicionId)
    );

    if (indice === -1) return;

    librosOriginales[indice] = {
      ...librosOriginales[indice],
      ...datos,
      id: librosOriginales[indice].id
    };
  } else {
    // Asigna un ID consecutivo superior al máximo existente.
    const idMaximo = librosOriginales.reduce(
      (maximo, libro) => Math.max(maximo, Number(libro.id) || 0),
      0
    );

    const nuevoId = idMaximo + 1;

    librosOriginales.push({
      id: nuevoId,
      codigo: `LIB${String(nuevoId).padStart(3, "0")}`,
      ...datos,
      activo: true
    });
  }

  guardarLibros();
  filtrarLibros();
  actualizarKPIs();
  actualizarGrafico();
  cerrarModal();
}

// Solicita confirmación antes de eliminar un libro.
function eliminarLibro(id) {
  const libro = librosOriginales.find(
    (elemento) => String(elemento.id) === String(id)
  );

  if (!libro) return;

  const confirmar = window.confirm(
    `¿Estás seguro de que deseas eliminar "${libro.titulo}"?`
  );

  if (!confirmar) return;

  librosOriginales = librosOriginales.filter(
    (elemento) => String(elemento.id) !== String(id)
  );

  guardarLibros();
  filtrarLibros();
  actualizarKPIs();
  actualizarGrafico();
}

// Gestiona las acciones de todas las tarjetas desde el catálogo.
function inicializarAccionesCatalogo() {
  const catalogoGrid = document.getElementById("catalogo-grid");

  if (!catalogoGrid) return;

  catalogoGrid.addEventListener("click", (evento) => {
    const boton = evento.target.closest(
      ".table-action-edit, .table-action-delete"
    );

    if (!boton || !catalogoGrid.contains(boton)) return;

    const id = boton.dataset.id;

    if (id === undefined) return;

    if (boton.classList.contains("table-action-edit")) {
      abrirModal(id);
      return;
    }

    if (boton.classList.contains("table-action-delete")) {
      eliminarLibro(id);
    }
  });
}

// Actualiza el gráfico de barras con la cantidad de libros por categoría.
function actualizarGrafico() {
  if (typeof window.Chart === "undefined") {
    console.warn("Chart.js no está disponible. No se pudo actualizar el gráfico.");
    return;
  }

  const canvas = document.getElementById("grafico-categorias");

  if (!canvas) {
    console.warn('No se encontró el canvas "#grafico-categorias".');
    return;
  }

  const categorias = CATEGORIAS_VALIDAS;

  const cantidades = categorias.map((categoria) =>
    librosOriginales.filter((libro) => libro.categoria === categoria).length
  );

  if (!window.graficoCategorias) {
    window.graficoCategorias = new window.Chart(canvas, {
      type: "bar",
      data: {
        labels: [...categorias],
        datasets: [
          {
            label: "Libros por categoría",
            data: cantidades,
            backgroundColor: "#D5AD70",
            borderColor: "#243D32",
            borderWidth: 1,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    return;
  }

  window.graficoCategorias.data.labels = [...categorias];
  window.graficoCategorias.data.datasets[0].data = cantidades;
  window.graficoCategorias.update();
}

// Registra los eventos del modal.
function inicializarModalLibros() {
  if (!modalLibro || !formularioLibro || !botonAgregar || !botonCancelarLibro) {
    return;
  }

  botonAgregar.addEventListener("click", () => abrirModal());
  botonCancelarLibro.addEventListener("click", cerrarModal);

  // La tecla Escape cierra el modal cuando está abierto.
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !modalLibro.hidden) {
      evento.preventDefault();
      cerrarModal();
    }
  });

  // Valida y guarda el formulario sin duplicar la validación.
  formularioLibro.addEventListener("submit", (evento) => {
    evento.preventDefault();
    guardarLibro();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarModalLibros();
  inicializarAccionesCatalogo();
});

// Lee y valida los datos guardados en localStorage. Devuelve null si no hay datos utilizables.
function leerLibrosGuardados() {
  let guardados = null;

  try {
    guardados = localStorage.getItem("bookhub-libros");
  } catch (error) {
    console.error("No se pudo acceder a localStorage.", error);
    return null;
  }

  if (!guardados) {
    return null;
  }

  try {
    const datos = JSON.parse(guardados);

    // Solo se descartan datos con estructura corrupta (no un arreglo de objetos).
    if (!Array.isArray(datos) || datos.some((libro) => libro === null || typeof libro !== "object")) {
      console.warn("Los datos guardados no tienen la estructura esperada. Se cargará libros.json.");
      return null;
    }

    // Los errores de contenido se informan en consola, pero no se pierden los cambios del usuario.
    const errores = validarLibros(datos);

    if (errores.length > 0) {
      console.warn(`Los datos guardados tienen ${errores.length} advertencia(s) de validación.`);
      console.table(errores);
    }

    return datos;
  } catch (error) {
    console.error("No se pudieron leer los datos guardados.", error);
    return null;
  }
}

// Carga el catálogo: primero localStorage, y si no hay datos, libros.json.
async function cargarLibros() {
  const guardados = leerLibrosGuardados();

  if (guardados) {
    librosOriginales = guardados;
  } else {
    try {
      const respuesta = await fetch("libros.json");

      if (!respuesta.ok) {
        throw new Error(`Respuesta HTTP ${respuesta.status}`);
      }

      const datos = await respuesta.json();
      const errores = validarLibros(datos);

      if (errores.length > 0) {
        console.table(errores);
        throw new Error(`libros.json tiene ${errores.length} error(es) de validación.`);
      }

      librosOriginales = datos;
      guardarLibros();
    } catch (error) {
      console.error("No se pudo cargar libros.json.", error);
      mostrarErrorCatalogo(
        "No se pudo cargar el catálogo. Si abriste el archivo directamente, ejecútalo desde un servidor local (por ejemplo, Live Server) y recarga la página."
      );
      return;
    }
  }

  inicializarFiltros();
  filtrarLibros();
  actualizarKPIs();
  actualizarGrafico();
}

cargarLibros();