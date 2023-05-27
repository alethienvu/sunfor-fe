// Lazy load
const NotFound = () => import('modules/pages/views/404.vue');

import dashboardRoutes from './dashboard.routes';
import componentRoutes from './component.routes';
import authRoutes from './auth.routes';
const routes = [
  {
    ...dashboardRoutes
  },
  { ...componentRoutes },

  ...authRoutes,
  {
    path: '/404',
    component: NotFound,
    name: 'NotFound',
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
];

export default routes;
