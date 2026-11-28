const CATEGORIAS_VALIDAS = [
    "Literatura",
    "Ciencia y tecnología",
    "Educación",
    "Historia",
    "Infantil y juvenil",
    "Desarrollo personal"
];

const LIMITES = {
    titulo: {
        minimo: 3,
        maximo: 120
    },
    autor: {
        minimo: 3,
        maximo: 80
    },
    editorial: {
        minimo: 3,
        maximo: 80
    },
    anioPublicacion: {
        minimo: 1450,
        maximo: 2026
    }
};

function validarLibros(lista) {
    const errores = [];

    // Validar que la entrada sea un arreglo.
    if (!Array.isArray(lista)) {
        return [{
            indice: null,
            id: null,
            campo: "lista",
            descripcion: "La información proporcionada debe ser un arreglo."
        }];
    }

    // Conjuntos para detectar valores duplicados.
    const idsRegistrados = new Set();
    const codigosRegistrados = new Set();
    const isbnRegistrados = new Set();

    // Recorrer todos los libros.
    lista.forEach((libro, indice) => {

        // Evitar errores si un elemento no es un objeto válido.
        if (
            libro === null ||
            typeof libro !== "object" ||
            Array.isArray(libro)
        ) {
            errores.push({
                indice,
                id: null,
                campo: "libro",
                descripcion: "El registro debe ser un objeto válido."
            });

            return;
        }

        const idLibro = libro.id;

        // Función auxiliar para registrar errores.
        const agregarError = (campo, descripcion) => {
            errores.push({
                indice,
                id: idLibro ?? null,
                campo,
                descripcion
            });
        };

        // 1. VALIDAR ID.
        if (
            !Number.isInteger(libro.id) ||
            libro.id <= 0
        ) {
            agregarError(
                "id",
                "El ID debe ser un número entero mayor que cero."
            );
        } else if (idsRegistrados.has(libro.id)) {
            agregarError(
                "id",
                `El ID ${libro.id} está duplicado.`
            );
        } else {
            idsRegistrados.add(libro.id);
        }

        // 2. VALIDAR CÓDIGO.
        if (
            typeof libro.codigo !== "string" ||
            !/^LIB\d{3}$/.test(libro.codigo)
        ) {
            agregarError(
                "codigo",
                "El código debe tener el formato LIB seguido de tres dígitos."
            );
        } else if (codigosRegistrados.has(libro.codigo)) {
            agregarError(
                "codigo",
                `El código ${libro.codigo} está duplicado.`
            );
        } else {
            codigosRegistrados.add(libro.codigo);
        }

        // 3. VALIDAR TÍTULO.
        if (
            typeof libro.titulo !== "string" ||
            libro.titulo.trim().length < LIMITES.titulo.minimo ||
            libro.titulo.trim().length > LIMITES.titulo.maximo
        ) {
            agregarError(
                "titulo",
                `El título debe contener entre ${LIMITES.titulo.minimo} y ${LIMITES.titulo.maximo} caracteres.`
            );
        }

        // 4. VALIDAR AUTOR.
        if (
            typeof libro.autor !== "string" ||
            libro.autor.trim().length < LIMITES.autor.minimo ||
            libro.autor.trim().length > LIMITES.autor.maximo
        ) {
            agregarError(
                "autor",
                `El autor debe contener entre ${LIMITES.autor.minimo} y ${LIMITES.autor.maximo} caracteres.`
            );
        }

        // 5. VALIDAR EDITORIAL.
        if (
            typeof libro.editorial !== "string" ||
            libro.editorial.trim().length < LIMITES.editorial.minimo ||
            libro.editorial.trim().length > LIMITES.editorial.maximo
        ) {
            agregarError(
                "editorial",
                `La editorial debe contener entre ${LIMITES.editorial.minimo} y ${LIMITES.editorial.maximo} caracteres.`
            );
        }

        // 6. VALIDAR CATEGORÍA.
        if (!CATEGORIAS_VALIDAS.includes(libro.categoria)) {
            agregarError(
                "categoria",
                `La categoría debe pertenecer a la lista de categorías válidas: ${CATEGORIAS_VALIDAS.join(", ")}.`
            );
        }

        // 7. VALIDAR PRECIO.
        if (
            !Number.isInteger(libro.precio) ||
            libro.precio <= 0
        ) {
            agregarError(
                "precio",
                "El precio debe ser un número entero positivo."
            );
        }

        // 8. VALIDAR STOCK.
        if (
            !Number.isInteger(libro.stock) ||
            libro.stock < 0
        ) {
            agregarError(
                "stock",
                "El stock debe ser un número entero mayor o igual a cero."
            );
        }

        // 9. VALIDAR STOCK MÍNIMO.
        if (
            !Number.isInteger(libro.stockMinimo) ||
            libro.stockMinimo < 0
        ) {
            agregarError(
                "stockMinimo",
                "El stock mínimo debe ser un número entero mayor o igual a cero."
            );
        }

        // 10. VALIDAR ISBN.
        if (
            typeof libro.isbn !== "string" ||
            !/^\d{13}$/.test(libro.isbn)
        ) {
            agregarError(
                "isbn",
                "El ISBN debe contener exactamente 13 dígitos numéricos."
            );
        } else {
            if (isbnRegistrados.has(libro.isbn)) {
                agregarError(
                    "isbn",
                    `El ISBN ${libro.isbn} está duplicado.`
                );
            } else {
                isbnRegistrados.add(libro.isbn);
            }

            // Calcula el dígito verificador y lo compara con el último dígito.
            const digitosIsbn = libro.isbn.slice(0, 12).split("").map(Number);
            const sumaIsbn = digitosIsbn.reduce((total, d, i) => total + d * (i % 2 === 0 ? 1 : 3), 0);
            const controlEsperado = (10 - (sumaIsbn % 10)) % 10;

            if (controlEsperado !== Number(libro.isbn[12])) {
                agregarError(
                    "isbn",
                    "El dígito verificador del ISBN no es válido."
                );
            }
        }

        // 11. VALIDAR AÑO DE PUBLICACIÓN.
        if (
            !Number.isInteger(libro.anioPublicacion) ||
            libro.anioPublicacion < LIMITES.anioPublicacion.minimo ||
            libro.anioPublicacion > LIMITES.anioPublicacion.maximo
        ) {
            agregarError(
                "anioPublicacion",
                `El año de publicación debe ser un entero entre ${LIMITES.anioPublicacion.minimo} y ${LIMITES.anioPublicacion.maximo}.`
            );
        }

        // 12. VALIDAR ESTADO ACTIVO.
        if (typeof libro.activo !== "boolean") {
            agregarError(
                "activo",
                "El campo activo debe contener un valor booleano (true o false)."
            );
        }
    });

    return errores;
}