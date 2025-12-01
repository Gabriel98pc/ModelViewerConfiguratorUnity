document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias al DOM ---
    const quantityInput = document.getElementById('quantity');
    const quantityVal = document.getElementById('quantity-val');
    const complexityInput = document.getElementById('complexity');
    const integrationInput = document.getElementById('integration');
    const totalPriceDisplay = document.getElementById('total-price');



    // --- Smooth Scroll para la navegación ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Lógica del Formulario de Contacto ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {

        console.log('Cargado');

        // A. Inicializamos EmailJS con tu Public Key
        // REEMPLAZA "TU_PUBLIC_KEY" con la que obtuviste en el dashboard de EmailJS
        (function () {
            emailjs.init("T3HxKzEZO1D0BXarS");
        })();

        const btn = document.getElementById('btn-submit');

        document.getElementById('contact-form').addEventListener('submit', function (event) {
            event.preventDefault(); // Evita recargar la página

            // 1. Cambiamos estado del botón a "Enviando..."
            const originalText = btn.innerText;
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            const serviceID = 'service_svnl2dt'; // O tu Service ID específico (ej: service_z87xs)
            const templateID = 'template_39c1tvz'; // REEMPLAZA con tu ID de plantilla de EmailJS

            // 2. Enviamos el formulario usando la librería
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // 3. ÉXITO
                    btn.innerText = '¡Gracias!';
                    document.getElementById('contact-form').reset(); // Limpia el formulario

                    // Volver a la normalidad en 3 segundos
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.disabled = false;
                    }, 3000);
                }, (err) => {
                    // 4. ERROR
                    btn.innerText = 'Error al enviar';
                    console.error('FAILED...', err);

                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }
});