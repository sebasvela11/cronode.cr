// ============================================
// IA-TICA - Scripts con efecto de hojas
// Animaciones y efectos modernos
// ============================================

(function() {
  'use strict';
  
  console.log('🚀 IA-TICA - Sitio cargado correctamente');

  // ==========================================
  // 1. EFECTO DE HOJAS CAYENDO
  // ==========================================
  const leavesContainer = document.createElement('div');
  leavesContainer.className = 'leaves-container';
  document.body.appendChild(leavesContainer);

  function createLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    
    // Variaciones aleatorias de tipo de hoja
    const type = Math.floor(Math.random() * 3) + 1;
    if (type > 1) {
      leaf.classList.add(`type-${type}`);
    }
    
    // Posición horizontal aleatoria
    leaf.style.left = Math.random() * 100 + '%';
    
    // Animación aleatoria
    const animations = ['animate', 'animate-left', 'animate-straight'];
    const randomAnim = animations[Math.floor(Math.random() * animations.length)];
    leaf.classList.add(randomAnim);
    
    // Duración aleatoria de la animación
    const duration = 6 + Math.random() * 4; // Entre 6 y 10 segundos
    leaf.style.animationDuration = duration + 's';
    
    // Agregar al contenedor
    leavesContainer.appendChild(leaf);
    
    // Eliminar la hoja después de que termine la animación
    setTimeout(() => {
      leaf.remove();
    }, duration * 1000);
  }

  function triggerLeafFall() {
    // Crear solo 1 hoja
    createLeaf();
  }

  // Iniciar el efecto después de cargar la página
  window.addEventListener('load', () => {
    // Primera caída después de 1 segundo
    setTimeout(triggerLeafFall, 1000);
    
    // Caída constante cada 3 segundos
    setInterval(() => {
      triggerLeafFall();
    }, 3000); // Cada 3 segundos
  });

  // ==========================================
  // 2. INTERSECTION OBSERVER - Fade in/out al scroll
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

  const sections = document.querySelectorAll('section:not(.hero)');
  sections.forEach(section => {
    section.classList.add('fade-section');
    fadeObserver.observe(section);
  });

  // ==========================================
  // 3. HERO - Solo fade out
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
  // 4. HEADER SCROLL - Cambio de estilo
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

    if (currentScroll > lastScroll && currentScroll > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });

  // ==========================================
  // 5. LOADING INICIAL
  // ==========================================
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    if (hero) {
      hero.classList.add('visible');
    }
  });

  // ==========================================
  // 6. ANIMACIÓN DE TARJETAS AL APARECER
  // ==========================================
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('card-visible');
        }, index * 100);
      } else {
        entry.target.classList.remove('card-visible');
      }
    });
  }, { threshold: 0.1 });

  const featureItems = document.querySelectorAll('.feature-item');
  featureItems.forEach(item => {
    item.classList.add('card-animate');
    cardObserver.observe(item);
  });

  const moduleCards = document.querySelectorAll('#programa .card');
  moduleCards.forEach(card => {
    card.classList.add('card-animate');
    cardObserver.observe(card);
  });

  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach(card => {
    card.classList.add('card-animate');
    cardObserver.observe(card);
  });

  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach(card => {
    card.classList.add('card-animate');
    cardObserver.observe(card);
  });

  const certificationContent = document.querySelector('.certification-content');
  if (certificationContent) {
    certificationContent.classList.add('card-animate');
    cardObserver.observe(certificationContent);
  }

  // ==========================================
  // 7. SMOOTH SCROLL - Para anclas internas
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
  // 8. CONTACTO: Validación básica y fallback mailto
  // ==========================================
  (function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

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
      
      if (hp) return false;
      
      if (nombre.length < 2) { 
        err('nombre').textContent = 'Decinos tu nombre.'; 
        ok = false; 
      } else {
        err('nombre').textContent = '';
      }
      
      const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
      if (!mailOk) { 
        err('correo').textContent = 'Ingresá un correo válido.'; 
        ok = false; 
      } else {
        err('correo').textContent = '';
      }
      
      if (mensaje.length < 5) { 
        err('mensaje').textContent = 'Contanos brevemente tu interés en IA-TICA.'; 
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
      
      const subject = encodeURIComponent(`Inscripción IA-TICA - ${nombre}`);
      const body = encodeURIComponent(
        `Nombre: ${nombre}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}`
      );
      window.location.href = `mailto:cr.didaktico@gmail.com?subject=${subject}&body=${body}`;
      
      form.reset();
    });
  })();

})();