function filterProyects() {
    const botonesFiltro = document.querySelectorAll('.filtro-btn'); // Selector
    const proyectosLista = document.querySelector('.proyectos__lista');
    const proyectosItems = proyectosLista.querySelectorAll('.proyectos__item');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', function() {
            const categoria = this.getAttribute('data-categoria'); // Atributo actualizado 

            // Desactivamos el botón activo previamente
            botonesFiltro.forEach(btn => btn.classList.remove('activo'));
            // Activamos el botón actual
            this.classList.add('activo');

            // Filtramos los proyectos según la categoría seleccionada
            proyectosItems.forEach(item => {
                if (categoria === 'todos' || item.getAttribute('data-categoria') === categoria) {
                    item.style.display = 'block'; // mostrara el proyecto
                } else {
                    item.style.display = 'none'; // Ocultara el proyecto
                }
            });
        });
    });
}

// Inicializamos las funciones al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    filterProyects(); // Inicializamos el filtro
    Details_windows(); // Función para la ventana flotante
});