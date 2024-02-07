import{i as u,S as p}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const f=document.getElementById("search-form"),l=document.getElementById("gallery"),i=document.querySelector(".loader"),c={key:"42152673-4f3b2f2010df91e54c05d1b70",image_type:"photo",orientation:"horizontal",safesearch:!0,q:""};f.addEventListener("submit",function(r){r.preventDefault(),i.style.display="block";const o=r.target.elements.input.value;c.q=o,d().then(n=>g(n)).catch(n=>console.log(n)),r.target.reset()});function d(){const r=new URLSearchParams(c);return fetch(`https://pixabay.com/api/?${r}`).then(o=>{if(o.ok)return o.json();throw new Error(o.status)})}function g(r){if(r.hits.length===0)u.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",messageSize:"16px",messageLineHeight:"24px",maxWidth:"432px"}),l.innerHTML="";else{const n=r.hits.map(s=>`<a class="gallery-link" href="${s.largeImageURL}">
        <img class="gallery-image"
        src="${s.webformatURL}"
        alt="${s.tags}"
         </a>
         <div class="image-info">
          <p ><strong>Likes:</strong> <span class="text">${s.likes}</span></p>
          <p ><strong>Views:</strong> <span class="text">${s.views}</span></p>
          <p ><strong>Comments:</strong> <span class="text">${s.comments}</span></p>
          <p ><strong>Downloads:</strong> <span class="text">${s.downloads}</span></p>
          </div>
          
        `).join("");l.innerHTML=n}new p(".gallery-link").refresh(),i.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
