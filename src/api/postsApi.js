const BASE_URL = 'http://localhost:3000/posts';

export async function getPosts(page = 1, limit = 5, query = '') {
  try {
    const url = `${BASE_URL}?_page=${page}&_limit=${limit}&q=${query}`;
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error('Помилка при отриманні постів:', err);
  }
}

export async function createPost(title, content) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    return await res.json();
  } catch (err) {
    console.error('Помилка при створенні поста:', err);
  }
}

export async function deletePost(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.error('Помилка при видаленні поста:', err);
  }
}
