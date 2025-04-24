function filterProyects() {
    const botonesFiltro = document.querySelectorAll('.filtro_btn');
    const proyectosLista = document.querySelector('.proyectos__lista');
    const proyectosItems = proyectosLista.querySelectorAll('.proyectos__item');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', function() {
            const categoria = this.getAttribute('data_categoria');

            // Desactivar el botón activo previamente
            botonesFiltro.forEach(btn => btn.classList.remove('activo'));
            // Activar el botón actual
            this.classList.add('activo');

            proyectosItems.forEach(item => {
                if (categoria === 'todos' || item.getAttribute('data_categoria') === categoria) {
                    item.style.display = 'block'; // Mostrar el proyecto
                } else {
                    item.style.display = 'none'; // Ocultar el proyecto
                }
            });
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    filterProyects(); // Inicializamos el filtro
    Details_windows(); // función para la ventana flotante
});