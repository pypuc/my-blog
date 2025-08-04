let posts = [];

async function loadPosts() {
  const res = await fetch("posts.json");
  posts = await res.json();
  renderPosts();
}

function renderPosts(filteredPosts = posts) {
  const container = document.getElementById("posts");
  container.innerHTML = "";
  filteredPosts.forEach((post) => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <button class="delete-btn" data-id="${post.id}">Видалити</button>

      <form class="comment-form" data-id="${post.id}">
        <input type="text" placeholder="Ваш коментар..." required />
        <button type="submit">Додати коментар</button>
      </form>

      <ul class="comments" id="comments-${post.id}"></ul>
    `;
    container.appendChild(div);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      deletePost(id);
    });
  });

  document.querySelectorAll(".comment-form").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = parseInt(form.getAttribute("data-id")); 
      const input = form.querySelector("input");
      addComment(id, input.value);
      input.value = "";
    });
  });
}

function deletePost(id) {
  posts = posts.filter(post => post.id !== id);
  renderPosts();
}

function addComment(postId, commentText) {
  const commentsList = document.getElementById(`comments-${postId}`);
  const li = document.createElement("li");
  li.textContent = commentText;
  commentsList.appendChild(li);
}


document.getElementById("post-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  const newPost = {
    id: Date.now(),
    title,
    body
  };

  posts.unshift(newPost);
  renderPosts();
  e.target.reset();
});

document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.body.toLowerCase().includes(query)
  );
  renderPosts(filtered);
});

loadPosts();
