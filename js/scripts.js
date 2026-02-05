// Initialize AOS (if present)
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });
}

// All DOMContentLoaded logic in one place
document.addEventListener('DOMContentLoaded', function () {
  // --- Theme Toggle ---
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', initialTheme);

  function updateThemeToggle(theme) {
    if (!themeToggle) return;
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-sun theme-icon" aria-hidden="true"></i><span class="theme-label">Light</span>'
      : '<i class="fas fa-moon theme-icon" aria-hidden="true"></i><span class="theme-label">Dark</span>';
  }

  updateThemeToggle(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const currentTheme = root.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      updateThemeToggle(nextTheme);
    });
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
