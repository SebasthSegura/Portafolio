function Details_windows() {
    const botonesDetalles = document.querySelectorAll('.show_detalles'); //al dar click a show detalles se abre la ventana flotante

    botonesDetalles.forEach(boton => {
        boton.addEventListener('click', function() {
            const proyectoItem = this.parentNode;
            const tituloProyecto = proyectoItem.querySelector('.proyectos__item_titulo').textContent;
            const descripcionProyecto = proyectoItem.querySelector('.proyectos__item_descripcion').textContent;
            const tecnologias = proyectoItem.getAttribute('data_tecno') || 'No especificado';
            const arquitectura = proyectoItem.getAttribute('data_arquitec') || 'No especificado';
            const rendimiento = proyectoItem.getAttribute('data_rend') || 'No especificado';
            const api = proyectoItem.getAttribute('data_api') || 'No especificado';
            const enlaceRepo = proyectoItem.getAttribute('data_enlace_repo') || '#';

            // Creamos la ventana flotante dinámicamente por medio del boton que se clickeó
            // y le asignamos la clase correspondiente
            const ventanaFlotante = document.createElement('div');
            ventanaFlotante.classList.add('ventana-flotante');
            ventanaFlotante.id = `ventana-flotante-${tituloProyecto.replace(/\s+/g, '-').toLowerCase()}`; // ID único

            // Creamos el contenido de la ventana flotante dentro de un div
            // y le asignamos la clase correspondiente
            const contenidoVentana = document.createElement('div');
            contenidoVentana.classList.add('ventana-flotante-contenido');

            // agregamos un boton para cerrar la ventana flotante 
            const botonCerrar = document.createElement('span');
            botonCerrar.classList.add('cerrar-ventana');
            botonCerrar.innerHTML = '&times;';
            botonCerrar.addEventListener('click', () => {
                document.body.removeChild(ventanaFlotante);
            });

            // configurar los elementos que se mostrarán en la ventana flotante, incluyendo título, tecnologías, arquitectura, rendimiento, API y enlace al repositorio
            // Creaamos el título del proyecto en pantalla
            const titulo = document.createElement('h4');
            titulo.textContent = tituloProyecto;

            // Creamos el párrafo de tecnologías utilizadas en pantalla 
            const parrafoTecnologias = document.createElement('p');
            parrafoTecnologias.innerHTML = `<strong>Tecnologías:</strong> <span>${tecnologias}</span>`;

            // Creamos el párrafo de arquitectura utilizada en pantalla
            const parrafoArquitectura = document.createElement('p');
            parrafoArquitectura.innerHTML = `<strong>Arquitectura:</strong> <span>${arquitectura}</span>`;

            // Creamos el enlace al repositorio de GitHub en pantalla
            const parrafoRendimiento = document.createElement('p');
            parrafoRendimiento.innerHTML = `<strong>Rendimiento:</strong> <span>${rendimiento}</span>`;

            const parrafoApi = document.createElement('p');
            parrafoApi.innerHTML = `<strong>API:</strong> <span>${api}</span>`;

            const enlaceRepositorio = document.createElement('p');
            const linkRepo = document.createElement('a');
            linkRepo.href = enlaceRepo;
            linkRepo.target = '_blank';
            linkRepo.rel = 'noopener noreferrer';
            linkRepo.textContent = 'Ver Repositorio';
            enlaceRepositorio.appendChild(linkRepo);
            if (!enlaceRepo || enlaceRepo === '#') {
                enlaceRepositorio.style.display = 'none';
            }

            // Agregamos los elementos creados al contenido de la ventana flotante en el orden adecuado
            contenidoVentana.appendChild(botonCerrar);
            contenidoVentana.appendChild(titulo);
            contenidoVentana.appendChild(parrafoTecnologias);
            contenidoVentana.appendChild(parrafoArquitectura);
            contenidoVentana.appendChild(parrafoRendimiento);
            contenidoVentana.appendChild(parrafoApi);
            contenidoVentana.appendChild(enlaceRepositorio);

            ventanaFlotante.appendChild(contenidoVentana);
            document.body.appendChild(ventanaFlotante);

            // Creamos el evento de la ventana al hacer clic fuera de ella para salir
            ventanaFlotante.addEventListener('click', (event) => {
                if (event.target === ventanaFlotante) {
                    document.body.removeChild(ventanaFlotante);
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', Details_windows);

