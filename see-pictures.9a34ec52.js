let API_KEY="YOUR_PIXABAY_API_KEY",BASE_URL="https://pixabay.com/api/",currentPage=1,currentQuery="",form=document.getElementById("search-form"),gallery=document.getElementById("gallery"),loadMoreBtn=document.getElementById("load-more");async function fetchImages(e,t=1){let a=`https://pixabay.com/api/?key=YOUR_PIXABAY_API_KEY&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&per_page=12&page=${t}`;try{let e=await fetch(a);return(await e.json()).hits}catch(e){return console.error("Error fetching images:",e),[]}}async function onSearch(e){e.preventDefault();let t=e.target.elements.query.value.trim();if(!t)return;currentQuery=t,currentPage=1,gallery.innerHTML="";let a=await fetchImages(t,currentPage);renderImages(a),loadMoreBtn.style.display=a.length<12?"none":"block"}async function onLoadMore(){currentPage+=1;let e=await fetchImages(currentQuery,currentPage);renderImages(e);let t=gallery.lastElementChild;t&&t.scrollIntoView({behavior:"smooth",block:"end"}),loadMoreBtn.style.display=e.length<12?"none":"block"}function renderImages(e){let t=e.map(e=>`
    <li>
      <div class="photo-card">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        <div class="stats">
          <p class="stats-item">
            <i class="material-icons">thumb_up</i>${e.likes}
          </p>
          <p class="stats-item">
            <i class="material-icons">visibility</i>${e.views}
          </p>
          <p class="stats-item">
            <i class="material-icons">comment</i>${e.comments}
          </p>
          <p class="stats-item">
            <i class="material-icons">cloud_download</i>${e.downloads}
          </p>
        </div>
      </div>
    </li>
  `).join("");gallery.insertAdjacentHTML("beforeend",t)}form.addEventListener("submit",onSearch),loadMoreBtn.addEventListener("click",onLoadMore);
//# sourceMappingURL=see-pictures.9a34ec52.js.map
