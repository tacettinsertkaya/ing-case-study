const dictionaries = {};

async function loadLocale(lang) {
  if (dictionaries[lang]) return dictionaries[lang];
  const response = await fetch(`/src/assets/i18n/${lang}.json`);
  if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
  dictionaries[lang] = await response.json();
  return dictionaries[lang];
}

function getLang() {
  const el = document.documentElement;
  const lang = (el.getAttribute('lang') || '').toLowerCase();
  return lang === 'tr' ? 'tr' : 'en';
}

export class I18n {
  _lang;
  _ready = false;
  constructor() {
    this._lang = getLang();
    this._load();
  }
  async _load() {
    await loadLocale(this._lang);
    this._ready = true;
    document.dispatchEvent(new CustomEvent('i18n-ready'));
  }
  get lang() { return this._lang; }
  async setLang(lang) {
    const newLang = (lang || '').toLowerCase() === 'tr' ? 'tr' : 'en';
    if (newLang !== this._lang) {
      this._lang = newLang;
      await loadLocale(newLang);
      document.documentElement.setAttribute('lang', newLang);
      document.dispatchEvent(new CustomEvent('i18n-changed', { detail: { lang: newLang } }));
    }
  }
  t(path) {
    if (!this._ready) return path;
    const parts = path.split('.');
    let node = dictionaries[this._lang];
    for (const p of parts) node = node?.[p];
    return node ?? path;
  }
}

export const i18n = new I18n();
export const t = (key) => i18n.t(key);
