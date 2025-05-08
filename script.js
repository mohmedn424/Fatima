document.addEventListener('DOMContentLoaded', function () {
  // Get the logo element
  const logoLink = document.querySelector('.logo');

  // Add click event listener to the logo
  logoLink.addEventListener('click', function (event) {
    // Prevent default anchor behavior
    event.preventDefault();

    // Scroll to the top of the page smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});

// Get all filter buttons and project cards
const filterButtons = document.querySelectorAll('.nav-btn');
const projectCards = document.querySelectorAll('.project-card');

// Add click event to each filter button
filterButtons.forEach((button) => {
  button.addEventListener('click', function () {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove('active'));

    // Add active class to clicked button
    this.classList.add('active');

    // Get the filter category
    const filterValue = this.textContent.trim();

    // Show/hide projects based on category
    projectCards.forEach((card) => {
      const category = card.querySelector(
        '.project-card__category'
      ).textContent;

      if (
        filterValue === 'ALL PROJECTS' ||
        category === filterValue
      ) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Video modal functionality
const projectImages = document.querySelectorAll(
  '.project-card__image'
);
const body = document.body;

// Create modal container
const modal = document.createElement('div');
modal.className = 'video-modal';
modal.innerHTML = `
    <div class="video-modal__content">
        <button class="video-modal__close">&times;</button>
        <div class="video-modal__container"></div>
    </div>
`;
body.appendChild(modal);

// Get modal elements
const modalContent = modal.querySelector('.video-modal__content');
const modalContainer = modal.querySelector('.video-modal__container');
const closeButton = modal.querySelector('.video-modal__close');

// Add click event to each project image
projectImages.forEach((projectImage) => {
  // Create thumbnail from the iframe src
  const iframe = projectImage.querySelector('iframe');
  const videoSrc = iframe.src;

  // Create thumbnail container
  const thumbnailContainer = document.createElement('div');
  thumbnailContainer.className = 'thumbnail-container';

  // Create thumbnail image (using Vimeo thumbnail API)
  const videoId = videoSrc.split('/').pop().split('?')[0];
  const thumbnailImg = document.createElement('img');
  thumbnailImg.src = `https://vumbnail.com/${videoId}.jpg`;
  thumbnailImg.alt = 'Video thumbnail';
  thumbnailImg.className = 'video-thumbnail';

  // Create play button overlay
  const playButton = document.createElement('div');
  playButton.className = 'play-button';
  playButton.innerHTML =
    '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>';

  // Add elements to thumbnail container
  thumbnailContainer.appendChild(thumbnailImg);
  thumbnailContainer.appendChild(playButton);

  // Replace iframe with thumbnail
  projectImage.innerHTML = '';
  projectImage.appendChild(thumbnailContainer);

  // Store video source as data attribute
  thumbnailContainer.dataset.videoSrc = videoSrc;

  // Add click event to thumbnail
  thumbnailContainer.addEventListener('click', function () {
    // Add video iframe to modal
    modalContainer.innerHTML = `<iframe src="${this.dataset.videoSrc}&autoplay=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;

    // Show modal
    modal.classList.add('active');
    body.style.overflow = 'hidden'; // Prevent scrolling
  });
});

// Close modal when clicking close button
closeButton.addEventListener('click', function () {
  closeModal();
});

// Close modal when clicking outside content
modal.addEventListener('click', function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// Function to close modal
function closeModal() {
  modal.classList.remove('active');
  body.style.overflow = ''; // Restore scrolling
  modalContainer.innerHTML = ''; // Remove iframe to stop video
}

// Stages accordion functionality
const stageHeaders = document.querySelectorAll('.stage-item__header');
const stageToggles = document.querySelectorAll('.stage-toggle');
const stageContents = document.querySelectorAll(
  '.stage-item__content'
);

stageHeaders.forEach((header, index) => {
  header.addEventListener('click', function () {
    // Toggle active class on button
    stageToggles[index].classList.toggle('active');

    // Toggle active class on content
    stageContents[index].classList.toggle('active');
  });
});
