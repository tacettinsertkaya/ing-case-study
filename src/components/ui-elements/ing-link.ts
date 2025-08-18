import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
type linkVariant = 'default' | 'primary' | 'secondary' | 'success' | 'danger';

@customElement('ing-link')
export class IngLink extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .default { color:var(--text); opacity:.9; padding:8px 10px; border-radius:10px; text-decoration:none; }
    .default:hover { background:#f8fafc; }

    a:active {
      transform: translateY(0);
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

  @property({ type: String })
  url: string = '';
  
  @property({ type: String })
  type: linkVariant = 'default';


  @property({ type: Boolean })
  disabled: boolean = false;

  render() {
    return html`
      <a href=${this.url}
        class=${this.type}
        ?disabled=${this.disabled}
      >
      
        <slot></slot>
      </a>
    `;
  }

}
