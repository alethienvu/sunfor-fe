import useStore from 'store';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import routes from './routes';
// using hash history for display githubpages
// https://router.vuejs.org/guide/essentials/history-mode.html
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
router.beforeEach((to, from, next) => {
  const store = useStore();
  store.dashboard.setIsSBOpen(false);
  const { isAuthenticated } = store.auth;
  const publicPath = ['/login', '/register', '/forgot-password', '/404'];
  const isAccessPublicPath = publicPath.includes(to.fullPath);
  if (!isAccessPublicPath && !isAuthenticated) {
    next({ name: from.name || 'login' });
  } else {
    next();
  }
});

export default router;
