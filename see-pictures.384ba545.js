async function e(t,a=1){let s=`https://pixabay.com/api/?key=50870503-c2d8068ee53ef019121c927e8&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${a}&per_page=12`;try{let{hits:e}=await fetch(s).then(e=>e.json());return e}catch(e){return console.error("Помилка під час отримання зображень:",e),[]}}let t=1,a="";const s=document.getElementById("search-form"),i=document.getElementById("gallery"),n=document.getElementById("load-more");async function o(s){s.preventDefault();let o=s.target.querySelector('input[name="query"]').value.trim();if(o){a=o,t=1,i.innerHTML="";try{let s=await e(a,t);c(s),n.style.display=s.length<12?"none":"block"}catch(e){console.error("Помилка під час пошуку зображень:",e)}}}async function l(){t+=1;try{let s=await e(a,t);c(s);let o=i.lastElementChild;o&&o.scrollIntoView({behavior:"smooth",block:"end"}),n.style.display=s.length<12?"none":"block"}catch(e){console.error("Помилка під час завантаження зображень:",e)}}function c(e){let t=e.map(e=>`
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
  `).join("");i.insertAdjacentHTML("beforeend",t)}s.addEventListener("submit",o),n.addEventListener("click",l);
//# sourceMappingURL=see-pictures.384ba545.js.map
