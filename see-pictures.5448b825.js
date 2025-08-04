let e=[];async function t(){let t=await fetch("posts.json");e=await t.json(),u()}function u(t=e){let n=document.getElementById("posts");n.innerHTML="",t.forEach(e=>{let t=document.createElement("div");t.className="post",t.innerHTML=`
      <h3>${e.title}</h3>
      <p>${e.body}</p>
      <button class="delete-btn" data-id="${e.id}">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>

      <form class="comment-form" data-id="${e.id}">
        <input type="text" placeholder="\u{412}\u{430}\u{448} \u{43A}\u{43E}\u{43C}\u{435}\u{43D}\u{442}\u{430}\u{440}..." required />
        <button type="submit">\u{414}\u{43E}\u{434}\u{430}\u{442}\u{438} \u{43A}\u{43E}\u{43C}\u{435}\u{43D}\u{442}\u{430}\u{440}</button>
      </form>

      <ul class="comments" id="comments-${e.id}"></ul>
    `,n.appendChild(t)}),document.querySelectorAll(".delete-btn").forEach(t=>{t.addEventListener("click",()=>{var n;n=parseInt(t.getAttribute("data-id")),e=e.filter(e=>e.id!==n),u()})}),document.querySelectorAll(".comment-form").forEach(e=>{e.addEventListener("submit",t=>{t.preventDefault();let u=parseInt(e.getAttribute("data-id")),n=e.querySelector("input");(function(e,t){let u=document.getElementById(`comments-${e}`),n=document.createElement("li");n.textContent=t,u.appendChild(n)})(u,n.value),n.value=""})})}document.getElementById("post-form").addEventListener("submit",t=>{t.preventDefault();let n=document.getElementById("title").value,d=document.getElementById("body").value,l={id:Date.now(),title:n,body:d};e.unshift(l),u(),t.target.reset()}),document.getElementById("search").addEventListener("input",t=>{let n=t.target.value.toLowerCase();u(e.filter(e=>e.title.toLowerCase().includes(n)||e.body.toLowerCase().includes(n)))}),t();
//# sourceMappingURL=see-pictures.5448b825.js.map
