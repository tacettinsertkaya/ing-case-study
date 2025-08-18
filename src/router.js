import { Router } from '@vaadin/router';

// Route views (lazy imports)
const outlet = document.getElementById('outlet');

const router = new Router(outlet);
router.setRoutes([
  { path: '/', redirect: '/employees' },
  {
    path: '/employees',
    action: async () => { await import('./views/employee-list-view.js'); },
    component: 'employee-list-view'
  },
  {
    path: '/employees/new',
    action: async () => { await import('./views/employee-new-view.js'); },
    component: 'employee-new-view'
  },
  {
    path: '/employees/:id/edit',
    action: async () => { await import('./views/employee-edit-view.js'); },
    component: 'employee-edit-view'
  },
  { path: '(.*)', action: () => import('./views/not-found.js'), component: 'not-found-view' }
]);

export { router };
