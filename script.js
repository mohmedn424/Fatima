// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {
  // ===== Navigation Functionality =====
  initNavigation();

  // ===== Project Filtering =====
  initProjectFiltering();

  // ===== Video Modal =====
  initVideoModal();

  // ===== Stages Accordion =====
  initStagesAccordion();
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
