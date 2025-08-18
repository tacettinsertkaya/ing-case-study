import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type buttonType = 'primary' | 'secondary' | 'success' | 'danger';

@customElement('ing-button')
export class IngButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 100px;
    }

    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    button:active {
      transform: translateY(0);
    }

    .primary {
      background: #ff6600;
      color: white;
    }

    .primary:hover {
      background: #ff6600;
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

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    button:disabled:hover {
      transform: none;
      box-shadow: none;
    }
  `;

  @property({ type: String })
  type: buttonType = 'primary';

  @property({ type: Boolean })
  disabled = false;

  render() {
    return html`
      <button 
        class=${this.type}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }

  private _handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.dispatchEvent(new CustomEvent('clickEvent', {
      detail: { variant: this.type },
      bubbles: true,
      composed: true,
    }));
  }
}
