document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias al DOM ---
    const quantityInput = document.getElementById('quantity');
    const quantityVal = document.getElementById('quantity-val');
    const complexityInput = document.getElementById('complexity');
    const integrationInput = document.getElementById('integration');
    const totalPriceDisplay = document.getElementById('total-price');

    // --- Configuración de Precios (Ajusta estos valores) ---
    const BASE_PRICE_PER_MODEL = 250; // Precio base por modelo simple en USD
    const INTEGRATION_FEE = 300; // Costo fijo por integración API

    // Función de cálculo
    function calculatePrice() {
        // 1. Obtener valores
        let quantity = parseInt(quantityInput.value);
        let complexityMultiplier = parseFloat(complexityInput.value);
        let hasIntegration = integrationInput.checked;

        // 2. Lógica de descuento por volumen
        // Si piden más modelos, el precio unitario baja.
        let volumeDiscount = 1;
        if (quantity >= 5) volumeDiscount = 0.90; // 10% descuento
        if (quantity >= 10) volumeDiscount = 0.85; // 15% descuento
        if (quantity >= 20) volumeDiscount = 0.75; // 25% descuento

        // 3. Cálculo matemático
        let unitPrice = BASE_PRICE_PER_MODEL * complexityMultiplier * volumeDiscount;
        let subtotal = unitPrice * quantity;

        if (hasIntegration) {
            subtotal += INTEGRATION_FEE;
        }

        // 4. Actualizar la interfaz
        // Formatear número con comas si es necesario
        totalPriceDisplay.textContent = Math.round(subtotal).toLocaleString('en-US');

        // Actualizar etiqueta de cantidad
        quantityVal.textContent = quantity + (quantity === 1 ? ' modelo' : ' modelos');
    }

    // --- Event Listeners ---
    // Escuchar cambios en cualquier input para recalcular en tiempo real
    quantityInput.addEventListener('input', calculatePrice);
    complexityInput.addEventListener('change', calculatePrice);
    integrationInput.addEventListener('change', calculatePrice);

    // --- Smooth Scroll para la navegación ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Calcular precio inicial al cargar
    calculatePrice();

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
            const templateID = 'service_svnl2dt'; // REEMPLAZA con tu ID de plantilla de EmailJS

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