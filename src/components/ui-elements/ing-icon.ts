import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('ing-icon')
export class IngIcon extends LitElement {
    render() {
        return html`
            <span class="material-icons">
                <slot></slot>
            </span>  
        `;
    }
}