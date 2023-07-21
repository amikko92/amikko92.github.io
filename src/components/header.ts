const template = document.createElement("template");
template.innerHTML = /*html*/ `
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
`;

export class Header extends HTMLElement {
    public constructor() {
        super();
        const shadow = this.attachShadow({ mode: "closed" });
        const node = template.content.cloneNode(true);
        shadow.appendChild(node);
    }
}
