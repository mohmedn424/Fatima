// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {
  // ===== Navigation Functionality =====
  initNavigation();

  // ===== Project Filtering =====
  // initProjectFiltering(); // Remove this duplicate function call

  // ===== Video Modal =====
  initVideoModal();

  // ===== Stages Accordion =====
  initStagesAccordion();

  // Only use this filtering function
  handleCategoryFiltering();
});

// Navigation functionality
function initNavigation() {
  // Smooth scroll to top when logo is clicked
  const logoLink = document.querySelector('.logo');
  if (logoLink) {
    logoLink.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector(
    '.mobile-nav-toggle'
  );
  const navLinks = document.querySelector('.nav-links');

  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach((item) => {
      item.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          mobileNavToggle.classList.remove('active');
        }
      });
    });
  }
}

// Project filtering functionality
function initProjectFiltering() {
  const filterButtons = document.querySelectorAll('.nav-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  // Set up project cards with correct categories and hide them initially
  projectCards.forEach((card) => {
    const categoryText = card
      .querySelector('.project-card__category')
      ?.textContent.trim();
    if (categoryText) {
      card.setAttribute('data-category', categoryText);
    }
    card.style.display = 'none';
  });

  // Handle filter button clicks
  filterButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const selectedCategory = this.textContent.trim();
      const isAlreadyActive = this.classList.contains('active');

      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove('active'));

      // Toggle projects visibility based on button state
      if (isAlreadyActive) {
        hideAllProjects();
      } else {
        this.classList.add('active');
        showProjectsByCategory(selectedCategory);
      }
    });
  });

  // Helper functions
  function hideAllProjects() {
    projectCards.forEach((card) => {
      card.style.display = 'none';
    });
  }

  function showProjectsByCategory(category) {
    projectCards.forEach((card) => {
      const cardCategory = card
        .querySelector('.project-card__category')
        ?.textContent.trim();
      card.style.display =
        cardCategory === category ? 'block' : 'none';
    });
  }
}

// Video modal functionality
function initVideoModal() {
  const projectImages = document.querySelectorAll(
    '.project-card__image'
  );
  const body = document.body;

  if (!projectImages.length) return;

  // Create modal container
  const modal = createModalElement();
  body.appendChild(modal);

  // Get modal elements
  const modalContainer = modal.querySelector(
    '.video-modal__container'
  );
  const closeButton = modal.querySelector('.video-modal__close');

  // Set up thumbnails and click events
  setupThumbnails(projectImages, modalContainer, modal, body);

  // Set up modal close events
  setupModalCloseEvents(modal, closeButton, body, modalContainer);
}

function createModalElement() {
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.innerHTML = `
    <div class="video-modal__content">
      <button class="video-modal__close">&times;</button>
      <div class="video-modal__container"></div>
    </div>
  `;
  return modal;
}

function setupThumbnails(projectImages, modalContainer, modal, body) {
  projectImages.forEach((projectImage) => {
    const iframe = projectImage.querySelector('iframe');
    if (!iframe) return;

    const videoSrc = iframe.src;
    const videoId = videoSrc.split('/').pop().split('?')[0];

    // Create thumbnail elements
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.className = 'thumbnail-container';

    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = `https://vumbnail.com/${videoId}.jpg`;
    thumbnailImg.alt = 'Video thumbnail';
    thumbnailImg.className = 'video-thumbnail';

    const playButton = document.createElement('div');
    playButton.className = 'play-button';
    playButton.innerHTML =
      '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>';

    // Assemble and replace
    thumbnailContainer.appendChild(thumbnailImg);
    thumbnailContainer.appendChild(playButton);
    projectImage.innerHTML = '';
    projectImage.appendChild(thumbnailContainer);

    // Store video source and add click event
    thumbnailContainer.dataset.videoSrc = videoSrc;
    thumbnailContainer.addEventListener('click', function () {
      modalContainer.innerHTML = `<iframe src="${this.dataset.videoSrc}&autoplay=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      modal.classList.add('active');
      body.style.overflow = 'hidden';
    });
  });
}

function setupModalCloseEvents(
  modal,
  closeButton,
  body,
  modalContainer
) {
  // Close button click
  closeButton.addEventListener('click', () =>
    closeModal(modal, body, modalContainer)
  );

  // Click outside content
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal(modal, body, modalContainer);
    }
  });

  // Escape key press
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal(modal, body, modalContainer);
    }
  });
}

function closeModal(modal, body, modalContainer) {
  modal.classList.remove('active');
  body.style.overflow = '';
  modalContainer.innerHTML = '';
}

// Stages accordion functionality
function initStagesAccordion() {
  const stageHeaders = document.querySelectorAll(
    '.stage-item__header'
  );
  const stageToggles = document.querySelectorAll('.stage-toggle');
  const stageContents = document.querySelectorAll(
    '.stage-item__content'
  );

  if (!stageHeaders.length) return;

  stageHeaders.forEach((header, index) => {
    header.addEventListener('click', function () {
      if (stageToggles[index])
        stageToggles[index].classList.toggle('active');
      if (stageContents[index])
        stageContents[index].classList.toggle('active');
    });
  });
}

// Function to handle category filtering
function handleCategoryFiltering() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.querySelector('.projects__grid');

  // Set initial state - hide all projects
  if (projectsGrid) {
    projectsGrid.style.display = 'none';
    // Add a transition to the grid itself
    projectsGrid.style.transition = 'opacity 0.3s ease';
  }

  // Set up project cards with correct categories
  projectCards.forEach((card) => {
    const categoryText = card
      .querySelector('.project-card__category')
      ?.textContent.trim();
    if (categoryText) {
      card.setAttribute('data-category', categoryText);
    }

    // Create a wrapper for the content to animate separately from borders
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content-wrapper';

    // Move all child elements into the wrapper
    while (card.firstChild) {
      cardContent.appendChild(card.firstChild);
    }

    // Add the wrapper back to the card
    card.appendChild(cardContent);

    // Style the wrapper
    cardContent.style.height = '100%';
    cardContent.style.width = '100%';
    cardContent.style.position = 'relative';

    // Initialize all cards with GSAP
    gsap.set(cardContent, {
      opacity: 0,
      scale: 0.98,
      y: 10,
    });

    // Hide the card initially
    card.style.display = 'none';
  });

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Get the selected category
      const category = button.textContent.trim();

      // Check if this button is already active
      const wasActive = button.classList.contains('active');

      // Toggle active class on buttons
      navButtons.forEach((btn) => btn.classList.remove('active'));

      // If the button was already active, hide the entire grid and exit
      if (wasActive) {
        // Fade out the grid container instead of animating individual cards
        gsap.to(projectsGrid, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            projectsGrid.style.display = 'none';
          },
        });
        return;
      }

      // Otherwise, show the grid and mark this button as active
      button.classList.add('active');

      // Show grid with initial opacity 0
      projectsGrid.style.opacity = '0';
      projectsGrid.style.display = 'grid';

      // Fade in the grid container
      gsap.to(projectsGrid, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Filter projects
      let visibleCount = 0;
      const visibleCards = [];
      const visibleContents = [];
      const hiddenCards = [];

      // First, categorize cards and set up borders properly
      projectCards.forEach((card) => {
        const cardCategory = card
          .querySelector('.project-card__category')
          .textContent.trim();

        const cardContent = card.querySelector(
          '.card-content-wrapper'
        );

        if (cardCategory === category) {
          visibleCards.push(card);
          visibleContents.push(cardContent);
          visibleCount++;

          // Show the card immediately to establish grid layout
          card.style.display = 'block';

          // Reset all borders
          card.style.borderRight = '1px solid #1a1a1a';
          card.style.borderBottom = '1px solid #1a1a1a';
        } else {
          hiddenCards.push(card);
          card.style.display = 'none';
        }
      });

      // Fix borders immediately after categorizing
      visibleCards.forEach((card, index) => {
        // Remove right border for every even card
        if ((index + 1) % 2 === 0) {
          card.style.borderRight = 'none';
        }

        // Remove bottom border for last row
        const isLastRow =
          Math.ceil(visibleCount / 2) === Math.ceil((index + 1) / 2);
        if (isLastRow) {
          card.style.borderBottom = 'none';
        }

        // Mobile view adjustments
        if (window.innerWidth <= 576) {
          card.style.borderRight = 'none';
          card.style.borderBottom = '1px solid #1a1a1a';

          // Last card has no bottom border
          if (index === visibleCards.length - 1) {
            card.style.borderBottom = 'none';
          }
        }
      });

      // Animate in the card contents with staggered timing
      gsap.fromTo(
        visibleContents,
        {
          opacity: 0,
          y: 10,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );
    });
  });

  // Trigger click on first button to show initial category
  if (navButtons.length > 0) {
    setTimeout(() => {
      navButtons[0].click();
    }, 100);
  }
}
