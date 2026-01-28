// Carrousel de imágenes responsive
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentIndex = 0;
let itemsPerView = getItemsPerView();

// Determinar cuántos items mostrar según el ancho de pantalla
function getItemsPerView() {
    if (window.innerWidth < 768) {
        return 1; // Móvil: 1 imagen
    } else if (window.innerWidth < 1024) {
        return 2; // Tablet: 2 imágenes
    } else {
        return 3; // Escritorio: 3 imágenes
    }
}

// Crear los puntos de navegación
function createDots() {
    dotsContainer.innerHTML = '';
    const totalDots = Math.ceil(items.length / itemsPerView);
    
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Actualizar posición del carrousel
function updateCarousel() {
    const itemWidth = items[0].offsetWidth;
    const gap = 20; // Espacio entre items
    const offset = -(currentIndex * itemsPerView * (itemWidth + gap));
    track.style.transform = `translateX(${offset}px)`;
    
    // Actualizar dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
    
    // Deshabilitar botones en los extremos
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= Math.ceil(items.length / itemsPerView) - 1;
}

// Ir a una slide específica
function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Botón anterior
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Botón siguiente
nextBtn.addEventListener('click', () => {
    if (currentIndex < Math.ceil(items.length / itemsPerView) - 1) {
        currentIndex++;
        updateCarousel();
    }
});

// Soporte para deslizar en móvil (touch)
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
        // Deslizar a la izquierda (siguiente)
        nextBtn.click();
    }
    
    if (touchEndX - touchStartX > 50) {
        // Deslizar a la derecha (anterior)
        prevBtn.click();
    }
}

// Reiniciar al cambiar tamaño de ventana
window.addEventListener('resize', () => {
    const newItemsPerView = getItemsPerView();
    if (newItemsPerView !== itemsPerView) {
        itemsPerView = newItemsPerView;
        currentIndex = 0;
        createDots();
        updateCarousel();
    }
});

// Inicializar
createDots();
updateCarousel();
