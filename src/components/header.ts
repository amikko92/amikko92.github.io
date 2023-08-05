const template = document.createElement("template");
template.innerHTML = /*html*/ `
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
`;

export class Header extends HTMLElement {
    public constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const node = template.content.cloneNode(true);
        shadow.appendChild(node);
    }

    public connectedCallback(): void {
        const menuButton = this.shadowRoot?.querySelector("button");
        const navMenu = this.shadowRoot?.getElementById("nav-menu");
        if (menuButton && navMenu) {
            menuButton.onclick = () => {
                const navMenuDisplay = window.getComputedStyle(navMenu).display;
                if (navMenuDisplay === "none") {
                    navMenu.style.display = "block";
                } else {
                    navMenu.style.display = "none";
                }
            };

            window.onresize = () => {
                const navMenuDisplay = window.getComputedStyle(navMenu).display;
                if (navMenuDisplay === "block" && window.innerWidth > 700) {
                    navMenu.style.display = "none";
                }
            };
        }
    }
}
