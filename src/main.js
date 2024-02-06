import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const apiKey = '42152673-4f3b2f2010df91e54c05d1b70';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  loader.style.display = 'block';
  const searchName = searchInput.value.trim();

  if (!searchName) {
    iziToast.warning({
      title: 'Attention',
      message: 'Please enter a search name.',
    });

    // Hide loader if no search term entered
    loader.style.display = 'none';
    return;
  }

  searchImages(searchName);
});

function searchImages(searchTerm) {
  // Get loader element again
  const loader = document.querySelector('.loader');

  // Clear gallery before new search
  gallery.innerHTML = '';

  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.hits.length > 0) {
        data.hits.forEach(image => {
          const card = createImageCard(image);
          gallery.appendChild(card);
        });

        const modal = new SimpleLightbox('.gallery a', {
          // Refresh SimpleLightbox after adding new images
          elements: data.hits.map(image => ({ src: image.largeImageURL })),
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
      // Hide loader after HTTP request
      loader.style.display = 'none';
    });
}

function createImageCard(image) {
  const card = document.createElement('div');
  card.classList.add('image-card');

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.dataset.largeImage = image.largeImageURL;
  card.appendChild(img);

  const info = document.createElement('div');
  info.classList.add('image-info');
  info.innerHTML = `
    <p><strong>Likes:</strong> <span class="text">${image.likes}</span></p>
    <p><strong>Views:</strong><span class="text"> ${image.views}</span></p>
    <p><strong>Comments:</strong><span class="text"> ${image.comments}</span></p>
    <p><strong>Downloads:</strong><span class="text"> ${image.downloads}</span></p>
  `;
  card.appendChild(info);

  img.addEventListener('click', openModal);

  return card;
}

function openModal(event) {
  const largeImageURL = event.target.dataset.largeImage;
  const modal = new SimpleLightbox([{ src: largeImageURL }]);
  modal.show();
}
