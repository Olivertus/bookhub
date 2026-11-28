
/* =========================================================
   BOOKHUB - HOJA DE ESTILOS PRINCIPAL
   Diseño editorial moderno, minimalista y responsive
   ========================================================= */


/* 1. VARIABLES GLOBALES */
:root {
    /* Paleta de colores */
    --color-forest-green: #243D32;
    --color-cream: #F5F0E6;
    --color-gold: #D5AD70;
    --color-dark-terracotta: #8B3F2B;
    --color-charcoal: #303330;
    --color-white: #FFFFFF;

    /* Colores de apoyo */
    --color-border: #D8D2C7;
    --color-muted: #686B66;
    --color-focus: #8B3F2B;
    --color-overlay: rgba(36, 61, 50, 0.08);

    /* Familias tipográficas */
    --font-heading: "Playfair Display", Georgia, serif;
    --font-body: "Inter", Arial, sans-serif;

    /* Tamaños tipográficos */
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 2rem;
    --font-size-4xl: 2.5rem;

    /* Espaciados */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;
    --space-20: 5rem;
    --space-24: 6rem;

    /* Radios */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;

    /* Ancho del contenido */
    --container-width: 1280px;
    --container-padding: 1.25rem;

    /* Sombras */
    --shadow-soft: 0 4px 18px rgba(48, 51, 48, 0.07);
    --shadow-card: 0 8px 28px rgba(48, 51, 48, 0.09);
    --shadow-hover: 0 12px 32px rgba(48, 51, 48, 0.13);

    /* Transiciones */
    --transition-fast: 180ms ease;
    --transition-normal: 280ms ease;

    /* Accesibilidad */
    --focus-outline: 3px solid var(--color-dark-terracotta);
    --focus-offset: 4px;
}


/* 2. RESETEO Y CONFIGURACIÓN GENERAL */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: 5rem;
}

body {
    background-color: var(--color-cream);
    color: var(--color-charcoal);
    font-family: var(--font-body);
    font-size: var(--font-size-base);
    font-weight: 400;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
}

img {
    display: block;
    max-width: 100%;
    height: auto;
}

a {
    color: inherit;
    text-decoration: none;
    transition:
        color var(--transition-fast),
        background-color var(--transition-fast),
        border-color var(--transition-fast),
        box-shadow var(--transition-fast),
        transform var(--transition-fast);
}

button,
input {
    font: inherit;
}

button {
    cursor: pointer;
}

ul {
    list-style: none;
}

h1,
h2,
h3,
h4 {
    color: var(--color-forest-green);
    font-family: var(--font-heading);
    font-weight: 600;
    line-height: 1.2;
}

p {
    max-width: 70ch;
}

::selection {
    background-color: var(--color-forest-green);
    color: var(--color-white);
}

:focus-visible {
    outline: var(--focus-outline);
    outline-offset: var(--focus-offset);
}


/* 3. CONTENEDOR GENERAL */
.container {
    width: min(100% - (var(--container-padding) * 2), var(--container-width));
    margin-inline: auto;
}


/* 4. BOTONES Y ENLACES */
.button {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    justify-content: center;
    padding: 0.8rem 1.25rem;
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    font-family: var(--font-body);
    font-size: var(--font-size-sm);
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
    transition:
        background-color var(--transition-fast),
        color var(--transition-fast),
        border-color var(--transition-fast),
        box-shadow var(--transition-fast),
        transform var(--transition-fast);
}

/* Botón principal */
.button-primary {
    background-color: var(--color-forest-green);
    border-color: var(--color-forest-green);
    color: var(--color-white);
}

.button-primary:hover {
    background-color: #192E25;
    border-color: #192E25;
    box-shadow: var(--shadow-soft);
    transform: translateY(-2px);
}

.button-primary:active {
    background-color: #14241D;
    border-color: #14241D;
    box-shadow: none;
    transform: translateY(0);
}

/* Botón secundario */
.button-secondary {
    background-color: var(--color-cream);
    border-color: var(--color-forest-green);
    color: var(--color-forest-green);
}

.button-secondary:hover {
    background-color: #EAE3D6;
    border-color: #192E25;
    box-shadow: var(--shadow-soft);
    transform: translateY(-2px);
}

.button-secondary:active {
    background-color: #DED6C8;
    transform: translateY(0);
}

/* Enlaces de texto */
.text-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-forest-green);
    font-size: var(--font-size-sm);
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
}

.text-link:hover {
    color: var(--color-dark-terracotta);
    text-decoration-color: currentColor;
}

.text-link:active {
    color: #6E3021;
}

/* Foco específico para controles interactivos */
.button:focus-visible,
.text-link:focus-visible,
a:focus-visible,
button:focus-visible {
    outline: var(--focus-outline);
    outline-offset: var(--focus-offset);
}


/* 5. ENCABEZADOS DE SECCIÓN */
.section-heading {
    max-width: 720px;
    margin: 0 auto var(--space-8);
    text-align: center;
}

.section-eyebrow,
.hero-eyebrow {
    margin-bottom: var(--space-3);
    color: var(--color-dark-terracotta);
    font-size: var(--font-size-xs);
    font-weight: 700;
    letter-spacing: 0.12em;
    line-height: 1.4;
    text-transform: uppercase;
}

.section-heading h2 {
    margin-bottom: var(--space-4);
    font-size: clamp(1.75rem, 7vw, 2.5rem);
}

.section-description {
    margin-inline: auto;
    color: var(--color-muted);
    font-size: var(--font-size-base);
    line-height: 1.7;
}

.section-action {
    display: flex;
    justify-content: center;
    margin-top: var(--space-8);
}


/* 6. HEADER Y NAVEGACIÓN */
.site-header {
    position: relative;
    z-index: 10;
    background-color: var(--color-forest-green);
    color: var(--color-white);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    padding-block: var(--space-4);
}

.site-logo {
    color: var(--color-white);
    font-family: var(--font-heading);
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: -0.04em;
}

.site-logo:hover {
    color: var(--color-gold);
}

.site-header .main-navigation {
    width: 100%;
}

.navigation-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-2) var(--space-4);
}

.navigation-list a {
    display: inline-flex;
    min-height: 36px;
    align-items: center;
    color: var(--color-white);
    font-size: var(--font-size-sm);
    font-weight: 500;
}

.navigation-list a:hover {
    color: var(--color-gold);
}

.navigation-list a:active {
    color: #E7C99C;
}

.header-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-2);
}

.header-actions .button {
    font-size: var(--font-size-xs);
    padding-inline: 1rem;
}

.site-header .button-secondary {
    background-color: transparent;
    border-color: var(--color-white);
    color: var(--color-white);
}

.site-header .button-secondary:hover {
    background-color: rgba(255, 255, 255, 0.12);
    border-color: var(--color-gold);
    color: var(--color-white);
}

.site-header .button-secondary:active {
    background-color: rgba(255, 255, 255, 0.2);
}

/* Botón principal del header */
.site-header .button-primary {
    background-color: var(--color-gold);
    border-color: var(--color-gold);
    color: var(--color-charcoal);
}

.site-header .button-primary:hover {
    background-color: #E7C99C;
    border-color: #E7C99C;
    color: var(--color-charcoal);
}

.site-header .button-primary:active {
    background-color: #C49A5D;
    border-color: #C49A5D;
    color: var(--color-charcoal);
}

/* Contorno de foco dorado en el header */
.site-header a:focus-visible,
.site-header button:focus-visible {
    outline: 3px solid var(--color-gold);
    outline-offset: var(--focus-offset);
}


/* 7. HERO */
.hero-section {
    padding-block: var(--space-16);
    overflow: hidden;
}

.hero-container {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: var(--space-8);
}

.hero-content {
    text-align: center;
}

.hero-content h1 {
    margin-bottom: var(--space-5);
    font-size: clamp(2.25rem, 9vw, 3.75rem);
    letter-spacing: -0.035em;
}

.hero-description {
    margin: 0 auto var(--space-6);
    color: var(--color-muted);
    font-size: var(--font-size-base);
    line-height: 1.75;
}

.hero-visual {
    width: 100%;
}

.hero-image {
    width: 100%;
    max-height: 380px;
    border-radius: var(--radius-lg);
    object-fit: cover;
    box-shadow: var(--shadow-card);
}


/* 8. CATEGORÍAS */
.categories-section {
    padding-block: var(--space-16);
    background-color: var(--color-white);
}

.categories-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-4);
}

.category-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-height: 250px;
    padding: var(--space-6);
    background-color: var(--color-cream);
    border: 1px solid rgba(36, 61, 50, 0.08);
    border-radius: var(--radius-md);
    transition:
        transform var(--transition-normal),
        box-shadow var(--transition-normal),
        border-color var(--transition-normal);
}

.category-card:hover {
    border-color: rgba(36, 61, 50, 0.25);
    box-shadow: var(--shadow-card);
    transform: translateY(-4px);
}

.category-icon {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    margin-bottom: var(--space-4);
    background-color: var(--color-forest-green);
    border-radius: var(--radius-sm);
    color: var(--color-gold);
    font-size: 1.5rem;
}

.category-card h3 {
    margin-bottom: var(--space-3);
    font-size: var(--font-size-xl);
}

.category-card p {
    margin-bottom: var(--space-5);
    color: var(--color-muted);
    font-size: var(--font-size-sm);
    line-height: 1.7;
}

.category-card .text-link {
    margin-top: auto;
}


/* 9. LIBROS DESTACADOS Y NOVEDADES */
.featured-section,
.new-arrivals-section {
    padding-block: var(--space-16);
}

.new-arrivals-section {
    background-color: var(--color-white);
}

.books-grid,
.new-arrivals-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-5);
}

.book-card {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--color-white);
    border: 1px solid rgba(48, 51, 48, 0.08);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-soft);
    transition:
        transform var(--transition-normal),
        box-shadow var(--transition-normal);
}

.book-card:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-4px);
}

.book-cover {
    width: 100%;
    aspect-ratio: 3 / 4;
    background-color: #EAE3D6;
    object-fit: cover;
}

.book-information {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--space-5);
}

.book-category {
    margin-bottom: var(--space-2);
    color: var(--color-dark-terracotta);
    font-size: var(--font-size-xs);
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.book-information h3 {
    margin-bottom: var(--space-2);
    font-size: var(--font-size-xl);
}

.book-author {
    margin-bottom: var(--space-3);
    color: var(--color-muted);
    font-size: var(--font-size-sm);
}

.book-description {
    margin-bottom: var(--space-5);
    color: var(--color-charcoal);
    font-size: var(--font-size-sm);
    line-height: 1.65;
}

.book-information .button {
    width: 100%;
    margin-top: auto;
}


/* 10. ETIQUETA DE NOVEDADES */
.new-book-card {
    position: relative;
}

.new-label {
    position: absolute;
    top: var(--space-3);
    left: var(--space-3);
    z-index: 1;
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.75rem;
    background-color: var(--color-dark-terracotta);
    border-radius: var(--radius-sm);
    color: var(--color-white);
    font-size: var(--font-size-xs);
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}


/* 11. BENEFICIOS */
.benefits-section {
    padding-block: var(--space-16);
    background-color: var(--color-forest-green);
    color: var(--color-white);
}

.benefits-section .section-heading h2 {
    color: var(--color-white);
}

.benefits-section .section-eyebrow {
    color: var(--color-gold);
}

.benefits-section .section-description {
    color: rgba(255, 255, 255, 0.82);
}

.benefits-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-4);
}

.benefit-card {
    padding: var(--space-6);
    background-color: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(213, 173, 112, 0.35);
    border-radius: var(--radius-md);
    transition:
        background-color var(--transition-normal),
        transform var(--transition-normal);
}

.benefit-card:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
}

.benefit-icon {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    margin-bottom: var(--space-4);
    background-color: rgba(213, 173, 112, 0.12);
    border-radius: var(--radius-sm);
    color: var(--color-gold);
    font-size: 1.5rem;
}

.benefit-card h3 {
    margin-bottom: var(--space-3);
    color: var(--color-white);
    font-size: var(--font-size-xl);
}

.benefit-card p {
    color: rgba(255, 255, 255, 0.82);
    font-size: var(--font-size-sm);
    line-height: 1.7;
}

.benefits-section .button-primary {
    background-color: var(--color-cream);
    border-color: var(--color-cream);
    color: var(--color-forest-green);
}

.benefits-section .button-primary:hover {
    background-color: #EAE3D6;
    border-color: #EAE3D6;
}

.benefits-section .button-primary:active {
    background-color: #DED6C8;
}


/* 12. AUTORES Y RESEÑAS */
.authors-reviews-section {
    padding-block: var(--space-16);
    background-color: var(--color-cream);
}

.authors-reviews-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-8);
}

.authors-block,
.reviews-block {
    min-width: 0;
}

.block-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    margin-bottom: var(--space-5);
}

.block-heading h3 {
    font-size: var(--font-size-2xl);
}

.example-label {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.65rem;
    background-color: #F0E2D9;
    border: 1px solid #D9B8A7;
    border-radius: var(--radius-sm);
    color: #6E3021;
    font-size: var(--font-size-xs);
    font-weight: 700;
    line-height: 1.4;
}

.authors-list,
.reviews-list {
    display: grid;
    gap: var(--space-4);
}

.author-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-5);
    background-color: var(--color-white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-soft);
    text-align: center;
}

.author-image {
    width: 112px;
    height: 112px;
    flex-shrink: 0;
    border-radius: 50%;
    object-fit: cover;
}

.author-information h4 {
    margin-bottom: var(--space-2);
    font-size: var(--font-size-xl);
}

.author-information p {
    color: var(--color-muted);
    font-size: var(--font-size-sm);
    line-height: 1.7;
}

.review-card {
    position: relative;
    padding: var(--space-6);
    background-color: var(--color-white);
    border-left: 3px solid var(--color-dark-terracotta);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-soft);
}

.review-decoration {
    margin-bottom: var(--space-2);
    color: var(--color-dark-terracotta);
    font-family: var(--font-heading);
    font-size: 3.5rem;
    line-height: 0.8;
}

.review-card blockquote p {
    margin-bottom: var(--space-5);
    color: var(--color-charcoal);
    font-family: var(--font-heading);
    font-size: var(--font-size-lg);
    font-style: italic;
    line-height: 1.65;
}

.review-author {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    color: var(--color-forest-green);
    font-size: var(--font-size-sm);
    font-weight: 700;
}

.review-example-note {
    color: var(--color-muted);
    font-size: var(--font-size-xs);
    font-weight: 400;
}


/* 13. SUSCRIPCIÓN */
.subscription-section {
    padding-block: var(--space-16);
    background-color: var(--color-white);
}

.subscription-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-8);
    align-items: center;
}

.subscription-content h2 {
    margin-bottom: var(--space-4);
    font-size: clamp(1.75rem, 7vw, 2.5rem);
}

.subscription-description {
    color: var(--color-muted);
    line-height: 1.75;
}

.subscription-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    padding: var(--space-6);
    background-color: var(--color-cream);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.form-field label {
    color: var(--color-charcoal);
    font-size: var(--font-size-sm);
    font-weight: 600;
}

.form-field input {
    width: 100%;
    min-height: 48px;
    padding: 0.75rem 1rem;
    background-color: var(--color-white);
    border: 1px solid #777A74;
    border-radius: var(--radius-sm);
    color: var(--color-charcoal);
    font-size: var(--font-size-base);
    transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
}

.form-field input::placeholder {
    color: #686B66;
    opacity: 1;
}

.form-field input:hover {
    border-color: var(--color-forest-green);
}

.form-field input:focus {
    border-color: var(--color-forest-green);
    outline: 3px solid rgba(36, 61, 50, 0.2);
    outline-offset: 2px;
}

.form-consent {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
}

.form-consent input {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-top: 2px;
    accent-color: var(--color-forest-green);
    cursor: pointer;
}

.form-consent input:focus-visible {
    outline: var(--focus-outline);
    outline-offset: 3px;
}

.form-consent label {
    color: var(--color-charcoal);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    cursor: pointer;
}

.subscription-form .button {
    width: 100%;
    min-height: 48px;
}

.form-disclaimer {
    color: var(--color-muted);
    font-size: var(--font-size-xs);
    line-height: 1.6;
    text-align: center;
}


/* 14. FOOTER */
.site-footer {
    padding-top: var(--space-12);
    background-color: var(--color-forest-green);
    color: var(--color-white);
}

/* Contorno de foco dorado en el footer */
.site-footer a:focus-visible,
.site-footer button:focus-visible {
    outline: 3px solid var(--color-gold);
    outline-offset: var(--focus-offset);
}

.footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-8);
    padding-bottom: var(--space-10);
}

.footer-brand .site-logo {
    display: inline-block;
    margin-bottom: var(--space-4);
}

.footer-description {
    max-width: 360px;
    color: rgba(255, 255, 255, 0.8);
    font-size: var(--font-size-sm);
    line-height: 1.75;
}

.footer-content h2 {
    margin-bottom: var(--space-4);
    color: var(--color-white);
    font-family: var(--font-body);
    font-size: var(--font-size-base);
    font-weight: 700;
}

.footer-links {
    display: grid;
    gap: var(--space-3);
}

.footer-links a,
.footer-contact a,
.footer-subscription-link {
    color: rgba(255, 255, 255, 0.85);
    font-size: var(--font-size-sm);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
}

.footer-links a:hover,
.footer-contact a:hover,
.footer-subscription-link:hover {
    color: var(--color-gold);
    text-decoration-color: currentColor;
}

.footer-links a:active,
.footer-contact a:active,
.footer-subscription-link:active {
    color: #E7C99C;
}

.footer-contact p,
.footer-subscription p {
    margin-bottom: var(--space-3);
    color: rgba(255, 255, 255, 0.8);
    font-size: var(--font-size-sm);
    line-height: 1.7;
}

.footer-contact a {
    display: inline-block;
    margin-bottom: var(--space-3);
}

.contact-note {
    font-size: var(--font-size-xs) !important;
}

.footer-subscription-link {
    display: inline-block;
}

.footer-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    padding-block: var(--space-5);
    border-top: 1px solid rgba(213, 173, 112, 0.35);
    text-align: center;
}

.footer-bottom p,
.footer-bottom a {
    color: rgba(255, 255, 255, 0.8);
    font-size: var(--font-size-xs);
}

.footer-bottom a {
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
}

.footer-bottom a:hover {
    color: var(--color-gold);
    text-decoration-color: currentColor;
}

.footer-bottom a:active {
    color: #E7C99C;
}


/* =========================================================
   15. TABLET - 768 PX
   ========================================================= */
@media (min-width: 768px) {

    :root {
        --container-padding: 2rem;
    }

    /* Encabezados */
    .section-heading {
        margin-bottom: var(--space-10);
    }

    /* Header */
    .header-container {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: var(--space-4);
    }

    .site-header .main-navigation {
        width: auto;
        order: 3;
        flex-basis: 100%;
    }

    .navigation-list {
        gap: var(--space-6);
    }

    .header-actions {
        margin-left: auto;
    }

    /* Hero */
    .hero-section {
        padding-block: var(--space-20);
    }

    .hero-container {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-8);
    }

    .hero-content {
        text-align: left;
    }

    .hero-description {
        margin-inline: 0;
    }

    .hero-image {
        max-height: 420px;
    }

    /* Categorías */
    .categories-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-5);
    }

    /* Libros */
    .books-grid,
    .new-arrivals-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-6);
    }

    .book-cover {
        aspect-ratio: 3 / 4;
    }

    /* Beneficios */
    .benefits-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-5);
    }

    /* Autores y reseñas */
    .authors-reviews-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-6);
    }

    .author-card {
        flex-direction: row;
        align-items: flex-start;
        text-align: left;
    }

    .author-image {
        width: 88px;
        height: 88px;
    }

    /* Suscripción */
    .subscription-container {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-10);
    }

    /* Footer */
    .footer-content {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-8);
    }

    .footer-bottom {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
    }
}


/* =========================================================
   16. ESCRITORIO - 1024 PX
   ========================================================= */
@media (min-width: 1024px) {

    :root {
        --container-padding: 2.5rem;
    }

    /* Espaciado general de secciones */
    .hero-section,
    .categories-section,
    .featured-section,
    .new-arrivals-section,
    .benefits-section,
    .authors-reviews-section,
    .subscription-section {
        padding-block: var(--space-24);
    }

    /* Header */
    .header-container {
        flex-wrap: nowrap;
        gap: var(--space-6);
    }

    .site-header .main-navigation {
        width: auto;
        order: initial;
        flex-basis: auto;
    }

    .navigation-list {
        gap: var(--space-5);
    }

    .header-actions {
        margin-left: 0;
    }

    .header-actions .button {
        font-size: var(--font-size-sm);
    }

    /* Hero */
    .hero-container {
        gap: var(--space-16);
    }

    .hero-content h1 {
        max-width: 650px;
    }

    .hero-description {
        max-width: 550px;
    }

    .hero-image {
        max-height: 480px;
    }

    /* Categorías */
    .categories-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--space-6);
    }

    .category-card {
        min-height: 270px;
        padding: var(--space-8);
    }

    /* Libros destacados */
    .books-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--space-5);
    }

    .book-information {
        padding: var(--space-5);
    }

    /* Novedades */
    .new-arrivals-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--space-6);
    }

    /* Beneficios */
    .benefits-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--space-5);
    }

    .benefit-card {
        padding: var(--space-6);
    }

    /* Autores y reseñas */
    .authors-reviews-grid {
        gap: var(--space-10);
    }

    .author-card {
        padding: var(--space-6);
    }

    .author-image {
        width: 104px;
        height: 104px;
    }

    /* Suscripción */
    .subscription-container {
        gap: var(--space-16);
    }

    .subscription-form {
        padding: var(--space-8);
    }

    /* Footer */
    .footer-content {
        grid-template-columns: 1.5fr 1fr 1fr 1fr;
        gap: var(--space-10);
    }
}


/* =========================================================
   17. ACCESIBILIDAD Y MOVIMIENTO REDUCIDO
   ========================================================= */

/* Evita que el movimiento sea la única señal de interacción */
@media (prefers-reduced-motion: reduce) {

    html {
        scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
        scroll-behavior: auto !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    .button:hover,
    .category-card:hover,
    .book-card:hover,
    .benefit-card:hover {
        transform: none;
    }
}


/* =========================================================
   18. INDICADORES KPI (DASHBOARD)
   ========================================================= */
.kpi-section {
    margin-block: var(--space-8);
}

.kpi-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-6);
}

.kpi-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-6);
    background-color: var(--color-white);
    border: 1px solid rgba(36, 61, 50, 0.08);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-soft);
}

.kpi-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    background-color: var(--color-forest-green);
    color: var(--color-gold);
    border-radius: var(--radius-sm);
}

.kpi-icon svg {
    width: 24px;
    height: 24px;
}

.kpi-label {
    margin: 0;
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-charcoal);
}

.kpi-value {
    margin: 0;
    font-family: var(--font-body);
    font-size: 28px;
    font-weight: 700;
    color: var(--color-forest-green);
    font-variant-numeric: tabular-nums;
}

.kpi-description {
    margin: 0;
    font-size: var(--font-size-xs);
    line-height: 1.6;
    color: var(--color-muted);
}

@media (min-width: 768px) {
    .kpi-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (min-width: 1024px) {
    .kpi-section {
        margin-block: var(--space-12);
    }

    .kpi-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .kpi-card {
        padding: var(--space-8);
    }

    .kpi-value {
        font-size: 32px;
    }

    .kpi-description {
        font-size: var(--font-size-sm);
    }
}
.inventory-section {
    margin-block: var(--space-8);
}

.table-wrapper {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    background-color: var(--color-white);
    border: 1px solid rgba(36, 61, 50, 0.08);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-soft);
}

.inventory-table {
    width: 100%;
    min-width: 880px;
    border-collapse: collapse;
    font-family: var(--font-body);
    font-size: 14px;
}

.inventory-table th {
    padding: var(--space-3) var(--space-4);
    background-color: #EAE3D6;
    color: var(--color-charcoal);
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    text-transform: uppercase;
    border-bottom: 1px solid #E5E0D6;
}

.inventory-table td {
    padding: var(--space-3) var(--space-4);
    color: var(--color-charcoal);
    vertical-align: middle;
    border-bottom: 1px solid #E5E0D6;
}

.inventory-table tbody tr:nth-child(odd) {
    background-color: #FFFFFF;
}

.inventory-table tbody tr:nth-child(even) {
    background-color: #FAF7F0;
}

.inventory-table tbody tr {
    transition: background-color 180ms ease;
}

.inventory-table tbody tr:hover {
    background-color: #F0E8DA;
}

.cell-number {
    text-align: right;
    font-variant-numeric: tabular-nums;
}

.cell-actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    white-space: nowrap;
}

.badge-disponible,
.badge-stock-bajo,
.badge-agotado {
    display: inline-block;
    padding: 0.25rem 0.625rem;
    border-radius: var(--radius-sm);
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
}

.badge-disponible {
    background-color: #DCFCE7;
    color: #166534;
}

.badge-stock-bajo {
    background-color: #FEF3C7;
    color: #92400E;
}

.badge-agotado {
    background-color: #FEE2E2;
    color: #991B1B;
}

.table-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
    padding: 0.5rem 0.875rem;
    border: none;
    border-radius: var(--radius-sm);
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: color 180ms ease, background-color 180ms ease;
}

.table-action-edit {
    background-color: #243D32;
    color: #F5F0E6;
}

.table-action-edit:hover {
    background-color: #365344;
}

.table-action-delete {
    background-color: #FEE2E2;
    color: #991B1B;
}

.table-action-delete:hover {
    background-color: #FECACA;
}

.table-action:focus-visible {
    outline: 3px solid #D5AD70;
    outline-offset: 2px;
}

.table-wrapper:focus-visible {
    outline: 3px solid #8B3F2B;
    outline-offset: 4px;
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
    margin: -1px;
}

@media (min-width: 768px) {
    .inventory-section {
        margin-block: var(--space-12);
    }
}

@media (min-width: 1024px) {
    .inventory-section {
        margin-block: var(--space-16);
    }

    .inventory-table {
        min-width: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .inventory-table tbody tr,
    .table-action {
        transition: none;
    }
}


/* =========================================================
   19. MENÚ HAMBURGUESA Y SIDEBAR (DASHBOARD)
   ========================================================= */
.menu-toggle {
    position: fixed;
    top: var(--space-4);
    left: var(--space-4);
    z-index: 1100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    background-color: var(--color-forest-green);
    color: var(--color-cream);
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
}

.menu-toggle:focus-visible {
    outline: 3px solid var(--color-gold);
    outline-offset: 3px;
}

.menu-icon-open,
.menu-icon-close {
    font-size: 22px;
    line-height: 1;
}

.menu-icon-open {
    display: inline-block;
}

.menu-icon-close {
    display: none;
}

.menu-toggle.is-open .menu-icon-open {
    display: none;
}

.menu-toggle.is-open .menu-icon-close {
    display: inline-block;
}

.sidebar {
    position: fixed;
    inset-block: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    width: min(260px, 85vw);
    height: 100vh;
    padding: var(--space-6) var(--space-4);
    overflow-y: auto;
    background-color: var(--color-forest-green);
    color: var(--color-cream);
    transform: translateX(-100%);
    transition: transform 300ms ease;
}

.sidebar.is-open {
    transform: translateX(0);
}

#sidebar-overlay {
    position: fixed;
    inset: 0;
    z-index: 900;
    background-color: rgba(48, 51, 48, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: opacity 300ms ease, visibility 300ms ease;
}

#sidebar-overlay.is-visible {
    opacity: 1;
    visibility: visible;
}

.sidebar-header {
    padding: var(--space-16) var(--space-4) var(--space-4);
}

.sidebar-logo {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    color: var(--color-white);
    text-decoration: none;
}

.sidebar-divider {
    width: 100%;
    margin: var(--space-3) 0;
    border: 0;
    border-top: 1px solid rgba(213, 173, 112, 0.35);
}

.sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
}

.sidebar-link {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: 44px;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-sm);
    color: var(--color-cream);
    text-decoration: none;
}

.sidebar-link:hover {
    background-color: rgba(255, 255, 255, 0.08);
}

.sidebar-link.is-active {
    background-color: rgba(255, 255, 255, 0.12);
    border-left: 3px solid var(--color-gold);
}

.sidebar-link:focus-visible {
    outline: 3px solid var(--color-gold);
    outline-offset: 2px;
}

.sidebar-link svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
}

.sidebar-user {
    margin-top: auto;
    padding: var(--space-4);
    border-top: 1px solid rgba(213, 173, 112, 0.35);
    color: rgba(245, 240, 230, 0.75);
    font-size: 0.875rem;
}

.sidebar-user p {
    margin: 0;
}

main.container {
    padding-top: var(--space-16);
}

@media (min-width: 1024px) {
    .sidebar {
        width: 250px;
        max-width: 250px;
        transform: none;
    }

    #sidebar-overlay {
        display: none;
    }

    .menu-toggle {
        display: none;
    }

    main.container {
        margin-left: 250px;
        width: calc(100% - 250px);
        max-width: none;
        padding-top: var(--space-12);
    }
}

@media (prefers-reduced-motion: reduce) {
    .sidebar,
    #sidebar-overlay {
        transition: none;
    }
}
.modal-libro[hidden] {
  display: none;
}
/* Modal de agregar y editar libros */
.modal-libro {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

.modal-libro[hidden] {
  display: none;
}

.modal-libro-content {
  background: #ffffff;
  color: #1f2a24;
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
}

.modal-libro-content h2 {
  margin-top: 0;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.form-field label {
  font-weight: 600;
}

.form-field input,
.form-field select {
  width: 100%;
  box-sizing: border-box;
  padding: 0.6rem 0.75rem;
  border: 1px solid #8a8a8a;
  border-radius: 8px;
  font: inherit;
  background: #ffffff;
}

.form-field input:focus,
.form-field select:focus {
  outline: 3px solid #c9a227;
  outline-offset: 2px;
}

.form-field input[aria-invalid="true"],
.form-field select[aria-invalid="true"] {
  border-color: #a12b2b;
}

.field-error {
  color: #a12b2b;
  font-size: 0.875rem;
  margin: 0;
}

.field-error:empty {
  display: none;
}

.modal-libro-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.25rem;
}

.button {
  padding: 0.6rem 1.1rem;
  border-radius: 8px;
  border: 1px solid transparent;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.button-primary {
  background: #1f3b2f;
  color: #ffffff;
}

.button-secondary {
  background: #ffffff;
  color: #1f3b2f;
  border-color: #1f3b2f;
}