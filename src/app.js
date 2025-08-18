import './components/nav-bar.js';
import './router.js';
import { initSeed } from './data/seed.js';
import { i18n } from './i18n.js';

// Ensure seed data exists
initSeed();

// Re-render nav on language change
document.addEventListener('i18n-changed', () => {
  // Trigger any components listening to lang changes
});

// Set a class on <html> for current lang (helpful for CSS if needed)
document.documentElement.classList.add('lang-' + i18n.lang);

// You can switch language at runtime from DevTools:
// i18n.setLang('tr')
