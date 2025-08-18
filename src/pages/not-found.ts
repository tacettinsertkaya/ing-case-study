import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('not-found')
export class NotFound extends LitElement {
    render() {
        return html`
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        `;
    }
}