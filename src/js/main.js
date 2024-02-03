import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

document
  .getElementById('searchForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const searchTerm = document.getElementById('searchInput').value;

    if (!searchTerm.trim()) {
      iziToast.warning({
        title: 'Attention',
        message: 'Please enter a word to search for.',
      });
      return;
    }

    const apiKey = '42152673-4f3b2f2010df91e54c05d1b70';
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.hits.length > 0) {
          displayImages(data.hits);
        } else {
          iziToast.error({
            title: 'Error',
            message:
              'Sorry, there are no images matching your search query. Please try again.',
          });
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  });

function displayImages(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  images.forEach(image => {
    const card = createImageCard(image);
    gallery.appendChild(card);
  });

  const lightbox = new SimpleLightbox('.gallery-container img');
}

function createImageCard(image) {
  const card = document.createElement('div');
  card.classList.add('image-card');

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;

  img.addEventListener('click', function () {
    // Handle image click event if needed
  });

  card.appendChild(img);

  return card;
}
