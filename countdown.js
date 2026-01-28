// Cuenta regresiva para el evento - 17 de abril 2026 21:30 (hora Argentina)
function updateCountdown() {
    // Fecha del evento en hora de Argentina (GMT-3)
    const eventDate = new Date('2026-04-17T21:30:00-03:00');
    const now = new Date();
    
    // Calcular diferencia en milisegundos
    const difference = eventDate - now;
    
    // Si el evento ya pasó
    if (difference <= 0) {
        document.getElementById('countdown').innerHTML = '¡El evento ha comenzado!';
        return;
    }
    
    // Calcular días, horas, minutos y segundos
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Actualizar el HTML
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Actualizar cada segundo
setInterval(updateCountdown, 1000);

// Ejecutar inmediatamente al cargar
updateCountdown();
