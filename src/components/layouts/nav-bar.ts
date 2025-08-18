import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import  '../ui-elements/ing-link';
import  '../ui-elements/ing-icon';
import { t, i18n } from '../../assets/i18n/i18n.js';

@customElement('nav-bar')
export class NavBar extends LitElement {
  @property({ type: String })
  lang = 'en';

  static styles = css`
   :host { display:block; background:#fff; border-bottom:1px solid var(--border); position:sticky; top:0; z-index:10; }
    .wrap { max-width:1400px; margin:0 auto; display:flex; align-items:center; gap:14px; padding:10px 18px; }
    .brand { display:flex; align-items:center; gap:10px; font-weight:700; color:var(--text); }
    .brand img { width:100%; height:50px;padding:10px 18px;  }
    .dot { width:28px; height:28px; border-radius:8px; background:var(--brand); display:grid; place-items:center; color:#fff; font-weight:800; }
    .link { color:var(--text); opacity:.9; padding:8px 10px; border-radius:10px; text-decoration:none; display:flex; align-items:center; gap:8px; }
    .link:hover { background:#f8fafc; }
    .actions { display:flex; align-items:center; gap:8px; }
    .lang-selector { display:flex; align-items:center; gap:8px; }
    .lang-selector img { width:20px; height:14px; border-radius:3px; }
    select { background:#fff; color:var(--text); border:1px solid var(--border); border-radius:10px; padding:6px 10px; }
    .spacer { flex:1; }
  `;
  private _onLang: () => void;

  constructor() { 
    super();
    this._onLang = () => this.requestUpdate();
  }
  connectedCallback() { super.connectedCallback(); document.addEventListener('i18n-changed', this._onLang); }
  disconnectedCallback() { super.disconnectedCallback(); document.removeEventListener('i18n-changed', this._onLang); }
  changeLang(e:any) { i18n.setLang(e.target.value); }




   render() {
    return html`
      <div class="wrap">
      <a class="brand" href="/employees">
        <img src="/src/assets/images/logo.png" alt="ING Bank">
      </a>
      <span class="spacer"></span>
      <ing-link  url='/employees'>
      ${t('nav.employees')}</ing-link>
      <ing-link  url='/employees/new'>
      ${t('nav.addEmployee')}</ing-link>
      <div class="actions">
        <div class="lang-selector">
          <select @change="${this.changeLang}">
            <option value="en" ?selected="${i18n.lang === 'en'}">English</option>
            <option value="tr" ?selected="${i18n.lang === 'tr'}">Türkçe</option>
          </select>
        </div>
      </div>
      </div>
    `;
  }

}


