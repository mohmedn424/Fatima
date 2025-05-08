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
});
