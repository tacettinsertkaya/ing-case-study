import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import  '../ui-elements/ing-link';
import  '../ui-elements/ing-icon';
import { t, i18n } from '../../assets/i18n/i18n.js';

@customElement('nav-bar')
export class NavBar extends LitElement {
  @property({ type: String })
  lang = 'en';

  @property({ type: String })
  currentRoute = window.location.pathname;

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
  private _onPopState: () => void;

  constructor() { 
    super();
    this._onLang = () => this.requestUpdate();
    this._onPopState = () => {
      this.currentRoute = window.location.pathname;
      this.requestUpdate();
    };
  }
  connectedCallback() { 
    super.connectedCallback(); 
    document.addEventListener('i18n-changed', this._onLang);
    window.addEventListener('popstate', this._onPopState);
    // Also listen for route changes from the router
    window.addEventListener('vaadin-router-location-changed', this._onPopState);
  }
  disconnectedCallback() { 
    super.disconnectedCallback(); 
    document.removeEventListener('i18n-changed', this._onLang);
    window.removeEventListener('popstate', this._onPopState);
    window.removeEventListener('vaadin-router-location-changed', this._onPopState);
  }
  changeLang(e:any) { i18n.setLang(e.target.value); }


  // Helper method to check if a link should be active
  private isLinkActive(url: string): boolean {
    const currentPath = this.currentRoute;
    
    // Exact match for root paths
    if (url === '/employees' && currentPath === '/employees') {
      return true;
    }
    
    // For sub-routes, check if current path starts with the URL
    if (url === '/employees/new' && currentPath === '/employees/new') {
      return true;
    }
    
    // For edit routes, check if it's an edit path
    if (url === '/employees' && currentPath.startsWith('/employees/') && currentPath.includes('/edit')) {
      return false; // Don't activate main employees link when editing
    }
    
    return false;
  }

   render() {
    return html`
      <div class="wrap">
        <ing-link 
          class="brand"
          url="/employees" 
         >
          <img src="/src/assets/images/logo.png" alt="ING Bank">
        </ing-link>
      <span class="spacer"></span>
      <ing-link 
        url="/employees" 
        .active="${this.isLinkActive('/employees')}">
        ${t('nav.employees')}
      </ing-link>
      <ing-link 
        url="/employees/new" 
        .active="${this.isLinkActive('/employees/new')}">
        ${t('nav.addEmployee')}
      </ing-link>
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


