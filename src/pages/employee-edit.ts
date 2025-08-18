import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { t, i18n } from '../assets/i18n/i18n';
import   '../widgets/employee.form';
import { EmployeeSeed } from "../data/seed";
@customElement('employee-edit')
export class EmployeeEdit extends LitElement {
     private _onLang: () => void;

    constructor() {
        super();
        this._onLang = () => this.requestUpdate();
        document.addEventListener('i18n-changed', this._onLang);
    }
    render() {
            const employee = EmployeeSeed.find(emp => emp.id === 1);

        return html`
            <h1>${t('employee.edit.title')}</h1>
            <employee-form mode="edit" .employee=${employee}></employee-form>
        `;
    }
}