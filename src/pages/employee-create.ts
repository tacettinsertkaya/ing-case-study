import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { t, i18n } from '../../assets/i18n/i18n.js';

@customElement('employee-create')
export class EmployeeCreate extends LitElement {
    render() {
        return html`
            <h1>${t('list.title')}</h1>
           
        `;
    }
}