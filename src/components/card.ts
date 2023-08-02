const template = document.createElement("template");
template.innerHTML = /*html*/ `
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
`;

export class Card extends HTMLElement {
    public constructor() {
        super();

        const shadow = this.attachShadow({ mode: "closed" });
        const node = template.content.cloneNode(true);
        shadow.appendChild(node);

        const image = shadow.getElementById("card-img");
        if (image instanceof HTMLImageElement) {
            image.src = this.getAttribute("src") ?? "";

            const imagePosition = this.getAttribute("img-pos");
            if (imagePosition) {
                image.style.objectPosition = imagePosition;
            }
        }

        const link = shadow.getElementById("card-link");
        if (link instanceof HTMLAnchorElement) {
            link.href = this.getAttribute("href") ?? "";
        }
    }
}
