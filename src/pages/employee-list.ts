import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { t, i18n } from '../assets/i18n/i18n.js';
import { EmployeeSeed } from "../data/seed.js";

@customElement('employee-list')
export class EmployeeList extends LitElement {
    @property({ type: String })
    search:string='';
    @property({ type: Number })
    page:number=1;
    @property({ type: Number })
    pageSize:number=10;
    @property({ type:Array, state: true })
    employees:any[]=EmployeeSeed;
    @property({ type:Boolean, state: true })
    confirm:boolean=false;
    @property({ type:Boolean, state: true })
    toDelete:boolean=false;
  
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
    private _onLang: () => void;
  constructor() {
    super();
    this._onLang = () => this.requestUpdate();
    document.addEventListener('i18n-changed', this._onLang);

    this.search = '';
    this.page = 1;
    this.pageSize = 8;
    this.confirm = false;
  }
  disconnectedCallback() { super.disconnectedCallback(); document.removeEventListener('i18n-changed', this._onLang);  }
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
 
  renderTable() {
    return html`
      <div class="card">
        <table aria-label=${t('list.title')}>
          <thead>
            <tr>
              <th><input class="chk" type="checkbox" aria-label="Select all" /></th>
              <th>${t('employee.firstName')}</th>
              <th>${t('employee.lastName')}</th>
              <th>${t('employee.doe')}</th>
              <th>${t('employee.dob')}</th>
              <th>${t('employee.phone')}</th>
              <th>${t('employee.email')}</th>
              <th>${t('employee.department')}</th>
              <th>${t('employee.position')}</th>
            </tr>
          </thead>
          <tbody>
            ${this.pageSlice().map(e => html`
              <tr>
                <td><input class="chk" type="checkbox" aria-label="Select row" /></td>
                <td>${e.firstName}</td>
                <td>${e.lastName}</td>
                <td>${e.doe}</td>
                <td>${e.dob}</td>
                <td>${e.phone}</td>
                <td>${e.email}</td>
                <td>${e.department}</td>
                <td>${e.position}</td>
               
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
  render() {
    return html`
      <h2>${t('list.title')}</h2>
      <div class="head">
        <input type="search" placeholder="${t('list.search')}..." @input=${(e: Event) => { this.search = (e.target as HTMLInputElement).value; this.page = 1; }} .value=${this.search} />
      </div>
      ${this.renderTable()}
      <div style="margin-top:14px;">
        <pagination-controls
          .page=${this.page}
          .totalPages=${this.pageCount}
          @prev=${() => { if (this.page > 1) this.page--; }}
          @next=${() => { if (this.page < this.pageCount) this.page++; }}
          @goto=${(e: Event) => { this.page = (e.target as any).detail.page; }}
        ></pagination-controls>
      </div>

     
    `;
  }
}
