import { LitElement, html } from 'lit';
import '../widgets/employee-form.js';
import { t } from '../utils/i18n.js';

class EmployeeNewView extends LitElement {
  render() {
    return html`
         <h2>${t('employee.create.title')}</h2>

      <employee-form .mode=${'create'} ></employee-form>
    `;
  }
}
customElements.define('employee-new-view', EmployeeNewView);
