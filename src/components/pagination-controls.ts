import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export const range = (start:number, end:number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);
export const pagesToShow = (page:number, total:number) => {
  const pages = new Set([1, total, page]);
  if (page > 1) pages.add(page - 1);
  if (page < total) pages.add(page + 1);
  // ensure at least 5 slots when possible
  if (total >= 5) {
    pages.add(2); pages.add(total - 1);
  }
  const arr = [...pages].filter(p => p >= 1 && p <= total).sort((a, b) => a - b);
  // insert ellipsis markers
  const out:Array<number|string>= [];
  arr.forEach((p, i) => {
    if (i > 0 && p - arr[i - 1] > 1) out.push('…');
    out.push(p);
  });
  return out;
}
@customElement('pagination-controls')
export class PaginationControls extends LitElement {
      @property({ type: Number }) page: number=1;
      @property({ type: Number }) totalPages: number=1  ;
  static styles = css`
    :host { display:flex; align-items:center; gap:6px; justify-content:center; }
    button { border: 1px solid var(--border); background:#fff; color: var(--text); border-radius: 10px; padding: 8px 10px; cursor:pointer; }
    button[disabled] { opacity:.4; cursor:default; }
    .num { width:36px; height:36px; display:grid; place-items:center; border-radius: 999px; }
    .active { background: var(--brand); border-color: var(--brand); color:#fff; }
    .sep { padding: 0 4px; color: var(--muted); }
  `;
  prev() { this.dispatchEvent(new CustomEvent('prev')); }
  next() { this.dispatchEvent(new CustomEvent('next')); }
  go(p:number | string) { 
    this.dispatchEvent(new CustomEvent('goto', { detail: { page: p } })); 
  }
  render() {
    const items = pagesToShow(this.page, this.totalPages);
    return html`
      <button @click=${this.prev} ?disabled=${this.page <= 1} aria-label="Prev">
       Previous
    </button>
      ${items.map(it => it === '…' ? html`<span class="sep">…</span>` :
      html`<button class="num ${this.page === it ? 'active' : ''}" @click=${() => this.go(it)}>${it}</button>`)}
      <button @click=${this.next} ?disabled=${this.page >= this.totalPages} aria-label="Next">
      Next
    </button>
    `;
  }
}
