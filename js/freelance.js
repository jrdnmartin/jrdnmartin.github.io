    // Smooth scrolling for navigation links
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

    // Scroll to contact function
    function scrollToContact() {
      document.getElementById('contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // FAQ toggle functionality
    function toggleFaq(button) {
      const faqItem = button.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question span').textContent = '+';
      });
      
      // Toggle current item
      if (!isActive) {
        faqItem.classList.add('active');
        button.querySelector('span').textContent = '−';
      }
    }

    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
      }
    });

    // Form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Create mailto link with form data
      const subject = encodeURIComponent(`Website Project Inquiry from ${data.name}`);
      const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Business: ${data.business || 'Not specified'}
Budget: ${data.budget || 'Not specified'}

Project Details:
${data.message}

---
Sent from website contact form
      `);
      
      const mailtoLink = `mailto:jordan@example.com?subject=${subject}&body=${body}`;
      
      // Open mail client
      window.location.href = mailtoLink;
      
      // Show success message
      alert('Opening your email client now! If it doesn\'t open automatically, please email me directly at jordan@example.com');
    });

    // Add select styling
    const selectElement = document.getElementById('budget');
    selectElement.style.cssText = `
      width: 100%;
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      font-size: 1rem;
      background: white;
      cursor: pointer;
    `;