// ============================================
// CRONODE - Animaciones y efectos modernos
// ============================================

(function() {
  'use strict';
  
  console.log('🚀 CRONODE - Sitio cargado correctamente');

  // ==========================================
  // 1. INTERSECTION OBSERVER - Fade in/out al scroll (bidireccional)
  // ==========================================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  // Observar secciones (excepto hero)
  const sections = document.querySelectorAll('section:not(.hero)');
  sections.forEach(section => {
    section.classList.add('fade-section');
    fadeObserver.observe(section);
  });

  // ==========================================
  // 2. HERO - Solo fade out (sin parallax)
  // ==========================================
  const hero = document.querySelector('.hero');
  
  function updateHeroOpacity() {
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
      const opacity = 1 - (scrolled / 600);
      hero.style.opacity = Math.max(0, opacity);
    }
  }
  
  window.addEventListener('scroll', updateHeroOpacity);

  // ==========================================
  // 3. EFECTO 3D EN TARJETAS - Siguen el cursor
  // ==========================================
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * -10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    });
  });

  // ==========================================
  // 4. SMOOTH SCROLL mejorado
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // 5. PARTÍCULAS EN HERO
  // ==========================================
  function createParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    heroSection.insertBefore(particlesContainer, heroSection.firstChild);

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (Math.random() * 15 + 20) + 's';
      
      const size = Math.random() * 3 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();

  // ==========================================
  // 6. HEADER SCROLL - Cambio de estilo
  // ==========================================
  const header = document.querySelector('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Ocultar/mostrar header al scroll
    if (currentScroll > lastScroll && currentScroll > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });

  // ==========================================
  // 7. LOADING INICIAL
  // ==========================================
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    if (hero) {
      hero.classList.add('visible');
    }
  });

  // ==========================================
  // 8. ANIMACIÓN SUAVE DE TARJETAS AL APARECER (con bounce)
  // ==========================================
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('card-visible');
        }, index * 100);
      } else {
        // Remover clase cuando sale del viewport (bidireccional)
        entry.target.classList.remove('card-visible');
      }
    });
  }, { threshold: 0.1 });

  // Observar tarjetas de proyectos
  projectCards.forEach(card => {
    card.classList.add('card-animate');
    cardObserver.observe(card);
  });

  // Observar tarjetas de contacto
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.add('card-animate');
    cardObserver.observe(card);
  });

  // Observar contenido "Sobre Nosotros"
  const aboutContent = document.querySelector('.about-content');
  if (aboutContent) {
    aboutContent.classList.add('card-animate');
    cardObserver.observe(aboutContent);
  }

  // ==========================================
  // 9. CONTACTO: Validación básica y fallback mailto
  //    (Respetar estado deshabilitado)
  // ==========================================
  (function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Si está deshabilitado temporalmente, anulamos cualquier envío
    if (form.dataset.disabled === 'true') {
      form.addEventListener('submit', (e) => e.preventDefault());
      return;
    }

    const getEl = (id) => form.querySelector('#' + id);
    const err = (name) => form.querySelector(`.error[data-for="${name}"]`);
    function validate() {
      let ok = true;
      const nombre = getEl('nombre').value.trim();
      const correo = getEl('correo').value.trim();
      const mensaje = getEl('mensaje').value.trim();
      const hp = getEl('empresa')?.value ?? '';
      // Honeypot
      if (hp) return false;
      // Nombre
      if (nombre.length < 2) { err('nombre').textContent = 'Decinos tu nombre.'; ok = false; }
      else err('nombre').textContent = '';
      // Correo
      const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
      if (!mailOk) { err('correo').textContent = 'Ingresá un correo válido.'; ok = false; }
      else err('correo').textContent = '';
      // Mensaje
      if (mensaje.length < 5) { err('mensaje').textContent = 'Contanos brevemente tu necesidad.'; ok = false; }
      else err('mensaje').textContent = '';
      return ok;
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;
      const nombre = form.nombre.value.trim();
      const correo = form.correo.value.trim();
      const mensaje = form.mensaje.value.trim();
      // Fallback: abrir el cliente de correo del usuario con el contenido
      const subject = encodeURIComponent(`Contacto desde la web - ${nombre}`);
      const body = encodeURIComponent(
        `Nombre: ${nombre}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}`
      );
      window.location.href = `mailto:cr.didaktico@gmail.com?subject=${subject}&body=${body}`;
      // Limpieza visual (opcional)
      form.reset();
    });
  })();

})();
