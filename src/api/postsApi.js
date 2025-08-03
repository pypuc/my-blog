const BASE_URL = 'http://localhost:3000/posts';

export async function getPosts() {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch (err) {
    console.error('Помилка завантаження постів:', err);
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
    console.error('Помилка створення поста:', err);
  }
}

export async function updatePost(id, title, content) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    return await res.json();
  } catch (err) {
    console.error('Помилка оновлення поста:', err);
  }
}

export async function deletePost(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.error('Помилка видалення поста:', err);
  }
}
