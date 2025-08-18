import { LitElement, html, css } from 'lit';

class IngLink extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      text-decoration: none;
    }

    .default { color:var(--text); opacity:.9; padding:8px 10px; border-radius:10px; text-decoration:none; }
    .default:hover { background:#f8fafc; }

    a:active {
      transform: translateY(0);
      color:#ff6600;
    }

    .link{
      text-decoration: none;
      color:#02165a;
      opacity: .9;
    }
    .link.active {
      color: #ff6600;
    }

    .primary {
      background: #007bff;
      color: white;
    }

    .primary:hover {
      background: #0056b3;
    }

    .secondary {
      background: #6c757d;
      color: white;
    }

    .secondary:hover {
      background: #545b62;
    }

    .success {
      background: #28a745;
      color: white;
    }

    .success:hover {
      background: #1e7e34;
    }

    .danger {
      background: #dc3545;
      color: white;
    }

    .danger:hover {
      background: #c82333;
    }

    a:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    a:disabled:hover {
      transform: none;
      box-shadow: none;
    }
  `;

  static properties = { url: { type: String }, class: { type: String }, type: { type: String }, disabled: { type: Boolean }, active: { type: Boolean } };



  render() {
    return html`
      <a
      href=${this.url}
      class="link ${this.type} ${this.class} ${this.active ? 'active' : ''}"
      ?disabled=${this.disabled}
      >
      <slot></slot>
      </a>
    `;
  }

}
customElements.define('ing-link', IngLink);
