import { fetchImages } from './api/fetchImages.js';

let currentPage = 1;
let currentQuery = '';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  const input = e.target.querySelector('input[name="query"]');
  const value = input.value.trim();
  if (!value) return;

  currentQuery = value;
  currentPage = 1;
  gallery.innerHTML = '';

  try {
    const images = await fetchImages(currentQuery, currentPage);
    renderImages(images);
    loadMoreBtn.style.display = images.length < 12 ? 'none' : 'block';
  } catch (error) {
    console.error('Помилка під час пошуку зображень:', error);
  }
}

async function onLoadMore() {
  currentPage += 1;

  try {
    const images = await fetchImages(currentQuery, currentPage);
    renderImages(images);

    const lastCard = gallery.lastElementChild;
    if (lastCard) {
      lastCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    loadMoreBtn.style.display = images.length < 12 ? 'none' : 'block';
  } catch (error) {
    console.error('Помилка під час завантаження зображень:', error);
  }
}

function renderImages(images) {
  const markup = images.map(img => `
    <li>
      <div class="photo-card">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        <div class="stats">
          <p class="stats-item">
            <i class="material-icons">thumb_up</i>${img.likes}
          </p>
          <p class="stats-item">
            <i class="material-icons">visibility</i>${img.views}
          </p>
          <p class="stats-item">
            <i class="material-icons">comment</i>${img.comments}
          </p>
          <p class="stats-item">
            <i class="material-icons">cloud_download</i>${img.downloads}
          </p>
        </div>
      </div>
    </li>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
