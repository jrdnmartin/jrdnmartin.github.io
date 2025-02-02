AOS.init({
        duration: 1000,
        once: true,
        offset: 100
      });

      document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        document.getElementById('form-status').style.display = 'block';
        form.reset();
      } else {
        alert('Oops! There was a problem submitting your form');
      }
    };
    xhr.send(formData);
  });

      // Smooth scroll handling
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });

      // Enhanced scroll observer
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      // Observer for sections
      const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Observe all sections
      document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
      });

      // Enhanced navbar scroll handling
      let lastScroll = 0;
      const navbar = document.querySelector('.navbar');

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

     

// // Observe the skills section
// document.addEventListener('DOMContentLoaded', () => {
//     const skillsSection = document.querySelector('.skills-section');
//     if (skillsSection) {
//         progressObserver.observe(skillsSection);
//     }
// });

// Carousel 3D

document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.carousel-3d-container');
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
    }, 800); // Match this with the CSS transition duration
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
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Initialize carousel
  updateCarousel();
  
  // Optional: Auto-rotate
  let autoRotateInterval = setInterval(nextSlide, 6000);
  
  // Pause auto-rotation on hover
  container.addEventListener('mouseenter', () => {
    clearInterval(autoRotateInterval);
  });
  
  container.addEventListener('mouseleave', () => {
    autoRotateInterval = setInterval(nextSlide, 6000);
  });
  
  // Handle touch events for mobile
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
});

document.addEventListener('DOMContentLoaded', function() {
  // Typewriter effect
  const typewriter = document.querySelector('.typewriter');
  const words = ['Student', 'AI Enthusiast', 'Problem Solver'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isWaiting = false;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typewriter.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriter.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isWaiting = true;
      setTimeout(() => {
        isDeleting = true;
        isWaiting = false;
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    const typingSpeed = isDeleting ? 100 : 150;
    const delay = isWaiting ? 0 : typingSpeed;

    setTimeout(type, delay);
  }

  type();


  // Hide scroll indicator when scrolling starts
  window.addEventListener('scroll', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (window.scrollY > 100) {
      scrollIndicator.style.opacity = '0';
    } else {
      scrollIndicator.style.opacity = '0.7';
    }
  });
});

document.getElementById("contact-form").addEventListener("submit", function (event) {
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

      document.addEventListener('DOMContentLoaded', function() {
        // Get all sections that have corresponding nav items
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar.offsetHeight;
        
        // Scroll spy function with improved threshold handling
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

          // Update active link
          navLinks.forEach(link => link.classList.remove('active'));
          if (activeSection) {
            activeSection.classList.add('active');
          }
        }
        
        // Add scroll event listener with debounce for performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
          if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
          }
          
          scrollTimeout = window.requestAnimationFrame(function() {
            scrollSpy();
          });
        });
        
        // Run on initial load
        scrollSpy();
        
        // Update on window resize
        window.addEventListener('resize', function() {
          scrollSpy();
        });
      });
