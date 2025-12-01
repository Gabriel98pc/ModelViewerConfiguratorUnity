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

    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue

            // Aquí normalmente enviarías los datos a un servidor
            // Simulamos el envío con un tiempo de espera
            const btn = this.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo en breve.');
                contactForm.reset(); // Limpia el formulario
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});