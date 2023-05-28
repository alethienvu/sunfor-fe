import useStore from 'store';
import { createRouter, createWebHistory, Router } from 'vue-router';
import routes from './routes';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
router.beforeEach((to, from, next) => {
  const store = useStore();
  store.dashboard.setIsSBOpen(false);
  const { isAuthenticated } = store.auth;
  const publicPath = ['/login', '/register'];
  const isAccessPublicPath = publicPath.includes(to.fullPath);
  if (!isAccessPublicPath && !isAuthenticated) {
    next({ name: from.name || 'login' });
  } else {
    next();
  }
});

export default router;
