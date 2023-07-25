(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const s=document.createElement("template");s.innerHTML=`
<style>
.card {
    max-width: 250px;
    padding: 0.3rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 99, 230, 0.4);
    transition: 0.2s;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 99, 230, 0.6);
}

.card:active {
    box-shadow: 0 2px 4px 0 rgba(0, 99, 230, 0.6);
}

h3 {
    font-family: "Chakra Petch", sans-serif;
}

img {
    object-fit: none;
    border-radius: 10px;
    max-width: min(100%, 752px);
}

a {
    text-decoration: none;
}

a:link {
    color: var(--primary-color);
}

a:visited {
    color: var(--primary-color);
}

a:hover {
    color: var(--primary-light-color);
}

a:active {
    color: var(--primary-dark-color);
}
</style>

<a id=card-link>
    <div class="card">
        <img id="card-img" />
        <h3 id="card-title">
            <slot></slot>
        </h3>
    </div>
</a>
`;class p extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"closed"}),r=s.content.cloneNode(!0);t.appendChild(r);const n=t.getElementById("card-img");if(n instanceof HTMLImageElement){n.src=this.getAttribute("src")??"";const o=this.getAttribute("img-pos");o&&(n.style.objectPosition=o)}const e=t.getElementById("card-link");e instanceof HTMLAnchorElement&&(e.href=this.getAttribute("href")??"")}}const l=document.createElement("template");l.innerHTML=`
<style>
header {
    background-color: var(--primary-color);
    padding: 1em;
}

a {
    text-decoration: none;
}

.logo {
    font-family: "Press Start 2P", cursive;
    font-size: 1.2rem;
    text-align: left;
    color: white;
    text-shadow: 2px 2px var(--primary-dark-color);
}
</style>

<header>
    <a href="../">
        <div class="logo">
            Andreas Mikko
        </div>
    </a>
</header>
`;class h extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"closed"}),r=l.content.cloneNode(!0);t.appendChild(r)}}const d="© Andreas Mikko",c=2023,m=document.createElement("template");m.innerHTML=`
<style>
footer {
    font-family: "Chakra Petch", sans-serif;
    font-size: 1.2rem;
    color: white;
    background-color: var(--primary-dark-color);
    padding: 1em;
}

address {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

p {
    margin: 0.3rem;
}

a {
    font-style: normal;
    text-decoration: none;
    margin: 1rem;
}

a:link {
    color: var(--secondary-color);
}

a:visited {
    color: var(--secondary-color);
}

a:hover {
    color: var(--secondary-light-color);
}

a:active {
    color: var(--secondary-dark-color);
}
</style>

<footer class="flexbox color-section">
    <p id="copyright">${d}</p>
    <address>
        <a href="mailto:a.mikko92@gmail.com">Email</a>
        <a href="https://www.linkedin.com/in/andreas-mikko-04ab9988">LinkedIn</a>
    </address>
</footer>
`;class f extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"}),r=m.content.cloneNode(!0);t.appendChild(r)}connectedCallback(){var r;const t=(r=this.shadowRoot)==null?void 0:r.getElementById("copyright");if(t){const n=this.getCopyrightYear();t.innerText=d.concat(" ",n)}}getCopyrightYear(){const t=new Date().getFullYear();return t<=c?c.toString():c.toString().concat(" - ",t.toString())}}customElements.define("card-component",p);customElements.define("header-component",h);customElements.define("footer-component",f);
