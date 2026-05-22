document.addEventListener('DOMContentLoaded', () => {
    
    // SISTEMA DE NAVEGACIÓN ENTRE VISTAS (SPA)
    const menuItems = document.querySelectorAll('.menu-item[data-target]');
    const views = document.querySelectorAll('.view');
    const btnCtaReserva = document.getElementById('btn-cta-reserva');

    function navegarAVista(targetId) {
        // Ocultar todas las secciones y quitar clases activas
        views.forEach(view => {
            view.classList.remove('active');
            view.classList.add('hidden');
        });
        menuItems.forEach(btn => btn.classList.remove('active'));

        // Activar la sección elegida
        const vistaObjetivo = document.getElementById(targetId);
        if (vistaObjetivo) {
            vistaObjetivo.classList.remove('hidden');
            vistaObjetivo.classList.add('active');
        }

        // Sincronizar el botón de la barra lateral
        const botonMenu = document.querySelector(`.menu-item[data-target="${targetId}"]`);
        if (botonMenu) {
            botonMenu.classList.add('active');
        }
    }

    // Eventos para el menú lateral
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            navegarAVista(targetId);
        });
    });

    // Evento para el botón principal del inicio
    if (btnCtaReserva) {
        btnCtaReserva.addEventListener('click', () => {
            navegarAVista('calendar');
        });
    }

    // Cambios visuales entre los días del calendario
    const dateBtns = document.querySelectorAll('.date-btn');
    dateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dateBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});

// LÓGICA DEL MODAL DE RESERVA (Mantiene la funcionalidad exacta)
let currentBookingSlot = null;

function openBookingModal(time, prof, zone) {
    document.getElementById('modal-time').innerText = `Martes 21, ${time}`;
    document.getElementById('modal-prof').innerText = prof;
    document.getElementById('modal-zone').innerText = zone;
    
    currentBookingSlot = event.currentTarget;
    document.getElementById('bookingModal').classList.add('show');
}

function closeModal() {
    document.getElementById('bookingModal').classList.remove('show');
    currentBookingSlot = null;
}

function confirmBooking() {
    closeModal();
    alert('¡Clase reservada con éxito!\nTe hemos enviado un recordatorio al correo electrónico y a WhatsApp.');

    if (currentBookingSlot) {
        currentBookingSlot.classList.remove('available');
        currentBookingSlot.classList.add('occupied');
        
        const badge = currentBookingSlot.querySelector('.status-badge');
        badge.classList.remove('green');
        badge.classList.add('gray');
        badge.innerText = 'Reservado';
        
        currentBookingSlot.removeAttribute('onclick');
    }
}