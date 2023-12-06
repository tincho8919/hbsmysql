document.querySelectorAll('.mostrar-detalles').forEach((boton) => {
    boton.addEventListener('click', (event) => {
      const detalles = event.currentTarget.nextElementSibling;
      detalles.classList.toggle('detalles-hidden');
    });
  });
  document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('miFormulario');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío por defecto del formulario
        formulario.submit(); // Envía el formulario automáticamente
    });
});