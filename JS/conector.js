async function cargarDatosInicio() {
    
    try {
        const respuesta = await fetch('https://backend-profesor.onrender.com/api/inicio?populate=logoNav,imagenportada,fotoperfil,beneficios.icono');
        const resultado = await respuesta.json();
        const data = resultado.data;

        console.log("¡Conexión exitosa con Strapi!", data);

        const baseUrl = 'http://localhost:1337';

        // 1. Inyectar imágenes
        if (data.logoNav) {
            document.querySelector('.neo-logo').src = data.logoNav.url;
        }
        if (data.imagenportada) {
            document.getElementById('Photo-Portada').src = data.imagenportada.url;
        }
        if (data.fotoperfil) {
            document.getElementById('Photo-Perfil').src = data.fotoperfil.url;
        }

        // 2. Inyectar textos (asegúrate de ponerles ID a tus h2 y h3 o seleccionarlos por clase)
        if (data.nombre) {
            document.querySelector('.Nombre').textContent = data.nombre;
        }
        if (data.profesion) {
            document.querySelector('.Profesion').textContent = data.profesion;
        }
        // 3. SECCIÓN ACERCA DE MÍ (Asegúrate de ajustar el nombre del campo según lo tengas en Strapi, ej: data.acercademi)
        if (data.acercademi) {
            // Buscamos el párrafo o contenedor de Acerca de mi en tu HTML
            const textoAcerca = document.querySelector('#Acerca-de-Mi p'); // o la clase/id que corresponda
            if (textoAcerca) {
                textoAcerca.textContent = data.acercademi;
            }
        }

       // 4. LOS CUATRO CUADRITOS (Beneficios)
        if (data.beneficios && Array.isArray(data.beneficios)) {
            const tarjetas = document.querySelectorAll('.tarjeta-beneficio');
    
            data.beneficios.forEach((beneficio, index) => {
           // Esto nos dirá exactamente qué trae el icono en la consola del navegador
            console.log(`Ícono del beneficio ${index + 1}:`, beneficio.icono);
        if (tarjetas[index]) {
            const h3 = tarjetas[index].querySelector('h3');
            const p = tarjetas[index].querySelector('p');
            const img = tarjetas[index].querySelector('.icono-flotante img');

            if (h3 && beneficio.titulo) {
                h3.textContent = beneficio.titulo;
            }
            if (p && beneficio.descripcion) {
                p.textContent = beneficio.descripcion;
            }
            if (img && beneficio.icono) {
                // Aquí adaptamos la ruta dependiendo de si viene anidada o directa
                const rutaImg = beneficio.icono.url ? beneficio.icono.url : beneficio.icono;
                img.src = rutaImg;
            }
        }
    
        const telefonoWhatsApp = "525521863721"; // Reemplaza con tu número real
        const mensajeGeneral = encodeURIComponent("Hola, me gustaría agendar una clase muestra");
    
        const botonFlotante = document.getElementById('whatsapp-flotante');
        if (botonFlotante) {
        botonFlotante.href = `https://wa.me/${telefonoWhatsApp}?text=${mensajeGeneral}`;
        }
        
        });
    }

    } catch (error) {
        console.error("Error al conectar:", error);
    }
}

cargarDatosInicio();

