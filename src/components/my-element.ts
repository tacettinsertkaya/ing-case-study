import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--my-element-text-color, #000);
    }

    .greeting {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .counter {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;
    }

    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    button:hover {
      background: #0056b3;
    }

    .count {
      font-size: 1.2rem;
      font-weight: bold;
      min-width: 2rem;
      text-align: center;
    }
  `;

  @property({ type: String })
  name = 'World';

  @property({ type: Number })
  count = 0;

  render() {
    return html`
      <div class="greeting">Hello, ${this.name}!</div>
      <div>This is a Lit Element component.</div>
      <div class="counter">
        <button @click=${this._decrement}>-</button>
        <span class="count">${this.count}</span>
        <button @click=${this._increment}>+</button>
      </div>
    `;
  }

  private _increment() {
    this.count += 1;
  }

  private _decrement() {
    this.count -= 1;
  }
}
