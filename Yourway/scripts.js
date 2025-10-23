// ============================================
// YOURWAY LEARNING - Scripts independientes
// Animaciones y efectos modernos
// ============================================

(function() {
  'use strict';
  
  console.log('🚀 Yourway Learning - Sitio cargado correctamente');

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
  // 3. HEADER SCROLL - Cambio de estilo
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
  // 4. LOADING INICIAL
  // ==========================================
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    if (hero) {
      hero.classList.add('visible');
    }
  });

  // ==========================================
  // 5. ANIMACIÓN SUAVE DE TARJETAS AL APARECER (con bounce)
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

  // Observar feature items (nuevos con imágenes)
  const featureItems = document.querySelectorAll('.feature-item');
  featureItems.forEach(item => {
    item.classList.add('card-animate');
    cardObserver.observe(item);
  });

  // Observar tarjetas de beneficios
  const benefitCards = document.querySelectorAll('#beneficios .card');
  benefitCards.forEach(card => {
    card.classList.add('card-animate');
    cardObserver.observe(card);
  });

  // Observar tarjetas de precios
  const pricingCards = document.querySelectorAll('.pricing-card');
  pricingCards.forEach(card => {
    card.classList.add('card-animate');
    cardObserver.observe(card);
  });

  // Observar tarjetas de contacto
  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach(card => {
    card.classList.add('card-animate');
    cardObserver.observe(card);
  });

  // ==========================================
  // 6. SMOOTH SCROLL - Para anclas internas
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
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
  // 7. CONTACTO: Validación básica y fallback mailto
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
      if (nombre.length < 2) { 
        err('nombre').textContent = 'Decinos tu nombre.'; 
        ok = false; 
      } else {
        err('nombre').textContent = '';
      }
      
      // Correo
      const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
      if (!mailOk) { 
        err('correo').textContent = 'Ingresá un correo válido.'; 
        ok = false; 
      } else {
        err('correo').textContent = '';
      }
      
      // Mensaje
      if (mensaje.length < 5) { 
        err('mensaje').textContent = 'Contanos brevemente tu necesidad.'; 
        ok = false; 
      } else {
        err('mensaje').textContent = '';
      }
      
      return ok;
    }
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;
      
      const nombre = form.nombre.value.trim();
      const correo = form.correo.value.trim();
      const mensaje = form.mensaje.value.trim();
      
      // Fallback: abrir el cliente de correo del usuario con el contenido
      const subject = encodeURIComponent(`Contacto desde Yourway Learning - ${nombre}`);
      const body = encodeURIComponent(
        `Nombre: ${nombre}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}`
      );
      window.location.href = `mailto:cr.didaktico@gmail.com?subject=${subject}&body=${body}`;
      
      // Limpieza visual (opcional)
      form.reset();
    });
  })();

})();