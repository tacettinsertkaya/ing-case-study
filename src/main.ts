// Import and register all components
import './components/layouts/nav-bar';
import 'material-icons/iconfont/material-icons.css';
import { router } from './router';

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const outlet = document.querySelector('#outlet');
  if (outlet) {
    router.setOutlet(outlet);
  } else {
    console.error('Router outlet element not found');
  }
});

