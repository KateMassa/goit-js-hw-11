import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function searchImages() {
  const loader = document.getElementById('loader-wrapper');
  loader.style.display = 'flex';

  const searchTerm = document.getElementById('search-input').value;

  if (!searchTerm.trim()) {
    iziToast.warning({
      title: 'Attention',
      message: 'Please enter a word to search for.',
    });
    loader.style.display = 'none';
    return;
  }

  const gallery = document.getElementById('gallery');
  // Clearing the gallery before a new search
  gallery.innerHTML = '';

  // URL request the Pixabay API
  const apiUrl = `https://pixabay.com/api/?key=42152673-4f3b2f2010df91e54c05d1b70&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`;

  // Execution of an HTTP request
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.hits.length > 0) {
        function createImageCard(image) {
          const card = document.createElement('div');
          card.classList.add('image-card');

          // Adding image
          const img = document.createElement('img');
          img.src = image.webformatURL;
          img.alt = image.tags;
          img.dataset.largeImage = image.largeImageURL;
          card.appendChild(img);

          // Adding information about the image (likes, views, comments, downloads)
          const info = document.createElement('div');
          info.classList.add('image-info');
          info.innerHTML = `
        <p><strong>Likes:</strong> ${image.likes}</p>
        <p><strong>Views:</strong> ${image.views}</p>
        <p><strong>Comments:</strong> ${image.comments}</p>
        <p><strong>Downloads:</strong> ${image.downloads}</p>
    `;
          card.appendChild(info);

          // Adding an event to open a modal window when the image is clicked
          img.addEventListener('click', openModal);

          return card;
        }

        data.hits.forEach(image => {
          const card = createImageCard(image);
          gallery.appendChild(card);
        });

        const modal = new SimpleLightbox({
          elements: [{ src: largeImageURL }],
        });
        modal.refresh();
      } else {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again.',
        });
      }
    })
    .catch(error => {
      console.error('An error occurred when executing an HTTP request:', error);
    })
    .finally(() => {
      // Hide the loading indicator after the HTTP request is complete
      loader.style.display = 'none';
    });
}

function createImageCard(image) {
  const cardTemplate = `
        <div class="image-card">
            <img src="${image.webformatURL}" alt="${image.tags}" data-large-image="${image.largeImageURL}">
            <div class="image-info">
                <p><strong>Likes:</strong> ${image.likes}</p>
                <p><strong>Views:</strong> ${image.views}</p>
                <p><strong>Comments:</strong> ${image.comments}</p>
                <p><strong>Downloads:</strong> ${image.downloads}</p>
            </div>
        </div>
    `;

  const cardContainer = document.createElement('div');
  cardContainer.innerHTML = cardTemplate;

  // Adding an event to open a modal window when the image is clicked
  const img = cardContainer.querySelector('img');
  img.addEventListener('click', openModal);

  return cardContainer.firstElementChild;
}

function openModal(event) {
  const largeImageURL = event.target.dataset.largeImage;
  modal.open();
}
