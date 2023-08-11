(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const s=document.createElement("template");s.innerHTML=`
<style>
.card {
    max-width: 250px;
    min-height: 100%;
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
`;class p extends HTMLElement{constructor(){super();const o=this.attachShadow({mode:"closed"}),t=s.content.cloneNode(!0);o.appendChild(t);const a=o.getElementById("card-img");if(a instanceof HTMLImageElement){a.src=this.getAttribute("src")??"";const r=this.getAttribute("img-pos");r&&(a.style.objectPosition=r)}const e=o.getElementById("card-link");e instanceof HTMLAnchorElement&&(e.href=this.getAttribute("href")??"")}}const l=document.createElement("template");l.innerHTML=`
<style>
.header-bar {
    display: flex;
    background-color: var(--primary-color);
    justify-content: flex-start;
}

#nav-bar {
    display: block;
    margin: 1em;
}

button {
    display: none;
    background: var(--primary-color);
    border-style: none;
    border-radius: 10px;
}

button:hover {
    background: var(--primary-light-color);
}

button:active {
    background: var(--primary-dark-color);
}

.menu-icon {
    max-width: 2rem;
    margin: 0.3em;
}

#nav-menu {
    display: none;
    background: hsl(214, 100%, 30%);
    margin: 1px;
    padding: 1em;
}

ul {
    list-style-type: none;
    margin: 0;
}

li {
    margin: 0.5em;
}

@media (max-width: 700px) {
    .header-bar {
        display: flex;
        background-color: var(--primary-color);
        justify-content: space-between;
    }

    #nav-bar {
        display: none;
    }

    button {
        display: block;
    }
}

a {
    text-decoration: none;
    font-family: "Chakra Petch", sans-serif;
    font-size: 1.5rem;
    margin: 1em;
}

a:link {
    color: white;
}

a:visited {
    color: white;
}

a:hover {
    color: white;
    background: var(--primary-light-color);
}

a:active {
    color: white;
    background: var(--primary-dark-color);
}

.logo {
    font-family: "Press Start 2P", cursive;
    font-size: 1rem;
    text-align: center;
    color: white;
    text-shadow: 2px 2px var(--primary-dark-color);
    margin: 1em;
}
</style>

<header>
    <div class="header-bar">
        <a class="logo" href="/">
            <div>Andreas</div>
            <div>Mikko</div>
        </a>
        <nav id="nav-bar">
            <a href="/">Home</a>
            <a href="/projects/">Projects</a>
            <a href="/about/">About</a>
            <a href="/contact/">Contact</a>
        </nav>
        <button type="button">
            <img class="menu-icon" src="/assets/menu-icon.svg"/>
        </button>
    </div>
    <nav id="nav-menu">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/projects/">Projects</a></li>
            <li><a href="/about/">About</a></li>
            <li><a href="/contact/">Contact</a></li>
        </ul>
    </nav>
</header>
`;class h extends HTMLElement{constructor(){super();const o=this.attachShadow({mode:"open"}),t=l.content.cloneNode(!0);o.appendChild(t)}connectedCallback(){var a,e;const o=(a=this.shadowRoot)==null?void 0:a.querySelector("button"),t=(e=this.shadowRoot)==null?void 0:e.getElementById("nav-menu");o&&t&&(o.onclick=()=>{window.getComputedStyle(t).display==="none"?t.style.display="block":t.style.display="none"},window.onresize=()=>{window.getComputedStyle(t).display==="block"&&window.innerWidth>700&&(t.style.display="none")})}}const d="© Andreas Mikko",c=2023,m=document.createElement("template");m.innerHTML=`
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
`;class u extends HTMLElement{constructor(){super();const o=this.attachShadow({mode:"open"}),t=m.content.cloneNode(!0);o.appendChild(t)}connectedCallback(){var t;const o=(t=this.shadowRoot)==null?void 0:t.getElementById("copyright");if(o){const a=this.getCopyrightYear();o.innerText=d.concat(" ",a)}}getCopyrightYear(){const o=new Date().getFullYear();return o<=c?c.toString():c.toString().concat(" - ",o.toString())}}customElements.define("card-component",p);customElements.define("header-component",h);customElements.define("footer-component",u);
