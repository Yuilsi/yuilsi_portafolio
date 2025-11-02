// archivo JS sin animaciones por ahora
console.log("Portafolio cargado correctamente.");

const track = document.querySelector('.carousel-track');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
const items = document.querySelectorAll(".timeline-item");
const cards = Array.from(track.children);


let currentIndex = 0;

function updateCarousel() {
  const cardWidth = cards[0].getBoundingClientRect().width + 24; // ancho + gap
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

  // controla los estados de los botones
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === cards.length - 1;
}

nextButton.addEventListener('click', () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

updateCarousel();

// === animación al hacer scroll ===

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2, // activa cuando el 20% del elemento es visible
  }
);

items.forEach((item) => observer.observe(item));

// menu nav
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuBg = document.getElementById('menu-bg');

function openMenu(){
  navLinks.classList.add('show');
  menuBg.classList.add('show');
  menuToggle.setAttribute('aria-expanded','true');
  navLinks.setAttribute('aria-hidden','false');
  menuBg.setAttribute('aria-hidden','false');
  // opcional: poner foco en primer enlace
  const firstLink = navLinks.querySelector('a');
  if(firstLink) firstLink.focus();
}

function closeMenu(){
  navLinks.classList.remove('show');
  menuBg.classList.remove('show');
  menuToggle.setAttribute('aria-expanded','false');
  navLinks.setAttribute('aria-hidden','true');
  menuBg.setAttribute('aria-hidden','true');
  menuToggle.focus();
}

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.contains('show');
  if (isOpen) {
    closeMenu();
    menuToggle.classList.remove('active'); // 👈 remueve clase cuando se cierra
  } else {
    openMenu();
    menuToggle.classList.add('active'); // 👈 agrega clase cuando se abre
  }
});

// cerrar al clicar el overlay
menuBg.addEventListener('click', closeMenu);

// cerrar al pulsar escape
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeMenu();
});

// cerrar cuando se hace clic en un link (comportamiento móvil típico)
navLinks.addEventListener('click', (e) => {
  if(e.target.tagName === 'A') closeMenu();
});

// si se redimensiona a desktop, aseguramos que el panel no quede abierto
window.addEventListener('resize', () => {
  if(window.innerWidth > 768){
    // forzar cerrado
    navLinks.classList.remove('show');
    menuBg.classList.remove('show');
    menuToggle.setAttribute('aria-expanded','false');
    navLinks.setAttribute('aria-hidden','false'); // visible en desktop
    menuBg.setAttribute('aria-hidden','true');
  } else {
    navLinks.setAttribute('aria-hidden', navLinks.classList.contains('show') ? 'false' : 'true');
  }
});


// --- hacer que toda la card sea clickeable ---
document.querySelectorAll('.card').forEach(card => {
  const link = card.querySelector('.link');
  if (link) {
    card.style.cursor = 'pointer'; // cambia el cursor a "mano"
    card.addEventListener('click', (e) => {
      // evita conflicto si se hace clic directamente en el enlace
      if (!e.target.closest('a')) {
        window.open(link.href, '_blank'); // abre en nueva pestaña
      }
    });
  }
});