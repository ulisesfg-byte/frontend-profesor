// ==========================================
// LÓGICA DE INTERACCIÓN PARA EL MENÚ DESPLEGABLE
// ==========================================

// 1. SELECCIÓN DE ELEMENTOS: Guardamos en variables los elementos del HTML que vamos a manipular.
// Seleccionamos el botón de la hamburguesa mediante su ID único.
const menuBtn = document.getElementById('hamburger-btn');

// Seleccionamos la lista de enlaces (ul) que se va a desplegar mediante su ID único.
const navLinks = document.getElementById('nav-links');

// Seleccionamos TODOS los enlaces individuales (a) que viven dentro de la lista de navegación.
const links = document.querySelectorAll('.nav-links a');


// 2. EVENTO CLICK EN LA HAMBURGUESA: Controla la apertura y el cierre manual del menú.
menuBtn.addEventListener('click', () => {
    // .classList.toggle() funciona como un interruptor de luz:
    // Si la clase 'is-active' NO está en el botón, se la añade (muta a la "X").
    // Si la clase 'is-active' YA está en el botón, se la quita (regresa a las 3 líneas).
    menuBtn.classList.toggle('is-active');
    
    // Hace exactamente lo mismo con la lista: si no tiene la clase se la pone para que caiga,
    // y si ya la tiene se la quita para que se guarde de nuevo detrás del header.
    navLinks.classList.toggle('is-active');
});


// 3. CIERRE AUTOMÁTICO AL SELECCIONAR UNA OPCIÓN: Soluciona el problema de que el menú se quede abierto.
// Usamos .forEach() para recorrer uno por uno todos los enlaces que guardamos en la variable 'links'.
links.forEach(link => {
    // A cada enlace individual le asignamos un "escuchador" de eventos para cuando el usuario lo toque.
    link.addEventListener('click', () => {
        // .classList.remove() se encarga de quitar la clase de golpe de forma segura.
        // Al quitarle 'is-active' al botón, la "X" se transforma inmediatamente de regreso a las 3 líneas.
        menuBtn.classList.remove('is-active');
        
        // Al quitarle 'is-active' a la lista, la tarjeta del menú se desvanece y sube al instante.
        // Esto sucede al mismo tiempo que el navegador realiza el salto (scroll) automático hacia la sección elegida.
        navLinks.classList.remove('is-active');
    });
});