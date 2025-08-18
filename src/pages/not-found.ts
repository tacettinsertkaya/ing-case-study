import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('not-found')
export class NotFound extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>404 - Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        `;
    }
}