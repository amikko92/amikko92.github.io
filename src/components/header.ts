const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
.header-bar {
    display: flex;
    background-color: var(--primary-color);
    justify-content: flex-start;
}

.nav-bar {
    display: block;
    margin: 1em;
}

button {
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
    display: none;
    max-width: 2rem;
    margin: 0.3em;
}

@media (max-width: 700px) {
    .header-bar {
        display: flex;
        background-color: var(--primary-color);
        justify-content: space-between;
    }

    .nav-bar {
        display: none;
    }

    .menu-icon {
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
    <div class="header-bar">
        <a class="logo" href="/">
            <div>Andreas</div>
            <div>Mikko</div>
        </a>
        <nav class="nav-bar">
            <a href="/">Home</a>
            <a href="/projects/">Projects</a>
            <a href="/about/">About</a>
            <a href="/contact/">Contact</a>
        </nav>
        <button>
            <img class="menu-icon" src="/assets/menu-icon.svg"/>
        </button>
    </div>
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
