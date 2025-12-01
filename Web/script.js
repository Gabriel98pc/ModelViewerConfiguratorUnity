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
        const form = document.getElementById('contactForm');
        const button = document.getElementById('submitBtn');

        form.addEventListener('submit', function(e) {
            e.preventDefault(); // 1. Evita que la página se recargue

            const originalBtnText = button.innerText;
            button.innerText = "Enviando..."; // Feedback inmediato
            button.disabled = true; // Evita doble clic

            // Recolectamos los datos del formulario
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // 2. Enviamos los datos usando Fetch (AJAX)
            fetch("https://formsubmit.co/ajax/configura3d@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                // 3. Si se envió correctamente:
                button.innerText = "¡Gracias!";
                form.reset(); // Opcional: limpia los campos del formulario

                // 4. Esperamos 3 segundos (3000 ms) y volvemos a la normalidad
                setTimeout(() => {
                    button.innerText = originalBtnText;
                    button.disabled = false;
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                button.innerText = "Hubo un error";
                setTimeout(() => {
                    button.innerText = originalBtnText;
                    button.disabled = false;
                }, 3000);
            });
        });
    }
});