import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Employee } from "../data/employee";
import { isEmail, isEmploymentInRange, isPast, isPhone, required } from "../utils/validator";
import { t } from '../assets/i18n/i18n';
import { Router } from "@vaadin/router";

@customElement('employee-form')
export class EmployeeForm extends LitElement {
  @property({ type: Object }) employee: Employee | null;
  @property({ type: String }) mode: 'create' | 'edit';
  @property({ type: String }) title: string;
  @property({ state: true,type:Object }) errors: { [key: string]: string } = {};
  @property({ type: String }) firstName: string = '';
  @property({ type: String }) lastName: string = '';
  @property({ type: String }) dob: string = '';
  @property({ state: true,type: String }) doe: string = '';
  @property({ state: true,type: String }) phone: string = '';
  @property({ state: true,type: String }) email: string = '';
  @property({ state: true,type: String }) department: string = '';
  @property({ state: true,type: String }) position: string = '';

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
    private _onLang: () => void;

  constructor() {
    super();
    this._onLang = () => this.requestUpdate();
    document.addEventListener('i18n-changed', this._onLang);

    this.employee = null;
    this.mode = 'create';
    this.title = '';

    // defaults
    this.firstName = '';
    this.lastName = '';
    this.dob = '';
    this.doe = '';
    this.phone = '';
    this.email = '';
    this.department = '';
    this.position = '';
  }

  // Whenever `employee` changes (e.g., when navigating /employees/:id/edit),
  // hydrate form fields accordingly.
  updated(changed:any) {
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
    const errs: { [key: string]: string } = {};
    if (!required(this.firstName)) errs.firstName = t('employee.validation.required');
    if (!required(this.lastName)) errs.lastName = t('employee.validation.required');
    if (!required(this.dob) || !isPast(this.dob)) errs.dob = t('employee.validation.dobPast');
    if (!required(this.doe) || !isEmploymentInRange(this.dob, this.doe)) errs.doe = t('employee.validation.doeRange');
    if (!required(this.phone) || !isPhone(this.phone)) errs.phone = t('employee.validation.phone');
    if (!required(this.email) || !isEmail(this.email)) errs.email = t('employee.validation.email');
    this.errors = errs;
    return Object.keys(errs).length === 0;
  }
  async onSubmit(e: Event) {
    e.preventDefault();
    if (!this.validate()) return;
    try {
      if (this.mode === 'edit') {
        if (!this.employee) { alert('Employee not found'); return; }
        if (!confirm(t('employee.confirmSave'))) return;
        // await updateEmployee(this.employee.id, this.serialize());
      } else {
        if (!confirm(t('employee.confirmCreate'))) return;
        // await addEmployee(this.serialize());
      }
      Router.go('/employees');
    } catch (err: any) {
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
        <form @submit=${this.onSubmit}>
          <label>
            ${t('employee.firstName')}
            <input .value=${this.firstName || ''} @input=${(e: Event) => this.firstName = (e.target as HTMLInputElement).value} required />
            ${this.errors.firstName ? html`<span class="err">${this.errors.firstName}</span>` : ''}
          </label>
          <label>
            ${t('employee.lastName')}
            <input .value=${this.lastName || ''} @input=${(e: Event) => this.lastName = (e.target as HTMLInputElement).value} required />
            ${this.errors.lastName ? html`<span class="err">${this.errors.lastName}</span>` : ''}
          </label>
          <label>
            ${t('employee.dob')}
            <input type="date" .value=${this.dob || ''} @input=${(e: Event) => this.dob = (e.target as HTMLInputElement).value} required />
            ${this.errors.dob ? html`<span class="err">${this.errors.dob}</span>` : ''}
          </label>
          <label>
            ${t('employee.doe')}
            <input type="date" .value=${this.doe || ''} @input=${(e: Event) => this.doe = (e.target as HTMLInputElement).value} required />
            ${this.errors.doe ? html`<span class="err">${this.errors.doe}</span>` : ''}
          </label>
          <label>
            ${t('employee.phone')}
            <input .value=${this.phone || ''} @input=${(e: Event) => this.phone = (e.target as HTMLInputElement).value} required />
            ${this.errors.phone ? html`<span class="err">${this.errors.phone}</span>` : ''}
          </label>
          <label>
            ${t('employee.email')}
            <input type="email" .value=${this.email || ''} @input=${(e: Event) => this.email = (e.target as HTMLInputElement).value} required />
            ${this.errors.email ? html`<span class="err">${this.errors.email}</span>` : ''}
          </label>
          <label>
            ${t('employee.department')}
            <select .value=${this.department} @change=${(e: Event) => this.department = (e.target as HTMLSelectElement).value}>
              <option>Analytics</option>
              <option>Tech</option>
            </select>
          </label>
          <label>
            ${t('employee.position')}
            <select .value=${this.position} @change=${(e: Event) => this.position = (e.target as HTMLSelectElement).value}>
              <option>Junior</option>
              <option>Medior</option>
              <option>Senior</option>
            </select>
          </label>
          <div class="actions">
            <a href="/employees">${t('employee.cancel')}</a>
            <button type="submit">${this.mode === 'edit' ? t('employee.save') : t('employee.create')}</button>
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
