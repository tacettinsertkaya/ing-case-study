import { LitElement, html, css } from 'lit';

class NotFoundView extends LitElement {
  static styles = css`:host{display:block;padding:20px}`;
  render(){ return html`<h2>404</h2><p>Page not found.</p>`; }
}
customElements.define('not-found-view', NotFoundView);
