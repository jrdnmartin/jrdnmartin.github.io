// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// All DOMContentLoaded logic in one place
document.addEventListener('DOMContentLoaded', function () {
  // --- Typewriter Effect ---
  const typewriter = document.querySelector('.typewriter');
  if (typewriter) {
    const words = [
      'a Student',
      'a Freelancer',
      'a Website Developer',
      'an AI Enthusiast',
      'a Problem Solver'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function type() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        charIndex--;
        typewriter.textContent = currentWord.substring(0, charIndex);
      } else {
        charIndex++;
        typewriter.textContent = currentWord.substring(0, charIndex);
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isWaiting = true;
        setTimeout(() => {
          isDeleting = true;
          isWaiting = false;
          type();
        }, 2000);
        return;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

      const typingSpeed = isDeleting ? 100 : 150;
      const delay = isWaiting ? 0 : typingSpeed;

      setTimeout(type, delay);
    }

    type();
  }

  // --- Carousel 3D ---
  const container = document.querySelector('.carousel-3d-container');
  if (container) {
    const cards = Array.from(document.querySelectorAll('.carousel-3d-card'));
    const prevBtn = document.querySelector('.carousel-3d-prev');
    const nextBtn = document.querySelector('.carousel-3d-next');
    let currentIndex = 0;
    let isAnimating = false;

    function updateCarousel() {
      if (isAnimating) return;
      isAnimating = true;

      cards.forEach((card, index) => {
        card.className = 'carousel-3d-card';
        if (index === currentIndex) {
          card.classList.add('active');
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
          card.classList.add('prev');
        } else if (index === (currentIndex + 1) % cards.length) {
          card.classList.add('next');
        }
      });

      setTimeout(() => {
        isAnimating = false;
      }, 800);
    }

    function nextSlide() {
      if (!isAnimating) {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
      }
    }

    function prevSlide() {
      if (!isAnimating) {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    updateCarousel();

    // Auto-rotate
    let autoRotateInterval = setInterval(nextSlide, 6000);

    container.addEventListener('mouseenter', () => {
      clearInterval(autoRotateInterval);
    });

    container.addEventListener('mouseleave', () => {
      autoRotateInterval = setInterval(nextSlide, 6000);
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const difference = touchStartX - touchEndX;

      if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
  }

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- Section Fade-in Observer ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
  });

  // --- Navbar Scroll Handling ---
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        return;
      }

      if (currentScroll > lastScroll && !navbar.classList.contains('scrolled')) {
        navbar.classList.add('scrolled');
      } else if (currentScroll < lastScroll && navbar.classList.contains('scrolled')) {
        navbar.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // --- Hide scroll indicator when scrolling starts ---
  window.addEventListener('scroll', function () {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
      } else {
        scrollIndicator.style.opacity = '0.7';
      }
    }
  });

  // --- Scroll Spy ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  if (navbar && navLinks.length && sections.length) {
    const navbarHeight = navbar.offsetHeight;

    function scrollSpy() {
      const scrollPosition = window.scrollY + navbarHeight + 50;
      let activeSection = null;

      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY - navbarHeight - 50;
        const sectionBottom = sectionTop + Math.max(section.offsetHeight, window.innerHeight / 3);

        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          activeSection = correspondingNavLink;
        }
      });

      navLinks.forEach(link => link.classList.remove('active'));
      if (activeSection) {
        activeSection.classList.add('active');
      }
    }

    let scrollTimeout;
    window.addEventListener('scroll', function () {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(function () {
        scrollSpy();
      });
    });

    scrollSpy();
    window.addEventListener('resize', function () {
      scrollSpy();
    });
  }
});

// --- Contact Form Submission (outside DOMContentLoaded for best compatibility) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        document.getElementById("form-status").style.display = "block";
        form.reset();
      }
    }).catch(error => console.error("Form submission error: ", error));
  });
}
