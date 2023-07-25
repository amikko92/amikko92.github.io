const COPYRIGHT_TEXT = "© Andreas Mikko";
const START_YEAR = 2023;

const template = document.createElement("template");
template.innerHTML = /*html*/ `
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
    <p id="copyright">${COPYRIGHT_TEXT}</p>
    <address>
        <a href="mailto:a.mikko92@gmail.com">Email</a>
        <a href="https://www.linkedin.com/in/andreas-mikko-04ab9988">LinkedIn</a>
    </address>
</footer>
`;

export class Footer extends HTMLElement {
    public constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const node = template.content.cloneNode(true);
        shadow.appendChild(node);
    }

    public connectedCallback(): void {
        const copyrightElement = this.shadowRoot?.getElementById("copyright");
        if (copyrightElement) {
            const year = this.getCopyrightYear();
            copyrightElement.innerText = COPYRIGHT_TEXT.concat(" ", year);
        }
    }

    private getCopyrightYear(): string {
        const currentYear = new Date().getFullYear();
        return currentYear <= START_YEAR
            ? START_YEAR.toString()
            : START_YEAR.toString().concat(" - ", currentYear.toString());
    }
}
