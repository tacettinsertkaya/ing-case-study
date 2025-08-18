import { LitElement, html, css } from 'lit';
import { t } from '../utils/i18n.js';
import { addEmployee, updateEmployee } from '../store.js';
import { isEmail, isPhone, isPast, isEmploymentInRange, required } from '../utils/validators.js';
import { Router } from '@vaadin/router';
import '../components/ui-elements/ing-link.js';
import '../components/ui-elements/ing-button.js';

class EmployeeForm extends LitElement {
  static properties = {
    employee: { type: Object },
    mode: { type: String }, // 'create' | 'edit'
    title: { type: String },
    errors: { state: true },
    // local fields
    firstName: { state: true },
    lastName: { state: true },
    dob: { state: true },
    doe: { state: true },
    phone: { state: true },
    email: { state: true },
    department: { state: true },
    position: { state: true }
  };
  static styles = css`
    :host { display:block; }
    .card { background: var(--card); border-radius: 16px; padding: 16px; }
    form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    label { display: grid; gap: 6px; font-size: 14px; }
    input, select {     border: 1px solid #ddd;border-radius: 4px;color: #66615b; border-radius: 10px; padding: 10px 12px; }
    .full { grid-column: 1 / -1; }
    .actions { display: flex; gap: 8px; justify-content: flex-end; grid-column: 1 / -1; }
    .err { color: var(--danger); font-size: 12px; }
    @media (max-width: 720px) { form { grid-template-columns: 1fr; } }
  `;

  constructor() {
    super();
    this._onLang = () => this.requestUpdate();
    document.addEventListener('i18n-changed', this._onLang);

    this.employee = null;
    this.mode = 'create';
    this.title = '';
    this.errors = {};

    // defaults
    this.firstName = '';
    this.lastName = '';
    this.dob = '';
    this.doe = '';
    this.phone = '';
    this.email = '';
    this.department = 'Analytics';
    this.position = 'Junior';
  }

  // Whenever `employee` changes (e.g., when navigating /employees/:id/edit),
  // hydrate form fields accordingly.
  updated(changed) {
    if (changed.has('employee') && this.employee) {
      const e = this.employee || {};
      this.firstName = e.firstName || '';
      this.lastName = e.lastName || '';
      this.dob = e.dob || '';
      this.doe = e.doe || '';
      this.phone = e.phone || '';
      this.email = e.email || '';
      this.department = e.department || 'Analytics';
      this.position = e.position || 'Junior';
    }
  }
  validate() {
    const errs = {};
    if (!required(this.firstName)) errs.firstName = t('employee.validation.required');
    if (!required(this.lastName)) errs.lastName = t('employee.validation.required');
    if (!required(this.dob) || !isPast(this.dob)) errs.dob = t('employee.validation.dobPast');
    if (!required(this.doe) || !isEmploymentInRange(this.dob, this.doe)) errs.doe = t('employee.validation.doeRange');
    if (!required(this.phone) || !isPhone(this.phone)) errs.phone = t('employee.validation.phone');
    if (!required(this.email) || !isEmail(this.email)) errs.email = t('employee.validation.email');
    this.errors = errs;
    return Object.keys(errs).length === 0;
  }
  async cancel(e) {
    e.preventDefault();
    Router.go('/employees');
  }
  async onSubmit(e) {
    e.preventDefault();
    if (!this.validate()) return;
    try {
      if (this.mode === 'edit') {
        if (!this.employee) { alert('Employee not found'); return; }
        if (!confirm(t('employee.confirmSave'))) return;
        await updateEmployee(this.employee.id, this.serialize());
      } else {
        if (!confirm(t('employee.confirmCreate'))) return;
        await addEmployee(this.serialize());
      }
      Router.go('/employees');
    } catch (err) {
      if (err?.code === 'uniqueEmail') this.errors = { ...this.errors, email: t('employee.validation.uniqueEmail') };
      else if (err?.code === 'uniquePhone') this.errors = { ...this.errors, phone: t('employee.validation.uniquePhone') };
      else alert(err?.message || String(err));
    }
  }
  serialize() {
    return {
      firstName: this.firstName?.trim(),
      lastName: this.lastName?.trim(),
      dob: this.dob,
      doe: this.doe,
      phone: this.phone?.trim(),
      email: this.email?.trim(),
      department: this.department,
      position: this.position
    };
  }
  render() {
    // Not-found guard when editing
    if (this.mode === 'edit' && !this.employee) {
      return html`<h2>${this.title}</h2>
        <div class="card"><p>Employee not found.</p><p><a href="/employees">← Back to list</a></p></div>`;
    }
    return html`
      <h2>${this.title}</h2>
      <div class="card">
        <form >
          <label>
            ${t('employee.firstName')}
            <input .value=${this.firstName || ''} @input=${e => this.firstName = e.target.value} required />
            ${this.errors.firstName ? html`<span class="err">${this.errors.firstName}</span>` : ''}
          </label>
          <label>
            ${t('employee.lastName')}
            <input .value=${this.lastName || ''} @input=${e => this.lastName = e.target.value} required />
            ${this.errors.lastName ? html`<span class="err">${this.errors.lastName}</span>` : ''}
          </label>
          <label>
            ${t('employee.dob')}
            <input type="date" .value=${this.dob || ''} @input=${e => this.dob = e.target.value} required />
            ${this.errors.dob ? html`<span class="err">${this.errors.dob}</span>` : ''}
          </label>
          <label>
            ${t('employee.doe')}
            <input type="date" .value=${this.doe || ''} @input=${e => this.doe = e.target.value} required />
            ${this.errors.doe ? html`<span class="err">${this.errors.doe}</span>` : ''}
          </label>
          <label>
            ${t('employee.phone')}
            <input .value=${this.phone || ''} @input=${e => this.phone = e.target.value} required />
            ${this.errors.phone ? html`<span class="err">${this.errors.phone}</span>` : ''}
          </label>
          <label>
            ${t('employee.email')}
            <input type="email" .value=${this.email || ''} @input=${e => this.email = e.target.value} required />
            ${this.errors.email ? html`<span class="err">${this.errors.email}</span>` : ''}
          </label>
          <label>
            ${t('employee.department')}
            <select .value=${this.department} @change=${e => this.department = e.target.value}>
              <option>Analytics</option>
              <option>Tech</option>
            </select>
          </label>
          <label>
            ${t('employee.position')}
            <select .value=${this.position} @change=${e => this.position = e.target.value}>
              <option>Junior</option>
              <option>Medior</option>
              <option>Senior</option>
            </select>
          </label>
          <div class="actions">
            <ing-button  url="/employees" @clickEvent=${this.cancel}>
              ${t('common.cancel')}
            </ing-button>
            <ing-button type="primary" @clickEvent=${this.onSubmit}> ${this.mode === 'edit' ? t('common.update') : t('common.save')}</ing-button>

          </div>
        </form>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('i18n-changed', this._onLang);
  }
}
customElements.define('employee-form', EmployeeForm);
