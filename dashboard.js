document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector("#menu-toggle");
    const sidebar = document.querySelector("#sidebar");
    const sidebarOverlay = document.querySelector("#sidebar-overlay");
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

    if (!menuToggle || !sidebar || !sidebarOverlay) {
        return;
    }

    // Actualiza las clases y los atributos ARIA según el estado del menú.
    const setMenuState = (isOpen) => {
        if (desktopMediaQuery.matches) {
            return;
        }

        sidebar.classList.toggle("is-open", isOpen);
        sidebarOverlay.classList.toggle("is-visible", isOpen);
        menuToggle.classList.toggle("is-open", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");

        if (!isOpen) {
            menuToggle.focus();
        }
    };

    // Alterna la apertura y el cierre del menú al pulsar el botón.
    const toggleMenu = () => {
        if (desktopMediaQuery.matches) {
            return;
        }

        const isOpen = sidebar.classList.contains("is-open");
        setMenuState(!isOpen);
    };

    // Limpia el estado del menú cuando la pantalla pasa a escritorio.
    const handleViewportChange = () => {
        if (desktopMediaQuery.matches) {
            sidebar.classList.remove("is-open");
            sidebarOverlay.classList.remove("is-visible");
            menuToggle.classList.remove("is-open");
            return;
        }

        setMenuState(false);
    };

    // Inicializa el menú cerrado en dispositivos móviles.
    if (!desktopMediaQuery.matches) {
        setMenuState(false);
    }

    menuToggle.addEventListener("click", toggleMenu);

    sidebarOverlay.addEventListener("click", () => {
        setMenuState(false);
    });

    sidebarLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (!desktopMediaQuery.matches) {
                setMenuState(false);
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            !desktopMediaQuery.matches &&
            sidebar.classList.contains("is-open")
        ) {
            setMenuState(false);
        }
    });

    desktopMediaQuery.addEventListener("change", handleViewportChange);
});