import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { t, i18n } from '../../assets/i18n/i18n.js';

@customElement('employee-list')
export class EmployeeList extends LitElement {
    private _onLang: () => void;

    constructor() {
        super();
        this._onLang = () => this.requestUpdate();
        document.addEventListener('i18n-changed', this._onLang);
    }
    render() {
        return html`
            <h1>${t('list.title')}</h1>
            
        `;
    }
}