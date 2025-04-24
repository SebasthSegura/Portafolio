function markProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '5px'; /* altura de la barra donde estara situada */
    progressBar.style.backgroundColor = '#22D4FD'; /*  le damos color azul*/
    progressBar.style.zIndex = '1000'; /* nos asegura que esté por encima de otros elementos*/
    document.body.appendChild(progressBar);
  
    window.addEventListener('scroll', () => {
      const alturaTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (alturaTotal > 0) {
        const progress = (window.scrollY / alturaTotal) * 100;
        progressBar.style.width = progress + '%';
      } else {
        progressBar.style.width = '100%'; // si no hay scroll(movimiento hacia abojo), la barra estara completa
      }
    });
  }
  
  // Llamamos a la función cuando el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', markProgress);