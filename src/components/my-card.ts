import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-card')
export class MyCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: box-shadow 0.2s ease;
    }

    :host(:hover) {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .header {
      padding: 1.5rem 1.5rem 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .title {
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
    }

    .content {
      padding: 1.5rem;
    }

    .footer {
      padding: 0 1.5rem 1.5rem;
      border-top: 1px solid #f0f0f0;
      background: #f8f9fa;
    }

    ::slotted(h1),
    ::slotted(h2),
    ::slotted(h3),
    ::slotted(h4),
    ::slotted(h5),
    ::slotted(h6) {
      margin-top: 0;
    }

    ::slotted(p:last-child) {
      margin-bottom: 0;
    }
  `;

  @property({ type: String })
  title = '';

  render() {
    return html`
      ${this.title ? html`
        <div class="header">
          <h2 class="title">${this.title}</h2>
        </div>
      ` : ''}
      
      <slot name="title" class="header">
        ${this.title ? html`<h2 class="title">${this.title}</h2>` : ''}
      </slot>

      <div class="content">
        <slot></slot>
      </div>

      <slot name="footer" class="footer"></slot>
    `;
  }
}
