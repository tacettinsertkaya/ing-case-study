import { LitElement, html, css } from 'lit';

class ConfirmDialog extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    title: { type: String },
    message: { type: String }
  };
  static styles = css`
    :host { display: contents; }
    .backdrop {
      position: fixed; inset: 0; background: rgba(17,24,39,0.55);
      display: none;
    }
    :host([open]) .backdrop { display: block; }
    .panel {
      position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
      background: #fff; color: var(--text); border-radius: 14px; width: 420px; max-width: calc(100% - 24px);
      box-shadow: var(--shadow); padding: 18px; display: grid; gap: 12px;
    }
    h3 { margin: 0; color: var(--brand-700); }
    .actions { display: flex; gap: 10px; justify-content: flex-end; }
    .btn {
      border-radius: 10px; padding: 10px 14px; border: 1px solid var(--border); background: #fff; cursor: pointer;
    }
    .btn-primary { background: var(--brand); border-color: var(--brand); color: #fff; }
  `;
  constructor(){ super(); this.open = false; this.title = 'Are you sure?'; this.message = ''; }
  #close(confirmed){
    this.open = false;
    this.dispatchEvent(new CustomEvent('close', { detail: { confirmed } }));
  }
  render(){
    return html`
      <div class="backdrop" @click=${() => this.#close(false)}>
        <div class="panel" @click=${e=>e.stopPropagation()}>
          <h3>${this.title}</h3>
          <p>${this.message}</p>
          <div class="actions">
            <button class="btn btn-primary" @click=${() => this.#close(true)}>Proceed</button>
            <button class="btn" @click=${() => this.#close(false)}>Cancel</button>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('confirm-dialog', ConfirmDialog);
