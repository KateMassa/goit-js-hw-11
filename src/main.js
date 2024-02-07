import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.querySelector('.loader');

const searchParams = {
  key: '42152673-4f3b2f2010df91e54c05d1b70',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  q: '',
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  loader.style.display = 'block';
  const inputValue = e.target.elements.input.value;
  searchParams.q = inputValue;
  getPhotoByName()
    .then(images => createGallery(images))
    .catch(error => console.log(error));
  e.target.reset();
});

function getPhotoByName() {
  const urlParams = new URLSearchParams(searchParams);
  return fetch(`https://pixabay.com/api/?${urlParams}`).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.status);
    }
  });
}

function createGallery(images) {
  if (images.hits.length === 0) {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: '#FFFFFF',
      backgroundColor: '#EF4040',
      position: 'topRight',
      messageSize: '16px',
      messageLineHeight: '24px',
      maxWidth: '432px',
    });
    gallery.innerHTML = '';
  } else {
    const link = images.hits
      .map(
        image => `<a class="gallery-link" href="${image.largeImageURL}">
        <img class="gallery-image"
        src="${image.webformatURL}"
        alt="${image.tags}"
         </a>
         <div class="image-info">
          <p ><strong>Likes:</strong> <span class="text">${image.likes}</span></p>
          <p ><strong>Views:</strong> <span class="text">${image.views}</span></p>
          <p ><strong>Comments:</strong> <span class="text">${image.comments}</span></p>
          <p ><strong>Downloads:</strong> <span class="text">${image.downloads}</span></p>
          </div>
          
        `
      )
      .join('');
    gallery.innerHTML = link;
  }
  let lightBox = new SimpleLightbox('.gallery-link');
  lightBox.refresh();
  loader.style.display = 'none';
}
