document.addEventListener('DOMContentLoaded', function () {
  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector(
    '.mobile-nav-toggle'
  );
  const navLinks = document.querySelector('.nav-links');

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function () {
      // Toggle active class on the button
      this.classList.toggle('active');

      // Toggle visibility of nav links
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a link
  const navLinkElements = document.querySelectorAll('.nav-links a');
  navLinkElements.forEach((link) => {
    link.addEventListener('click', function () {
      if (mobileNavToggle.classList.contains('active')) {
        mobileNavToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // Hero section animations
  animateHeroSection();
});

function animateHeroSection() {
  // Check if GSAP is loaded
  if (typeof gsap !== 'undefined') {
    // Create a timeline for hero animations
    const heroTimeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    // Animate hero title elements
    heroTimeline
      .from('.hero__title .subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      })
      .from(
        '.hero__title .title',
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.4'
      )
      .from(
        '.hero__title .outline-title',
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.6'
      );

    // Animate hero image and text
    heroTimeline
      .from(
        '.hero__image img',
        {
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          rotation: -5,
        },
        '-=0.4'
      )
      .from(
        '.hero__image .circular-text',
        {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          rotation: '-=90',
        },
        '-=0.8'
      )
      .from(
        '.hero__text p',
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.6'
      );

    // Add continuous subtle animation to the hero image
    gsap.to('.hero__image img', {
      rotation: 3,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }
}
