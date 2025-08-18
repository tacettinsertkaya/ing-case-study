import { Router } from '@vaadin/router';

// Create router instance
const router: Router = new Router();

// Route views (lazy imports)
router.setRoutes([
  { path: '/', redirect: '/employees' },
  {
    path: '/employees',
    action: async () => { await import('./pages/employee-list'); },
    component: 'employee-list'
  },
  {
    path: '/employees/new',
    action: async () => { await import('./pages/employee-create'); },
    component: 'employee-create'
  },
  {
    path: '/employees/:id/edit',
    action: async () => { await import('./pages/employee-edit'); },
    component: 'employee-edit'
  },
  { 
    path: '(.*)', 
    action: async () => { await import('./pages/not-found'); }, 
    component: 'not-found' 
  }
]);

export { router };
