async function cargarCursosInicio() {
        const seccionCursos = document.getElementById('cursos');
        if (!seccionCursos) return; // Si no existe la sección 'cursos' aquí, se sale sin error.
    try {
        const respuesta = await fetch('https://backend-profesor.onrender.com/api/cursosadds?populate=imagencurso');
        const resultado = await respuesta.json();
        const listaDeCursos = resultado.data; 

        // Apuntamos al contenedor padre de forma segura
        const contenedor = seccionCursos.querySelector('.cursos-container');
        if (!contenedor) return;

        // Limpiamos el contenedor
        contenedor.innerHTML = '';

        listaDeCursos.forEach(curso => {
            // 1. Usamos el nombre exacto que reveló tu consola (nombrerecurso)
            const nombre = curso.nombrecurso || 'Curso sin título';
            // 2. Extraemos la URL de la imagen
            const imagenUrl = curso.imagencurso?.url ? curso.imagencurso.url : '';

            const cursoId = curso.documentId || curso.id;
            const tarjeta = document.createElement('article');
            // 3. Le quitamos 'elemento-animado' para evitar que se queden invisibles
            tarjeta.classList.add('curso-card', 'elemento-animado');

            tarjeta.innerHTML = `
                <div class="curso-image-wrapper">
                    <img src="${imagenUrl}" alt="Miniatura de ${nombre}" class="curso-img">
                </div>
                <div class="curso-info">
                    <h3 class="curso-titulo">${nombre}</h3>
                </div>
            `;
            // Al hacer clic, manda el ID hacia la página de cursos
            tarjeta.addEventListener('click', () => {
                window.location.href = `cursos.html?id=${cursoId}`;
            });

            contenedor.appendChild(tarjeta);
        });

        if (typeof activarAnimaciones === 'function') {
            activarAnimaciones();
        } else if (window.observer && typeof window.observer.observe === 'function') {
            document.querySelectorAll('.elemento-animado').forEach(el => window.observer.observe(el));
        }
        // Llamamos a las animaciones para que detecten las nuevas tarjetas
        if (typeof inicializarAnimaciones === 'function') {
            inicializarAnimaciones();
        }

    } catch (error) {
        console.error('Error al cargar los cursos:', error);
    }
}

// 2. Lógica para la página de DETALLES (Rellena tu HTML con los datos de Strapi)
async function cargarDetalleCurso() {
    const elTipo = document.getElementById('curso-tipo');
    if (!elTipo) {
        console.log("No estamos en la página de detalles (no se encontró #curso-tipo).");
        return;
    }

    try {

        const params = new URLSearchParams(window.location.search);
        const cursoId = params.get('id');
        console.log("ID capturado de la URL:", cursoId);

        if (!cursoId) {
            console.error('No se encontró un ID de curso en la URL.');
            return;
        }

        const urlPeticion = `https://backend-profesor.onrender.com/api/cursosadds/${cursoId}?populate=*`;        
        console.log("Haciendo fetch a:", urlPeticion);

        const respuesta = await fetch(urlPeticion);
        const resultado = await respuesta.json();
        console.log("Datos recibidos de Strapi:", resultado);

        const curso = resultado.data;

        if (!curso) {
            console.error('No se encontró el curso en Strapi.');
            return;
        }

        // Inyectamos los datos
        elTipo.innerText = curso.etiqueta || 'Curso Individual';

        const elNombre = document.querySelector('.curso-titulo');
        if (elNombre) elNombre.innerText = curso.nombrecurso || 'Sin título';

        const elMonto = document.getElementById('curso-monto');
        if (elMonto) elMonto.innerText = curso.costo || '0';

        try {
        const respuestaInicio = await fetch('https://backend-profesor.onrender.com/api/inicio?populate=*');        const resultadoInicio = await respuestaInicio.json();
        const datosInicio = resultadoInicio.data;

        const logoElemento = document.getElementById('logo-header');
            if (logoElemento && datosInicio && datosInicio.logoNav) {
            logoElemento.src = datosInicio.logoNav.url;
            }
    } catch (error) {
        console.error('No se pudo cargar el logo del header:', error);
        }

        const elDescripcion = document.getElementById('curso-descripcion');
        if (elDescripcion) elDescripcion.innerText = curso.descripciondelcurso || 'Sin descripción disponible.';

        // Carga dinámica de los detalles con rayos (⚡)
        const listaBeneficios = document.getElementById('curso-beneficios');
        if (listaBeneficios && curso.detalles && Array.isArray(curso.detalles)) {
            listaBeneficios.innerHTML = ''; // Limpiamos los elementos estáticos

            curso.detalles.forEach(item => {
                const clave = item.clave || '';
                const descripcion = item.descripcion || '';

                if (clave || descripcion) {
                    const li = document.createElement('li');
                    li.innerHTML = `⚡ <strong>${clave}:</strong> ${descripcion}`;
                    listaBeneficios.appendChild(li);
                }
            });
        }
        const telefonoWhatsApp = "525521863721"; 
        const nombreCurso = curso.nombrecurso || 'este curso';
        const mensaje = encodeURIComponent(`Hola, me quiero inscribir al curso ${nombreCurso}`);
    
        const botonInscribir = document.getElementById('curso-cta');
            if (botonInscribir) {
            botonInscribir.href = `https://wa.me/${telefonoWhatsApp}?text=${mensaje}`;
            }


        console.log("¡Datos inyectados con éxito!");

    } catch (error) {
        console.error('Error al cargar los detalles del curso:', error);
    }
}

cargarDetalleCurso();
cargarCursosInicio();
