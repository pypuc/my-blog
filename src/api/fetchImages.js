export async function fetchImages(query, page = 1) {
  const API_KEY = '50870503-c2d8068ee53ef019121c927e8';
  const BASE_URL = 'https://pixabay.com/api/';
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

  try {
    const { hits } = await fetch(url).then(res => res.json());
    return hits;
  } catch (error) {
    console.error('Помилка під час отримання зображень:', error);
    return [];
  }
}
