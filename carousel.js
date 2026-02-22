// Clase Carrusel Reutilizable
class Carousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.track = this.container.querySelector('.carousel-track');
        this.items = this.container.querySelectorAll('.carousel-item');
        this.prevBtn = this.container.querySelector('.carousel-btn.prev');
        this.nextBtn = this.container.querySelector('.carousel-btn.next');
        this.dotsContainer = this.container.querySelector('.carousel-dots');
        
        this.currentIndex = 0;
        this.itemsPerView = this.getItemsPerView();
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    // Determinar cuántos items mostrar según el ancho de pantalla
    getItemsPerView() {
        if (window.innerWidth < 768) {
            return 1; // Móvil: 1 imagen
        } else if (window.innerWidth < 1024) {
            return 2; // Tablet: 2 imágenes
        } else {
            return 3; // Escritorio: 3 imágenes
        }
    }
    
    // Crear los puntos de navegación
    createDots() {
        this.dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(this.items.length / this.itemsPerView);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    // Actualizar posición del carrousel
    updateCarousel() {
        const itemWidth = this.items[0].offsetWidth;
        const gap = 20; // Espacio entre items
        const offset = -(this.currentIndex * this.itemsPerView * (itemWidth + gap));
        this.track.style.transform = `translateX(${offset}px)`;
        
        // Actualizar dots
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Deshabilitar botones en los extremos
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= Math.ceil(this.items.length / this.itemsPerView) - 1;
    }
    
    // Ir a una slide específica
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    // Manejar swipe en móvil
    handleSwipe() {
        if (this.touchStartX - this.touchEndX > 50) {
            // Deslizar a la izquierda (siguiente)
            this.next();
        }
        
        if (this.touchEndX - this.touchStartX > 50) {
            // Deslizar a la derecha (anterior)
            this.prev();
        }
    }
    
    // Navegar al anterior
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
    
    // Navegar al siguiente
    next() {
        if (this.currentIndex < Math.ceil(this.items.length / this.itemsPerView) - 1) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    // Inicializar el carrusel
    init() {
        this.createDots();
        this.updateCarousel();
        
        // Event listeners para botones
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Event listeners para touch (móvil)
        this.track.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        // Event listener para resize
        window.addEventListener('resize', () => {
            this.itemsPerView = this.getItemsPerView();
            this.createDots();
            this.updateCarousel();
        });
    }
}

// Inicializar los carruseles
document.addEventListener('DOMContentLoaded', () => {
    const carousel1 = new Carousel('carousel');
    const carousel2 = new Carousel('carousel-baby');
});

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
