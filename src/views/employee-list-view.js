import { LitElement, html, css } from 'lit';
import { subscribe, getState, deleteEmployee } from '../store.js';
import { t } from '../utils/i18n.js';
import { getIcon } from '../utils/icons.js';
import '../components/pagination-controls.js';
import '../components/confirm-dialog.js';
import '../components/ui-elements/ing-link.js';
import '../components/ui-elements/ing-button.js';

class EmployeeListView extends LitElement {
  static properties = {
    search: { type: String },
    page: { type: Number },
    pageSize: { type: Number },
    employees: { state: true },
    confirm: { state: true },
    toDelete: { state: true }
  };
  static styles = css`
    :host { display:block; }
    h2 { margin: 16px 2px 14px; color: var(--text); }
    .card { background: var(--card); border:1px solid var(--border); border-radius: var(--radius); padding: 10px; box-shadow: var(--shadow); }
    .head { display:flex; gap: 12px; align-items:center; flex-wrap:wrap; margin-bottom: 8px; padding: 4px 6px; }
    .spacer { flex: 1; }
    input[type=search] { background:#fff; color:var(--text); border:1px solid var(--border); border-radius: 10px; padding: 10px 12px; min-width:260px; }
    .btn { background:#fff; color:var(--brand-700); border:1px solid var(--brand); border-radius:10px; padding: 9px 12px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 14px 12px; border-bottom: 1px solid var(--border); text-align: left; color: var(--text); }
    th { font-weight: 600; color: #585F6A; }
    tr:hover td { background: #FFF7ED; } /* light orange hover */
    .actions { display:flex; gap:10px; justify-content:flex-end; }
    .action { color: var(--brand-600); cursor: pointer; display:inline-flex; align-items:center; padding:6px; border-radius:8px; }
    .action:hover { background: #FFF7ED; }
    .chk { width: 18px; height: 18px; }
    @media (max-width: 900px) { table { display:block; overflow:auto; } }
  `;
  constructor() {
    super();
    this._onLang = () => this.requestUpdate();
    document.addEventListener('i18n-changed', this._onLang);

    this.search = '';
    this.page = 1;
    this.pageSize = 8;
    this.employees = getState().employees;
    this._unsub = subscribe(st => { this.employees = st.employees; this.requestUpdate(); });
    this.confirm = false;
    this.toDelete = null;
  }
  disconnectedCallback() { super.disconnectedCallback(); document.removeEventListener('i18n-changed', this._onLang); this._unsub?.(); }
  get filtered() {
    const q = this.search.trim().toLowerCase();
    const data = q ? this.employees.filter(e => [e.firstName, e.lastName, e.email, e.phone, e.department, e.position].some(v => String(v || '').toLowerCase().includes(q))) : this.employees;
    return data;
  }
  get pageCount() { return Math.max(1, Math.ceil(this.filtered.length / this.pageSize)); }
  pageSlice() {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }
  askDelete(emp) {
    this.toDelete = emp; this.confirm = true;
    this.updateComplete.then(() => {
      this.renderRoot.querySelector('confirm-dialog').open = true;
    });
  }
  onConfirmClose(e) {
    const ok = e.detail?.confirmed;
    if (ok && this.toDelete) {
      deleteEmployee(this.toDelete.id);
      if (this.page > this.pageCount) this.page = this.pageCount;
    }
    this.confirm = false; this.toDelete = null;
  }

  selectAll(e) {
    const checked = e.target.checked;
    this.pageSlice().forEach(emp => {
      emp.isSelected = checked;
    });
    this.requestUpdate();
  }
  renderTable() {
    return html`
      <div class="card">
        <table aria-label=${t('employee.list.title')}>
          <thead>
            <tr>
              <th><input class="chk" type="checkbox" @change=${this.selectAll} aria-label="Select all" /></th>
              <th>${t('employee.firstName')} </th>
              <th>${t('employee.lastName')}</th>
              <th>${t('employee.doe')}</th>
              <th>${t('employee.dob')}</th>
              <th>${t('employee.phone')}</th>
              <th>${t('employee.email')}</th>
              <th>${t('employee.department')}</th>
              <th>${t('employee.position')}</th>
              <th style="text-align:right">${t('employee.list.actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${this.pageSlice().map(e => html`
              <tr>
                <td><input class="chk" type="checkbox" 
                ?checked=${e.isSelected}
                aria-label="Select row" /></td>
                <td>${e.firstName}</td>
                <td>${e.lastName}</td>
                <td>${e.doe}</td>
                <td>${e.dob}</td>
                <td>${e.phone}</td>
                <td>${e.email}</td>
                <td>${e.department}</td>
                <td>${e.position}</td>
                <td class="actions">
                  <ing-link url="/employees/${e.id}/edit" title="${t('employee.list.edit')}">${getIcon('pencil', '24')}</ing-link>
                  <ing-link @click=${() => this.askDelete(e)} title="${t('employee.list.delete')}">${getIcon('trash', '24')}</ing-link>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
  render() {
    return html`
      <h2>${t('employee.list.title')}</h2>
      <div class="head">
        <input type="search" placeholder="${t('employee.list.search')}..." @input=${e => { this.search = e.target.value; this.page = 1; }} .value=${this.search} />
      </div>
      ${this.renderTable()}
      <div style="margin-top:14px;">
        <pagination-controls
          .page=${this.page}
          .totalPages=${this.pageCount}
          @prev=${() => { if (this.page > 1) this.page--; }}
          @next=${() => { if (this.page < this.pageCount) this.page++; }}
          @goto=${(e) => { this.page = e.detail.page; }}
        ></pagination-controls>
      </div>

      <confirm-dialog
        ?open=${this.confirm}
        .title=${'Are you sure?'}
        .message=${this.toDelete ? `Selected Employee record of ${this.toDelete.firstName} ${this.toDelete.lastName} will be deleted.` : ''}
        @close=${this.onConfirmClose}
      ></confirm-dialog>
    `;
  }
}
customElements.define('employee-list-view', EmployeeListView);
