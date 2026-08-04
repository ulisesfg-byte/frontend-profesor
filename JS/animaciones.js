function inicializarAnimaciones() {
    const elementos = document.querySelectorAll('.elemento-animado');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    elementos.forEach(el => observer.observe(el));
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", inicializarAnimaciones);