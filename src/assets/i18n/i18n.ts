import en from './en.json';
import tr from './tr.json';
const dictionaries = {
  en: en,
  tr: tr
};

function getLang() {
  const el = document.documentElement;
  const lang = (el.getAttribute('lang') || '').toLowerCase();
  return lang === 'tr' ? 'tr' : 'en';
}

export class I18n {
  _lang: string;
  constructor() {
    this._lang = getLang();
  }
  get lang() { return this._lang; }
  setLang(lang) {
    const newLang = (lang || '').toLowerCase() === 'tr' ? 'tr' : 'en';
    if (newLang !== this._lang) {
      this._lang = newLang;
      document.documentElement.setAttribute('lang', newLang);
      document.dispatchEvent(new CustomEvent('i18n-changed', { detail: { lang: newLang } }));
    }
  }
  t(path) {
    const parts = path.split('.');
    let node = dictionaries[this._lang];
    for (const p of parts) node = node?.[p];
    return node ?? path;
  }
}

export const i18n = new I18n();
export const t = (key) => i18n.t(key);
