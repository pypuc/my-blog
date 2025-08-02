const API_KEY = 'YOUR_PIXABAY_API_KEY';
const BASE_URL = 'https://pixabay.com/api/';
let currentPage = 1;
let currentQuery = '';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function fetchImages(query, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

async function onSearch(e) {
  e.preventDefault();
  const query = e.target.elements.query.value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;
  gallery.innerHTML = '';
  const images = await fetchImages(query, currentPage);
  renderImages(images);
  loadMoreBtn.style.display = images.length < 12 ? 'none' : 'block';
}

async function onLoadMore() {
  currentPage += 1;
  const images = await fetchImages(currentQuery, currentPage);
  renderImages(images);

  // Плавний скрол до нових елементів
  const lastCard = gallery.lastElementChild;
  if (lastCard) {
    lastCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  loadMoreBtn.style.display = images.length < 12 ? 'none' : 'block';
}

function renderImages(images) {
  const markup = images
    .map(
      img => `
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
  `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
