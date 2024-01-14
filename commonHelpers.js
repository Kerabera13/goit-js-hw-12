import{i as l,S as d}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const m="41640430-3528202645bdb0a9dd97623d3",c=document.querySelector("#searchForm"),h=document.querySelector("#searchInput"),a=document.getElementById("gallery"),u=document.querySelector(".loader");c.addEventListener("submit",p);function p(n){n.preventDefault();const o=h.value.trim();o&&(L(),g(o).then(t=>{y(t)}).catch(t=>{b(t)}).finally(()=>{w(),c.reset()}))}function g(n){const o=`https://pixabay.com/api/?key=${m}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(o).then(t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()}).then(t=>t.hits)}function y(n){if(a.innerHTML="",n.length===0){l.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#EF4040",position:"bottomRight",messageColor:"#fff",messageSize:"16px",timeout:5e3,maxWidth:400,transitionIn:"fadeInLeft",transitionOut:"fadeOut"});return}const o=k(n);a.innerHTML=o,new d("#gallery a",{captionsData:"alt",captionPosition:"bottom"}).refresh()}function b(n){console.error("Error fetching images:",n),l.error({title:"Error",message:"An error occurred while fetching images. Please try again later."})}function L(){u.style.display="block"}function w(){u.style.display="none"}function k(n){return n.map(({webformatURL:o,tags:t,likes:s,views:e,comments:r,downloads:i,largeImageURL:f})=>`
    <li class="gallery__item">
      <a class="gallery__link" href="${f}">
        <img class="gallery__image" src="${o}" alt="${t}" />
      </a>
      <div class="image-info">
        <span>Likes: ${s}</span>
        <span>Views: ${e}</span>
        <span>Comments: ${r}</span>
        <span>Downloads: ${i}</span>
      </div>
    </li>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
