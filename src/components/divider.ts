const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
    .divider {
        background-color: var(--primary-dark-color);
        height: 3px;
    }
</style>

<header>
    <div class="divider"></div>
</header>
`;

export class Divider extends HTMLElement {
    public constructor() {
        super();
        const shadow = this.attachShadow({ mode: "closed" });
        const node = template.content.cloneNode(true);
        shadow.appendChild(node);
    }
}
