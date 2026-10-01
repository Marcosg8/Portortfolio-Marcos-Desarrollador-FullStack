document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const revealItems = document.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    revealItems.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  revealItems.forEach((item) => observer.observe(item));

  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section[id]');

  const highlightActiveLink = () => {
    let activeId = 'about';

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', isActive);
    });
  };

  highlightActiveLink();
  window.addEventListener('scroll', highlightActiveLink, { passive: true });

  const visual = document.querySelector('.hero-visual');
  if (visual) {
    document.addEventListener('pointermove', (event) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 10;
      const y = (event.clientY / innerHeight - 0.5) * 10;

      visual.style.transform = `perspective(1200px) rotateX(${(-y).toFixed(2)}deg) rotateY(${x.toFixed(2)}deg)`;
    });
  }

  const routeMarker = document.getElementById('routeMarker');
  const routePosition = document.getElementById('routePosition');
  const routeTime = document.getElementById('routeTime');

  if (routeMarker && routePosition && routeTime) {
    const pathPoints = [
      { x: 10, y: 68 },
      { x: 22, y: 61 },
      { x: 35, y: 46 },
      { x: 48, y: 38 },
      { x: 60, y: 42 },
      { x: 73, y: 58 },
      { x: 82, y: 52 }
    ];

    let step = 0;
    const labels = ['Punto 1', 'Punto 2', 'Punto 3', 'Punto 4'];

    const updateMarker = () => {
      const currentIndex = Math.min(Math.floor(step), pathPoints.length - 1);
      const point = pathPoints[currentIndex];
      routeMarker.style.left = `${point.x}%`;
      routeMarker.style.top = `${point.y}%`;
      routePosition.textContent = labels[Math.min(currentIndex, labels.length - 1)];

      const now = new Date();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      routeTime.textContent = `${minutes}:${seconds}`;

      step = (step + 0.2) % pathPoints.length;
    };

    updateMarker();
    setInterval(updateMarker, 120000);
  }

  const contactModal = document.getElementById('contactModal');
  const contactTrigger = document.querySelector('.js-contact-trigger');
  const closeModalButton = document.querySelector('.contact-modal__close');

  const openModal = () => {
    if (!contactModal) return;
    contactModal.classList.add('is-open');
    contactModal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    if (!contactModal) return;
    contactModal.classList.remove('is-open');
    contactModal.setAttribute('aria-hidden', 'true');
  };

  if (contactTrigger) {
    contactTrigger.addEventListener('click', openModal);
  }

  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }

  if (contactModal) {
    contactModal.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement && event.target.dataset.close === 'true') {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && contactModal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }
});
