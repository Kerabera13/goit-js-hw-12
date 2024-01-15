import{a as k,i as f,S as E}from"./assets/vendor-89feecc5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const $="41640430-3528202645bdb0a9dd97623d3";let s=1,d="",c=0,y=0;const m=document.querySelector("#searchForm"),v=document.querySelector("#searchInput"),g=document.getElementById("gallery"),h=document.querySelector(".loader"),u=document.getElementById("loadMoreBtn");m.addEventListener("submit",M);u.addEventListener("click",_);async function M(t){t.preventDefault();const r=v.value.trim();if(r){d=r,s=1,S();try{const{images:n,total:a}=await p(d,s);c=a,b(n),await w(n.length)}catch(n){L(n)}finally{I(),m.reset()}}}async function _(){S(),s++;try{const{images:t,total:r}=await p(d,s);c=r,b(t,!0),await w(t.length),window.scrollBy({top:y*2,behavior:"smooth"})}catch(t){L(t)}finally{I()}}async function p(t,r){const a=`https://pixabay.com/api/?key=${$}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${40}`;try{const e=await k.get(a);if(e.status!==200)throw new Error("Network response was not ok");const{hits:o,totalHits:i}=e.data;if(o.length>0&&s===1){const l=document.querySelector(".gallery__item");l&&(y=l.getBoundingClientRect().height)}return{images:o,total:i}}catch(e){throw e}}async function w(t){s*40>=c?(u.style.display="none",s*40>=c&&t>0&&await f.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#EF4040",position:"topRight",messageColor:"#fff",messageSize:"16px",timeout:5e3,maxWidth:400,transitionIn:"fadeInLeft",transitionOut:"fadeOut"})):u.style.display="block"}function b(t,r=!1){if(r||(g.innerHTML=""),t.length===0&&s===1){f.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#EF4040",position:"topRight",messageColor:"#fff",messageSize:"16px",timeout:5e3,maxWidth:400,transitionIn:"fadeInLeft",transitionOut:"fadeOut"}),u.style.display="none";return}const n=x(t);g.innerHTML+=n,new E("#gallery a",{captionsData:"alt",captionPosition:"bottom"}).refresh()}function x(t){return t.map(({webformatURL:r,tags:n,likes:a,views:e,comments:o,downloads:i,largeImageURL:l})=>`
    <li class="gallery__item">
      <a class="gallery__link" href="${l}">
        <img class="gallery__image" src="${r}" alt="${n}" />
      </a>
      <div class="image-info">
        <span>Likes: ${a}</span>
        <span>Views: ${e}</span>
        <span>Comments: ${o}</span>
        <span>Downloads: ${i}</span>
      </div>
    </li>`).join("")}function L(t){console.error("Error fetching images:",t);const r=t.response&&t.response.status===404?"Sorry, there are no images matching your search query. Please try again!":"An error occurred while fetching images. Please try again later.";f.error({title:"Error",message:r})}function S(){h.style.display="block"}function I(){h.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
