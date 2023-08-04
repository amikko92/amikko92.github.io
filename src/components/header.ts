const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
header {
    display: flex;
    background-color: var(--primary-color);
    align-items: center;
}

nav {
    margin: 1em;
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
    background: var(--primary-dark-color);
}

a:active {
    color: white;
    background: var(--primary-light-color);
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
    <a class="logo" href="/">
        <div>Andreas</div>
        <div>Mikko</div>
    </a>
    <nav>
        <a href="/">Home</a>
        <a href="/projects/">Projects</a>
        <a href="/about/">About</a>
        <a href="/contact/">Contact</a>
    </nav>
</header>
`;

export class Header extends HTMLElement {
    public constructor() {
        super();
        const shadow = this.attachShadow({ mode: "closed" });
        const node = template.content.cloneNode(true);
        shadow.appendChild(node);
    }
}
