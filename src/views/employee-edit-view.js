import { LitElement, html } from 'lit';
import '../widgets/employee-form.js';
import { getEmployee } from '../store.js';
import { t } from '../utils/i18n.js';

class EmployeeEditView extends LitElement {
  static properties = {
    id: { type: String },
    location: { attribute: false } // provided by vaadin-router
  };
  constructor() { super(); this.id = ''; }
  firstUpdated() {
    // Prefer vaadin-router provided params, fallback to URL parsing
    const fromRouter = this.location?.params?.id;
    const fromPath = (location.pathname.match(/\/employees\/(.+)\/edit/) || [])[1];
    this.id = fromRouter || fromPath || '';
  }
  render() {
    const employee = getEmployee(this.id);
    return html`
     <h2>${t('employee.edit.title')}</h2>
      <employee-form .mode=${'edit'} .employee=${employee} ></employee-form>
    `;
  }
}
customElements.define('employee-edit-view', EmployeeEditView);
